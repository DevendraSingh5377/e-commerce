import {
  useEffect,
  useState,
} from "react";

import {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
} from "../../services/couponService";

const Coupons = () => {
  const [coupons, setCoupons] =
    useState([]);

  const [form, setForm] =
    useState({
      code: "",
      description: "",
      discountType: "flat",
      discountValue: "",
      minOrderAmount: "",
      maxDiscount: "",
      expiryDate: "",
    });

  const loadCoupons =
    async () => {
      try {
        const data =
          await getAllCoupons();

        setCoupons(
          data.coupons || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createCoupon(form);

        alert(
          "Coupon Created"
        );

        setForm({
          code: "",
          description: "",
          discountType:
            "flat",
          discountValue:
            "",
          minOrderAmount:
            "",
          maxDiscount:
            "",
          expiryDate: "",
        });

        loadCoupons();
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id) => {
      if (
        !window.confirm(
          "Delete coupon?"
        )
      )
        return;

      await deleteCoupon(id);

      loadCoupons();
    };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
      }}
    >
      <h1>
        Coupon Management
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          display: "grid",
          gap: "10px",
          marginBottom:
            "40px",
        }}
      >
        <input
          placeholder="Code"
          value={
            form.code
          }
          onChange={(e) =>
            setForm({
              ...form,
              code:
                e.target
                  .value,
            })
          }
        />

        <input
          placeholder="Description"
          value={
            form.description
          }
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target
                  .value,
            })
          }
        />

        <select
          value={
            form.discountType
          }
          onChange={(e) =>
            setForm({
              ...form,
              discountType:
                e.target
                  .value,
            })
          }
        >
          <option value="flat">
            Flat
          </option>

          <option value="percentage">
            Percentage
          </option>
        </select>

        <input
          type="number"
          placeholder="Discount Value"
          value={
            form.discountValue
          }
          onChange={(e) =>
            setForm({
              ...form,
              discountValue:
                e.target
                  .value,
            })
          }
        />

        <input
          type="number"
          placeholder="Min Order Amount"
          value={
            form.minOrderAmount
          }
          onChange={(e) =>
            setForm({
              ...form,
              minOrderAmount:
                e.target
                  .value,
            })
          }
        />

        <input
          type="number"
          placeholder="Max Discount"
          value={
            form.maxDiscount
          }
          onChange={(e) =>
            setForm({
              ...form,
              maxDiscount:
                e.target
                  .value,
            })
          }
        />

        <input
          type="date"
          value={
            form.expiryDate
          }
          onChange={(e) =>
            setForm({
              ...form,
              expiryDate:
                e.target
                  .value,
            })
          }
        />

        <button
          type="submit"
        >
          Create Coupon
        </button>
      </form>

      {coupons.map(
        (coupon) => (
          <div
            key={
              coupon._id
            }
            style={{
              border:
                "1px solid #ddd",
              padding:
                "15px",
              marginBottom:
                "10px",
            }}
          >
            <h3>
              {
                coupon.code
              }
            </h3>

            <p>
              {
                coupon.description
              }
            </p>

            <p>
              Discount:
              {" "}
              {
                coupon.discountValue
              }
            </p>

            <button
              onClick={() =>
                handleDelete(
                  coupon._id
                )
              }
            >
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Coupons;