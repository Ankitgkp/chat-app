import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Message from './models/Message.js';
import User from './models/User.js';
import { handleClerkWebhook } from './controllers/webhookController.js';

// Load environment variables
dotenv.config();

const app = express();

app.use('/api/webhooks/clerk', express.raw({ type: 'application/json' }));

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL]
        : ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

const server = http.createServer(app);

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error('MONGODB_URI environment variable is required');
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production'
            ? [process.env.FRONTEND_URL]
            : ["http://localhost:5173", "http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log(socket.id + " connected");

    socket.on("join_room", async (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`);

        // Send previous messages to the user who just joined
        try {
            const previousMessages = await Message.find({ room: data })
                .sort({ timestamp: 1 })
                .limit(50); // Limit to last 50 messages

            socket.emit("previous_messages", previousMessages);
        } catch (error) {
            console.error('Error fetching previous messages:', error);
        }
    })

    socket.onAny((eventName, ...args) => {
        console.log(`Received event: ${eventName}`, args);
    });

    socket.on("send_message", async (data) => {
        // Save message to database
        try {
            const newMessage = new Message({
                room: data.room,
                author: data.author,
                message: data.message,
                type: 'text',
                timestamp: new Date()
            });
            await newMessage.save();
        } catch (error) {
            console.error('Error saving message:', error);
        }

        socket.to(data.room).emit("message_recieve", data);
    })

    socket.on("send_photo", async (data) => {
        // Save photo to database
        try {
            const newMessage = new Message({
                room: data.room,
                author: data.author,
                message: "",
                type: 'photo',
                mediaData: data.photo,
                timestamp: new Date()
            });
            await newMessage.save();
        } catch (error) {
            console.error('Error saving photo:', error);
        }

        socket.to(data.room).emit("photo_recieve", data);
    })

    socket.on("send_video", async (data) => {
        // Save video to database
        try {
            const newMessage = new Message({
                room: data.room,
                author: data.author,
                message: "",
                type: 'video',
                mediaData: data.video,
                timestamp: new Date()
            });
            await newMessage.save();
        } catch (error) {
            console.error('Error saving video:', error);
        }

        socket.to(data.room).emit("video_recieve", data);
    })

    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    })
})

app.post('/api/webhooks/clerk', handleClerkWebhook);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({ isActive: true }).select('-__v');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/api/users/:clerkId', async (req, res) => {
    try {
        const user = await User.findOne({ clerkId: req.params.clerkId, isActive: true }).select('-__v');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;