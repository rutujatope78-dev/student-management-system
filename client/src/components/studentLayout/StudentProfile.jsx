import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function StudentProfile() {

  const navigate = useNavigate();

  const savedStudent = JSON.parse(localStorage.getItem("student"));

  const [student, setStudent] = useState(savedStudent);
  const [edit, setEdit] = useState(false);
  const [photo, setPhoto] = useState(savedStudent?.photo || "");

  if (!student) {
    return <h2>Please Login First</h2>;
  }

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // 📷 Photo Upload
  const handlePhoto = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {

    const updatedStudent = {
      ...student,
      photo: photo
    };

    localStorage.setItem("student", JSON.stringify(updatedStudent));

    setStudent(updatedStudent);
    setEdit(false);
  };

  const logout = () => {
    localStorage.removeItem("student");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center mt-5">

      <Card style={{ width: "400px" }} className="shadow">

        <Card.Body className="text-center">

          <h3 className="mb-4">Student Profile</h3>

          {/* Profile Photo */}
          <img
            src={photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "15px"
            }}
          />

          {edit && (
            <Form.Group className="mb-3">
              <Form.Control type="file" onChange={handlePhoto} />
            </Form.Group>
          )}

          {edit ? (
            <div>

              <Form.Control
                className="mb-3"
                type="text"
                name="name"
                value={student.name || ""}
                onChange={handleChange}
              />

              <Form.Control
                className="mb-3"
                type="email"
                name="email"
                value={student.email || ""}
                onChange={handleChange}
              />

              <Button variant="success" onClick={saveProfile}>
                Save Profile
              </Button>

            </div>
          ) : (
            <div>

              <h5>{student.name}</h5>
              <p>{student.email}</p>

              <Button
                variant="primary"
                className="me-2"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </Button>

            </div>
          )}

          <br />

          <Button
            variant="danger"
            className="mt-3"
            onClick={logout}
          >
            Logout
          </Button>

        </Card.Body>

      </Card>

    </div>
  );
}

export default StudentProfile;