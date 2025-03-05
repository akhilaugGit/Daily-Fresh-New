const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    messages: [{
        role: {
            type: String,
            enum: ['user', 'assistant'],
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    context: {
        type: String,
        default: 'General inquiry about seafood and poultry products'
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema); 