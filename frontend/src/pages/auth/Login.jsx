import {
  useState,
} from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import "./Auth.css";

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
  <div className="auth-page">
    <div className="auth-card">

      <h2 className="auth-title">
        Welcome Back
      </h2>

      <p className="auth-subtitle">
        Login to your badminton account
      </p>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="auth-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-btn"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

      <div className="auth-footer">
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </div>

    </div>
  </div>
);
};

export default Login;