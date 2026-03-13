import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

const AttendanceSheet = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentYear, setStudentYear] = useState("");

  // Load from localStorage
  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    const savedAttendance = localStorage.getItem("attendance");

    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedAttendance) setAttendance(JSON.parse(savedAttendance));
  }, []);

  // Save to localStorage (manual button)
  const saveData = () => {
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("attendance", JSON.stringify(attendance));
    alert("Data Saved Successfully!");
  };

  // Add Student
  const addStudent = () => {
    if (!studentName || !studentClass || !studentYear) return;

    const exists = students.some(
      (s) => s.name.toLowerCase() === studentName.toLowerCase()
    );

    if (exists) return;

    setStudents([
      ...students,
      { name: studentName, className: studentClass, year: studentYear },
    ]);

    setStudentName("");
    setStudentClass("");
    setStudentYear("");
  };

  // Toggle Attendance
  const toggleAttendance = (student, day) => {
    setAttendance((prev) => ({
      ...prev,
      [student]: {
        ...prev[student],
        [day]: prev[student]?.[day] === "P" ? "A" : "P",
      },
    }));
  };

  return (
    <div className="container mt-4">
      <h2>Attendance Sheet</h2>

      {/* Add Student */}
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <input
          type="text"
          className="form-control"
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        />

        <select
          className="form-control"
          value={studentYear}
          onChange={(e) => setStudentYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value="I">Year I</option>
          <option value="II">Year II</option>
          <option value="III">Year III</option>
          <option value="IV">Year IV</option>
        </select>

        <button className="btn btn-primary" onClick={addStudent}>
          Add
        </button>

        {/* Save Button */}
        <button className="btn btn-success" onClick={saveData}>
          Save Data
        </button>
      </div>

      {/* Attendance Table */}
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Year</th>
              {daysInMonth.map((day) => (
                <th key={day}>{day}</th>
              ))}
              <th>Total</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const total =
                attendance[student.name] &&
                Object.values(attendance[student.name]).filter((v) => v === "P")
                  .length;

              const percent = total
                ? ((total / daysInMonth.length) * 100).toFixed(2)
                : 0;

              return (
                <tr key={student.name}>
                  <td>{student.name}</td>
                  <td>{student.className}</td>
                  <td>{student.year}</td>

                  {daysInMonth.map((day) => (
                    <td
                      key={day}
                      onClick={() => toggleAttendance(student.name, day)}
                      style={{ cursor: "pointer" }}
                    >
                      {attendance[student.name]?.[day] || "-"}
                    </td>
                  ))}

                  <td>{total || 0}</td>
                  <td>{percent}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceSheet;