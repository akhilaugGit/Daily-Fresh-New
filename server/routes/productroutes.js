const express = require('express');
const router = express.Router();
const { addProduct, editProduct, deleteProduct } = require('../controller/productcontroller');

// Route to add a new product
router.post('/add', addProduct);

// Route to edit an existing product
router.put('/edit/:id', editProduct);  // The product ID will be passed as a URL parameter

// Route to delete a product
router.delete('/delete/:id', deleteProduct);  // The product ID will be passed as a URL parameter

module.exports = router;
