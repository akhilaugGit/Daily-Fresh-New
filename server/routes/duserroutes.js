const express = require('express');
const router = express.Router();
const { registerDuser } = require('../controller/dusercontroller'); // Destructure or adjust based on export
const upload = require('../config/multerStorage');
const verifyToken = require('../utils/verifytoken');

router.post(
    '/registerduser',
    upload.single('drivingLicense'), // Middleware for file upload
    verifyToken,                    // Middleware for token verification
    registerDuser                   // Final callback function
);

module.exports = router;
