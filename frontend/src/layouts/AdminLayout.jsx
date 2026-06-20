import { Link } from "react-router-dom";

const AdminLayout = ({
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <aside
        style={{
          width: "250px",
          minHeight: "100vh",
          background: "#166534",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>Admin Panel</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <Link
            to="/admin"
            style={{
              color: "white",
            }}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            style={{
              color: "white",
            }}
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            style={{
              color: "white",
            }}
          >
            Orders
          </Link>

          <Link
            to="/admin/add-product"
            style={{
              color: "white",
            }}
          >
            Add Product
          </Link>
        </div>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;