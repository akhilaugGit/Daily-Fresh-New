const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        quantity: Number
    }],
    amount: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    completionOtp: {
        code: { type: String },
        expiresAt: { type: Date },
        verified: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model('Payment', paymentSchema); 