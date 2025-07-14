import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})


io.on("connection", (socket) => {
    console.log(socket.id + " connected");

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    socket.onAny((eventName, ...args) => {
        console.log(`Received event: ${eventName}`, args);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("message_recieve", data);
    })

    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    })
})



server.listen(3000, () => {
    console.log('Server is running on port 3000');
});