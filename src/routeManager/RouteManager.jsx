import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Signup from "../routes/Signup";
import Entries from "../routes/Entries";
import PredictiveAnalysis from "../routes/PredictiveAnalysis";
import RawData from "../routes/RawData";
import ProtectedRoute from "../components/ProtectedRoute"; // Import the protected route

const RouteManager = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Only run this once to avoid unnecessary re-renders
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout isLoggedIn={isLoggedIn} handleLogin={handleLogin} />}
        >
          <Route index element={<Home />} />
          <Route path="login" element={<Login handleLogin={handleLogin} />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="entries"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Entries />
              </ProtectedRoute>
            }
          />
          <Route
            path="rawdata"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <RawData />
              </ProtectedRoute>
            }
          />
          <Route
            path="predictive"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PredictiveAnalysis />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
