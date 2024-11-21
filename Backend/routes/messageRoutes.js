const mongoose = require('mongoose')
const express = require("express");
const router = express.Router();
const {sendMessage} = require('../controllers/messageController')
const protectRoute = require('../middleware/protectRoute')

// id  - for whom you want to send message their id 
// EX: Deepa logged in, but send message to Kani. so here kani id
router.post('/send/:id',protectRoute,sendMessage)

module.exports = router;
