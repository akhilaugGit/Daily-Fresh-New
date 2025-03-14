const express = require('express');
const router = express.Router();
const verifyToken = require("../utils/verifytoken");
const { 
  getAllUsers, 
  toggleUserStatus, 
  getUserProfile,
  toggleUserVisibility,
  fetchDUsers // Added fetchDUsers controller
} = require('../controller/userController');

// User routes
router.get('/fetch', getAllUsers);
router.patch('/:id/status', toggleUserStatus);
router.patch('/:id/visibility', toggleUserVisibility);


router.get('/profile', verifyToken, getUserProfile); 
router.get('/dusers', verifyToken, fetchDUsers); // New route for fetching delivery users


module.exports = router;
