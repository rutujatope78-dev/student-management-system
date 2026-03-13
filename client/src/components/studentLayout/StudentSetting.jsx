import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const StudentSetting = () => {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    photo: ""
  });

  useEffect(() => {
    const savedStudent = JSON.parse(localStorage.getItem("student"));
    if (savedStudent) {
      setStudent(savedStudent);
    }
  }, []);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent({
          ...student,
          photo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("student", JSON.stringify(student));
    alert("Settings Saved Successfully");
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh"
      }}
    >

      <Card
        style={{
          width: "380px",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >

        <h4 className="text-center mb-3">Student Settings</h4>

        <Form>

          <div className="text-center mb-3">

            <img
              src={
                student.photo ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="profile"
              width="80"
              height="80"
              style={{ borderRadius: "50%" }}
            />

          </div>

          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="sm"
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="sm"
              type="password"
              name="password"
              value={student.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control
              size="sm"
              type="file"
              onChange={handlePhoto}
            />
          </Form.Group>

          <Button
            variant="primary"
            size="sm"
            style={{ width: "100%" }}
            onClick={handleSave}
          >
            Save Changes
          </Button>

        </Form>

      </Card>

    </Container>
  );
};

export default StudentSetting;