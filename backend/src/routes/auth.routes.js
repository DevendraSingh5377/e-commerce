const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/auth.controller");

const verifyJWT = require("../middleware/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/me", verifyJWT, getCurrentUser);

module.exports = router;