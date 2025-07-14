import React from 'react'

const MessageBubble = ({ messageContent, username }) => {
    const isOwn = messageContent.username === username;

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 ${isOwn
                ? 'bg-blue-400 text-white rounded-2xl rounded-br-md'
                : 'bg-white text-gray-800 shadow-sm rounded-2xl rounded-bl-md border border-gray-200'
                }`}>
                {!isOwn && (
                    <p className="text-xs font-medium text-blue-600 mb-1">
                        {messageContent.username}
                    </p>
                )}

                {messageContent.type === "text" && (
                    <p className="text-sm">{messageContent.message}</p>
                )}

                {messageContent.type === "photo" && (
                    <img
                        src={messageContent.photo}
                        className="max-w-full h-auto rounded-lg cursor-pointer"
                        onClick={() => window.open(messageContent.photo)}
                    />
                )}

                {messageContent.type === "video" && (
                    <video
                        src={messageContent.video}
                        controls
                        className="max-w-full h-auto rounded-lg"
                    />
                )}

                <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                    {messageContent.time}
                </p>
            </div>
        </div>
    )
}

export default MessageBubble
