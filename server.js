const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const port = 4001

const parse = require('csv-parse');
const fs = require('fs')

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sierra-leone-cec24.firebaseapp.com"
});
const db = admin.firestore();
let logFileRef = db.collection('logData').doc(""+(new Date()).getUTCFullYear());

const cron = require('node-cron');


const PATHSTOFILES = ['./cc1.csv','./cc2.csv','./cc3.csv']



//The following cron job covers the edge case that the year changes while the server is running
cron.schedule('0 0 1 JAN *', () => {
  console.log('***** A NEW YEAR HAS STARTED *****');
  logFileRef = db.collection('logData').doc(""+(new Date()).getUTCFullYear());
  for(let path of PATHSTOFILES)
    fs.writeFileSync(path,null)
}, {
    scheduled: true,
    timezone: "UTC"
});



const equal = require('deep-equal');
let lastLogFile;
let lastWrite = -1

const uploadToFirebase = () =>{
    logFileJSON((data)=>{
        // console.log(data)
        if(!equal(lastLogFile,data)){
            console.log("log file changed, uploading new version")
            lastLogFile = data
            logFileRef.set({data, timestamp: admin.firestore.FieldValue.serverTimestamp()}).then(()=>{
                console.log("Write confirmed")
                lastWrite = new Date().getTime()
            })
        }
    })
}

const logFileJSON = (callback)=>{
    let promises = []
    let dataObj = {}
    for(let path of PATHSTOFILES){
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
        for(let pathIndex in PATHSTOFILES){
            const path = PATHSTOFILES[pathIndex].replace(/[|&;$%@"<>()+,./]/g, "")
            dataObj[path] = promises[pathIndex]
        }
        callback(dataObj)
    }).catch(console.log)
}

app.get('/logfile', (req, res) => {
    console.log("logfile request received")
    logFileJSON((data)=>res.json(data))
})

app.get('/last-write', (req, res) => {
    res.json({ lastWrite })
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

uploadToFirebase()
setInterval(uploadToFirebase, 1000*60*10); //Try to upload once every minute
