const express = require('express');
const router = express.Router();
const orderController = require('../controller/ordercontroller');
const verifyToken = require("../utils/verifytoken");

// Get all orders (for admin use)
router.get('/all', verifyToken, orderController.getAllOrders);

// Get orders for a specific user
router.get('/user', verifyToken, orderController.getUserOrders);

// Update order status
router.put('/update-status', verifyToken, orderController.updateOrderStatus);

// Get order details by ID
router.get('/:id', verifyToken, orderController.getOrderById);

module.exports = router;