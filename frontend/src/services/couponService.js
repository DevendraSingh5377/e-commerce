import API from "./axios";

export const applyCoupon = async (code) => {
  const response = await API.post("/coupons/apply", {
    code,
  });
  return response.data;
};

export const removeCoupon = async () => {
  const response = await API.delete("/coupons/remove");
  return response.data;
};

export const getAllCoupons = async () => {
  const response = await API.get("/coupons");
  return response.data;
};

export const createCoupon = async (couponData) => {
  const response = await API.post("/coupons", couponData);
  return response.data;
};

export const updateCoupon = async (couponId, couponData) => {
  const response = await API.put(`/coupons/${couponId}`, couponData);
  return response.data;
};

export const deleteCoupon = async (couponId) => {
  const response = await API.delete(`/coupons/${couponId}`);
  return response.data;
};
