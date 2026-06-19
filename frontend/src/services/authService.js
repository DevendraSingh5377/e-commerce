import API from "./axios";

// Login User
export const loginUser = async (
  email,
  password
) => {
  const response = await API.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};

// Register User
export const registerUser = async (
  userData
) => {
  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// Get Current Logged In User
export const getCurrentUser =
  async () => {
    const response =
      await API.get("/auth/me");

    return response.data;
  };