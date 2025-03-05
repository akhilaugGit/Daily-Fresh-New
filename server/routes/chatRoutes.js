const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');
const verifyToken = require('../utils/verifytoken');

router.get('/init', verifyToken, chatController.initializeChat);
router.post('/message', verifyToken, chatController.sendMessage);
router.get('/history', verifyToken, chatController.getChatHistory);

module.exports = router;