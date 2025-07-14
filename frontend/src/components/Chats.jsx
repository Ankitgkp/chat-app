import React from 'react'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import useChatLogic from '../hooks/useChatLogic'

const Chats = ({ socket, username, roomID }) => {
    const {
        currentMessage,
        setCurrentMessage,
        messageList,
        sendMessage,
        pickPhoto,
        pickVideo,
        handleKeyPress
    } = useChatLogic(socket, username, roomID);

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex flex-col">
                <ChatHeader roomID={roomID} username={username} />
                
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                    <MessageList messageList={messageList} username={username} />
                </div>

                <ChatInput 
                    currentMessage={currentMessage}
                    setCurrentMessage={setCurrentMessage}
                    sendMessage={sendMessage}
                    pickPhoto={pickPhoto}
                    pickVideo={pickVideo}
                    handleKeyPress={handleKeyPress}
                />
            </div>
        </div>
    )
}

export default Chats
