import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [autoScroll, setAutoScroll] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Handle manual scrolling by user
    const handleScroll = () => {
        if (messagesContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
            // If user scrolls up more than 100px from bottom, disable auto-scroll
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
            setAutoScroll(isNearBottom);
        }
    };

    useEffect(() => {
        initializeChat();
    }, []);

    // Only scroll to bottom when messages change if autoScroll is enabled
    useEffect(() => {
        if (autoScroll) {
            scrollToBottom();
        }
    }, [messages, autoScroll]);

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
            
            // Create temporary message object for immediate feedback
            const userMessage = { role: 'user', content: input };
            setMessages(prev => [...prev, userMessage]);
            setInput('');
            
            // Re-enable auto-scroll when sending a new message
            setAutoScroll(true);
            
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/chat/message`,
                { message: input },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setMessages(response.data.chatHistory);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleUdashboard = () => {
        navigate('/udashboard');  // Pass totalPrice to Buy component
      };

    return (
        
        
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #0b3d5a 0%, #107dac 100%)',
            padding: '20px'
            
        }}>
     
     <button onClick={handleUdashboard}>
    ⬅️Back
      </button>
            <div style={{
                width: '90%',
                maxWidth: '1200px',
                height: '80vh',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0, 77, 106, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                position: 'relative'
            }}>
     {/* Seafood-themed floating elements */}
                <div className="bubble-animation bubble1" style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'rgba(109, 213, 237, 0.4)',
                    zIndex: 1
                }}></div>
                <div className="bubble-animation bubble2" style={{
                    position: 'absolute',
                    top: '20%',
                    right: '8%',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(109, 213, 237, 0.3)',
                    zIndex: 1
                }}></div>
                <div className="bubble-animation bubble3" style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '12%',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    background: 'rgba(109, 213, 237, 0.5)',
                    zIndex: 1
                }}></div>

                {/* Chat header */}
                <div style={{
                    padding: '20px 24px',
                    background: 'linear-gradient(135deg, #0b3d5a, #107dac)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '16px'
                    }}>
                        {/* Fish Icon */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7C9.5 4 3 4 3 9C3 14 9.5 14 12 11C14.5 14 21 14 21 9C21 4 14.5 4 12 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.2)"/>
                            <circle className="fish-eye" cx="7.5" cy="9" r="1.5" fill="white"/>
                        </svg>
                    </div>
                    <h2 style={{
                        margin: 0,
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: '600',
                        letterSpacing: '0.5px'
                    }}> Ask Finley 🐟</h2>
                    
                    {/* Seafood Decoration */}
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                            <path d="M16 16C16 11 21 11 21 16" stroke="white" strokeWidth="2"/>
                            <path d="M3 16C3 11 8 11 8 16" stroke="white" strokeWidth="2"/>
                            <path d="M8 16C8 13 12 13 16 16" stroke="white" strokeWidth="2"/>
                            <path d="M4 20L7.5 14.5" stroke="white" strokeWidth="1.5"/>
                            <path d="M20 20L16.5 14.5" stroke="white" strokeWidth="1.5"/>
                        </svg>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 7L11 3L13 7L15.5 3L15 8" stroke="white" strokeWidth="1.5"/>
                            <path d="M6 12C6 9 9 6 12 6C15 6 18 9 18 12" stroke="white" strokeWidth="2"/>
                            <path d="M9 16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16" stroke="white" strokeWidth="1.5"/>
                            <path d="M9 20C9 18.8954 10.3431 18 12 18C13.6569 18 15 18.8954 15 20" stroke="white" strokeWidth="1.5"/>
                        </svg>
                    </div>
                </div>
                
                {/* Messages container */}
                <div 
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    style={{
                        flex: 1,
                        padding: '24px',
                        overflowY: 'auto',
                        backgroundColor: 'rgba(240, 248, 255, 0.5)',
                        position: 'relative',
                        scrollBehavior: 'smooth',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M15 20C15 15 20 15 20 20C20 25 15 25 15 20ZM40 20C40 15 45 15 45 20C45 25 40 25 40 20ZM65 20C65 15 70 15 70 20C70 25 65 25 65 20ZM90 20C90 15 95 15 95 20C95 25 90 25 90 20ZM2.5 45C2.5 40 7.5 40 7.5 45C7.5 50 2.5 50 2.5 45ZM27.5 45C27.5 40 32.5 40 32.5 45C32.5 50 27.5 50 27.5 45ZM52.5 45C52.5 40 57.5 40 57.5 45C57.5 50 52.5 50 52.5 45ZM77.5 45C77.5 40 82.5 40 82.5 45C82.5 50 77.5 50 77.5 45ZM15 70C15 65 20 65 20 70C20 75 15 75 15 70ZM40 70C40 65 45 65 45 70C45 75 40 75 40 70ZM65 70C65 65 70 65 70 70C70 75 65 75 65 70ZM90 70C90 65 95 65 95 70C95 75 90 75 90 70Z\' fill=\'%230b3d5a\' fill-opacity=\'0.03\'/%3E%3C/svg%3E")',
                        backgroundSize: '100px'
                    }}
                >
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            style={{
                                display: 'flex',
                                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '16px',
                                animation: 'fadeIn 0.3s ease-out',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {msg.role !== 'user' && (
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #0b3d5a, #107dac)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: '12px',
                                    flexShrink: 0
                                }}>
                                    {/* Fish icon for assistant */}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 7C9.5 4 3 4 3 9C3 14 9.5 14 12 11C14.5 14 21 14 21 9C21 4 14.5 4 12 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.2)"/>
                                        <circle cx="7.5" cy="9" r="1.5" fill="white"/>
                                    </svg>
                                </div>
                            )}
                            <div 
                                className="message-bubble"
                                style={{
                                    maxWidth: '70%',
                                    padding: '14px 18px',
                                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    backgroundColor: msg.role === 'user' ? '#107dac' : 'white',
                                    color: msg.role === 'user' ? 'white' : '#333',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                    fontSize: '15px',
                                    lineHeight: '1.5',
                                    transform: 'translateY(0)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    wordBreak: 'break-word'
                                }}
                            >
                                {msg.content}
                            </div>
                            {msg.role === 'user' && (
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: '#107dac',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: '12px',
                                    flexShrink: 0
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="white"/>
                                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="white"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input form */}
                <form 
                    onSubmit={sendMessage} 
                    style={{
                        display: 'flex',
                        padding: '16px 24px',
                        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        position: 'relative'
                    }}
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about our fresh seafood & poultry selection..."
                        disabled={loading}
                        style={{
                            flex: 1,
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            borderRadius: '24px',
                            padding: '16px 24px',
                            paddingLeft: '48px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.9)',
                            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
                            marginRight: '16px'
                        }}
                    />
                    
                    {/* Input decoration */}
                    <svg 
                        style={{
                            position: 'absolute',
                            left: '40px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            opacity: '0.5'
                        }}
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 7C9.5 4 3 4 3 9C3 14 9.5 14 12 11C14.5 14 21 14 21 9C21 4 14.5 4 12 7Z" stroke="#0b3d5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle className="fish-eye-blink" cx="7.5" cy="9" r="1.5" fill="#0b3d5a"/>
                    </svg>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            background: 'linear-gradient(135deg, #0b3d5a, #107dac)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '54px',
                            height: '54px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: loading ? 'default' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(11, 61, 90, 0.3)',
                            opacity: loading ? 0.7 : 1,
                            transform: loading ? 'scale(0.95)' : 'scale(1)'
                        }}
                    >
                        {loading ? (
                            <div style={{
                                width: '24px',
                                height: '24px',
                                border: '3px solid rgba(255, 255, 255, 0.3)',
                                borderTop: '3px solid white',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 12L18 4L12 22L10 14L2 12Z" fill="white" />
                            </svg>
                        )}
                    </button>
                </form>
            </div>

            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    @keyframes float {
                        0% { transform: translateY(0) rotate(0deg); }
                        50% { transform: translateY(-10px) rotate(5deg); }
                        100% { transform: translateY(0) rotate(0deg); }
                    }
                    
                    @keyframes bubbleFloat {
                        0% { transform: translateY(0); }
                        50% { transform: translateY(-15px); }
                        100% { transform: translateY(0); }
                    }
                    
                    @keyframes blink {
                        0% { transform: scale(1); }
                        10% { transform: scale(0.1); }
                        20% { transform: scale(1); }
                        100% { transform: scale(1); }
                    }
                    
                    .bubble-animation {
                        animation: bubbleFloat 4s ease-in-out infinite;
                    }
                    
                    .bubble1 {
                        animation-duration: 6s;
                    }
                    
                    .bubble2 {
                        animation-duration: 8s;
                        animation-delay: 1s;
                    }
                    
                    .bubble3 {
                        animation-duration: 7s;
                        animation-delay: 2s;
                    }
                    
                    .fish-eye-blink {
                        animation: blink 5s infinite;
                    }
                    
                    /* Fix for scrollbar styling */
                    *::-webkit-scrollbar {
                        width: 10px;
                        background-color: rgba(240, 248, 255, 0.5);
                    }
                    
                    *::-webkit-scrollbar-thumb {
                        background-color: rgba(11, 61, 90, 0.4);
                        border-radius: 10px;
                        border: 2px solid rgba(240, 248, 255, 0.5);
                    }
                    
                    *::-webkit-scrollbar-thumb:hover {
                        background-color: rgba(11, 61, 90, 0.6);
                    }
                    
                    .message-bubble:hover {
                        transform: translateY(-2px) !important;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
                    }
                    
                    input:focus {
                        border-color: #107dac !important;
                        box-shadow: 0 0 0 2px rgba(11, 61, 90, 0.2) !important;
                    }
                    
                    button:hover:not(:disabled) {
                        transform: scale(1.05) !important;
                        box-shadow: 0 4px 12px rgba(11, 61, 90, 0.4) !important;
                    }
                    
                    /* Make responsive adjustments */
                    @media (max-width: 768px) {
                        .message-bubble {
                            max-width: 85% !important;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .message-bubble {
                            max-width: 90% !important;
                            padding: 12px 14px !important;
                            font-size: 14px !important;
                        }
                        
                        input {
                            padding: 12px 16px 12px 40px !important;
                            font-size: 14px !important;
                        }
                        
                        button {
                            width: 48px !important;
                            height: 48px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ChatBot;