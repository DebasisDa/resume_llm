import express from "express";
import { testPrompt } from "../controllers/test.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/test-prompt", verifyToken, testPrompt);

export default router;
