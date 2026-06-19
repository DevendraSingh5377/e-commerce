const Coupon = require("../models/Coupon");

const calculateCart = async (cart) => {
  let totalPrice = 0;
  let totalDiscount = 0;
  let couponDiscount = 0;

  for (const item of cart.items) {
    const product = item.product;

    totalPrice += product.price * item.quantity;

    totalDiscount +=
      (product.price - product.discountPrice) * item.quantity;
  }

  // Apply coupon if available
  if (cart.coupon) {
    const coupon = await Coupon.findById(cart.coupon);

    if (
      coupon &&
      coupon.isActive &&
      new Date(coupon.expiryDate) > new Date() &&
      totalPrice - totalDiscount >= coupon.minOrderAmount
    ) {
      if (coupon.discountType === "flat") {
        couponDiscount = coupon.discountValue;
      } else {
        couponDiscount =
          ((totalPrice - totalDiscount) *
            coupon.discountValue) /
          100;

        if (
          coupon.maxDiscount > 0 &&
          couponDiscount > coupon.maxDiscount
        ) {
          couponDiscount = coupon.maxDiscount;
        }
      }
    } else {
      // Coupon invalid or expired
      cart.coupon = null;
    }
  }

  cart.totalPrice = totalPrice;
  cart.totalDiscount = totalDiscount;
  cart.couponDiscount = couponDiscount;
  cart.finalAmount =
    totalPrice - totalDiscount - couponDiscount;

  return cart;
};

module.exports = calculateCart;