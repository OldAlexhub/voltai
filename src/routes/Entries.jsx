import React, { useState } from "react";
import Logo from "../images/logo.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Entries = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    current_range: "",
    current_percentage: "",
    fullRange: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const fullRange = localStorage.getItem("fullRange");

      const parsedData = {
        userId,
        current_range: Number(formData.current_range), // Convert to number
        current_percentage: Number(formData.current_percentage), // Convert to number
        fullRange: Number(fullRange), // Convert to number
      };

      console.log("Submitting data:", parsedData); // Log parsed data

      const response = await axios.post(
        process.env.REACT_APP_POST_DATA,
        parsedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setAlert({ message: "Data submitted successfully!", type: "success" });
        setTimeout(() => {
          navigate("/rawdata");
        }, 3000);
      }
    } catch (error) {
      setAlert({
        message: "Failed to submit data. Please try again.",
        type: "danger",
      });
      console.error("Error submitting data:", error.response.data); // Log error details
    }
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <form
        onSubmit={handleSubmit}
        className="text-center p-4 bg-light shadow rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <img
          src={Logo}
          alt="logo"
          className="mb-4"
          style={{ width: "150px", height: "auto", borderRadius: "50px" }}
        />

        <h2 className="mb-4">Enter Your Vehicle Data</h2>
        <p className="mb-4" style={{ fontSize: "1rem", color: "#666" }}>
          Please provide your EV's current range and battery percentage to allow
          VoltAI to track your vehicle's battery health. After submitting this
          information, you will be redirected to view the raw data for further
          insights.
        </p>

        {/* Alert */}
        {alert.message && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}

        <div className="mb-3">
          <input
            name="current_range"
            type="number"
            value={formData.current_range}
            onChange={handleChange}
            required
            placeholder="Enter Current Range"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            name="current_percentage"
            type="number"
            value={formData.current_percentage}
            onChange={handleChange}
            required
            placeholder="Enter Current Percentage"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Data
        </button>

        <p className="mt-4" style={{ fontSize: "0.9rem", color: "#666" }}>
          Once submitted, you will be redirected to view your raw data and gain
          insights into your vehicle’s battery performance.
        </p>
      </form>
    </div>
  );
};

export default Entries;
