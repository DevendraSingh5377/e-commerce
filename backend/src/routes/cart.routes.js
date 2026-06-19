const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cart.controller");

const verifyJWT = require("../middleware/auth.middleware");

router.post("/add", verifyJWT, addToCart);
router.get("/", verifyJWT, getCart);
router.put("/update/:productId", verifyJWT, updateCartItem);
router.delete("/remove/:productId", verifyJWT, removeCartItem);

module.exports = router;