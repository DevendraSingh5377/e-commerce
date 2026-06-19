import {
  useState,
} from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data =
        await loginUser(
          formData.email,
          formData.password
        );

      login(
        data.user,
        data.token
      );

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        border:
          "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Login
      </h2>

      {error && (
        <p
          style={{
            color: "red",
            textAlign:
              "center",
          }}
        >
          {error}
        </p>
      )}

      <form
        onSubmit={
          handleSubmit
        }
      >
        <div
          style={{
            marginBottom:
              "15px",
          }}
        >
          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop:
                "5px",
            }}
          />
        </div>

        <div
          style={{
            marginBottom:
              "15px",
          }}
        >
          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop:
                "5px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background:
              "#1E3A8A",
            color: "white",
            border: "none",
            borderRadius:
              "8px",
            cursor:
              "pointer",
          }}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>

      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        Don't have an
        account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;