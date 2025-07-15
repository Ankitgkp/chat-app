# Realtime Chat App

A simple real-time chat application built with React, Node.js, Socket.io, MongoDB, and Clerk authentication.

## Features
- Real-time messaging with Socket.io
- User authentication with Clerk
- MongoDB for message persistence
- Photo and video sharing
- Multiple chat rooms

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Clerk account for authentication

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ankitgkp/chat-app.git
cd realtime-chat
```

2. Install dependencies for both frontend and backend:
```bash
npm run install:all
```

3. Set up Clerk authentication:
   - Create a new application at [clerk.com](https://clerk.com)
   - Copy your publishable key
   - Update `frontend/src/main.jsx` with your Clerk publishable key

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. Open your browser and go to `http://localhost:5173`

## How to Use

1. Sign in using Clerk authentication
2. Enter a room name to join or create a chat room
3. Start chatting with other users in real-time
4. Share photos and videos using the media buttons

## Project Structure

```
realtime-chat/
├── backend/
│   ├── models/
│   │   ├── Message.js
│   │   └── User.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── package.json
```

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Clerk React
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **Real-time Communication**: Socket.io