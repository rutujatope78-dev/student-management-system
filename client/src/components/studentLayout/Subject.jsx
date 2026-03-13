import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("subjects");
    if (saved) setSubjects(JSON.parse(saved));
  }, []);

  // Save to localStorage
  const saveToStorage = (data) => {
    localStorage.setItem("subjects", JSON.stringify(data));
  };

  // Add Subject
  const addSubject = () => {
    if (!subjectName || !teacherName || !teacherEmail) return;

    const newSubject = {
      id: Date.now(),
      subject: subjectName,
      teacher: teacherName,
      email: teacherEmail,
    };

    const updated = [...subjects, newSubject];
    setSubjects(updated);
    saveToStorage(updated);

    setSubjectName("");
    setTeacherName("");
    setTeacherEmail("");
  };

  // Delete Subject
  const deleteSubject = (id) => {
    const updated = subjects.filter((s) => s.id !== id);
    setSubjects(updated);
    saveToStorage(updated);
  };

  return (
    <div className="container mt-4">
      <h3>Subject Management (BE CSE)</h3>

      {/* Add Form */}
      <div className="card p-3 mb-4 shadow">
        <h5>Add Subject</h5>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Teacher Name"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Teacher Email"
          value={teacherEmail}
          onChange={(e) => setTeacherEmail(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addSubject}>
          Add Subject
        </button>
      </div>

      {/* Subject List */}
      <div className="row">
        {subjects.map((sub) => (
          <div className="col-md-4 mb-3" key={sub.id}>
            <div className="card shadow p-3">
              <h5>{sub.subject}</h5>
              <p><strong>Teacher:</strong> {sub.teacher}</p>
              <p><strong>Email:</strong> {sub.email}</p>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteSubject(sub.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subject;