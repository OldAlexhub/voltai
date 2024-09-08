import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns"; // For date formatting in charts
import dayjs from "dayjs";

const MilesLost = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null); // Reference to canvas element
  const chartInstance = useRef(null); // Store chart instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const fullRange = parseFloat(localStorage.getItem("fullRange")); // Ensure fullRange is a number

        const response = await axios.get(
          `${process.env.REACT_APP_ANALYZED}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const fetchedData = response.data.data;

          // Filter data for only the last 30 days
          const today = dayjs(); // Get today's date
          const past30Days = today.subtract(30, "day"); // Subtract 30 days

          const filteredData = fetchedData.filter((item) => {
            const itemDate = dayjs(item.ds);
            return itemDate.isAfter(past30Days);
          });

          setData(filteredData);

          // Calculate miles lost: fullRange - yhat
          const milesLostData = filteredData.map((item) => {
            const predictedMiles = item.yhat;
            const milesLost = (fullRange - predictedMiles).toFixed(2); // Calculate miles lost
            return {
              date: item.ds,
              milesLost,
            };
          });

          // Prepare chart data
          const chartData = {
            labels: milesLostData.map((item) => item.date),
            datasets: [
              {
                label: "Miles Lost Over Time",
                data: milesLostData.map((item) => item.milesLost),
                borderColor: "red",
                borderWidth: 2,
                fill: false,
              },
            ],
          };

          // Destroy previous chart instance if exists
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }

          // Create new chart
          const ctx = chartRef.current.getContext("2d");
          chartInstance.current = new Chart(ctx, {
            type: "line",
            data: chartData,
            options: {
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "day",
                    tooltipFormat: "MMM dd, yyyy", // Fixed: Use `dd` instead of `DD`
                  },
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Miles Lost",
                  },
                  min: 0,
                  max: 20, // Set max to fullRange
                },
              },
              plugins: {
                legend: {
                  display: true,
                },
              },
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {/* Card for Chart */}
      <div
        className="card p-4 shadow-sm mb-4"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <div style={{ position: "relative", height: "500px", width: "100%" }}>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default MilesLost;
