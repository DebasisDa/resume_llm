import { GoogleGenAI } from '@google/genai';
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import mammoth from "mammoth";

dotenv.config();
const app = express();
const port = 3000;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Multer config (2 files)
const upload = multer({ dest: "uploads/" });

// Utility: extract text from .docx or .txt
async function extractText(file) {
    if (file.originalname.endsWith(".docx")) {
        const buffer = fs.readFileSync(file.path);
        const { value } = await mammoth.extractRawText({ buffer });
        return value;
    }
    // .txt fallback
    return fs.readFileSync(file.path, "utf-8");
}


//GET API: test prompt
app.get("/test-prompt", async (req, res) => {
    const { text } = req.query;

    // Validate prompt length
    if (!text || text.length > 20) {
        return res
            .status(400)
            .json({ error: "Prompt is required and max 20 characters" });
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Respond to this prompt in max 50 characters: "${text}"`,
        });

        // Ensure output max 20 characters
        const output = response.text.length > 20 ? response.text.slice(0, 50) : response.text;
        res.json({ prompt: text, response: output });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//POST API
app.post(
    "/analyze",
    upload.fields([
        { name: "resume", maxCount: 1 },
        { name: "jd", maxCount: 1 },
    ]),
    async (req, res) => {
        if (!req.files?.resume || !req.files?.jd) {
            return res
                .status(400)
                .json({ error: "Both resume and jd files are required" });
        }

        try {
            const resumeFile = req.files.resume[0];
            const jdFile = req.files.jd[0];

            const resumeText = await extractText(resumeFile);
            const jdText = await extractText(jdFile);

            const prompt = `
You are an HR screening agent.
Resume:
${resumeText}
Job Description:
${jdText}
STRICT RULES:
- Respond ONLY with valid JSON
- No markdown
- No comments
- No explanations
- JSON must match schema exactly

Schema:
{
  "strengths": string[],
  "weaknesses": string[],
  "verdict": "STRONG_FIT | PARTIAL_FIT | NOT_A_FIT",
  "keywors match": string[],
  "keyword notmatch": string[],
  "comment": string
}
`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            let result;
            try {
                result = JSON.parse(response.text);
            } catch {
                result = { raw_response: response.text };
            }

            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        } finally {
            // Cleanup uploaded files
            [...req.files.resume, ...req.files.jd].forEach((f) =>
                fs.unlinkSync(f.path)
            );
        }
    }
);


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});