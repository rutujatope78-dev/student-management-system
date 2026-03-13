import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Row, Col, Badge } from "react-bootstrap";

const AddStudent = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    contact: "",
    className: "",
    year: "",
    status: "Pending"
  });

  // 🔹 Load Data
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];

    const updated = savedStudents.map((s) => ({
      ...s,
      status: s.status ? s.status : "Pending"
    }));

    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
  }, []);

  // 🔹 Handle Input
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Add Student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !student.name ||
      !student.email ||
      !student.course ||
      !student.contact ||
      !student.className ||
      !student.year
    ) {
      alert("Please fill all fields");
      return;
    }

    const updatedStudents = [...students, student];
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setStudent({
      name: "",
      email: "",
      course: "",
      contact: "",
      className: "",
      year: "",
      status: "Pending"
    });
  };

  // 🔹 Approve Student
  const handleApprove = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].status = "Approved";

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  // 🔹 Delete Student
  const handleDelete = (index) => {
    const filtered = students.filter((_, i) => i !== index);
    setStudents(filtered);
    localStorage.setItem("students", JSON.stringify(filtered));
  };

  // 🔹 Search Filter
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase()) ||
    s.contact.includes(search) ||
    s.className.toLowerCase().includes(search.toLowerCase()) ||
    s.year.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">

      <h3 className="mb-3">Add Student</h3>

      {/* 🔹 Form */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={student.email}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Course"
              name="course"
              value={student.course}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Contact"
              name="contact"
              value={student.contact}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Class"
              name="className"
              value={student.className}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <Form.Select
              name="year"
              value={student.year}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              <option value="I">Year I</option>
              <option value="II">Year II</option>
              <option value="III">Year III</option>
              <option value="IV">Year IV</option>
            </Form.Select>
          </Col>
        </Row>

        <Button type="submit" className="mt-3">
          Save Student
        </Button>
      </Form>

      {/* 🔍 Search */}
      <Form.Control
        type="text"
        placeholder="Search..."
        className="mt-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📋 Table */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Contact</th>
            <th>Class</th>
            <th>Year</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((s, index) => (
              <tr key={index}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.course}</td>
                <td>{s.contact}</td>
                <td>{s.className}</td>
                <td>{s.year}</td>

                <td>
                  {s.status === "Approved" ? (
                    <Badge bg="success">Approved</Badge>
                  ) : (
                    <Badge bg="warning">Pending</Badge>
                  )}
                </td>

                <td>
                  {s.status !== "Approved" && (
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleApprove(index)}
                    >
                      Approve
                    </Button>
                  )}

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No Students Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

    </Container>
  );
};

export default AddStudent;