import express from "express";
import { clearAll } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/clearAll", clearAll);

export default router;
