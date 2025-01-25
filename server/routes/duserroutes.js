const express = require('express');
const router = express.Router();
const { registerDuser } = require('../controller/dusercontroller');
const upload = require('../config/multerStorage');

router.post('/registerduser', upload.single('drivingLicense'), registerDuser);

module.exports = router;
