import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function StudentLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      // Dummy token (after API use real token)
      const dummyToken = "studentToken123";

      localStorage.setItem("studentToken", dummyToken);
      localStorage.setItem("studentData", JSON.stringify(formData));

      alert("Login Successful ✅");
      navigate("/student/dashboard");
    } else {
      alert("Please fill all fields ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 col-md-6 mx-auto">
        <h3 className="text-center mb-4">Student Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <p className="text-center mt-3">
            Don't have an account? <Link to="/student-register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;