const express = require('express');
const router = express.Router();
const authRoutes = require('./authroutes');  // Ensure this file exports router properly
const productRoutes = require('./productroutes');  // Ensure this file exports router properly
const cartRoutes = require('./cartroutes');
const userRoutes = require('./userRoutes');
const duserRoutes = require('./duserroutes');




// Use viewproductroutes here
router.use('/auth', authRoutes);  // Ensure authRoutes exports a valid router
router.use('/product', productRoutes);  // Ensure productRoutes exports a valid router
router.use('/cart', cartRoutes);
router.use('/user', userRoutes);
router.use('/duser', duserRoutes);

  // Use product routes




module.exports = router;
