const express = require("express");
const router = express.Router();

const {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require(
  "../controllers/review.controller"
);

const verifyJWT = require(
  "../middleware/auth.middleware"
);

// User
router.post(
  "/",
  verifyJWT,
  addReview
);

// Public
router.get(
  "/:productId",
  getProductReviews
);

// Update own review
router.put(
  "/:id",
  verifyJWT,
  updateReview
);

// Delete own review
router.delete(
  "/:id",
  verifyJWT,
  deleteReview
);

module.exports = router;