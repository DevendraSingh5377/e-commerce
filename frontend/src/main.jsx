import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#1e293b",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
          },
        }}
      />
      <App />
    </AuthProvider>
  </React.StrictMode>
);