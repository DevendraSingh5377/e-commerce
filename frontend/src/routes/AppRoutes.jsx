import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/common/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Products from "../pages/common/Products";
import Cart from "../pages/common/Cart";
import Wishlist from "../pages/common/Wishlist";

import ProtectedRoute from "../components/common/ProtectedRoute";
import Profile from "../pages/user/Profile";

import OrderSuccess from "../pages/common/OrderSuccess";

//import OrderDetails from "../pages/user/OrderDetails";
import Checkout from "../pages/common/Checkout";
//import Orders from "../pages/common/Orders";

import MyOrders from "../pages/user/MyOrders";
import OrderDetails from "../pages/user/OrderDetails";
import AdminRoute from "../components/admin/AdminRoute";
import Dashboard from "../pages/admin/Dashboard";
import Orders from "../pages/admin/Orders";
import ProductsAdmin from "../pages/admin/Products";

// Wrapped pages with common layout
const ProductsPage = () => (
  <MainLayout>
    <Products />
  </MainLayout>
);

const CartPage = () => (
  <MainLayout>
    <Cart />
  </MainLayout>
);

const WishlistPage = () => (
  <MainLayout>
    <Wishlist />
  </MainLayout>
);

const ProfilePage = () => (
  <MainLayout>
    <Profile />
  </MainLayout>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={<ProductsPage />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<CartPage />}
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={<WishlistPage />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Checkout />
      </MainLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/order-success"
  element={
    <ProtectedRoute>
      <MainLayout>
        <OrderSuccess />
      </MainLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <MainLayout>
        <MyOrders />
      </MainLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MainLayout>
        <MyOrders />
      </MainLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <MainLayout>
        <OrderDetails />
      </MainLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <MainLayout>
        <Orders />
      </MainLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <AdminRoute>
      <MainLayout>
        <ProductsAdmin />
      </MainLayout>
    </AdminRoute>
  }
/>


      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;