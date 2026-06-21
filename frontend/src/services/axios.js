import axios from "axios";

console.log(
  "API URL =",
  import.meta.env.VITE_API_URL
);

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Adds the missing /api prefix
});

// Automatically attach JWT token
API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "Request =>",
      config.baseURL +
        config.url
    );

    return config;
  },
  (error) =>
    Promise.reject(error)
);

export default API;