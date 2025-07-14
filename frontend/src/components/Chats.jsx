import React, { useEffect, useState } from 'react'

const Chats = ({ socket, username, roomID }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const data = {
                username: username,
                room: roomID,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", data);
            setMessageList((list) => [...list, data]);
            setCurrentMessage("");
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    useEffect(() => {
        socket.on("message_recieve", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex flex-col">
                <div className="bg-white shadow-lg border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Room: {roomID}</h2>
                                <p className="text-sm text-gray-600">Welcome, {username}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Online</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                    {messageList.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-lg">No messages yet</p>
                                <p className="text-gray-400 text-sm">Start the conversation!</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messageList.map((messageContent, index) => (
                                <div
                                    key={index}
                                    className={`flex ${messageContent.username === username ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-3 ${messageContent.username === username
                                            ? 'bg-green-500 text-white rounded-2xl rounded-br-md'
                                            : 'bg-white text-gray-800 shadow-md rounded-2xl rounded-bl-md border border-gray-200'
                                            }`}
                                    >
                                        {messageContent.username !== username && (
                                            <p className="text-xs font-semibold text-green-600 mb-1">
                                                {messageContent.username}
                                            </p>
                                        )}
                                        <p className="text-sm">{messageContent.message}</p>
                                        <p
                                            className={`text-xs mt-1 ${messageContent.username === username
                                                ? 'text-green-100'
                                                : 'text-gray-500'
                                                }`}
                                        >
                                            {messageContent.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white border-t border-gray-200 p-4 rounded-b-2xl">
                    <div className="flex items-center space-x-3">
                        <input
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!currentMessage.trim()}
                            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats