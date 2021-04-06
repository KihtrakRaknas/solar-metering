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
const logFileRef = db.collection('logData').doc("data");

const equal = require('deep-equal');
let lastLogFile;

const uploadToFirebase = () =>{
    logFileJSON((data)=>{
        if(!equal(lastLogFile,data)){
            console.log("log file changed, uploading new version")
            lastLogFile = data
            logFileRef.set({data:data, timestamp: admin.firestore.FieldValue.serverTimestamp()})
        }
    })
}

const logFileJSON = (callback)=>{
    fs.readFile('./please.csv', 'utf8', (err, data) => { // "C:/Program Files (x86)/Morningstar Corporation/MSView/please.csv"
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
                callback(output)
            }
        })  
    })
}

app.get('/logfile', (req, res) => {
    console.log("logfile request received")
    logFileJSON((data)=>res.json(data))
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

uploadToFirebase()
setInterval(uploadToFirebase, 1000*60*10); //Try to upload once every minute
