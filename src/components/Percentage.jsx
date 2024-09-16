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
    acc[date].sum += item.percentage;
    acc[date].count += 1;
    return acc;
  }, {});

  // Return array of {ds (date), percentage (average for the date)}
  return Object.keys(groupedData).map((date) => ({
    ds: date,
    percentage: groupedData[date].sum / groupedData[date].count, // Calculate average percentage for the date
  }));
};

const Percentage = () => {
  const [data, setData] = useState([]);
  const fullRange = parseFloat(localStorage.getItem("fullRange")); // Get fullRange from localStorage once

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
          // Filter the data to include only future dates and calculate the percentage
          const filteredData = response.data.data
            .filter((item) => new Date(item.ds) >= new Date())
            .map((item) => ({
              ...item,
              percentage: (item.yhat / fullRange) * 100, // Calculate percentage of yhat from fullRange
            }));

          // Calculate the average percentage for each date (ignoring time)
          const averagedData = averageByDate(filteredData);

          // Set the averaged data for the chart
          setData(averagedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [fullRange]); // UseEffect is dependent on fullRange, which doesn't change often

  const chartData = {
    labels: data.map((item) => item.ds), // Dates on the X-axis (date only)
    datasets: [
      {
        label: "Percentage of Full Range",
        data: data.map((item) => item.percentage), // Averaged percentage on the Y-axis
        borderColor: "rgba(54, 162, 235, 1)", // Line color (Blue)
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Line background
        fill: false, // Do not fill below the line
        tension: 0.3, // Increase smoothness of the line
        pointRadius: 2, // Reduce point size
        pointBackgroundColor: "rgba(54, 162, 235, 1)", // Color of the points
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill the container
    scales: {
      x: {
        type: "time", // Use time for the X-axis
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
      <h4 style={{ color: "white", textAlign: "center" }}>
        Percentage of Full Range
      </h4>
      <div style={{ position: "relative", width: "100%", height: "350px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Percentage;