const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    // Count documents
    const totalUsers = await User.countDocuments();
    const totalProducts =
      await Product.countDocuments();
    const totalOrders =
      await Order.countDocuments();

    // Revenue calculation
    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) =>
        sum + (order.finalAmount || 0),
      0
    );

    // Latest 5 orders
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

  // Low stock products (stock <= 5)
const lowStockProducts =
  await Product.find({
    stock: { $lte: 5 },
  })
    .select(
      "name brand stock discountPrice"
    )
    .sort({ stock: 1 })
    .limit(5);

    // Order status summary
const orderStatusSummary = {
  Pending:
    await Order.countDocuments({
      orderStatus: "Pending",
    }),

  Packed:
    await Order.countDocuments({
      orderStatus: "Packed",
    }),

  Shipped:
    await Order.countDocuments({
      orderStatus: "Shipped",
    }),

  Delivered:
    await Order.countDocuments({
      orderStatus: "Delivered",
    }),

  Cancelled:
    await Order.countDocuments({
      orderStatus: "Cancelled",
    }),
};

// Top 5 Selling Products
const topSellingProducts =
  await Order.aggregate([
    // Break items array into separate documents
    {
      $unwind: "$items",
    },

    // Group by product and sum quantities
    {
      $group: {
        _id: "$items.product",
        totalSold: {
          $sum: "$items.quantity",
        },
      },
    },

    // Highest selling first
    {
      $sort: {
        totalSold: -1,
      },
    },

    // Only top 5
    {
      $limit: 5,
    },

    // Join with Product collection
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },

    // Convert product array to object
    {
      $unwind: "$product",
    },

    // Select only required fields
    {
      $project: {
        _id: "$product._id",
        name: "$product.name",
        brand: "$product.brand",
        image: "$product.image",
        totalSold: 1,
      },
    },
  ]);

// Monthly Revenue Analytics
const monthlyRevenue =
  await Order.aggregate([
    {
      $match: {
        orderStatus: {
          $ne: "Cancelled",
        },
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        revenue: {
          $sum: "$finalAmount",
        },
        orders: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);


res.status(200).json({
  success: true,
  stats: {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue,
  },
  orderStatusSummary,
  lowStockProducts,
  topSellingProducts,
  monthlyRevenue,
  recentOrders,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};