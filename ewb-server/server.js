require('dotenv').config()
const sqlite3 = require('sqlite3').verbose();
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
let db = new sqlite3.Database(process.env.DATABASEPATH || 'ewb-server.db');

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

// db.serialize(function() {
//     db.exec("CREATE TABLE IF NOT EXISTS lastTimestamps (path TEXT, timestamp TEXT)");
//     db.all(`SELECT name FROM sqlite_schema WHERE type='table'`,console.log)
// });;

//Handle new connection
io.on('connection', async (socket) => {
    const id = socket.handshake.auth.id;
    console.log(`Client Connected - ID: ${id}`);
    
    const tableName = repSpace(sanitize(id))
    const sendLastTimestamp = () => {
        db.serialize(function() {
            const query = 
            `SELECT ${repSpace(`time (UTC)`)} 
            FROM ${tableName} 
            ORDER BY ${repSpace(`time (UTC)`)} DESC 
            LIMIT 1;`
            db.get(query, function(err, row) {
                console.log(`Sent ${id} last timestamp over socket ${socket.id}`)
                if(err){
                    console.log(err)
                    // Table likely does not exist, create it
                    db.run(`CREATE TABLE ${tableName} (${repSpace(`time (UTC)`)} REAL)`)
                }
                io.to(socket.id).emit('lastTimeStamp', (!err && row)?row[repSpace(`time (UTC)`)]:0);            
            })
        });
    }
    sendLastTimestamp()
    const timestampInterval = setInterval(sendLastTimestamp, 1000 * 60)

    socket.on('data update', ([data,path]) => {
        console.log(`New data from ${id}: received (${data.length}) data points`); 
        const columnNamesSet = new Set()
        for(let row of data){
            for(let columnName of Object.keys(row))
                columnNamesSet.add(repSpace(columnName))
        }
        const existingColumnNamesSet = new Set()
        const query = `PRAGMA table_info(${tableName});`
        db.all(query, (err, columns)=>{
            for(let column of columns)
                existingColumnNamesSet.add(column.name)
            
            const columnNamesToAdd = [...columnNamesSet].map(repSpace).filter(el => !existingColumnNamesSet.has(el))
            for(let columnName of columnNamesToAdd){
                // console.log(`ALTER TABLE ${tableName} ADD ${columnName} TEXT`)
                const query = `ALTER TABLE ${tableName} ADD ${columnName} TEXT`
                db.run(query)
            }
            if(columnNamesToAdd.length > 0)
                console.log(`Added columns ${JSON.stringify(columnNamesToAdd)} to table ${tableName}`)
            for(let row of data){
                row['time (UTC)'] = new Date(row['time (UTC)']).getTime()
                columnQs = ""
                for(let i = 0; i != Object.keys(row).length; i++){
                    columnQs += "?, "
                }
                columnQs = columnQs.substring(0, columnQs.length - 2)
                const query = `INSERT INTO ${tableName} (${Object.keys(row).map(repSpace).join(", ")}) VALUES (${columnQs});`
                // console.log("query" + query+ "\n\n")
                let stmt = db.prepare(query)
                stmt.run(...Object.values(row))
            }
        })
    });

    socket.on('disconnect', () => {    
        console.log(`Client Disconnected - ID: ${id}`);
        clearInterval(timestampInterval)
    });
});

server.listen(PORT, () => {  console.log(`Listening on port: ${PORT}`);});

const repSpace = (str) => str.replace(/\s/g, '_').replace(/\(/g, '').replace(/\)/g, '').replace(/\./g, '');