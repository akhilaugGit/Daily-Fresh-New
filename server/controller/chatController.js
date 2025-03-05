const Chat = require('../models/chatModel');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const chatController = {
    // Initialize or get existing chat
    initializeChat: async (req, res) => {
        try {
            const userId = req.identifier;
            let chat = await Chat.findOne({ userId });

            if (!chat) {
                chat = new Chat({ userId, messages: [] });
                await chat.save();
            }

            res.status(200).json(chat);
        } catch (error) {
            console.error('Chat initialization error:', error);
            res.status(500).json({ error: 'Failed to initialize chat' });
        }
    },

    // Send message and get response
    sendMessage: async (req, res) => {
        try {
            const userId = req.identifier;
            const { message } = req.body;

            // Get or create chat history
            let chat = await Chat.findOne({ userId });
            if (!chat) {
                chat = new Chat({ userId, messages: [] });
            }

            // Add user message to history
            chat.messages.push({
                role: 'user',
                content: message
            });

            // Generate context from previous messages
            const context = chat.messages
                .slice(-5)
                .map(msg => `${msg.role}: ${msg.content}`)
                .join('\n');

            // Get response from Gemini
            const prompt = `
                Context: You are a helpful assistant for a seafood and poultry store.
                Previous conversation:
                ${context}
                
                Respond to: ${message}
            `;

            const result = await model.generateContent(prompt);
            const response = result.response.text();

            // Add assistant response to history
            chat.messages.push({
                role: 'assistant',
                content: response
            });

            await chat.save();

            res.status(200).json({
                message: response,
                chatHistory: chat.messages
            });

        } catch (error) {
            console.error('Chat error:', error);
            res.status(500).json({ error: 'Failed to process message' });
        }
    },

    // Get chat history
    getChatHistory: async (req, res) => {
        try {
            const userId = req.identifier;
            const chat = await Chat.findOne({ userId });
            
            if (!chat) {
                return res.status(404).json({ error: 'No chat history found' });
            }

            res.status(200).json(chat.messages);
        } catch (error) {
            console.error('Error fetching chat history:', error);
            res.status(500).json({ error: 'Failed to fetch chat history' });
        }
    }
};

module.exports = chatController; 