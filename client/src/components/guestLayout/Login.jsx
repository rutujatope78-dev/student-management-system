import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("info");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        formData
      );

      console.log("LOGIN RESPONSE:", res.data); // Debug

      // ✅ Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("student", JSON.stringify(res.data.user));

      setVariant("success");
      setMessage("Login successful ✅");

      // ✅ Safe Role Handling
      const role = res.data.user?.role?.toLowerCase();

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "student") {
        navigate("/student");
      } else {
        // agar role missing ho to student bhej do
        navigate("/student");
      }

    } catch (err) {
      setVariant("danger");
      setMessage(err.response?.data?.message || "Login failed ❌");
      console.log("LOGIN ERROR:", err);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>

              {message && <Alert variant={variant}>{message}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="mt-4 w-100">
                  Login
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <a href="/forgot-password" className="text-primary">
                  Forgot Password?
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;