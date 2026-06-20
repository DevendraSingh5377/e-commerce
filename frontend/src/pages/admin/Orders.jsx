import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/orderService";

const Orders = () => {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

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
      } finally {
        setLoading(false);
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

  const filteredOrders =
    orders.filter((order) =>
      order.user?.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        Loading orders...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "30px auto",
      }}
    >
      <h1>
        Manage Orders
      </h1>

      <input
        type="text"
        placeholder="Search customer..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          border:
            "1px solid #ddd",
          borderRadius: "8px",
        }}
      />

      {filteredOrders.map(
        (order) => (
          <div
            key={order._id}
            style={{
              background:
                "white",
              padding: "20px",
              borderRadius:
                "12px",
              marginBottom:
                "20px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,.08)",
            }}
          >
            <h3>
              Order #
              {order._id.slice(
                -8
              )}
            </h3>

            <p>
              <strong>
                Customer:
              </strong>{" "}
              {
                order.user
                  ?.name
              }
            </p>

            <p>
              <strong>
                Email:
              </strong>{" "}
              {
                order.user
                  ?.email
              }
            </p>

            <p>
              <strong>
                Amount:
              </strong>{" "}
              ₹
              {
                order.finalAmount
              }
            </p>

            <p>
              <strong>
                Items:
              </strong>{" "}
              {
                order.items
                  ?.length
              }
            </p>

            <p>
              <strong>
                Date:
              </strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>

            <div
              style={{
                marginTop:
                  "10px",
              }}
            >
              <strong>
                Status:
              </strong>

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
                style={{
                  marginLeft:
                    "10px",
                  padding:
                    "8px",
                }}
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
          </div>
        )
      )}
    </div>
  );
};

export default Orders;