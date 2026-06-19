import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/orderService";
import racketImage from "../../assets/images/racket.png";

const currency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderById(id);
        //  console.log(data.order);
        setOrder(data.order);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);




  if (loading) {

    
    return (
      <div className="store-status">
        Loading order...
      </div>
    );
  }

  if (!order) {

    return (
      <div className="store-status">
        Order not found.
      </div>
    );
  }

  return (
    <section className="store-page">
      <div className="store-heading">
        <div>
          <span>Order Details</span>
          <h1>
            #{order._id.slice(-8)}
          </h1>
        </div>
      </div>

      <div className="cart-layout">

        <div className="cart-items">

          {order.items?.map((item) => (

  <article
    className="cart-item"
    key={item._id}
  >
<img
  src={
    typeof item.image === "string" &&
    item.image.startsWith("http")
      ? item.image
      : racketImage
  }
  alt={item.name}
  onError={(e) => {
    e.target.src = racketImage;
  }}
/>

    <div className="cart-info">
      <h3>{item.name}</h3>

      <p>
        Quantity: {item.quantity}
      </p>

      <strong>
        {currency(
          item.discountPrice || item.price
        )}
      </strong>
    </div>
  </article>
))}
        </div>

        <aside className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Status</span>

            <strong>
              {
                order.orderStatus
              }
            </strong>
          </div>

          <div className="summary-line">
            <span>Payment</span>

            <strong>
              {
                order.paymentMethod
              }
            </strong>
          </div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              {currency(
                order.finalAmount
              )}
            </strong>
          </div>

        </aside>
      </div>
    </section>
  );
};

export default OrderDetails;