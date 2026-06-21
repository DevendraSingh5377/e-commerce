const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const addressRoutes = require("./routes/address.routes");
const orderRoutes = require("./routes/order.routes");
const couponRoutes = require("./routes/coupon.routes");
const wishlistRoutes = require(
  "./routes/wishlist.routes"
);
const reviewRoutes = require(
  "./routes/review.routes"
);
const adminRoutes = require(
  "./routes/admin.routes"
);
const paymentRoutes = require(
  "./routes/payment.routes"
);

const userRoutes =
  require("./routes/user.routes");

const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, // Ensure this matches your backend .env key
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🏸 Badminton Store API is Running!",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/users",
  userRoutes
);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

module.exports = app;

//user sonu singh
// 6a292d34ef7df67f901eb14c
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMjkyZGI2ZWY3ZGY2N2Y5MDFlYjE0ZCIsImlhdCI6MTc4MTA4NTQ2NywiZXhwIjoxNzgxNjkwMjY3fQ.WHgDN_mDqDro7WLyIzzgNrbqEAa4hWWe-uUAC0PbWHs

//Admin
// admin jwt
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMjkyNDY2ZDU3MjhmZmY1NDMwM2EzOCIsImlhdCI6MTc4MTA5Nzg1NiwiZXhwIjoxNzgxNzAyNjU2fQ.VnLBQAIKzocgS_zTm4MBO2f7ny1Bb51VY5Km_vuIxLo

//product
// 6a2ad58119cebd13cb0c944b