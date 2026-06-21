const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Address = require("../models/Address");

// POST /api/orders/place
const placeOrder = async (req, res) => {
  try {
    const { paymentMethod = "COD" } = req.body;

    // Get cart
  const cart = await Cart.findOne({
  user: req.user._id,
})
  .populate("items.product")
  .populate("coupon");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // Get default address
    const address = await Address.findOne({
      user: req.user._id,
      isDefault: true,
    });

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "No default address found",
      });
    }

    // Prepare order items
 const orderItems = cart.items.map((item) => ({
  product: item.product._id,
  name: item.product.name,
  image: item.product.image?.url || "",
  price: item.product.price,
  discountPrice: item.product.discountPrice,
  quantity: item.quantity,
}));

    // Create order
  const order = await Order.create({
  user: req.user._id,
  items: orderItems,
  address: address._id,

  totalPrice: cart.totalPrice,
  totalDiscount: cart.totalDiscount,
  couponCode: cart.coupon ? cart.coupon.code : "",
  couponDiscount: cart.couponDiscount,
  finalAmount: cart.finalAmount,

  paymentMethod,
  paymentStatus: "Pending",
});

    // Clear cart after successful order
//  cart.items = [];
// cart.totalPrice = 0;
// cart.totalDiscount = 0;
// cart.coupon = null;
// cart.couponDiscount = 0;
// cart.finalAmount = 0;

// await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/orders/my
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("address");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/orders/all
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PATCH /api/orders/status/:id
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const allowedStatus = [
      "Pending",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteOrder =
async (req, res) => {

  try {

    const order =
      await Order.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found",
      });
    }

    await Order.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Order deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};



module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
   deleteOrder,
};