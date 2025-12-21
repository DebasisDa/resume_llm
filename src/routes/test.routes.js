import express from "express";
import { testPrompt } from "../controllers/test.controller.js";

const router = express.Router();

router.get("/test-prompt", testPrompt);

export default router;
