import {
  useEffect,
  useState,
} from "react";
import {
  getMyOrders,
} from "../../services/orderService";
import "./StorePages.css";

const currency = (
  value = 0
) =>
  new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(value);

const Orders = () => {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    const loadOrders =
      async () => {
        try {
          const data =
            await getMyOrders();

          setOrders(
            data.orders ||
              []
          );
        } catch {}
      };

    loadOrders();
  }, []);

  return (
    <section className="store-page">
      <div className="store-heading">
        <h1>
          My Orders
        </h1>
      </div>

      <div className="wishlist-grid">
        {orders.map(
          (order) => (
            <div
              className="wishlist-card"
              key={
                order._id
              }
            >
              <h3>
                Order #
                {order._id.slice(
                  -6
                )}
              </h3>

              <p>
                Status:{" "}
                {
                  order.orderStatus
                }
              </p>

              <strong>
                {currency(
                  order.totalAmount
                )}
              </strong>

              <small>
                {
                  new Date(
                    order.createdAt
                  ).toLocaleDateString()
                }
              </small>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Orders;