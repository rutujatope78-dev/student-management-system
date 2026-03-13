import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);