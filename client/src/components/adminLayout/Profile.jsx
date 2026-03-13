import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaSave,
  FaCamera,
  FaLock,
  FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    photo: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // ✅ Load data automatically after register
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");

    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.length > 0) {
        const lastUser = users[users.length - 1];
        setAdmin(lastUser);
        localStorage.setItem("admin", JSON.stringify(lastUser));
      }
    }
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    localStorage.setItem("admin", JSON.stringify(admin));

    // Also update in users array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.email === admin.email ? admin : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setIsEditing(false);
    alert("Profile Updated Successfully ✅");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedAdmin = { ...admin, photo: reader.result };
      setAdmin(updatedAdmin);
      localStorage.setItem("admin", JSON.stringify(updatedAdmin));
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordChange = () => {
    if (!newPassword) {
      alert("Enter New Password ❌");
      return;
    }

    const updatedAdmin = { ...admin, password: newPassword };
    setAdmin(updatedAdmin);
    localStorage.setItem("admin", JSON.stringify(updatedAdmin));

    setNewPassword("");
    alert("Password Changed Successfully 🔐");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-header">
          <div className="photo-section">
            <img
              src={
                admin.photo ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="profile-photo"
            />
            <label className="upload-btn">
              <FaCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                hidden
              />
            </label>
          </div>

          <h2>{admin.name || "Admin Name"}</h2>
          <span className="badge">Admin</span>
        </div>

        <div className="profile-body">

          <label>Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={admin.name}
              onChange={handleChange}
            />
          ) : (
            <p>{admin.name}</p>
          )}

          <label>Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={handleChange}
            />
          ) : (
            <p><FaEnvelope /> {admin.email}</p>
          )}

          <label>Phone</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={admin.phone}
              onChange={handleChange}
            />
          ) : (
            <p><FaPhone /> {admin.phone}</p>
          )}
        </div>

        <div className="profile-footer">
          {isEditing ? (
            <button className="update-btn" onClick={handleUpdate}>
              <FaSave /> Update Profile
            </button>
          ) : (
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        <div className="password-section">
          <h4><FaLock /> Change Password</h4>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="password-btn"
            onClick={handlePasswordChange}
          >
            Change Password
          </button>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <style>{`
        .profile-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f4f7fc;
        }

        .profile-card {
          width: 420px;
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }

        .profile-header {
          text-align: center;
        }

        .photo-section {
          position: relative;
          display: inline-block;
        }

        .profile-photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #0072ff;
        }

        .upload-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #0072ff;
          color: white;
          padding: 5px;
          border-radius: 50%;
          cursor: pointer;
        }

        .badge {
          display: inline-block;
          margin-top: 5px;
          padding: 4px 10px;
          background: #28a745;
          color: white;
          border-radius: 20px;
          font-size: 12px;
        }

        label {
          font-weight: 600;
          margin-top: 10px;
          display: block;
        }

        p {
          margin: 5px 0 10px;
        }

        input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .edit-btn, .update-btn {
          width: 100%;
          padding: 8px;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
        }

        .edit-btn {
          background: #0072ff;
        }

        .update-btn {
          background: #28a745;
        }

        .password-section {
          margin-top: 20px;
        }

        .password-btn {
          width: 100%;
          padding: 8px;
          background: #ff9800;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
        }

        .logout-btn {
          margin-top: 15px;
          width: 100%;
          padding: 8px;
          background: #dc3545;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Profile;