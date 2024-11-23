const express = require("express");
const router = express.Router();
const { Register, Login, Logout } = require("../controllers/authController");

router.post("/Register", Register);
router.post("/Login", Login);
router.post("/Logout", Logout);

module.exports = router;
