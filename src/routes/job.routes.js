import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { createJob, getAllJobs, getJobById, updateJobStatus} from "../controllers/job.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/job",
  verifyToken,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jd", maxCount: 1 },
  ]),
  createJob
);
router.get("/jobs", getAllJobs);
router.get("/jobs/:id", getJobById);
router.patch("/jobs/:id/status", verifyToken, updateJobStatus);

export default router;
