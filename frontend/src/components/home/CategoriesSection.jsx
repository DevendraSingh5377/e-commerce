import { Link } from "react-router-dom";
import "./CategoriesSection.css";

const categories = [
  {
    name: "Rackets",
    icon: "🏸",
    query: "Racket",
  },
  {
    name: "Shoes",
    icon: "👟",
    query: "Shoes",
  },
  {
    name: "Shuttles",
    icon: "🥇",
    query: "Shuttlecock",
  },
  {
    name: "Bags",
    icon: "🎒",
    query: "Bag",
  },
];

const CategoriesSection = () => {
  return (
    <section className="categories-section">
      <p className="categories-tag">
        SHOP BY CATEGORY
      </p>

      <h2>
        Find Exactly What
        You Need
      </h2>

      <div className="categories-grid">
        {categories.map(
          (item) => (
            <Link
              key={item.name}
              to={`/products?category=${item.query}`}
              className="category-card"
            >
              <div className="category-icon">
                {item.icon}
              </div>

              <h3>
                {item.name}
              </h3>

              <span>
                Explore →
              </span>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;