require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs')
var sanitize = require("sanitize-filename");
const readLastLines = require('read-last-lines');
const firstline = require('firstline');

const PORT = process.env.PORT || 3000;

//Create Database Folder
if (!fs.existsSync(process.env.DATABASEPATH)){
    fs.mkdirSync(process.env.DATABASEPATH);
}

//Authenticate connection
io.use((socket, next) => {  
    const token = socket.handshake.auth.token;
    if (token === process.env.AUTHTOKEN)
        return next();
    console.log(`Received invalid token: ${token}`)
    const err = new Error("not authorized");
    err.data = { content: "Please retry later" }
    next(err);
});


//Handle new connection
io.on('connection', async (socket) => {
    const id = socket.handshake.auth.id;
    console.log(`Client Connected - ID: ${id}\n`);

    const connectionFolder = sanitize(id)
    const connectionPath = `${process.env.DATABASEPATH}/${connectionFolder}`
    
    //Create connection folder if necessary
    if (!fs.existsSync(connectionPath))
        fs.mkdirSync(connectionPath);

    const files = fs.readdirSync(connectionPath)

    let lastTimestamps = {}
    for(let file of files){
        const header = await firstline(`${connectionPath}/${file}`)
        const timeIndex = header.split(",").findIndex(el=>el==`"time (UTC)"`)
        const lastTimeStamp = (await readLastLines.read(`${connectionPath}/${file}`, 1)).split(",")[timeIndex]
        if(lastTimeStamp)
            lastTimestamps[file] = lastTimeStamp
        else   
            lastTimestamps[file] = null
        // This may add null values to the lastTimestamps object, this is expected for empty files
    }

    console.log(lastTimestamps)
    console.log(socket.id)
    io.to(socket.id).emit('lastTimeStamps', lastTimestamps);

    let writeSteams = {}

    socket.on('new line', (data) => {
        const {fileName, line} = data;
        console.log(`${fileName} received: ${line}`); 
        if(!writeSteams[fileName])
            writeSteams[fileName] = fs.createWriteStream(`${connectionPath}/${fileName}`, {flags: 'a'});
        writeSteams[fileName].write(line)
    });

    socket.on('disconnect', () => {    
        console.log(`Client Disconnected - ID: ${id}\n`);
        
        //Close all write streams
        for(fileName in writeSteams)
            writeSteams[fileName].end()
    });
});

server.listen(PORT, () => {  console.log(`Listening on port: ${PORT}`);});