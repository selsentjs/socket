const express = require("express");
const router = express.Router();
const { Register, Login, Logout } = require("../controllers/authController");

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/Logout", Logout);

module.exports = router;
