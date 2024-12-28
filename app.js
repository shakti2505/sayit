import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import http from "http";
import authRouter from "./routes/authRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import connectDB from "./DB/connectDB.js";
import "./modals/userModal.js";
const DB_URL = process.env.DB_URL;
connectDB(DB_URL);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

app.use("/auth", authRouter);
app.use("/api", groupRouter);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
