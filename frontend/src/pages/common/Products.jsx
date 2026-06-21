import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { getAllProducts } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { addToWishlist } from "../../services/wishlistService";
import { useAuth } from "../../context/AuthContext";
import "./Products.css";

const brands = ["Yonex", "Li-Ning", "Victor", "Apacs", "Carlton", "Hundred"];
const categories = [
  "Racket",
  "Shuttlecock",
  "Shoes",
  "Grip",
  "Bag",
  "String",
  "Accessory",
];

const currency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const Products = () => {
  const { isLoggedIn } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [addedProductId, setAddedProductId] = useState(null);
const [wishlistedProductId, setWishlistedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProducts({
          search: searchQuery,
          brand,
          category,
          sort,
          page: currentPage,
          limit: 12,
        });

        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setHasNextPage(Boolean(data.hasNextPage));
        setHasPrevPage(Boolean(data.hasPrevPage));
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, brand, category, sort, currentPage]);

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setSearchQuery(search);
  };

const guardedAction = async (
  action,
  type,
  productId
) => {
  if (!isLoggedIn) {
   toast.error("Please login to use cart and wishlist.");
return;
  }

  try {
    const data = await action();

  toast.success(data.message || "Done");

    if (type === "cart") {
      setAddedProductId(productId);

      setTimeout(() => {
        setAddedProductId(null);
      }, 2000);
    }

    if (type === "wishlist") {
      setWishlistedProductId(productId);

      setTimeout(() => {
        setWishlistedProductId(null);
      }, 2000);
    }

    setTimeout(() => {
      setNotice("");
    }, 2500);
  } catch (err) {
   toast.error(
  err?.response?.data?.message ||
  "Something went wrong."
);
  }
};

  return (
    <section className="products-page">
      <div className="products-hero">
        <span>Shop Gear</span>
        <h1>Find Your Match-Day Equipment</h1>
        <p>
          Browse rackets, shoes, shuttles, bags, strings, and accessories from
          trusted badminton brands.
        </p>
      </div>

      <form className="product-filters" onSubmit={handleSearch}>
        <div className="search-field">
          <FaSearch />
          <input
            type="text"
            placeholder="Search badminton products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <button type="submit">Search</button>

        <select
          value={brand}
          onChange={(event) => {
            setCurrentPage(1);
            setBrand(event.target.value);
          }}
        >
          <option value="">All Brands</option>
          {brands.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(event) => {
            setCurrentPage(1);
            setCategory(event.target.value);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => {
            setCurrentPage(1);
            setSort(event.target.value);
          }}
        >
          <option value="latest">Latest</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </form>

  

      {loading && <div className="products-status">Loading products...</div>}
      {error && <div className="products-error">{error}</div>}

      {!loading && !error && products.length === 0 && (
        <div className="products-status">No products found.</div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <article className="product-card" key={product._id}>
              <div className="product-image">
                <img
                  src={
                    product.image?.url ||
                    "https://via.placeholder.com/300x240?text=No+Image"
                  }
                  alt={product.name}
                />
                <button
                  type="button"
                  aria-label="Add to wishlist"
                onClick={() =>
  guardedAction(
    () => addToWishlist(product._id),
    "wishlist",
    product._id
  )
}
                >
                  <FaHeart />
                </button>
              </div>

              <div className="product-body">
                <div className="product-meta">
                  <span>{product.brand}</span>
                  <span>
                    <FaStar />
                    {Number(product.averageRating || 0).toFixed(1)}
                  </span>
                </div>

                <h2>{product.name}</h2>
                <p>{product.category}</p>

                <div className="price-row">
                  <strong>{currency(product.discountPrice || product.price)}</strong>
                  {product.discountPrice > 0 && (
                    <span>{currency(product.price)}</span>
                  )}
                </div>

                <div className="stock-row">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </div>

                <button
                  type="button"
                  className="add-cart"
                  disabled={product.stock <= 0}
                 onClick={() =>
  guardedAction(
    () => addToCart(product._id, 1),
    "cart",
    product._id
  )
}
                >
                  <FaShoppingCart />
  {addedProductId === product._id
    ? " Added +1"
    : " Add to Cart"}
</button>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          disabled={!hasPrevPage}
          type="button"
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={!hasNextPage}
          type="button"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Products;
