import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { analyze } from "../controllers/analysis.controller.js";

const router = express.Router();

router.post(
  "/analyze",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jd", maxCount: 1 },
  ]),
  analyze
);

export default router;
