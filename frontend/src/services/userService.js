import API from "./axios";




export const getAllUsers =
  async () => {
    const response =
      await API.get("/users");

    return response.data;
  };

export const updateUserRole =
  async (
    id,
    role
  ) => {
    const response =
      await API.patch(
        `/users/role/${id}`,
        { role }
      );

    return response.data;
  };

export const deleteUser =
  async (id) => {
    const response =
      await API.delete(
        `/users/${id}`
      );

    return response.data;
  };