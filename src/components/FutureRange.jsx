import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import dayjs from "dayjs";
import "chartjs-adapter-date-fns"; // Import the date adapter
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const FutureRange = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null); // Reference for canvas element
  const chartInstance = useRef(null); // Reference to store Chart.js instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.REACT_APP_ANALYZED}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setData(response.data.data);
          //   console.log(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      const today = dayjs(); // Get today's date
      const past30Days = today.subtract(30, "day"); // Get the date 30 days ago

      // Filter data to show only the past 30 days and future data
      const filteredData = data.filter((point) => {
        const date = dayjs(point.ds);
        return (
          date.isAfter(past30Days) ||
          date.isSame(past30Days) ||
          date.isAfter(today)
        );
      });

      // Prepare datasets for Chart.js
      const chartData = {
        labels: filteredData.map((point) => point.ds), // Labels are the dates
        datasets: [
          {
            label: "Predicted Miles",
            data: filteredData.map((point) => ({
              x: point.ds, // Date
              y: point.yhat, // Miles (yhat)
            })),
            borderColor: (ctx) => {
              // Ensure ctx.raw exists before accessing properties
              return ctx.raw && dayjs(ctx.raw.x).isBefore(today, "day")
                ? "red"
                : "blue";
            }, // Color based on whether it's in the past or future
            borderWidth: 2,
            segment: {
              borderColor: (ctx) => {
                // Ensure ctx.p0.parsed.x exists before accessing properties
                return ctx.p0 && dayjs(ctx.p0.parsed.x).isBefore(today, "day")
                  ? "red"
                  : "blue";
              },
            },
            fill: false, // No background color
          },
        ],
      };

      // Destroy the previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create the chart
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true, // Ensure the chart resizes with its container
          maintainAspectRatio: false, // Disable default aspect ratio to control height
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Miles Range (yhat)",
              },
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
  }, [data]);

  // Clean up chart when the component is unmounted
  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container mt-4">
      <div className="row mb-4"></div>

      <div
        className="card p-4 shadow-sm mb-4"
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
        <div style={{ position: "relative", height: "400px", width: "100%" }}>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default FutureRange;
