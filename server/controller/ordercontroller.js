const Payment = require('../models/Paymentmodel');
const User = require('../models/user');
const mongoose = require('mongoose');
const { sendOrderCompletionOTP } = require('../utils/emailService');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Get all orders (for admin use)
const getAllOrders = async (req, res) => {
    try {
        const userId = req.identifier;
        
        // Get the user details to check if they are a delivery user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add console.log to debug
        console.log('User details:', {
            isDuser: user.isDuser,
            location: user.location
        });

        let orders;
        
        if (user.isDuser) {
            // If delivery user, only fetch orders from their location
            // Add console.log to see the query
            console.log('Searching for orders with location:', user.location);
            
            orders = await Payment.find({ 
                location: { $regex: new RegExp(user.location, 'i') } // Case-insensitive match
            })
            .populate('userId', 'name email')
            .populate('products.productId', 'name price imageUrl')
            .sort({ orderDate: -1 });

            // Log found orders
            console.log('Found orders:', orders.length);
        } else {
            // For admin users, fetch all orders
            orders = await Payment.find()
                .populate('userId', 'name email')
                .populate('products.productId', 'name price imageUrl')
                .sort({ orderDate: -1 });
        }
        
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
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

// Generate OTP for order completion
const generateCompletionOTP = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Payment.findById(orderId)
            .populate('userId', 'email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save OTP to order
        order.completionOtp = {
            code: otp,
            expiresAt: otpExpiry,
            verified: false
        };
        await order.save();

        // Set up nodemailer (using same config as forgot password)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akhilaugustine2025@mca.ajce.in',
                pass: process.env.EMAIL_PASS
            }
        });

        // Send OTP email
        const mailOptions = {
            from: 'akhilaugustine2025@mca.ajce.in',
            to: order.userId.email,
            subject: 'Order Completion OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0b3d5a;">Order Completion Verification</h2>
                    <p>Your order completion verification code is: <strong style="font-size: 24px; color: #107dac;">${otp}</strong></p>
                    <p>This code will expire in 10 minutes.</p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                        <h3 style="color: #0b3d5a;">Order Details:</h3>
                        <p><strong>Order ID:</strong> ${order._id}</p>
                        <p><strong>Amount:</strong> ₹${order.amount}</p>
                    </div>
                    <p>Please provide this code to the delivery person to confirm delivery.</p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            message: 'OTP sent successfully',
            email: order.userId.email.replace(/(.{2})(.*)(@.*)/, '$1****$3') // Mask email
        });

    } catch (error) {
        console.error('Error generating/sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};

// Verify OTP and complete order
const verifyCompletionOTP = async (req, res) => {
    try {
        const { orderId, otp } = req.body;
        const order = await Payment.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (!order.completionOtp?.code) {
            return res.status(400).json({ message: 'No OTP was generated for this order' });
        }

        if (order.completionOtp.verified) {
            return res.status(400).json({ message: 'Order already verified' });
        }

        if (new Date() > order.completionOtp.expiresAt) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        if (order.completionOtp.code !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Mark OTP as verified and order as completed
        order.completionOtp.verified = true;
        order.status = 'completed';
        await order.save();

        res.status(200).json({ 
            message: 'Order completed successfully',
            order: {
                id: order._id,
                status: order.status,
                completedAt: new Date()
            }
        });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Failed to verify OTP' });
    }
};

module.exports = { getAllOrders, getUserOrders, updateOrderStatus, getOrderById, generateCompletionOTP, verifyCompletionOTP };