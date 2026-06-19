const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");
// ====================================
// Add Review
// ====================================
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } =
      req.body;

    // Check product exists
    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check whether user has purchased this product
const hasPurchased =
  await Order.findOne({
    user: req.user._id,
    orderStatus: "Delivered",
    "items.product": productId,
  });

if (!hasPurchased) {
  return res.status(403).json({
    success: false,
    message:
      "You can review only products you have purchased",
  });
}

    // One review per user per product
    const existingReview =
      await Review.findOne({
        user: req.user._id,
        product: productId,
      });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message:
          "You have already reviewed this product",
      });
    }

    // Create review
    await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    // Recalculate average rating
    const reviews =
      await Review.find({
        product: productId,
      });

    const totalRating =
      reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      );

    product.averageRating =
      totalRating / reviews.length;

    product.numReviews =
      reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message:
        "Review added successfully",
      averageRating:
        product.averageRating,
      totalReviews:
        product.numReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================
// Get Reviews for Product
// ====================================
const getProductReviews = async (
  req,
  res
) => {
  try {
    const reviews =
      await Review.find({
        product: req.params.productId,
      })
        .populate(
          "user",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================
// Update Review
// ====================================
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Only owner can update
    if (
      review.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only update your own review",
      });
    }

    // Update fields
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();

    // Recalculate product rating
    const reviews = await Review.find({
      product: review.product,
    });

    const totalRating = reviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const product =
      await Product.findById(
        review.product
      );

    product.averageRating =
      totalRating / reviews.length;

    product.numReviews =
      reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message:
        "Review updated successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================
// Delete Review
// ====================================
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Only owner can delete
    if (
      review.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own review",
      });
    }

    const productId =
      review.product;

    await review.deleteOne();

    // Recalculate product rating
    const reviews = await Review.find({
      product: productId,
    });

    const product =
      await Product.findById(
        productId
      );

    if (reviews.length === 0) {
      product.averageRating = 0;
      product.numReviews = 0;
    } else {
      const totalRating =
        reviews.reduce(
          (sum, item) =>
            sum + item.rating,
          0
        );

      product.averageRating =
        totalRating / reviews.length;

      product.numReviews =
        reviews.length;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message:
        "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
};