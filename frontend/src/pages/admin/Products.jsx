import {
  useEffect,
  useState,
} from "react";

import {
  getAllProducts,
  deleteProduct,
} from "../../services/productService";

const Products = () => {
  const [products, setProducts] =
    useState([]);

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
      }
    };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete product?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteProduct(id);

        loadProducts();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
      }}
    >
      <h1>
        Product Management
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map(
            (product) => (
              <tr
                key={
                  product._id
                }
              >
                <td>
                  {
                    product._id
                  }
                </td>

                <td>
                  {
                    product.name
                  }
                </td>

                <td>
                  {
                    product.brand
                  }
                </td>

                <td>
                  ₹
                  {
                    product.discountPrice
                  }
                </td>

                <td>
                  {
                    product.stock
                  }
                </td>

                <td>
                  <button>
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        product._id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;