import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import {
  createJobApplication,
  getApplicationsByJob,
  updateComment,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();
router.post("/job/:id/application", upload.fields([{ name: "resume", maxCount: 1 }]), createJobApplication);
router.get("/job/:id/applications", getApplicationsByJob);
router.patch("/application/:id/comment", updateComment);
router.patch("/application/:id/status", updateStatus);

export default router;
