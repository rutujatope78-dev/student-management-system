import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

// ================== REGISTER ==================
export const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const newUser = new User({
      name,
      email,
      contact,
      password,
      role: role || "user",
      isApproved: role === "admin" ? true : false,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully ✅",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed ❌",
      error: error.message,
    });
  }
};

// ================== LOGIN ==================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required ❌" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed ❌",
      error: error.message,
    });
  }
};

// ================== FORGOT PASSWORD ==================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:8000/reset-password/${resetToken}`;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      text: `Click on this link to reset your password: ${resetLink}`,
    });

    res.json({ message: "Password reset link sent to email 📩" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};