const express = require('express');
const router = express.Router();

// Import route handlers
const authRoutes = require('./authroutes');  // Ensure this file exports router properly
const productRoutes = require('./productroutes');  // Ensure this file exports router properly

// Use routes
router.use('/auth', authRoutes);  // Ensure authRoutes exports a valid router
router.use('/product', productRoutes);  // Ensure productRoutes exports a valid router

module.exports = router;
