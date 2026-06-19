import {
  Link,
  useLocation,
} from "react-router-dom";

const OrderSuccess =
  () => {
    const location =
      useLocation();

    const order =
      location.state?.order;

    return (
      <div
        style={{
          maxWidth:
            "700px",
          margin:
            "80px auto",
          textAlign:
            "center",
        }}
      >
        <h1>
          🎉 Order Placed
        </h1>

        <p>
          Thank you for
          your purchase.
        </p>

        {order && (
          <p>
            Order ID:
            <strong>
              {" "}
              {
                order._id
              }
            </strong>
          </p>
        )}

        <div
          style={{
            marginTop:
              "30px",
          }}
        >
          <Link
            to="/my-orders"
          >
            View Orders
          </Link>
        </div>
      </div>
    );
  };

export default OrderSuccess;