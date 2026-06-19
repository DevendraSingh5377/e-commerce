import API from "./axios";

export const getCart = async () => {
  const response = await API.get("/cart");
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await API.post("/cart/add", {
    productId,
    quantity,
  });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await API.put(`/cart/update/${productId}`, {
    quantity,
  });
  return response.data;
};

export const removeCartItem = async (productId) => {
  const response = await API.delete(`/cart/remove/${productId}`);
  return response.data;
};
