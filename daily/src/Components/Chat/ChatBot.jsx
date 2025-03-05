import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatBot.css';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        initializeChat();
        scrollToBottom();
    }, [messages]);

    const initializeChat = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/chat/init`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setMessages(response.data.messages || []);
        } catch (error) {
            console.error('Error initializing chat:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/chat/message`,
                { message: input },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setMessages(response.data.chatHistory);
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-header">
                <h2>Store Assistant</h2>
            </div>
            
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <div className="message-content">{msg.content}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default ChatBot; 