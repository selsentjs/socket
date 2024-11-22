const mongoose = require('mongoose')
const express = require("express");
const router = express.Router();
const {getAllUsersSidebar} = require('../controllers/userController')
const protectRoute = require('../middleware/protectRoute')

router.get('/',protectRoute, getAllUsersSidebar)
module.exports = router;
