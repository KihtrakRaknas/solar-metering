require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const parse = require('csv-parse');
const fs = require('fs')
const readline = require('readline');
const { io } = require("socket.io-client");
const fsR = require('fs-reverse');

const socket = io(process.env.SOCKETADDRESS,{  auth: {id: process.env.ID, token: process.env.AUTHTOKEN}});

socket.on("connect_error", (err) => {  
    console.log("ERROR:\n");
    console.log(err.message); 
    console.log(err.data); 
});

socket.on("connect", () => {  
    console.log("Connection to Main Server Established\n");

    // Don't start until we have the last timestamps
    socket.on('lastTimeStamps', (lastTimestamps)=>{
        console.log(lastTimestamps)
        for(let index in lastTimestamps){
            const timestamp = typeof lastTimestamps[index] == "string"?lastTimestamps[index].split(`"`).join(""):0
            lastTimestamps[index] = timestamp
        }
        
        console.log(`Timestamp received from main server: ${JSON.stringify(lastTimestamps)}\n`);
        const fileTimeIndex = {}
        const uploadIfNeeded = async () =>{
            for(let path of process.env.PATHSTOUPLOAD){
                const fileName = path.split(",")[path.split(",").length - 1]
                if (!fileTimeIndex[path]){
                    const header = await getFirstLine(`${path}`)
                    const timeIndex = header.split(",").findIndex("time (UTC)")
                    fileTimeIndex[path] = timeIndex
                }
                const fileDataPromise = new Promise((res,rej)=>{
                    let lines = []
                    const stream = fsR(path, {})
                    stream.on("data", function (line) {
                        if(new Date(line.split(",")[fileTimeIndex[path]]).getTime() > lastTimestamps[fileName]){
                            lines.push(line)
                        }else{
                            stream.close()
                            res(lines)
                        }
                    });
                })
            }

            Promise.all(promises).then((promises)=>{
                for(let lines of promises){
                    socket.emit('data update', lines);
                }
            })
        }
        
        uploadIfNeeded()
        setInterval(uploadIfNeeded, 60*1000); //Try to upload once every minute
        lastTimestamps
    })
});


const getlogFileAsJSON = (callback)=>{
    let promises = []
    let dataObj = {}
    for(let path of process.env.PATHSTOUPLOAD){
        const fileDataPromise = new Promise((res,rej)=>{
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                parse(data, {
                    comment: '#',
                    delimiter: ',',
                    columns: true
                }, function (err, output) {
                    // console.log(output)
                    if (err)
                        console.error(err)
                    else {
                        res(output)
                    }
                })  
            })
        })
        promises.push(fileDataPromise)
    }
    Promise.all(promises).then((promises)=>{
        for(let pathIndex in process.env.PATHSTOUPLOAD){
            const path = process.env.PATHSTOUPLOAD[pathIndex].replace(/[|&;$%@"<>()+,./]/g, "")
            dataObj[path] = promises[pathIndex]
        }
        callback(dataObj)
    }).catch(console.log)
}

// app.get('/logfile', (req, res) => {
//     console.log("logfile request received")
//     getlogFileAsJSON((data)=>res.json(data))
// })

// app.get('/last-write', (req, res) => {
//     res.json({ lastWrite })
// })

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
})


async function getFirstLine(pathToFile) {
    const readable = fs.createReadStream(pathToFile);
    const reader = readline.createInterface({ input: readable });
    const line = await new Promise((resolve) => {
      reader.on('line', (line) => {
        reader.close();
        resolve(line);
      });
    });
    readable.close();
    return line;
  }