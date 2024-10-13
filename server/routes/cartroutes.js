// cartroutes.js

const express = require('express');
const { addItem, getCartItems, deleteItemFromCart, getCartItemById } = require('../controller/cartcontroller');

const router = express.Router();

// Route to add an item to the cart
router.post('/add', addItem); // No need for '/cart', the route is already prefixed

// Route to get all items from the cart
router.get('/g', getCartItems);

// Route to get a specific cart item by ID
router.get('/:id', getCartItemById);

// Route to delete an item from the cart
router.delete('/:id', deleteItemFromCart);

module.exports = router;
