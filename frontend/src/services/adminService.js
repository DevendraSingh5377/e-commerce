import API from "./axios";

export const getAdminStats =
  async () => {
    const orders =
      await API.get(
        "/orders/all"
      );

    const products =
      await API.get(
        "/products?limit=1000"
      );

    return {
      orders:
        orders.data.orders,
      products:
        products.data.products,
    };
  };