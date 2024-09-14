import React, { useEffect, useState } from "react";
import Logo from "../images/logo.webp";
import axios from "axios";
import { CSVLink } from "react-csv"; // Library for CSV download
import { format } from "date-fns"; // Import date-fns for date formatting

const RawData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `${process.env.REACT_APP_RAW_DATA}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data.data.length > 0) {
          setData(response.data.data);
          // console.log(response.data.data);
          setFilteredData(response.data.data); // Initialize filtered data
          return true; // Indicate data is fetched
        }
      } catch (error) {
        console.log(error);
      }
      return false; // Indicate fetch failed or data is not yet available
    };

    // Fetch data immediately and then set an interval
    fetchData().then((dataFetched) => {
      if (!dataFetched) {
        const intervalId = setInterval(async () => {
          const dataFetchedInInterval = await fetchData();
          if (dataFetchedInInterval) {
            clearInterval(intervalId); // Stop fetching once data is fetched
          }
        }, 10000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
      }
    });
  }, []);

  // Utility function to handle and format date strings using date-fns
  const formatDate = (dateString) => {
    try {
      const validDate = dateString.split(" ")[0]; // Get only the date part (before the time)
      return format(new Date(validDate), "MM/dd/yyyy"); // Format as needed (MM/DD/YYYY)
    } catch (error) {
      return "Invalid Date"; // Fallback in case of a format error
    }
  };

  // Filter data by search date
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchDate(value);

    const filtered = data.filter((dat) => {
      return dat.date.includes(value);
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  // Sorting logic
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Prepare CSV data
  const headers = [
    { label: "Date", key: "date" },
    { label: "Full Range", key: "fullRange" },
    { label: "Current Range", key: "current_miles" },
    { label: "Lost Miles", key: "lost_miles" },
    { label: "Lost Percentage", key: "lost_percentage" },
  ];

  const csvData = filteredData.map((dat) => ({
    date: dat.date,
    fullRange: dat.fullRange,
    current_miles: dat.current_miles,
    lost_miles: dat.lost_miles,
    lost_percentage: dat.lost_percentage,
  }));

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <img
          src={Logo}
          alt="logo"
          className="mb-4"
          style={{ width: "150px", borderRadius: "50px" }}
        />
        <h1 className="mb-3">Raw Data</h1>
      </div>

      {/* Search by Date */}
      <div className="row mb-3">
        <div className="col-md-4 offset-md-4">
          <input
            type="date"
            className="form-control"
            value={searchDate}
            onChange={handleSearch}
            placeholder="Search by Date"
          />
        </div>
      </div>

      {/* CSV Download */}
      <div className="text-end mb-3">
        <CSVLink
          data={csvData}
          headers={headers}
          filename="raw_data.csv"
          className="btn btn-success"
        >
          Download CSV
        </CSVLink>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table
          className="table table-bordered table-striped"
          style={{ textAlign: "center" }}
        >
          <thead className="table-dark">
            <tr>
              <th
                onClick={() => handleSort("date")}
                style={{ cursor: "pointer" }}
              >
                Date{" "}
                {sortConfig.key === "date" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("fullRange")}
                style={{ cursor: "pointer" }}
              >
                Full Range{" "}
                {sortConfig.key === "fullRange" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("current_miles")}
                style={{ cursor: "pointer" }}
              >
                Current Range{" "}
                {sortConfig.key === "current_miles" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("lost_miles")}
                style={{ cursor: "pointer" }}
              >
                Lost Miles{" "}
                {sortConfig.key === "lost_miles" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("lost_percentage")}
                style={{ cursor: "pointer" }}
              >
                Lost Percentage{" "}
                {sortConfig.key === "lost_percentage" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {currentItems.map((dat) => (
              <tr key={dat._id}>
                <td>
                  {isNaN(new Date(dat.date))
                    ? "Invalid Date"
                    : formatDate(dat.date)}
                </td>
                <td>{dat.fullRange.toFixed()}</td>
                <td>{dat.current_miles.toFixed()}</td>
                <td>{dat.lost_miles.toFixed()}</td>
                <td>{dat.lost_percentage.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default RawData;
