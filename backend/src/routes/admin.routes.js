const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
} = require(
  "../controllers/admin.controller"
);

const verifyJWT = require(
  "../middleware/auth.middleware"
);
const isAdmin = require(
  "../middleware/admin.middleware"
);

// Dashboard
router.get(
  "/dashboard",
  verifyJWT,
  isAdmin,
  getDashboardStats
);

module.exports = router;