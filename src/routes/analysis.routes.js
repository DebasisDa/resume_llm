import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { analyze } from "../controllers/analysis.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/analyze",
  verifyToken,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jd", maxCount: 1 },
  ]),
  analyze
);

export default router;
