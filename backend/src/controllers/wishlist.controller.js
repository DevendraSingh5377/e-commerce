const Wishlist = require("../models/Wishlist");
const Cart = require("../models/Cart");
// ==========================
// Add Product to Wishlist
// ==========================
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    const alreadyExists =
      wishlist.products.some(
        (id) => id.toString() === productId
      );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message:
          "Product already exists in wishlist",
      });
    }

    wishlist.products.push(productId);

    await wishlist.save();

    await wishlist.populate("products");

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get My Wishlist
// ==========================
const getWishlist = async (req, res) => {
  try {
    const wishlist =
      await Wishlist.findOne({
        user: req.user._id,
      }).populate("products");

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        count: 0,
        products: [],
      });
    }

    res.status(200).json({
      success: true,
      count: wishlist.products.length,
      products: wishlist.products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Remove Product
// ==========================
const removeFromWishlist = async (
  req,
  res
) => {
  try {
    const { productId } = req.params;

    const wishlist =
      await Wishlist.findOne({
        user: req.user._id,
      });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products =
      wishlist.products.filter(
        (id) =>
          id.toString() !== productId
      );

    await wishlist.save();

    await wishlist.populate("products");

    res.status(200).json({
      success: true,
      message:
        "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Move Wishlist Item to Cart
// ==========================
const moveToCart = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find wishlist
    const wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    // Check if product exists in wishlist
    const existsInWishlist =
      wishlist.products.some(
        (id) => id.toString() === productId
      );

    if (!existsInWishlist) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found in wishlist",
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    // Remove from wishlist
    wishlist.products =
      wishlist.products.filter(
        (id) =>
          id.toString() !== productId
      );

    await wishlist.save();

    await cart.populate(
      "items.product"
    );

    res.status(200).json({
      success: true,
      message:
        "Product moved from wishlist to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  moveToCart,
};