import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProductById,
  updateProduct,
} from "../../services/productService";

const EditProduct = () => {
  const { id } =
    useParams();

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

  useEffect(() => {
    const loadProduct =
      async () => {
        try {
          const data =
            await getProductById(
              id
            );

          const p =
            data.product;

          setFormData({
            name:
              p.name || "",
            brand:
              p.brand || "",
            category:
              p.category ||
              "",
            description:
              p.description ||
              "",
            price:
              p.price || "",
            discountPrice:
              p.discountPrice ||
              "",
            stock:
              p.stock || "",
          });
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      };

    loadProduct();
  }, [id]);

  const handleChange =
    (e) => {
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
        const data =
          new FormData();

        Object.keys(
          formData
        ).forEach(
          (key) => {
            data.append(
              key,
              formData[key]
            );
          }
        );

        if (image) {
          data.append(
            "image",
            image
          );
        }

        await updateProduct(
          id,
          data
        );

        alert(
          "Product Updated"
        );

        navigate(
          "/admin/products"
        );
      } catch (
        error
      ) {
        console.log(
          error
        );

        alert(
          "Update Failed"
        );
      }
    };

  return (
    <div
      style={{
        maxWidth:
          "700px",
        margin:
          "40px auto",
      }}
    >
      <h1>
        Edit Product
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          name="name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          name="brand"
          value={
            formData.brand
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          name="category"
          value={
            formData.category
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <textarea
          name="description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="number"
          name="price"
          value={
            formData.price
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="number"
          name="discountPrice"
          value={
            formData.discountPrice
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="number"
          name="stock"
          value={
            formData.stock
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="file"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;