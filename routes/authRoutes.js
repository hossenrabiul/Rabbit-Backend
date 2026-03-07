const express = require("express");

const { register, login, logout } = require("../controllers/authController.js");
const { protect } = require("../middleware/auth.js");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
