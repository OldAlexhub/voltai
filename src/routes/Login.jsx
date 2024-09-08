import React, { useState } from "react";
import Logo from "../images/logo.webp";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [alertMessage, setAlertMessage] = useState(null); // State for alert messages
  const [alertType, setAlertType] = useState(null); // State for alert type (success or danger)

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, formData);

      if (response.status === 200) {
        setAlertMessage("Login successful! Redirecting to Home...");
        setAlertType("success");
        handleLogin(true);

        const { user_ID, token, range } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", user_ID);
        localStorage.setItem("fullRange", range);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      setAlertMessage("Login failed! Please check your inputs.");
      setAlertType("danger");
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <img
          src={Logo}
          alt="logo"
          style={{
            width: "150px",
            height: "auto",
            marginBottom: "20px",
            borderRadius: "50px",
          }}
        />
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}
        <div style={{ marginBottom: "15px" }}>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #00b4db, #0083b0)",
            border: "none",
            borderRadius: "50px",
            color: "white",
            padding: "12px 20px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s ease, transform 0.3s ease",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background =
              "linear-gradient(90deg, #0083b0, #00b4db)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background =
              "linear-gradient(90deg, #00b4db, #0083b0)";
            e.target.style.transform = "translateY(0)";
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
          }}
        >
          Login
        </button>
        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Don't have an account!?{" "}
          <span>
            <Link
              to="/signup"
              style={{ color: "#0083b0", textDecoration: "none" }}
            >
              Click here to signup
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
