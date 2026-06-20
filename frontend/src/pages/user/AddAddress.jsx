import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAddress } from "../../services/addressService";

const AddAddress = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addAddress(form);

      alert("Address Added Successfully");

      navigate("/checkout");
    } catch (error) {
      console.log(error);
      alert("Failed to add address");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>Add Address</h1>

      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} />
        <br /><br />

        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <br /><br />

        <input name="addressLine1" placeholder="Address Line 1" onChange={handleChange} />
        <br /><br />

        <input name="addressLine2" placeholder="Address Line 2" onChange={handleChange} />
        <br /><br />

        <input name="city" placeholder="City" onChange={handleChange} />
        <br /><br />

        <input name="state" placeholder="State" onChange={handleChange} />
        <br /><br />

        <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        <br /><br />

        <button type="submit">
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddAddress;