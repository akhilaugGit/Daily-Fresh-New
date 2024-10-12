const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controller/authcontroller');

// Define auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:userId/:token', resetPassword);

module.exports = router;  // Correctly export the router object
