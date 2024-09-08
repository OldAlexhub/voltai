import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.webp";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Hero Section */}
      <section style={{ padding: "50px 20px", backgroundColor: "#f7f9fc" }}>
        <h1
          style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}
        >
          Welcome to VoltAI
        </h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "40px" }}>
          AI-powered electric vehicle battery health monitoring and predictive
          analysis.
        </p>
        <img
          src={Logo} // Your first uploaded image path here
          alt="EV and AI concept"
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            marginBottom: "20px",
            borderRadius: "50px",
          }}
        />
        <div style={{ marginTop: "20px" }}>
          <Link
            to="/signup"
            style={{
              background: "linear-gradient(90deg, #00b4db, #0083b0)",
              color: "white",
              padding: "15px 30px",
              borderRadius: "50px",
              fontSize: "1.25rem",
              textDecoration: "none",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "background 0.3s ease",
              display: "inline-block", // Ensures the button is inline
            }}
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "50px 20px" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          Key Features
        </h2>
        <div className="container">
          <div className="row">
            {/* Feature 1 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-3">
                <img
                  src="https://www.laserax.com/sites/default/files/public/ev-battery-cell-types.jpg"
                  alt="Battery Health Analysis"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "20px",
                    borderRadius: "10px",
                  }}
                  className="mx-auto"
                />
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Battery Health Analysis
                </h3>
                <p style={{ fontSize: "1rem", color: "#666" }}>
                  Monitor the current state of your EV’s battery health and see
                  how much range has been lost over time.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-3">
                <img
                  src="https://scitechdaily.com/images/AI-Battery-Concept.jpg"
                  alt="Predictive Analysis"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "20px",
                    borderRadius: "10px",
                  }}
                  className="mx-auto"
                />
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Predictive Analysis
                </h3>
                <p style={{ fontSize: "1rem", color: "#666" }}>
                  Use AI to predict future battery health and performance based
                  on past data.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQuTE3EPZgPdV31nbTwJZJX4-eFGIi4uUpA&s"
                  alt="Data Visualization"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "20px",
                    borderRadius: "10px",
                  }}
                  className="mx-auto"
                />
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Data Visualization
                </h3>
                <p style={{ fontSize: "1rem", color: "#666" }}>
                  Easily understand battery trends with beautifully designed
                  graphs and charts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ padding: "50px 20px", backgroundColor: "#f7f9fc" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Take Control of Your EV Battery
        </h2>
        <p style={{ fontSize: "1.25rem", marginBottom: "40px" }}>
          Sign up now to get started with real-time battery health monitoring
          and AI-driven insights.
        </p>
        <img
          src="https://www.microsoft.com/en-us/research/uploads/prodnew/2024/07/MSRA-Nissan-TWLIFB-1200x627-1.jpg"
          alt="EV Battery Monitoring"
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            marginBottom: "20px",
            borderRadius: "50px",
          }}
        />
        <div style={{ marginTop: "20px" }}>
          <Link
            to="/signup"
            style={{
              background: "linear-gradient(90deg, #00b4db, #0083b0)",
              color: "white",
              padding: "15px 30px",
              borderRadius: "50px",
              fontSize: "1.25rem",
              textDecoration: "none",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "background 0.3s ease",
              display: "inline-block",
            }}
          >
            Sign Up Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
