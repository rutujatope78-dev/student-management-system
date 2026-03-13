import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaUserPlus,
  FaUserCircle,
  FaBell,
  FaCalendarCheck,
  FaCog,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import AddStudent from "./AddStudent";
import Profile from "./Profile";
import Notice from "./Notice";
import Attendance from "./Attendance";
import Settings from "./Settings";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadStudents = () => {
      const saved = JSON.parse(localStorage.getItem("students")) || [];
      setStudents(saved);
    };

    loadStudents();
    window.addEventListener("storage", loadStudents);

    return () => window.removeEventListener("storage", loadStudents);
  }, []);

  // Attendance graph data
  const present = students.filter(s => s.status === "Approved").length;
  const absent = students.length - present;

  const graphData = [
    { name: "Present", count: present },
    { name: "Absent", count: absent }
  ];

  const total = students.length;
  const approved = present;
  const pending = students.filter(s => s.status !== "Approved").length;

  const renderContent = () => {
    switch (activePage) {

      case "Dashboard":
        return (
          <div>

            {/* Cards */}
            <div className="card-container">

              <div className="card gradient1">
                <h4>Total Students</h4>
                <p>{total}</p>
              </div>

              <div className="card gradient2">
                <h4>Approved Students</h4>
                <p>{approved}</p>
              </div>

              <div className="card gradient3">
                <h4>Pending Approval</h4>
                <p>{pending}</p>
              </div>

            </div>

            {/* Graph */}
            <div className="graph-container">
              <h3>Attendance Graph</h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={graphData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0072ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        );

      case "Add Student":
        return <AddStudent />;

      case "Profile":
        return <Profile />;

      case "Notices":
        return <Notice />;

      case "Attendance":
        return <Attendance />;

      case "Settings":
        return <Settings />;

      default:
        return <h3>Welcome</h3>;
    }
  };

  return (
    <div className="dashboard-container">

      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>

        <div className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </div>

        <h3 className="logo">{isOpen ? "Admin Panel" : "AP"}</h3>

        <ul>

          <li className={activePage === "Dashboard" ? "active" : ""} onClick={() => setActivePage("Dashboard")}>
            <FaTachometerAlt />
            <span>{isOpen && "Dashboard"}</span>
          </li>

          <li className={activePage === "Add Student" ? "active" : ""} onClick={() => setActivePage("Add Student")}>
            <FaUserPlus />
            <span>{isOpen && "Add Student"}</span>
          </li>

          <li className={activePage === "Profile" ? "active" : ""} onClick={() => setActivePage("Profile")}>
            <FaUserCircle />
            <span>{isOpen && "Profile"}</span>
          </li>

          <li className={activePage === "Notices" ? "active" : ""} onClick={() => setActivePage("Notices")}>
            <FaBell />
            <span>{isOpen && "Notices"}</span>
          </li>

          <li className={activePage === "Attendance" ? "active" : ""} onClick={() => setActivePage("Attendance")}>
            <FaCalendarCheck />
            <span>{isOpen && "Attendance"}</span>
          </li>

          <li className={activePage === "Settings" ? "active" : ""} onClick={() => setActivePage("Settings")}>
            <FaCog />
            <span>{isOpen && "Settings"}</span>
          </li>

          <li className="logout">
            <FaSignOutAlt />
            <span>{isOpen && "Logout"}</span>
          </li>

        </ul>
      </div>

      <div className="main-content">
        <h2>{activePage}</h2>
        {renderContent()}
      </div>

      <style>{`

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          background: #f4f6fb;
        }

        .sidebar {
          background: linear-gradient(180deg, #0f172a, #1e3a8a);
          color: white;
          transition: width 0.3s ease;
          overflow: hidden;
          box-shadow: 4px 0px 20px rgba(0, 0, 0, 0.3);
        }

        .sidebar.open {
          width: 260px;
        }

        .sidebar.collapsed {
          width: 80px;
        }

        .toggle-btn {
          font-size: 22px;
          padding: 18px;
          cursor: pointer;
        }

        .logo {
          text-align: center;
          padding: 20px 0;
          font-size: 22px;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 14px 18px;
          margin: 6px 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
          font-size: 15px;
        }

        li:hover {
          background: linear-gradient(90deg, #ff512f, #dd2476);
          transform: translateX(6px);
          box-shadow: 0 5px 15px rgba(255, 81, 47, 0.4);
        }

        li.active {
          background: linear-gradient(90deg, #11998e, #38ef7d);
        }

        .logout {
          background: linear-gradient(90deg, #ff416c, #ff4b2b);
          margin-top: 20px;
        }

        .main-content {
          flex: 1;
          padding: 40px;
          background: white;
          border-radius: 25px 0 0 0;
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .card {
          padding: 20px;
          border-radius: 12px;
          color: white;
        }

        .gradient1 { background: linear-gradient(45deg, #00c6ff, #0072ff); }
        .gradient2 { background: linear-gradient(45deg, #ff512f, #dd2476); }
        .gradient3 { background: linear-gradient(45deg, #11998e, #38ef7d); }

        .graph-container {
          margin-top: 30px;
          padding: 20px;
          background: white;
          border-radius: 12px;
        }

      `}</style>

    </div>
  );
};

export default AdminDashboard;