import { useState } from "react";

import {
  createProduct,
} from "../../services/productService";

import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      brand: "",
      category: "",
      description: "",
      price: "",
      discountPrice: "",
      stock: "",
    });

  const [image, setImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const data =
          new FormData();

        Object.keys(
          formData
        ).forEach((key) => {
          data.append(
            key,
            formData[key]
          );
        });

        if (image) {
          data.append(
            "image",
            image
          );
        }

        await createProduct(
          data
        );

        alert(
          "Product Added Successfully"
        );

        navigate(
          "/admin/products"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Failed to add product"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
      }}
    >
      <h1>
        Add Product
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={
            formData.brand
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={
            formData.category
          }
          onChange={
            handleChange
          }
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          rows="5"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={
            formData.price
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price"
          value={
            formData.discountPrice
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={
            formData.stock
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background:
              "#16a34a",
            color: "white",
            border: "none",
            padding:
              "14px",
            borderRadius:
              "10px",
            cursor:
              "pointer",
          }}
        >
          {loading
            ? "Adding..."
            : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;