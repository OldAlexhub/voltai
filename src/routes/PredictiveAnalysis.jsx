import React from "react";
import FutureRange from "../components/FutureRange";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling
import PercentageFuture from "../components/PercentageFuture";
import MilesLost from "../components/MilesLost";

const PredictiveAnalysis = () => {
  return (
    <div className="container-fluid mt-4">
      {/* Dashboard Header */}
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="text-primary">Predictive Analysis Dashboard</h2>
          <p className="lead">
            Forecast range and detailed analysis for your battery data
          </p>
        </div>
      </div>

      {/* Dashboard Content: Future Range Section */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="card-title">Future Battery Range</h5>
            </div>
            <div className="card-body">
              <FutureRange />
            </div>
          </div>
        </div>

        {/* Additional Dashboard Panels (PercentageFuture component) */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="card-title">Battery Percentage</h5>
            </div>
            <div className="card-body">
              <PercentageFuture />
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Row for MilesLost Chart */}
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="card-title">Miles Lost Analysis</h5>
            </div>
            <div className="card-body">
              <MilesLost />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalysis;
