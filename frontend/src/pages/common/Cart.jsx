import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaTrash,
} from "react-icons/fa";
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from "../../services/cartService";
import {
  applyCoupon,
  removeCoupon,
} from "../../services/couponService";
import { useAuth } from "../../context/AuthContext";
import "./StorePages.css";

const currency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const Cart = () => {
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(true);


  const items = useMemo(() => cart?.items || [], [cart]);

  const loadCart = async () => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getCart();
      setCart(data.cart);
    } catch (error) {
     toast.error(
  error?.response?.data?.message ||
  "Failed to load cart."
);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [isLoggedIn]);

  const handleQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const data = await updateCartItem(productId, quantity);
      setCart(data.cart);
      await loadCart();
    } catch (error) {
     toast.error(
  error?.response?.data?.message ||
    "Could not update item."
);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const data = await removeCartItem(productId);
      setCart(data.cart);
      await loadCart();
    } catch (error) {
     toast.error(
  error?.response?.data?.message ||
    "Could not update item."
);
    }
  };

  const handleApplyCoupon = async (event) => {
    event.preventDefault();
    if (!couponCode.trim()) return;

    try {
      const data = await applyCoupon(couponCode.trim());
      setCart(data.cart);
    toast.success(data.message);
    } catch (error) {
     toast.error(
  error?.response?.data?.message ||
    "Coupon could not be applied."
);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      const data = await removeCoupon();
      setCart(data.cart);
      setCouponCode("");
     toast.success(data.message);
    } catch (error) {
          toast.error(
  error?.response?.data?.message ||
    "Coupon could not be removed."
);
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="store-empty">
        <FaShoppingBag />
        <h1>Your Cart</h1>
        <p>Please login to see your saved cart and checkout.</p>
        <Link to="/login">Login</Link>
      </section>
    );
  }

  if (loading) {
    return <div className="store-status">Loading cart...</div>;
  }

  return (
    <section className="store-page">
      <div className="store-heading">
        <div>
          <span>Shopping Bag</span>
          <h1>Your Cart</h1>
        </div>
        <Link to="/products">Continue Shopping</Link>
      </div>


      {items.length === 0 ? (
        <div className="store-empty">
          <FaShoppingBag />
          <h2>Your cart is empty</h2>
          <p>Add rackets, shoes, shuttles, and accessories to start your order.</p>
          <Link to="/products">Shop Products</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => {
              const product = item.product;
              const productId = product?._id || item.product;

              return (
                <article className="cart-item" key={productId}>
                  <img
                    src={
                      product?.image?.url ||
                      "https://via.placeholder.com/180x150?text=Product"
                    }
                    alt={product?.name || "Cart item"}
                  />

                  <div className="cart-info">
                    <h3>{product?.name || "Product"}</h3>
                    <p>{product?.brand}</p>
                    <strong>{currency(product?.discountPrice || product?.price)}</strong>
                  </div>

                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => handleQuantity(productId, item.quantity - 1)}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantity(productId, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button
                    className="icon-danger"
                    type="button"
                    onClick={() => handleRemove(productId)}
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </article>
              );
            })}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <form onSubmit={handleApplyCoupon} className="coupon-form">
              <input
                type="text"
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value)}
                placeholder="Coupon code"
              />
              <button type="submit">Apply</button>
            </form>

            {cart?.coupon && (
              <button className="text-button" type="button" onClick={handleRemoveCoupon}>
                Remove applied coupon
              </button>
            )}

            <div className="summary-line">
              <span>Total Price</span>
              <strong>{currency(cart?.totalPrice)}</strong>
            </div>
            <div className="summary-line">
              <span>Product Discount</span>
              <strong>- {currency(cart?.totalDiscount)}</strong>
            </div>
            <div className="summary-line">
              <span>Coupon Discount</span>
              <strong>- {currency(cart?.couponDiscount)}</strong>
            </div>
            <div className="summary-total">
              <span>Final Amount</span>
              <strong>{currency(cart?.finalAmount)}</strong>
            </div>

    <Link to="/checkout">
  <button
    className="checkout-button"
    type="button"
  >
    Proceed to Checkout
  </button>
</Link>
          </aside>
        </div>
      )}
    </section>
  );
};

export default Cart;
