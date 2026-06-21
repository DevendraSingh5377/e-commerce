import {
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { getCart } from "../../services/cartService";
import { getAddresses } from "../../services/addressService";
import { useAuth } from "../../context/AuthContext";
import "./Checkout.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../services/orderService";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../../services/paymentService";
import API from "../../services/axios";


const currency = (value = 0) =>
  new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(value);

const Checkout = () => {
 const [paymentMethod,
  setPaymentMethod] =
  useState("COD");

 const [paymentDone, setPaymentDone] =
    useState(false);
    
  const { isLoggedIn } =
    useAuth();

const navigate = useNavigate();

  const [cart, setCart] =
    useState(null);

  const [addresses,
    setAddresses] =
    useState([]);

  const [
    selectedAddress,
    setSelectedAddress,
  ] = useState("");

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    const loadData =
      async () => {
        try {
          const cartData =
            await getCart();

          setCart(
            cartData.cart
          );

          const addressData =
            await getAddresses();

          const list =
            addressData.addresses ||
            [];

          setAddresses(
            list
          );

          const defaultAddress =
            list.find(
              (a) =>
                a.isDefault
            );

          if (
            defaultAddress
          ) {
            setSelectedAddress(
              defaultAddress._id
            );
          }
        } catch (
          error
        ) {
          console.log(
            error
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    if (isLoggedIn)
      loadData();
  }, [isLoggedIn]);

const handleCODOrder =
  async () => {
    if (!selectedAddress) {
      toast.error(
        "Select an address first"
      );
      return;
    }

    try {
      const data =
        await placeOrder(
          selectedAddress,
          "COD"
        );

      toast.success(
        "Order placed successfully"
      );

      navigate(
        "/order-success",
        {
          state: {
            order:
              data.order,
          },
        }
      );
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Order failed"
      );
    }
  };

const handleOnlinePayment =
  async () => {
    try {

      if (!selectedAddress) {
        toast.error(
          "Select address first"
        );
        return;
      }

      const orderResponse =
        await placeOrder(
          selectedAddress,
          "ONLINE"
        );

      const mongoOrder =
        orderResponse.order;

       console.log(
  "Order Response:",
  orderResponse
);

console.log(
  "Mongo Order:",
  mongoOrder
);

console.log(
  "Order ID:",
  mongoOrder?._id
);

      const razorResponse =
        await createRazorpayOrder(
          mongoOrder._id
        );

      const razorOrder =
        razorResponse.razorpayOrder;

      const options = {
        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount:
          razorOrder.amount,

        currency:
          razorOrder.currency,

        name:
          "Badminton Store",

        description:
          "Order Payment",

        order_id:
          razorOrder.id,

   modal: {
  ondismiss: async function () {

    try {

      await API.delete(
        `/orders/${mongoOrder._id}`
      );

      toast.error(
        "Payment Cancelled"
      );

    } catch (error) {

      console.log(error);

    }
  },
},


        handler:
          async function (
            response
          ) {

            await verifyPayment(
              {
                orderId:
                  mongoOrder._id,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              }
            );

            toast.success(
              "Payment Successful"
            );

            navigate(
              "/order-success",
              {
                state: {
                  order:
                    mongoOrder,
                },
              }
            );
          },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Payment failed"
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        style={{
          textAlign:
            "center",
          padding:
            "60px",
        }}
      >
      <h1 className="checkout-title">Checkout</h1>

        <p>
          Please login
          first.
        </p>

        <Link to="/login">
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          textAlign:
            "center",
          padding:
            "60px",
        }}
      >
        Loading...
      </div>
    );
  }

 return (
  <div className="checkout-page">
    <div className="checkout-left">
      <h1 className="checkout-title">
        Checkout
      </h1>

   <div className="checkout-section">
  <h2>Shipping Address</h2>

  {addresses.length === 0 ? (
    <p>No address added yet.</p>
  ) : (
    addresses.map((address) => (
      <label
        key={address._id}
        className={
          selectedAddress === address._id
            ? "address-card active"
            : "address-card"
        }
      >
        <input
          type="radio"
          checked={
            selectedAddress ===
            address._id
          }
          onChange={() =>
            setSelectedAddress(
              address._id
            )
          }
        />

        <div className="address-name">
          {address.fullName}

          {address.isDefault && (
            <span
              style={{
                color: "green",
                marginLeft: "10px",
              }}
            >
              (Default)
            </span>
          )}
        </div>

        <div className="address-info">
          {address.phone}
          <br />
          {address.addressLine1}
          <br />
          {address.city},{" "}
          {address.state}
          {" - "}
          {address.pincode}
        </div>
      </label>
    ))
  )}

  <button
    className="add-address-btn"
    onClick={() =>
      navigate("/add-address")
    }
  >
    + Add New Address
  </button>
</div>

      <div className="checkout-section">
        <h2>Payment Method</h2>

      <div className="payment-box">

  <label
    className="payment-option"
  >
    <input
      type="radio"
      value="COD"
      checked={
        paymentMethod === "COD"
      }
      onChange={() =>
        setPaymentMethod(
          "COD"
        )
      }
    />

    Cash On Delivery
  </label>

  <label
    className="payment-option"
  >
    <input
      type="radio"
      value="ONLINE"
      checked={
        paymentMethod ===
        "ONLINE"
      }
      onChange={() =>
        setPaymentMethod(
          "ONLINE"
        )
      }
    />

    Razorpay Online Payment
  </label>

</div>
      </div>
    </div>

    <div className="checkout-right">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Total Price</span>

        <strong>
          {currency(
            cart?.totalPrice
          )}
        </strong>
      </div>

      <div className="summary-row">
        <span>
          Product Discount
        </span>

        <strong>
          -
          {currency(
            cart?.totalDiscount
          )}
        </strong>
      </div>

      <div className="summary-row">
        <span>
          Coupon Discount
        </span>

        <strong>
          -
          {currency(
            cart?.couponDiscount
          )}
        </strong>
      </div>

      <div className="summary-total">
        <span>
          Final Amount
        </span>

        <strong>
          {currency(
            cart?.finalAmount
          )}
        </strong>
      </div>

   <button
  className="place-order-btn"
  onClick={
    paymentMethod ===
    "COD"
      ? handleCODOrder
      : handleOnlinePayment
  }
>
  Place Order
</button>
    </div>
  </div>
);
};

export default Checkout;