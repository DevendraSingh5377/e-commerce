import { Link } from "react-router-dom";
import "./FeaturedProducts.css";

const featuredProducts = [
  {
    id: 1,
    name: "Yonex Astrox 100ZZ",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600",
    price: "₹18,999",
  },
  {
    id: 2,
    name: "Li-Ning Turbo X90",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600",
    price: "₹9,499",
  },
  {
    id: 3,
    name: "Victor Auraspeed 90K II",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600",
    price: "₹15,499",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="featured-section">
      <div className="featured-header">
        <span>FEATURED COLLECTION</span>
        <h2>Top Picks For Champions</h2>
        <p>
          Carefully selected professional-grade equipment trusted by badminton
          enthusiasts and competitive players.
        </p>
      </div>

      <div className="featured-grid">
        {featuredProducts.map((item) => (
          <div className="featured-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="featured-info">
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="featured-btn">
        <Link to="/products">
          <button>Explore Full Collection</button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;