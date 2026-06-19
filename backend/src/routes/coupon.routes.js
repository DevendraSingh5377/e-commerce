const express = require("express");
const router = express.Router();

const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
  removeCoupon,
} = require("../controllers/coupon.controller");


const verifyJWT = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

// User routes
router.post("/apply", verifyJWT, applyCoupon);
router.delete("/remove", verifyJWT, removeCoupon);

// Admin routes
router.post("/", verifyJWT, adminOnly, createCoupon);
router.get("/", verifyJWT, adminOnly, getAllCoupons);
router.put("/:id", verifyJWT, adminOnly, updateCoupon);
router.delete("/:id", verifyJWT, adminOnly, deleteCoupon);


module.exports = router;