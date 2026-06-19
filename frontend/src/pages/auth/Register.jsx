import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

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
        Register
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
            Name
          </label>

          <input
            type="text"
            name="name"
            value={
              formData.name
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
              "20px",
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
            ? "Creating Account..."
            : "Register"}
        </button>
      </form>

      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        Already have an
        account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;