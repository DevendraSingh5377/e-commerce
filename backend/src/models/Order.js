const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        image: String,
        price: Number,
        discountPrice: Number,
        quantity: Number,
      },
    ],

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    totalDiscount: {
      type: Number,
      required: true,
    },

couponCode: {
  type: String,
  default: "",
},

couponDiscount: {
  type: Number,
  default: 0,
},

    finalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

 paymentStatus: {
  type: String,
  enum: [
    "Pending",
    "Paid",
    "Failed",
    "Refunded",
  ],
  default: "Pending",
},
razorpayOrderId: {
  type: String,
  default: "",
},

razorpayPaymentId: {
  type: String,
  default: "",
},

razorpaySignature: {
  type: String,
  default: "",
},

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);