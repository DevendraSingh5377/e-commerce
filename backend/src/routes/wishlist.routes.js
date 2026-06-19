const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  moveToCart,
} = require(
  "../controllers/wishlist.controller"
);

const verifyJWT = require(
  "../middleware/auth.middleware"
);

// User Routes
router.post(
  "/add",
  verifyJWT,
  addToWishlist
);

router.get(
  "/",
  verifyJWT,
  getWishlist
);

router.delete(
  "/remove/:productId",
  verifyJWT,
  removeFromWishlist
);

router.post(
  "/move-to-cart/:productId",
  verifyJWT,
  moveToCart
);

module.exports = router;