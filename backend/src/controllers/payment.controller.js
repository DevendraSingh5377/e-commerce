const razorpay = require(
  "../config/razorpay"
);

const Order = require(
  "../models/Order"
);
const crypto = require("crypto");
// POST /api/payment/create-order
const createRazorpayOrder =
  async (req, res) => {
    try {
      const { orderId } = req.body;

      // Check if orderId is provided
      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: "Order ID is required",
        });
      }

      // Find the order
      const dbOrder =
        await Order.findById(orderId);

      if (!dbOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Prevent duplicate Razorpay order creation
      if (dbOrder.razorpayOrderId) {
        return res.status(400).json({
          success: false,
          message:
            "Razorpay order already created",
        });
      }

      // Create Razorpay order
      const options = {
        amount:
          dbOrder.finalAmount * 100, // amount in paise
        currency: "INR",
        receipt:
          "receipt_" + dbOrder._id,
      };

      const razorpayOrder =
        await razorpay.orders.create(
          options
        );

      // Save Razorpay Order ID in MongoDB
      dbOrder.razorpayOrderId =
        razorpayOrder.id;

      await dbOrder.save();

      res.status(200).json({
        success: true,
        message:
          "Razorpay order created successfully",
        razorpayOrder,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  // POST /api/payment/verify
const verifyPayment =
  async (req, res) => {
    try {
      const {
        orderId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body;

      // Find MongoDB order
      const order =
        await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Generate expected signature
      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(
            razorpay_order_id +
              "|" +
              razorpay_payment_id
          )
          .digest("hex");

      // Verify signature
      if (
        generatedSignature !==
        razorpay_signature
      ) {
        order.paymentStatus =
          "Failed";
        await order.save();

        return res.status(400).json({
          success: false,
          message:
            "Payment verification failed",
        });
      }

      // Save payment details
      order.paymentStatus = "Paid";
      order.razorpayOrderId =
        razorpay_order_id;
      order.razorpayPaymentId =
        razorpay_payment_id;
      order.razorpaySignature =
        razorpay_signature;

      await order.save();

      res.status(200).json({
        success: true,
        message:
          "Payment verified successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // POST /api/payment/retry
const retryPayment =
  async (req, res) => {
    try {
      const { orderId } = req.body;

      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: "Order ID is required",
        });
      }

      const order =
        await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Payment already completed
      if (
        order.paymentStatus ===
        "Paid"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Payment already completed",
        });
      }

      // Create a fresh Razorpay order
      const options = {
        amount:
          order.finalAmount * 100,
        currency: "INR",
        receipt:
          "retry_" + order._id,
      };

      const razorpayOrder =
        await razorpay.orders.create(
          options
        );

      // Replace old Razorpay order ID
      order.razorpayOrderId =
        razorpayOrder.id;

      // Reset status if previously failed
      order.paymentStatus =
        "Pending";

      await order.save();

      res.status(200).json({
        success: true,
        message:
          "Payment retry order created successfully",
        razorpayOrder,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createRazorpayOrder,
  verifyPayment,
  retryPayment,
};