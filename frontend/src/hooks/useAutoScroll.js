import { useEffect, useRef } from 'react';

const useAutoScroll = (dependency) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [dependency]);

    return messagesEndRef;
};

export default useAutoScroll;
