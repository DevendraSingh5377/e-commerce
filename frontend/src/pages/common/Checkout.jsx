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

const handlePlaceOrder =
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
          <div>
            <p>
              No address added yet.
            </p>

            <button className="add-address-btn">
              Add New Address
            </button>
          </div>
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
              </div>

              <div className="address-info">
                {address.phone}
                <br />

                {address.addressLine1}

                <br />

                {address.city},
                {" "}
                {address.state}
                {" - "}
                {address.pincode}
              </div>
            </label>
          ))
        )}
      </div>

      <div className="checkout-section">
        <h2>Payment Method</h2>

        <div className="payment-box">
          <div className="payment-option">
            <input
              type="radio"
              checked
              readOnly
            />
            Cash on Delivery (COD)
          </div>

          <div className="payment-option">
            <input
              type="radio"
              disabled
            />
            Razorpay (Coming Soon)
          </div>
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
    handlePlaceOrder
  }
      >
        Place Order
      </button>
    </div>
  </div>
);
};

export default Checkout;