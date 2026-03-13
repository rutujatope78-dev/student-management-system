import React, { useEffect, useState } from "react";
import { Card, Row, Col, ProgressBar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({});
  const [notices, setNotices] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const savedStudent = JSON.parse(localStorage.getItem("student")) || {};
    setStudent(savedStudent);

    const savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(savedNotices);

    const savedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(savedSubjects);

    const savedAttendance = JSON.parse(localStorage.getItem("attendance")) || [];

    const attendanceArray = Array.isArray(savedAttendance)
      ? savedAttendance
      : Object.values(savedAttendance).flat();

    setAttendance(attendanceArray);
  }, []);

  const totalClasses = attendance.length;
  const presentClasses = attendance.filter((item) => item.status === "Present").length;
  const absentClasses = attendance.filter((item) => item.status === "Absent").length;
  const percentage = totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(0) : 0;

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/login");
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Dashboard</h2>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Card className="shadow mb-4 p-3" style={{ background: "#247cc9", color: "white" }}>
        <h5>Student Information</h5>
        <p><b>Name:</b> {student?.name}</p>
        <p><b>Email:</b> {student?.email}</p>
      </Card>

      <Row className="text-center">

        <Col md={3}>
          <Card className="shadow p-3" style={{ background: "#1e5072", color: "white" }}>
            <h6>Total Classes</h6>
            <h3>{totalClasses}</h3>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow p-3" style={{ background: "#1e3a8a", color: "white" }}>
            <h6>Present</h6>
            <h3>{presentClasses}</h3>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow p-3" style={{ background: "#7f1d1d", color: "white" }}>
            <h6>Absent</h6>
            <h3>{absentClasses}</h3>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow p-3" style={{ background: "#3f6212", color: "white" }}>
            <h6>Subjects</h6>
            <h3>{subjects.length}</h3>
          </Card>
        </Col>

      </Row>

      <Card className="shadow mt-4 p-3" style={{ background: "#0f172a", color: "white" }}>
        <h6>Attendance Percentage</h6>
        <ProgressBar now={percentage} label={`${percentage}%`} />
      </Card>

      <Card className="shadow mt-4 p-3 text-center" style={{ background: "#798d13", color: "white" }}>
        <h6>Total Notices</h6>
        <h3>{notices.length}</h3>
      </Card>

    </div>
  );
};

export default StudentDashboard;