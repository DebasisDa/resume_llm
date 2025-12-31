import express from "express";
import testRoutes from "./routes/clear.routes.js";
import analysisRoutes from "./routes/job.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import applicationRoutes from "./routes/application.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // serve uploaded PDFs

// Connect MongoDB
connectDB();

app.use("/", testRoutes);
app.use("/", analysisRoutes);
app.use("/auth", authRoutes);
app.use("/", applicationRoutes);

export default app;
