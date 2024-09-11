import React, { useEffect } from "react";
import axios from "axios";

const PredictiveAnalysis = () => {
  useEffect(() => {
    const sendUserId = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Assuming userId is already stored in localStorage

        if (userId) {
          const response = await axios.post(
            `${process.env.REACT_APP_USERID}/${userId}`
          );
          console.log("User ID sent successfully:", response.data);
        } else {
          console.error("No user ID found in localStorage.");
        }
      } catch (error) {
        console.error("Error sending user ID:", error);
      }
    };

    // Call the function when the component mounts
    sendUserId();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return <div>Coming Soon!</div>;
};

export default PredictiveAnalysis;
