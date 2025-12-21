import express from "express";
import testRoutes from "./routes/test.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";

const app = express();
app.use(express.json());

app.use("/", testRoutes);
app.use("/", analysisRoutes);

export default app;
