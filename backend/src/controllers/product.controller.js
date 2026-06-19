const Product = require("../models/Product");
const imagekit = require("../config/imagekit");

// ===============================
// Add Product (Admin)
// ===============================
const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      discountPrice,
      stock,
    } = req.body;

  let imageData = {
  url: "",
  fileId: "",
};

    if (req.file) {
      const uploadedImage = await imagekit.upload({
  file: req.file.buffer,
  fileName: `${Date.now()}-${req.file.originalname}`,
  folder: "/badminton-store",
});

imageData = {
  url: uploadedImage.url,
  fileId: uploadedImage.fileId,
};
    }

    const product = await Product.create({
      name,
      brand,
      category,
      description,
      price,
      discountPrice,
      stock,
      image: imageData,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Products
// ===============================
// Get All Products (with Search)
// Get All Products (Search + Brand + Category)
// ===============================
// Get All Products
// ===============================
const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      brand,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};

    // Search by product name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by brand
    if (brand) {
      filter.brand = {
        $regex: `^${brand}$`,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      filter.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filter.discountPrice = {};

      if (minPrice) {
        filter.discountPrice.$gte =
          Number(minPrice);
      }

      if (maxPrice) {
        filter.discountPrice.$lte =
          Number(maxPrice);
      }
    }

    // Sorting
    let sortOption = {
      createdAt: -1,
    };

    if (sort === "priceAsc") {
      sortOption = {
        discountPrice: 1,
      };
    } else if (sort === "priceDesc") {
      sortOption = {
        discountPrice: -1,
      };
    } else if (sort === "latest") {
      sortOption = {
        createdAt: -1,
      };
    }

    // Pagination
    const currentPage = Number(page);
    const pageSize = Number(limit);

    const skip =
      (currentPage - 1) * pageSize;

    // Count total matching products
    const totalProducts =
      await Product.countDocuments(filter);

    // Fetch products
    const products = await Product.find(
      filter
    )
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

  res.status(200).json({
  success: true,

  // Pagination Info
  currentPage,
  totalPages: Math.ceil(
    totalProducts / pageSize
  ),
  totalProducts,
  count: products.length,

  // Frontend helpers
  hasNextPage:
    currentPage <
    Math.ceil(totalProducts / pageSize),

  hasPrevPage: currentPage > 1,

  // Data
  products,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Single Product
// ===============================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Product (Admin)
// ===============================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      name,
      brand,
      category,
      description,
      price,
      discountPrice,
      stock,
    } = req.body;

    // Upload new image if provided
    if (req.file) {
  // Delete old image from ImageKit
  if (
    product.image &&
    product.image.fileId
  ) {
    try {
      await imagekit.deleteFile(
        product.image.fileId
      );
    } catch (err) {
      console.log(
        "Old image deletion failed:",
        err.message
      );
    }
  }

  // Upload new image
  const uploadedImage = await imagekit.upload({
    file: req.file.buffer,
    fileName: `${Date.now()}-${req.file.originalname}`,
    folder: "/badminton-store",
  });

  product.image = {
    url: uploadedImage.url,
    fileId: uploadedImage.fileId,
  };
}

    // Update other fields
    if (name) product.name = name;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (description)
      product.description = description;
    if (price) product.price = price;
    if (discountPrice)
      product.discountPrice = discountPrice;
    if (stock) product.stock = stock;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Product (Admin)
// ===============================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

   // Delete image from ImageKit
if (
  product.image &&
  product.image.fileId
) {
  try {
    await imagekit.deleteFile(
      product.image.fileId
    );
  } catch (err) {
    console.log(
      "Image deletion failed:",
      err.message
    );
  }
}

// Delete product from MongoDB
await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};