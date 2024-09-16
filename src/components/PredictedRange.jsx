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
import "chartjs-adapter-date-fns";

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

// Helper function to group and average data by just the date part (ignoring time)
const averageByDate = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const date = new Date(item.ds).toISOString().split("T")[0]; // Extract the date part (ignore time)
    if (!acc[date]) {
      acc[date] = { sum: 0, count: 0 };
    }
    acc[date].sum += item.yhat;
    acc[date].count += 1;
    return acc;
  }, {});

  // Convert grouped object to array and sort by date
  return Object.keys(groupedData)
    .map((date) => ({
      ds: date,
      yhat: groupedData[date].sum / groupedData[date].count, // Calculate average yhat for the date
    }))
    .sort((a, b) => new Date(a.ds) - new Date(b.ds)); // Sort by date
};

const PredictedRange = () => {
  const [data, setData] = useState([]);

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
          // Filter the data to include only future dates
          const filteredData = response.data.data.filter(
            (item) => new Date(item.ds) >= new Date()
          );

          // Calculate the average yhat for each date (ignoring time)
          const averagedData = averageByDate(filteredData);
          
          // Log the averaged data for debugging
          console.log(averagedData);

          // Set the averaged data for the chart
          setData(averagedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item.ds), // Dates on the X-axis (date only)
    datasets: [
      {
        label: "Predicted Values",
        data: data.map((item) => item.yhat), // Averaged yhat values on the Y-axis
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false, // Line without fill
        tension: 0, // Set to 0 to remove smoothing and reduce erratic curves
        pointRadius: 2, // Reduce point size
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color of the points
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
        ticks: {
          source: "data", // Use data source for better tick accuracy
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
      <h4 style={{ color: "white", textAlign: "center" }}>Predicted Range</h4>
      <div style={{ position: "relative", width: "100%", height: "350px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PredictedRange;