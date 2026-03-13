import React from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentHome = () => {
  return (
    <>
      <style>
        {`
        .dashboard-container {
          background-color: #f4f6f9;
          min-height: 100vh;
        }

        .welcome-banner {
          background: linear-gradient(90deg, #6c63ff, #00c9a7);
          border-radius: 15px;
        }

        .profile-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: white;
          padding: 5px;
        }

        .stat-card {
          border: none;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: 0.3s;
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          background: #6c63ff;
          color: white;
        }

        .custom-card {
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }

        ul {
          padding-left: 20px;
        }

        ul li {
          margin-bottom: 10px;
        }
        `}
      </style>

      <Container fluid className="p-4 dashboard-container">
        
        {/* 🔹 Welcome Banner */}
        <div className="welcome-banner p-4 mb-4 text-white d-flex justify-content-between align-items-center">
          <div>
            <h2>Good Morning, Rutuja 👋</h2>
            <p>Welcome back to your dashboard!</p>
            <p><strong>Class:</strong> BCA | <strong>Roll No:</strong> 101</p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="profile-img"
          />
        </div>

        {/* 🔹 Statistics Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="stat-card text-center p-3">
              <h3>📚</h3>
              <h5>Total Subjects</h5>
              <h4>6</h4>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-card text-center p-3">
              <h3>📊</h3>
              <h5>Attendance</h5>
              <h4>85%</h4>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-card text-center p-3">
              <h3>📝</h3>
              <h5>Upcoming Exams</h5>
              <h4>2</h4>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-card text-center p-3">
              <h3>📢</h3>
              <h5>New Notices</h5>
              <h4>3</h4>
            </Card>
          </Col>
        </Row>

        {/* 🔹 Attendance & Activity */}
        <Row>
          <Col md={6}>
            <Card className="p-4 custom-card">
              <h5>Overall Attendance</h5>
              <ProgressBar now={85} label={`85%`} className="mb-3" />

              <h6>DBMS</h6>
              <ProgressBar now={90} className="mb-2" />

              <h6>Java</h6>
              <ProgressBar now={80} className="mb-2" />

              <h6>React</h6>
              <ProgressBar now={88} />
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-4 custom-card">
              <h5>Recent Activity</h5>
              <ul>
                <li>📢 New notice uploaded</li>
                <li>📝 React exam on 25th March</li>
                <li>📊 Attendance updated</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudentHome;