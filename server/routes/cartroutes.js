const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartcontroller');
const verifyToken = require("../utils/verifytoken");
// Routes for cart operations


// Routes for cart operations
router.post('/add', cartController.addItemToCart);
router.get('/view', verifyToken, cartController.viewCart);
router.delete('/remove', verifyToken, cartController.removeItemFromCart);
router.put('/update', verifyToken, cartController.updateCartItemQuantity);
router.post('/save-payment', verifyToken, cartController.savePaymentDetails);



module.exports = router;
