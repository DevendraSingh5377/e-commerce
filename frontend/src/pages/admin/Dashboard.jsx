import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../services/productService";
import { getAllOrders } from "../../services/orderService";
import "./AdminDashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const productsData =
          await getAllProducts({
            limit: 1000,
          });

        const ordersData =
          await getAllOrders();

        const orders =
          ordersData.orders || [];

        const revenue =
          orders.reduce(
            (sum, order) =>
              sum +
              (order.finalAmount || 0),
            0
          );

        const pending =
          orders.filter(
            (o) =>
              o.orderStatus ===
              "Pending"
          ).length;

        setStats({
          products:
            productsData
              .totalProducts || 0,

          orders:
            orders.length,

          revenue,

          pending,
        });
      } catch (err) {
        console.log(err);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">
        Admin Dashboard
      </h1>

      <div className="admin-cards">
        <div className="admin-card">
          <h3>Total Products</h3>
          <h1>{stats.products}</h1>
        </div>

        <div className="admin-card">
          <h3>Total Orders</h3>
          <h1>{stats.orders}</h1>
        </div>

        <div className="admin-card">
          <h3>Revenue</h3>
          <h1>
            ₹{stats.revenue}
          </h1>
        </div>

        <div className="admin-card">
          <h3>Pending Orders</h3>
          <h1>{stats.pending}</h1>
        </div>
      </div>

      <div className="admin-links">
        <Link
          to="/admin/products"
          className="admin-btn"
        >
          Manage Products
        </Link>

        <Link
          to="/admin/orders"
          className="admin-btn"
        >
          Manage Orders
        </Link>

        <Link
          to="/admin/add-product"
          className="admin-btn"
        >
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;