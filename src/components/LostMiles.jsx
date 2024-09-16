import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Adapter for time parsing

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// Helper function to group and average data by date (ignoring time)
const averageByDate = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const date = new Date(item.ds).toISOString().split("T")[0]; // Extract the date part (ignore time)
    if (!acc[date]) {
      acc[date] = { sum: 0, count: 0 };
    }
    acc[date].sum += item.lostMiles;
    acc[date].count += 1;
    return acc;
  }, {});

  // Return array of {ds (date), lostMiles (average for the date)}
  return Object.keys(groupedData).map((date) => ({
    ds: date,
    lostMiles: groupedData[date].sum / groupedData[date].count, // Calculate average lostMiles for the date
  }));
};

const LostMiles = () => {
  const [data, setData] = useState([]);
  const fullRange = parseFloat(localStorage.getItem("fullRange")); // Fetch fullRange only once outside useEffect

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const response = await axios.get(
          `${process.env.REACT_APP_ANALYZED}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Filter the data to include only future dates and calculate lost miles
          const filteredData = response.data.data
            .filter((item) => new Date(item.ds) >= new Date())
            .map((item) => ({
              ...item,
              lostMiles: fullRange - item.yhat, // Calculate lost miles by deducting yhat from fullRange
            }));

          // Calculate the average lostMiles for each date (ignoring time)
          const averagedData = averageByDate(filteredData);

          // Set the averaged data for the chart
          setData(averagedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [fullRange]); // Re-run if fullRange changes

  const chartData = {
    labels: data.map((item) => item.ds), // Dates on the X-axis (date only)
    datasets: [
      {
        label: "Lost Miles",
        data: data.map((item) => item.lostMiles), // Averaged lost miles on the Y-axis
        borderColor: "rgba(255, 99, 132, 1)", // Line color (Red)
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Line background
        fill: false, // Do not fill below the line
        tension: 0.3, // Increase smoothness of the line
        pointRadius: 2, // Reduce point size
        pointBackgroundColor: "rgba(255, 99, 132, 1)", // Color of the points
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill the container
    scales: {
      x: {
        type: "time", // Set X axis as time
        time: {
          unit: "day", // Display by day (ignoring time)
        },
      },
      y: {
        beginAtZero: false, // Do not start Y-axis at zero if unnecessary
        ticks: {
          maxTicksLimit: 6, // Limit number of ticks on Y-axis
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h4 style={{ color: "white", textAlign: "center" }}>Lost Miles</h4>
      <div style={{ position: "relative", width: "100%", height: "350px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LostMiles;