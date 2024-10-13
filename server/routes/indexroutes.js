const express = require('express');
const router = express.Router();
const authRoutes = require('./authroutes');  // Ensure this file exports router properly
const cartroutes = require('./cartroutes');  // Ensure this file exports router properly



const productRoutes = require('./productroutes');  // Ensure this file exports router properly





// Use viewproductroutes here
router.use('/auth', authRoutes);  // Ensure authRoutes exports a valid router
router.use('/product', productRoutes);  // Ensure productRoutes exports a valid router
router.use('/cart', cartroutes);  // Ensure authRoutes exports a valid router

  // Use product routes




module.exports = router;
