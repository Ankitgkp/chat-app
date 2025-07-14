import io from 'socket.io-client'
import './App.css'
import { useState } from 'react'
import Chats from './components/Chats';
import JoinRoom from './components/JoinRoom';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'

const socket = io.connect('http://localhost:3000')

function App() {
  const [roomID, setroomID] = useState('');
  const [showChat, setShowChat] = useState(false);
  const { user } = useUser();

  const joinRoom = () => {
    if (user && roomID) {
      socket.emit("join_room", roomID);
      setShowChat(true);
    }
  }

  return (<div className="min-h-screen bg-gray-50">
    <SignedOut>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-100">
          {/* Simple logo */}
          <div className="text-center mb-8">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome to Realtime Chat
            </h1>
            <p className="text-gray-600">
              Please sign in to continue
            </p>
          </div>

          {/* Sign In Button */}
          <div className="text-center">
            <SignInButton mode="modal">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Sign In
              </button>
            </SignInButton>

            <p className="mt-4 text-sm text-gray-500">
              Secure authentication powered by Clerk
            </p>
          </div>
        </div>
      </div>
    </SignedOut>

    <SignedIn>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-semibold text-gray-900">Realtime Chat</h1>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!showChat ? (
            <JoinRoom
              username={user?.firstName || user?.emailAddresses[0]?.emailAddress}
              roomID={roomID}
              setroomID={setroomID}
              joinRoom={joinRoom}
            />
          ) : (
            <Chats
              socket={socket}
              username={user?.firstName || user?.emailAddresses[0]?.emailAddress}
              roomID={roomID}
            />
          )}
        </div>
      </div>
    </SignedIn>
  </div>
  )
}

export default App
