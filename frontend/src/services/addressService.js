import API from "./axios";

export const getAddresses = async () => {
  const response = await API.get("/address");
  return response.data;
};

export const addAddress = async (addressData) => {
  const response = await API.post(
    "/address/add",
    addressData
  );
  return response.data;
};

export const updateAddress = async (
  id,
  addressData
) => {
  const response = await API.put(
    `/address/${id}`,
    addressData
  );
  return response.data;
};

export const deleteAddress = async (
  id
) => {
  const response = await API.delete(
    `/address/${id}`
  );
  return response.data;
};

export const setDefaultAddress =
  async (id) => {
    const response =
      await API.patch(
        `/address/default/${id}`
      );

    return response.data;
  };