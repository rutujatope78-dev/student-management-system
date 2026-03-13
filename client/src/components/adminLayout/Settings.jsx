import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Badge } from "react-bootstrap";

const Setting = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    role: "Admin",
    status: "Active",
  });

  // Load data from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(saved);
  }, []);

  // Save data to localStorage
  const saveToStorage = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  };

  // Add User
  const handleAdd = (e) => {
    e.preventDefault();

    if (!user.name) {
      alert("Please enter name");
      return;
    }

    const updated = [...users, user];
    setUsers(updated);
    saveToStorage(updated);

    setUser({ name: "", role: "Admin", status: "Active" });
  };

  // Toggle Status
  const toggleStatus = (index) => {
    const updated = [...users];
    updated[index].status =
      updated[index].status === "Active" ? "Inactive" : "Active";

    setUsers(updated);
    saveToStorage(updated);
  };

  // Delete User
  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
    saveToStorage(updated);
  };

  return (
    <Container className="mt-4">
      <h3>Admin Settings</h3>

      {/* Add User Form */}
      <Form onSubmit={handleAdd}>
        <Form.Control
          type="text"
          placeholder="User Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <Form.Select
          className="mt-2"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="User">User</option>
        </Form.Select>

        <Button type="submit" className="mt-2">
          Add User
        </Button>
      </Form>

      {/* Table */}
      <Table className="mt-4" striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((u, index) => (
              <tr key={index}>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>
                  {u.status === "Active" ? (
                    <Badge bg="success">Active</Badge>
                  ) : (
                    <Badge bg="danger">Inactive</Badge>
                  )}
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => toggleStatus(index)}
                    className="me-2"
                  >
                    Toggle
                  </Button>

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
              <td colSpan="4" className="text-center">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Setting;