// PRACTICAL 8 & 10: Express Router + Authentication routes

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { validateRegister } = require("../middleware/validate");

router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);

module.exports = router;
