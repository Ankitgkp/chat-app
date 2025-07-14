import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
const { Server } = require('socket.io');
const server = http.createServer(app);
app.use(cors());


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})


io.on("connection", (socket) => {
    console.log(socket.id + " connected");


    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    })
})





server.listen(3000, () => {
    console.log('Server is running on port 3000');
});