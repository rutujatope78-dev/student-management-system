import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// Mark Attendance (Save / Update)
router.post("/mark", async (req, res) => {
  try {
    const { studentEmail, studentName, date, status } = req.body;

    const existing = await Attendance.findOne({ studentEmail, date });

    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json({ message: "Attendance Updated" });
    }

    const attendance = new Attendance({
      studentEmail,
      studentName,
      date,
      status,
    });

    await attendance.save();
    res.json({ message: "Attendance Saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Monthly Report
router.get("/report", async (req, res) => {
  try {
    const { month } = req.query; // format: 2025-02

    const data = await Attendance.find({ date: { $regex: month } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;