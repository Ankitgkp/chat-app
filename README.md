# Real-time Chat Application

A modern real-time chat application with photo/video sharing and persistent message history.

## Features

- **Real-time messaging** with Socket.IO
- **Photo and video sharing** with instant preview
- **Persistent chat history** with MongoDB
- **Room-based chat** system
- **Modern UI** with Tailwind CSS and gradient effects
- **Responsive design** for all devices

## Tech Stack

### Backend
- Node.js with Express
- Socket.IO for real-time communication
- MongoDB with Mongoose for data persistence
- CORS for cross-origin requests

### Frontend
- React with Vite
- Tailwind CSS for styling
- Custom hooks for chat logic
- Component-based architecture

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Community Edition
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd realtime-chat
```

2. **Setup MongoDB**
```bash
# macOS
brew tap mongodb/brew && brew install mongodb-community
brew services start mongodb-community
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

### Running the Application

1. **Start MongoDB** (if not already running)
```bash
brew services start mongodb-community
```

2. **Start the backend server**
```bash
cd backend
npm start
```

3. **Start the frontend development server**
```bash
cd frontend
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

## Project Structure

```
realtime-chat/
├── backend/
│   ├── models/
│   │   └── Message.js          # MongoDB schema
│   ├── index.js                # Express server with Socket.IO
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom hooks
│   │   └── main.jsx            # App entry point
│   └── package.json
├── DATABASE_SETUP.md           # Database setup guide
└── README.md
```

## Database Features

- **Message Persistence:** All messages are stored in MongoDB
- **Room-based Storage:** Messages are organized by room ID
- **Media Support:** Photos and videos stored as base64 data
- **Chat History:** Users see previous messages when joining a room
- **Performance Optimized:** Only last 50 messages loaded per room

## Usage

1. **Join a Room:** Enter your name and a room ID
2. **Start Chatting:** Send text messages instantly
3. **Share Media:** Click the pin icon to share photos or videos
4. **View History:** Previous messages load automatically when you join

## Development

The application uses a clean component architecture:

- **useChatLogic.js:** Custom hook managing all chat functionality
- **Component separation:** Each UI element is a separate component
- **MongoDB integration:** Minimal logic for data persistence
- **Socket.IO events:** Real-time communication between users

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and development!