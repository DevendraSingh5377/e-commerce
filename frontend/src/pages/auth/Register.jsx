import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import "./Auth.css";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData, setFormData] =
    useState({
      name: "",
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
        await registerUser(
          formData
        );

      // Auto login after registration
      login(
        data.user,
        data.token
      );

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-page">
    <div className="auth-card">

      <h2 className="auth-title">
        Create Account
      </h2>

      <p className="auth-subtitle">
        Join the Badminton Store
      </p>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="auth-group">
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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
            ? "Creating Account..."
            : "Register"}
        </button>

      </form>

      <div className="auth-footer">
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </div>

    </div>
  </div>
);
};

export default Register;