import io from 'socket.io-client'
import './App.css'
import { useState } from 'react'
import Chats from './components/Chats';
import JoinRoom from './components/JoinRoom';

const socket = io.connect('http://localhost:3000')

function App() {
  const [username, setusername] = useState('');
  const [roomID, setroomID] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username && roomID) {
      socket.emit("join_room", roomID);
      setShowChat(true);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {!showChat ? (
        <JoinRoom
          username={username}
          setusername={setusername}
          roomID={roomID}
          setroomID={setroomID}
          joinRoom={joinRoom}
        />
      ) : (
        <Chats socket={socket} username={username} roomID={roomID} />
      )}
    </div>
  )
}

export default App
