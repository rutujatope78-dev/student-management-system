import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentAttendance = () => {

  const [search, setSearch] = useState("");
  const [records, setRecords] = useState(null);

  const handleSearch = () => {

    let allAttendance = localStorage.getItem("attendance");

    if (!allAttendance) {
      alert("No attendance data found");
      return;
    }

    try {
      allAttendance = JSON.parse(allAttendance);
    } catch {
      alert("Attendance data corrupted");
      return;
    }

    if (typeof allAttendance !== "object") {
      alert("Invalid attendance format");
      return;
    }

    const foundKey = Object.keys(allAttendance).find(
      (key) => key.toLowerCase() === search.toLowerCase()
    );

    if (foundKey) {
      setRecords({
        name: foundKey,
        data: allAttendance[foundKey]
      });
    } else {
      setRecords(null);
      alert("No record found!");
    }
  };

  if (!records) {
    return (
      <div className="container mt-4">
        <div className="card shadow p-4">
          <h3>Search Student Attendance</h3>

          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter student name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

        </div>
      </div>
    );
  }

  const totalDays = 30;

  const totalPresent = Object.values(records.data || {}).filter(
    (v) => v === "P"
  ).length;

  const totalAbsent = totalDays - totalPresent;

  const percentage =
    totalDays > 0
      ? ((totalPresent / totalDays) * 100).toFixed(2)
      : 0;

  const pieData = [
    { name: "Present", value: totalPresent },
    { name: "Absent", value: totalAbsent }
  ];

  const COLORS = ["#28a745", "#dc3545"];

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">
        <h3>Attendance Report</h3>

        <p><b>Name:</b> {records.name}</p>
        <p><b>Total Classes:</b> {totalDays}</p>
        <p><b>Present:</b> {totalPresent}</p>
        <p><b>Absent:</b> {totalAbsent}</p>
        <p><b>Attendance %:</b> {percentage}%</p>

        <button
          className="btn btn-secondary"
          onClick={() => setRecords(null)}
        >
          Search Again
        </button>

      </div>

      <div className="card shadow p-4 mt-4">
        <h4 className="text-center">Attendance Graph</h4>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="table-responsive mt-4">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              {Array.from({ length: 30 }, (_, i) => (
                <th key={i}>{i + 1}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              {Array.from({ length: 30 }, (_, i) => (
                <td key={i}>
                  <span
                    className={
                      records.data?.[i + 1] === "P"
                        ? "badge bg-success"
                        : records.data?.[i + 1] === "A"
                        ? "badge bg-danger"
                        : "badge bg-secondary"
                    }
                  >
                    {records.data?.[i + 1] || "-"}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default StudentAttendance;