import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

/* ================= GUEST ================= */
import GuestLayout from "./components/guestLayout/GuestLayout";
import Home from "./components/guestLayout/Home";
import Register from "./components/guestLayout/Register";
import Login from "./components/guestLayout/Login";
import ForgotPassword from "./components/guestLayout/ForgotPassword";
import StudentLogin from "./components/guestLayout/StudentLogin";
import StudentRegister from "./components/guestLayout/StudentRegister";

/* ================= ADMIN ================= */
import AdminLayout from "./components/adminLayout/AdminLayout";
import AdminDashboard from "./components/adminLayout/AdminDashboard";

/* ================= STUDENT ================= */
import StudentLayout from "./components/studentLayout/StudentLayout";
import StudentDashboard from "./components/studentLayout/StudentDashboard";
import StudentProfile from "./components/studentLayout/StudentProfile";
import StudentNotice from "./components/studentLayout/StudentNotice";
import StudentAttendance from "./components/studentLayout/StudentAttendance";
import Subject from "./components/studentLayout/Subject";
import StudentSetting from "./components/studentLayout/StudentSetting";

function App() {
  return (
    <div className="App">
      <Routes>

        {/* ================= GUEST LAYOUT ================= */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          {/* Student Auth Pages */}
          <Route path="student-login" element={<StudentLogin />} />
          <Route path="student-register" element={<StudentRegister />} />
        </Route>

        {/* ================= ADMIN LAYOUT ================= */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* ================= STUDENT LAYOUT ================= */}
        <Route path="/student/*" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="notice" element={<StudentNotice />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="subjects" element={<Subject />} />
          <Route path="settings" element={<StudentSetting />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;