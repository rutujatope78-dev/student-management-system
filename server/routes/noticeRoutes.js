import express from "express";
import Notice from "../models/Notice.js";

const router = express.Router();

// Add Notice (Admin)
router.post("/add", async (req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();
    res.json({ message: "Notice Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding notice" });
  }
});

// Get All Notices (Student)
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices" });
  }
});

export default router;