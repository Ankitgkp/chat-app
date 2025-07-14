import React from 'react'

const ChatInput = ({
    currentMessage,
    setCurrentMessage,
    sendMessage,
    pickPhoto,
    pickVideo,
    handleKeyPress
}) => {
    const pickMedia = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                pickPhoto(e);
            } else if (file.type.startsWith('video/')) {
                pickVideo(e);
            }
        }
    }

    return (
        <div className="bg-white border-t border-gray-200 p-4 rounded-b-2xl shadow-sm">
            <div className="flex items-center space-x-3">
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={pickMedia}
                    style={{ display: 'none' }}
                    id="mediaInput"
                />

                <button
                    onClick={() => document.getElementById('mediaInput').click()}
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-3 rounded-full hover:from-blue-500 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                </button>

                <input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                />

                <button
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ChatInput
