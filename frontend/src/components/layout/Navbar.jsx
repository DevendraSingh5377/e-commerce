import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaBox,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import Swal from "sweetalert2";

const Navbar = () => {
  const {
    isLoggedIn,
    logout,
    user,
  } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

 const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Logout",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    logout();

    Swal.fire({
      title: "Logged Out",
      text: "You have been logged out successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/");
  }
};

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        🏸 Badminton Store
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="menu-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        {menuOpen ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}
      </button>

      {/* Navigation */}
      <div
        className={`nav-links ${
          menuOpen ? "open" : ""
        }`}
      >
        <Link
          to="/products"
          className="nav-link"
          onClick={closeMenu}
        >
          Products
        </Link>

        {isLoggedIn && (
          <>
            <Link
              to="/wishlist"
              className="nav-link"
              title="Wishlist"
              onClick={closeMenu}
            >
              <FaHeart size={18} />
            </Link>

            <Link
              to="/cart"
              className="nav-link"
              title="Cart"
              onClick={closeMenu}
            >
              <FaShoppingCart
                size={18}
              />
            </Link>

            <Link
              to="/my-orders"
              className="nav-link"
              onClick={closeMenu}
            >
              <FaBox
                size={16}
                style={{
                  marginRight:
                    "6px",
                }}
              />
              My Orders
            </Link>

            {user?.role ===
              "admin" && (
              <>
                <Link
                  to="/admin"
                  className="admin-link"
                  onClick={
                    closeMenu
                  }
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin/products"
                  className="admin-link"
                  onClick={
                    closeMenu
                  }
                >
                  Manage Products
                </Link>

                <Link
                  to="/admin/orders"
                  className="admin-link"
                  onClick={
                    closeMenu
                  }
                >
                  Manage Orders
                </Link>

                <Link
                  to="/admin/coupons"
                  className="admin-link"
                  onClick={
                    closeMenu
                  }
                >
                  Coupons
                </Link>

                <Link
                  to="/admin/users"
                  className="admin-link"
                  onClick={
                    closeMenu
                  }
                >
                  Manage Users
                </Link>
              </>
            )}

            <Link
              to="/profile"
              className="nav-link"
              onClick={closeMenu}
            >
              Profile
            </Link>

            <button
              onClick={
                handleLogout
              }
              className="logout-btn"
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