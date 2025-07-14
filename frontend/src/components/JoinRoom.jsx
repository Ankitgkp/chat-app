import React from 'react'

const JoinRoom = ({ username, setusername, roomID, setroomID, joinRoom }) => {
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-200">
                <div className="text-center mb-8">
                    <div className="bg-gray-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Join Chat Room</h1>
                    <p className="text-gray-600">Connect with others in real-time</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name
                        </label>
                        <input
                            onChange={(event) => setusername(event.target.value)}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-200"
                            value={username}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Room ID
                        </label>
                        <input
                            onChange={(event) => setroomID(event.target.value)}
                            type="text"
                            placeholder="Enter room ID"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-200"
                            value={roomID}
                        />
                    </div>

                    <button
                        onClick={joinRoom}
                        disabled={!username || !roomID}
                        className="w-full bg-blue-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Join Room
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Create a room ID and share it with friends to start chatting!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default JoinRoom
