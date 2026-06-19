const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

const verifyJWT = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

// User routes
router.post("/place", verifyJWT, placeOrder);
router.get("/my-orders", verifyJWT, getMyOrders);
//router.get("/:id", verifyJWT, getOrderById);

// Admin routes
router.get("/all", verifyJWT, adminOnly, getAllOrders);
router.patch(
  "/status/:id",
  verifyJWT,
  adminOnly,
  updateOrderStatus
);
router.get("/:id", verifyJWT, getOrderById);


module.exports = router;