import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  // Check if admin is logged in
  const token = localStorage.getItem("token");

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        bg="dark"
        className="shadow"
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/home">
            🎓 Student Management System
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">

              <Nav.Link as={NavLink} to="/home">
                Home
              </Nav.Link>

              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>

              {/* Show Login if NOT logged in */}
              {!token && (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}

              {/* Show Logout if logged in */}
              {token && (
                <Nav.Link
                  onClick={handleLogout}
                  style={{ cursor: "pointer", color: "#ff4d4d" }}
                >
                  Logout
                </Nav.Link>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;