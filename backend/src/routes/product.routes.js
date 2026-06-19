const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const verifyJWT = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

// Public Routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin Routes
router.post(
  "/",
  verifyJWT,
  isAdmin,
  upload.single("image"),
  createProduct
);
router.put(
  "/:id",
  verifyJWT,
  isAdmin,
  upload.single("image"),
  updateProduct
);
router.delete("/:id", verifyJWT, isAdmin, deleteProduct);

module.exports = router;