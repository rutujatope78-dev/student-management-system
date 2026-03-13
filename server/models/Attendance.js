import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  studentName: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true }, // Present / Absent
});

export default mongoose.model("Attendance", AttendanceSchema);