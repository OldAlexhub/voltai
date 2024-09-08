import React, { useState } from "react";
import Logo from "../images/logo.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullRange: "",
  });

  const [alertMessage, setAlertMessage] = useState(null); // State for alert messages
  const [alertType, setAlertType] = useState(null); // State for alert type (success or danger)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_SIGNUP, formData);

      if (response.status === 201) {
        setAlertMessage("Signup successful! Redirecting to login...");
        setAlertType("success");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      setAlertMessage("Signup failed! Please check your inputs.");
      setAlertType("danger");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <img
              src={Logo}
              alt="logo"
              className="mx-auto d-block mb-3"
              style={{ width: "150px", height: "auto", borderRadius: "50px" }} // Control the size of the logo
            />
            {alertMessage && (
              <div className={`alert alert-${alertType}`} role="alert">
                {alertMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="fullRange" className="form-label">
                  Manufactory Full Range of Your EV
                </label>
                <input
                  type="number"
                  name="fullRange"
                  required
                  value={formData.fullRange}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Full Range"
                />
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{
                  background: "linear-gradient(90deg, #00b4db, #0083b0)",
                  border: "none",
                  borderRadius: "50px",
                  color: "white",
                  padding: "12px 20px",
                  fontSize: "18px",
                  fontWeight: "bold",
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
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
