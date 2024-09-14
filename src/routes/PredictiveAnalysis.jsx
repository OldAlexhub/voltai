import React from "react";
import PredictedRange from "../components/PredictedRange";
import LostMiles from "../components/LostMiles";
import Percentage from "../components/Percentage";

const Dashboard = () => {
  return (
    <div style={styles.dashboardContainer}>
      {/* Predictive Analysis Section */}
      <section style={styles.section}>
        <h2 style={styles.title}>Predictive Analysis</h2>
        <div style={styles.gridContainer}>
          {/* Top two charts */}
          <div style={styles.card}>
            <PredictedRange />
          </div>
          <div style={styles.card}>
            <LostMiles />
          </div>
          {/* Bottom centered chart */}
          <div style={styles.centeredCard}>
            <Percentage />
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    backgroundColor: "#121212", // Darker background for readability
    padding: "20px",
    minHeight: "100vh",
  },
  section: {
    marginBottom: "50px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#f5f5f5", // Softer white for less contrast
    fontFamily: "Arial, sans-serif",
    fontSize: "2rem",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Two columns for the top charts
    gap: "40px", // Larger gap for readability
    padding: "20px",
    justifyItems: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: "600px", // Increased max width to allow more room for charts
    height: "450px",
    backgroundColor: "#1e1e1e", // Softer background color for readability
    borderRadius: "15px", // Smoother edges
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Softer shadow
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.3s",
  },
  centeredCard: {
    gridColumn: "1 / span 2", // Span across both columns to center the card underneath
    width: "100%",
    maxWidth: "600px",
    height: "450px",
    backgroundColor: "#1e1e1e",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.3s",
  },
};

export default Dashboard;
