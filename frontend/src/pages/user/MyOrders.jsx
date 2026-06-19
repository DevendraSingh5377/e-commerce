import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../services/orderService";

const currency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#f59e0b";

    case "Packed":
      return "#3b82f6";

    case "Shipped":
      return "#8b5cf6";

    case "Delivered":
      return "#10b981";

    case "Cancelled":
      return "#ef4444";

    default:
      return "#6b7280";
  }
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data.orders || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
        }}
      >
        Loading orders...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
        }}
      >
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          No orders found.
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "14px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
                <h3
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  Order #{order._id.slice(-8)}
                </h3>

                <p>
                  Amount:{" "}
                  <strong>
                    {currency(order.finalAmount)}
                  </strong>
                </p>
              </div>

              <span
                style={{
                  background: getStatusColor(
                    order.orderStatus
                  ),
                  color: "#fff",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {order.orderStatus}
              </span>
            </div>

            <div
              style={{
                marginTop: "18px",
              }}
            >
              <Link
                to={`/orders/${order._id}`}
                style={{
                  textDecoration: "none",
                  background: "#22c55e",
                  color: "#fff",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  fontWeight: "600",
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;