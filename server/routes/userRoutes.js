const express = require('express');
const router = express.Router();
const verifyToken = require("../utils/verifytoken");
const { getAllUsers,toggleUserStatus,getUserProfile } = require('../controller/userController');

// Define auth routes

router.get('/fetch', getAllUsers);
router.patch('/:id/status', toggleUserStatus);
router.get('/profile',verifyToken, getUserProfile); // Ensure `authenticate` middleware checks user authentication


module.exports = router;  // Correctly export the router object
getUserProfile