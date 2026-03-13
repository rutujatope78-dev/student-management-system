import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("studentToken");

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");

    navigate("/login");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/student/dashboard">
          🎓 Student Panel
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/student/dashboard">
              Dashboard
            </Nav.Link>

            {token && (
              <Button
                variant="danger"
                onClick={handleLogout}
                className="ms-2"
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default StudentNavbar;