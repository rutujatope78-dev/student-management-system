import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import UserRouter from './routes/UserRouter.js';
import AttendanceRoute from './routes/AttendanceRoute.js';
import noticeRoutes from "./routes/noticeRoutes.js"; // ✅ Notice import

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/users", UserRouter);
app.use("/api/attendance", AttendanceRoute);
app.use("/api/notices", noticeRoutes); // ✅ Notice route add

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

mongoose.connect(URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log("Server is running on Port: " + PORT);
    });
  })
  .catch(error => console.log(error));