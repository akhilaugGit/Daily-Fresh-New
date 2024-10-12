const express = require('express');
const router = express.Router();
const productController = require('../controller/Productcontroller');  // Make sure this path is correct

// Example Route to get all products
router.get('/products', productController.getAllProducts);  // Ensure this function is defined in the controller

// Example Route to get product by ID
router.get('/products/:id', productController.getProductById);  // Ensure this function is also defined

module.exports = router;
