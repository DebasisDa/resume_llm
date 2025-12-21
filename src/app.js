import express from "express";
import testRoutes from "./routes/test.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js";

const app = express();
app.use(express.json());

// Connect MongoDB
connectDB();

app.use("/", testRoutes);
app.use("/", analysisRoutes);
app.use("/auth", authRoutes);

export default app;
