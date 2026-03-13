import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentLayout = () => {
  const student = JSON.parse(localStorage.getItem("student"));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#1f2937",
          color: "white",
          padding: "20px",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Student Panel</h3>

        <NavLink
          to="/student/dashboard"
          style={({ isActive }) => ({
            display: "block",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            textDecoration: "none",
            color: "white",
            background: isActive ? "#6c63ff" : "transparent",
          })}
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/student/profile"
          style={({ isActive }) => ({
            display: "block",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            textDecoration: "none",
            color: "white",
            background: isActive ? "#6c63ff" : "transparent",
          })}
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/student/attendance"
          style={({ isActive }) => ({
            display: "block",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            textDecoration: "none",
            color: "white",
            background: isActive ? "#6c63ff" : "transparent",
          })}
        >
          📅 Attendance
        </NavLink>

        <NavLink
          to="/student/subjects"
          style={({ isActive }) => ({
            display: "block",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            textDecoration: "none",
            color: "white",
            background: isActive ? "#6c63ff" : "transparent",
          })}
        >
          📚 Subjects
        </NavLink>

        <NavLink
          to="/student/notice"
          style={({ isActive }) => ({
            display: "block",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            textDecoration: "none",
            color: "white",
            background: isActive ? "#6c63ff" : "transparent",
          })}
        >
          📢 Notices
        </NavLink>

        <NavLink
          to="/student/settings"
          style={({ isActive }) => ({
            display: "block",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            textDecoration: "none",
            color: "white",
            background: isActive ? "#6c63ff" : "transparent",
          })}
        >
          ⚙ Settings
        </NavLink>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f4f6f9", padding: "20px" }}>

        {/* Welcome Banner */}
        <div
          style={{
            background: "linear-gradient(90deg, #6c63ff, #00c9a7)",
            padding: "20px",
            borderRadius: "15px",
            color: "white",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2>Good Morning, {student?.name || "Student"} 👋</h2>
            <p>Welcome back to your dashboard!</p>
            <p>
              <strong>Class:</strong> {student?.class || "N/A"} | 
              <strong> Roll No:</strong> {student?.rollNo || "N/A"}
            </p>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "white",
              padding: "5px",
            }}
          />
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;