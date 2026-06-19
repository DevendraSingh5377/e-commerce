import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaBox,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const {
  isLoggedIn,
  logout,
  user,
} = useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        height: "70px",
        background:
          "rgba(255,255,255,0.92)",
        backdropFilter:
          "blur(12px)",
        borderBottom:
          "1px solid #e5e7eb",

        display: "flex",
        alignItems: "center",
        justifyContent:
          "space-between",

        padding: "0 30px",

        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#1E3A8A",
          textDecoration:
            "none",
        }}
      >
        🏸 Badminton Store
      </Link>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
        }}
      >
        <Link
          to="/products"
          style={{
            textDecoration:
              "none",
            color: "#222",
            fontWeight: "500",
          }}
        >
          Products
        </Link>

        {isLoggedIn && (
          <>
            <Link
              to="/wishlist"
              style={{
                color: "#222",
              }}
              title="Wishlist"
            >
              <FaHeart size={18} />
            </Link>

            <Link
              to="/cart"
              style={{
                color: "#222",
              }}
              title="Cart"
            >
              <FaShoppingCart size={18} />
            </Link>

            <Link
              to="/my-orders"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                color: "#222",
                fontWeight: "500",
              }}
            >
              <FaBox size={16} />
              My Orders
            </Link>


              {user?.role === "admin" && (
  <>
    <Link
      to="/admin"
      style={{
        textDecoration: "none",
        color: "#16a34a",
        fontWeight: "bold",
      }}
    >
      Dashboard
    </Link>

    <Link
      to="/admin/products"
      style={{
        textDecoration: "none",
        color: "#16a34a",
        fontWeight: "bold",
      }}
    >
      Manage Products
    </Link>

    <Link
      to="/admin/orders"
      style={{
        textDecoration: "none",
        color: "#16a34a",
        fontWeight: "bold",
      }}
    >
      Manage Orders
    </Link>
  </>
)}
                
               
              
             
            <Link
              to="/profile"
              style={{
                textDecoration:
                  "none",
                color: "#222",
                fontWeight: "500",
              }}
            >
              Profile
            </Link>

            <button
              onClick={
                handleLogout
              }
              style={{
                background:
                  "#1E3A8A",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "8px 16px",
                borderRadius:
                  "8px",
                cursor:
                  "pointer",
                fontWeight:
                  "600",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;