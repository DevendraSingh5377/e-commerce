import API from "./axios";

export const createRazorpayOrder =
  async (orderId) => {
    const response =
      await API.post(
        "/payment/create-order",
        { orderId }
      );

    return response.data;
  };

export const verifyPayment =
  async (paymentData) => {
    const response =
      await API.post(
        "/payment/verify",
        paymentData
      );

    return response.data;
  };