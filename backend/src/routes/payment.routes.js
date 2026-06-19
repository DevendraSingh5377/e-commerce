const express = require("express");
const router = express.Router();

const {
  createRazorpayOrder,
  verifyPayment,
  retryPayment,
} = require(
  "../controllers/payment.controller"
);

const verifyJWT = require(
  "../middleware/auth.middleware"
);

router.post(
  "/create-order",
  verifyJWT,
  createRazorpayOrder
);

router.post(
  "/verify",
  verifyJWT,
  verifyPayment
);
router.post(
  "/retry",
  verifyJWT,
  retryPayment
);


module.exports = router;