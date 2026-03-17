import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    course: "",
    year: "",
  });

  const [message, setMessage] = useState(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://https://student-management-system-zdxk.onrender.com/api/users/register",
        formData
      );

      // ✅ Save in localStorage
      localStorage.setItem("admin", JSON.stringify(formData));

      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));

      setMessage({ text: res.data.message, type: "success" });

      // Redirect to Profile
      setTimeout(() => {
        navigate("/profile");
      }, 1000);

      setFormData({
        name: "",
        email: "",
        contact: "",
        password: "",
        course: "",
        year: "",
      });

      setValidated(false);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Something went wrong ❌",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Body>

              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Create Account</h2>
                <p className="text-muted">Please fill in your details</p>
              </div>

              {message && (
                <Alert variant={message.type}>{message.text}</Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Course</Form.Label>
                  <Form.Select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Course --</option>
                    <option value="BSC">BSC</option>
                    <option value="BCA">BCA</option>
                    <option value="BE">BE</option>
                    <option value="BBA">BBA</option>
                    <option value="BCom">BCom</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Year --</option>
                    <option value="I">I Year</option>
                    <option value="II">II Year</option>
                    <option value="III">III Year</option>
                    <option value="IV">IV Year</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Register"}
                  </Button>
                </div>

              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
