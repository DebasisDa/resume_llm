import { GoogleGenAI } from '@google/genai';
import express from "express";
import dotenv from "dotenv";


dotenv.config();
const app = express();
const port = 4000;

// Start server
app.listen(port, () => {
    console.log(`Server - running at http://localhost:${port}`);
});