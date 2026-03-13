import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [notice, setNotice] = useState({
    title: "",
    description: "",
  });

  // Load notices
  useEffect(() => {
    const savedNotices = localStorage.getItem("notices");
    if (savedNotices) {
      setNotices(JSON.parse(savedNotices));
    }
  }, []);

  // Handle input
  const handleChange = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  // Add Notice
  const handleAddNotice = (e) => {
    e.preventDefault();

    if (!notice.title.trim() || !notice.description.trim()) {
      alert("Please fill all fields");
      return;
    }

    const newNotice = {
      id: Date.now(),   // unique id
      title: notice.title,
      description: notice.description,
      date: new Date().toLocaleString(),
    };

    const updatedNotices = [...notices, newNotice];

    setNotices(updatedNotices);
    localStorage.setItem("notices", JSON.stringify(updatedNotices));

    setNotice({ title: "", description: "" });
  };

  // Delete Notice
  const handleDelete = (id) => {
    const updatedNotices = notices.filter((n) => n.id !== id);
    setNotices(updatedNotices);
    localStorage.setItem("notices", JSON.stringify(updatedNotices));
  };

  return (
    <Container className="mt-4">
      <h2>Notice Management</h2>

      <Form onSubmit={handleAddNotice}>
        <Form.Group className="mb-2">
          <Form.Label>Notice Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={notice.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={notice.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Add Notice
        </Button>
      </Form>

      <h4 className="mt-4">All Notices</h4>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {notices.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No Notices Available
              </td>
            </tr>
          ) : (
            notices.map((n) => (
              <tr key={n.id}>
                <td>{n.title}</td>
                <td>{n.description}</td>
                <td>{n.date}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(n.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Notice;