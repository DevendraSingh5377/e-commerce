import API from "./axios";

// Public
export const getAllProducts = async (params = {}) => {
  const response = await API.get("/products", {
    params,
  });

  return response.data;
};

export const getProductById = async (productId) => {
  const response = await API.get(
    `/products/${productId}`
  );

  return response.data;
};

// Admin
export const createProduct = async (
  formData
) => {
  const response = await API.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateProduct = async (
  id,
  formData
) => {
  const response = await API.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteProduct = async (
  id
) => {
  const response = await API.delete(
    `/products/${id}`
  );

  return response.data;
};