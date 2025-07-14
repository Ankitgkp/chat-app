import React from 'react'
import MessageBubble from './MessageBubble'

const MessageList = ({ messageList, username }) => {
    if (messageList.length === 0) {
        return (
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
        )
    }

    return (
        <div className="space-y-4">
            {messageList.map((messageContent, index) => (
                <MessageBubble
                    key={index}
                    messageContent={messageContent}
                    username={username}
                />
            ))}
        </div>
    )
}

export default MessageList
