require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const parse = require('csv-parse');
const fs = require('fs')
const readline = require('readline');
const { io } = require("socket.io-client");
const lineReader = require('reverse-line-reader');

let lastWrite = -1

const socket = io(process.env.SOCKETADDRESS,{  auth: {id: process.env.ID, token: process.env.AUTHTOKEN}});

socket.on("connect_error", (err) => {  
    console.log("ERROR:\n");
    console.log(err.message); 
    console.log(err.data); 
});

socket.on("connect", () => {  
    console.log("Connection to main server established");

    // Don't start until we have the last timestamps
    socket.on('lastTimeStamp', (lastTimestamp)=>{
        lastWrite = lastTimestamp
        console.log(`Timestamp received from main server: ${new Date(lastTimestamp)} - ${JSON.stringify(lastTimestamp)}`);
        const fileHeaderArr = {}
        const fileTimeIndex = {}
        dataToUpload = []
        const uploadIfNeeded = async () =>{
            for(let path of process.env.PATHSTOUPLOAD.split(" ")){
                if(!fs.existsSync(path)){
                    console.log(`File at ${path} does not exist`)
                    continue
                }
                // const fileName = path.split(",")[path.split(",").length - 1]
                if (!fileTimeIndex[path]){
                    const header = await getFirstLine(`${path}`)
                    fileHeaderArr[path] = header.split(",").map(removeQuotes)
                    const timeIndex = fileHeaderArr[path].findIndex((el) => el == `time (UTC)`)
                    fileTimeIndex[path] = timeIndex
                }
                const fileDataPromise = new Promise((res,rej)=>{
                    let lines = []
                    lineReader.eachLine(path, function (line, last) {
                        const lineArr = line.split(",").map(removeQuotes)
                        const lineTime = new Date(lineArr[fileTimeIndex[path]]).getTime()
                        if(!lineTime){
                            return true // skip line
                        }
                        if(lineTime > lastTimestamp){
                            let lineObj = {}
                            // TODO: Figure out why the object have 1 property consisting of every header
                            for(let i in lineArr){
                                lineObj[fileHeaderArr[path][i]] = lineArr[i]
                            }
                            lines.push(lineObj)
                        }else{
                            // res([lines,path])
                            return false
                        }
                    }).then(()=>{
                        res([lines,path])
                    })
                })
                dataToUpload.push(fileDataPromise)
            }

            Promise.all(dataToUpload).then((dataToUploadResovled)=>{
                for(let [lines, path] of dataToUploadResovled){
                    if(lines.length > 0){
                        socket.emit('data update', [lines, path]);
                        console.log(`Sending ${lines.length} data points from file: ${path}`);
                    }
                }
            })
        }
        
        uploadIfNeeded()
        // Instead, we are going to only upload when we get a request from the main server
        // setInterval(uploadIfNeeded, 60*1000); //Try to upload once every minute
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

app.get('/last-write', (req, res) => {
    res.json({ lastWrite })
})

app.listen(process.env.PORT, () => {
    console.log(`Local server listening at http://localhost:${process.env.PORT}`)
})

const removeQuotes = (str) => str.replace(/^"|"$/g, '')

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