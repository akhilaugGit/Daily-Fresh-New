const express = require('express');
const router = express.Router();
const authRoutes = require('./authroutes');  // Ensure this file exports router properly
const productRoutes = require('./productroutes');  // Ensure this file exports router properly
const cartRoutes = require('./cartRoutes');



// Use viewproductroutes here
router.use('/auth', authRoutes);  // Ensure authRoutes exports a valid router
router.use('/product', productRoutes);  // Ensure productRoutes exports a valid router
router.use('/cart', cartRoutes);

  // Use product routes




module.exports = router;
