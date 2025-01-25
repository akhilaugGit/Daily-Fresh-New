const express = require('express');
const router = express.Router();
const { registerDuser } = require('../controller/dusercontroller');
const upload = require('../config/multerStorage');
const verifyToken  = require('../utils/verifytoken');
router.post('/registerduser', 
    upload.single('drivingLicense'),
    verifyToken,
     registerDuser);

module.exports = router;
