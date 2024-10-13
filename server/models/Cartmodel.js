// Create a Cart Item Schema
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    quantity: {
        type: Number,
        default: 1,
    },
});
const CartItem = mongoose.model('CartItem', cartItemSchema);