import API from "./axios";

export const getAllOrders =
  async () => {
    const response =
      await API.get(
        "/orders/all"
      );

    return response.data;
  };

export const updateOrderStatus =
  async (
    orderId,
    orderStatus
  ) => {
    const response =
      await API.patch(
        `/orders/status/${orderId}`,
        { orderStatus }
      );

    return response.data;
  };