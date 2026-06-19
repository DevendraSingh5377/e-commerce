import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";
import {
  getWishlist,
  moveWishlistItemToCart,
  removeFromWishlist,
} from "../../services/wishlistService";
import { useAuth } from "../../context/AuthContext";
import "./StorePages.css";
import toast from "react-hot-toast";


const currency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const Wishlist = () => {
  const { isLoggedIn } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadWishlist = async () => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getWishlist();
      setProducts(data.products || []);
    } catch (error) {
      setMessage(error?.response?.data?.message || "Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [isLoggedIn]);

  const handleRemove = async (productId) => {
    try {
      const data = await removeFromWishlist(productId);
      setProducts(data.wishlist?.products || []);
    toast.success(data.message);
    } catch (error) {
     toast.error(
  error?.response?.data?.message ||
  "Could not remove product."
);
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      const data = await moveWishlistItemToCart(productId);
    toast.success(data.message);
      await loadWishlist();
    } catch (error) {
     setMessage(
  error?.response?.data?.message ||
  "Could not move product."
);
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="store-empty">
        <FaHeart />
        <h1>Your Wishlist</h1>
        <p>Please login to save and manage your favorite products.</p>
        <Link to="/login">Login</Link>
      </section>
    );
  }

  if (loading) {
    return <div className="store-status">Loading wishlist...</div>;
  }

  return (
    <section className="store-page">
      <div className="store-heading">
        <div>
          <span>Saved Gear</span>
          <h1>Your Wishlist</h1>
        </div>
        <Link to="/products">Browse Products</Link>
      </div>


      {products.length === 0 ? (
        <div className="store-empty">
          <FaHeart />
          <h2>No saved products yet</h2>
          <p>Save products you like and move them to cart when you are ready.</p>
          <Link to="/products">Explore Products</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {products.map((product) => (
            <article className="wishlist-card" key={product._id}>
              <img
                src={
                  product.image?.url ||
                  "https://via.placeholder.com/240x200?text=Product"
                }
                alt={product.name}
              />
              <div>
                <span>{product.brand}</span>
                <h3>{product.name}</h3>
                <strong>{currency(product.discountPrice || product.price)}</strong>
              </div>
              <div className="wishlist-actions">
                <button type="button" onClick={() => handleMoveToCart(product._id)}>
                  <FaShoppingCart />
                  Move to Cart
                </button>
                <button
                  className="icon-danger"
                  type="button"
                  onClick={() => handleRemove(product._id)}
                  aria-label="Remove from wishlist"
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
