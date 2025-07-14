import { useState, useEffect } from 'react'

const useChatLogic = (socket, username, roomID) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const getCurrentTime = () => {
        return new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes();
    };

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const data = {
                username: username,
                room: roomID,
                message: currentMessage,
                type: "text",
                time: getCurrentTime()
            }
            await socket.emit("send_message", data);
            setMessageList((list) => [...list, data]);
            setCurrentMessage("");
        }
    }

    const pickPhoto = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = {
                    username: username,
                    room: roomID,
                    photo: event.target.result,
                    type: "photo",
                    time: getCurrentTime()
                }
                socket.emit("send_photo", data);
                setMessageList((list) => [...list, data]);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = '';
    }

    const pickVideo = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = {
                    username: username,
                    room: roomID,
                    video: event.target.result,
                    type: "video",
                    time: getCurrentTime()
                }
                socket.emit("send_video", data);
                setMessageList((list) => [...list, data]);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = '';
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

        socket.on("photo_recieve", (data) => {
            setMessageList((list) => [...list, data]);
        });

        socket.on("video_recieve", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return {
        currentMessage,
        setCurrentMessage,
        messageList,
        sendMessage,
        pickPhoto,
        pickVideo,
        handleKeyPress
    };
};

export default useChatLogic
