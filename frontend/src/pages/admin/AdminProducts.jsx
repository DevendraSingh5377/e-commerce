import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllProducts,
  deleteProduct,
} from "../../services/productService";


const AdminProducts = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadProducts =
    async () => {
      try {
        const data =
          await getAllProducts({
            limit: 100,
          });

        setProducts(
          data.products || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteProduct(id);

        alert(
          "Product deleted successfully"
        );

        loadProducts();
      } catch (error) {
        console.log(error);
        alert(
          "Failed to delete product"
        );
      }
    };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        Loading products...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
      }}
    >
      <h1>
        Manage Products
      </h1>

      {products.length === 0 ? (
        <p>
          No products found
        </p>
      ) : (
        products.map(
          (product) => (
            <div
              key={product._id}
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: "20px",
                padding: "15px",
                border:
                  "1px solid #ddd",
                borderRadius:
                  "10px",
                marginBottom:
                  "15px",
              }}
            >
              <img
                src={
                  product.image
                    ?.url
                }
                alt={
                  product.name
                }
                style={{
                  width: "80px",
                  height:
                    "80px",
                  objectFit:
                    "cover",
                  borderRadius:
                    "8px",
                }}
              />

              <div
                style={{
                  flex: 1,
                }}
              >
                <h3>
                  {
                    product.name
                  }
                </h3>

                <p>
                  Brand:
                  {" "}
                  {
                    product.brand
                  }
                </p>

                <p>
                  Stock:
                  {" "}
                  {
                    product.stock
                  }
                </p>

                <p>
                  ₹
                  {
                    product.discountPrice
                  }
                </p>
              </div>

<div
  style={{
    display: "flex",
    gap: "10px",
  }}
>
  <Link
    to={`/admin/products/edit/${product._id}`}
    style={{
      background: "#2563eb",
      color: "white",
      padding: "10px 18px",
      borderRadius: "8px",
      textDecoration: "none",
    }}
  >
    Edit
  </Link>

  <button
    onClick={() =>
      handleDelete(
        product._id
      )
    }
    style={{
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
</div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default AdminProducts;