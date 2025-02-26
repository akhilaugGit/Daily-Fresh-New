const Payment = require('../models/Paymentmodel');
const mongoose = require('mongoose');

// Get all orders (for admin use)
const getAllOrders = async (req, res) => {
    try {
        // Check if user is admin (you should implement actual admin verification)
        // This is a placeholder - implement proper admin check based on your auth system
        
        // Fetch all orders with populated product info
        const orders = await Payment.find()
            .populate('userId', 'name email')
            .populate('products.productId', 'name price imageUrl')
            .sort({ orderDate: -1 }); // Most recent first
        
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// Get orders for a specific user
const getUserOrders = async (req, res) => {
    try {
        const userId = req.identifier; // Get user ID from token
        
        // Fetch orders for this specific user
        const orders = await Payment.find({ userId })
            .populate('products.productId', 'name price imageUrl')
            .sort({ orderDate: -1 }); // Most recent first
        
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        // Validate status value
        if (!['pending', 'completed', 'failed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Update the order status
        const updatedOrder = await Payment.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } // Return the updated document
        );
        
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
};

// Get order details by ID
const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        
        // Fetch order with populated fields
        const order = await Payment.findById(orderId)
            .populate('userId', 'name email')
            .populate('products.productId', 'name price imageUrl');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Failed to fetch order details' });
    }
};

module.exports = { getAllOrders, getUserOrders, updateOrderStatus, getOrderById };