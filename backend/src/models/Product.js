const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Racket",
        "Shuttlecock",
        "Shoes",
        "Grip",
        "Bag",
        "String",
        "Accessory",
      ],
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
  url: {
    type: String,
    default: "",
  },
  fileId: {
    type: String,
    default: "",
  },
},
averageRating: {
  type: Number,
  default: 0,
},

numReviews: {
  type: Number,
  default: 0,
},

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);