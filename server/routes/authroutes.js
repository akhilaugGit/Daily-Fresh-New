const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword } = require('../controller/authcontroller');

// Define auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);

module.exports = router;  // Correctly export the router object
