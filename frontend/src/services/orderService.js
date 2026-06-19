import API from "./axios";

export const getMyOrders = async () => {
  const response = await API.get(
    "/orders/my-orders"
  );

  return response.data;
};

export const getOrderById = async (
  orderId
) => {
  const response = await API.get(
    `/orders/${orderId}`
  );

  return response.data;
};

export const placeOrder = async (
  addressId,
  paymentMethod
) => {
  const response = await API.post(
    "/orders/place",
    {
      addressId,
      paymentMethod,
    }
  );

  return response.data;
};

// ADMIN

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
        {
          orderStatus,
        }
      );

    return response.data;
  };