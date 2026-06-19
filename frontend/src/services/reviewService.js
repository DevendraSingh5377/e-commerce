import API from "./axios";

export const getProductReviews = async (productId) => {
  const response = await API.get(`/reviews/${productId}`);
  return response.data;
};

export const addReview = async (reviewData) => {
  const response = await API.post("/reviews", reviewData);
  return response.data;
};

export const updateReview = async (reviewId, reviewData) => {
  const response = await API.put(`/reviews/${reviewId}`, reviewData);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await API.delete(`/reviews/${reviewId}`);
  return response.data;
};
