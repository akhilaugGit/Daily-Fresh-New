const express = require('express');
const router = express.Router();
const { getAllUsers,toggleUserStatus } = require('../controller/userController');

// Define auth routes

router.get('/fetch', getAllUsers);
router.patch('/:id/status', toggleUserStatus);


module.exports = router;  // Correctly export the router object
