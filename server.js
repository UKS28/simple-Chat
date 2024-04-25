import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import path from 'path';
const __dirname = path.resolve();

const app = express();
const httpServer = createServer(app);
const PORT=process.env.PORT || 8000
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
     console.log("connection established with", socket.id);
     socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
     })
});

httpServer.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`)
});














