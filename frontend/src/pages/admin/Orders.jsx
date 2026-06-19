import {
  useEffect,
  useState,
} from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/orderService";

const Orders = () => {
  const [orders, setOrders] =
    useState([]);

  const loadOrders =
    async () => {
      try {
        const data =
          await getAllOrders();

        setOrders(
          data.orders || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadOrders();
  }, []);

  const changeStatus =
    async (
      id,
      status
    ) => {
      try {
        await updateOrderStatus(
          id,
          status
        );

        loadOrders();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
      }}
    >
      <h1>
        All Orders
      </h1>

      {orders.map(
        (order) => (
          <div
            key={order._id}
            style={{
              border:
                "1px solid #ddd",
              padding:
                "20px",
              marginBottom:
                "20px",
            }}
          >
            <h3>
              {order._id}
            </h3>

            <p>
              User:
              {" "}
              {
                order.user
                  ?.name
              }
            </p>

            <p>
              Amount:
              ₹
              {
                order.finalAmount
              }
            </p>

            <p>
              Status:
              {" "}
              {
                order.orderStatus
              }
            </p>

            <select
              value={
                order.orderStatus
              }
              onChange={(
                e
              ) =>
                changeStatus(
                  order._id,
                  e.target
                    .value
                )
              }
            >
              <option>
                Pending
              </option>

              <option>
                Packed
              </option>

              <option>
                Shipped
              </option>

              <option>
                Delivered
              </option>

              <option>
                Cancelled
              </option>
            </select>
          </div>
        )
      )}
    </div>
  );
};

export default Orders;