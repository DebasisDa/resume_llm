import fs from "fs";
import { extractText } from "../utils/fileExtractor.js";
import { analyzeResume } from "../services/gemini.service.js";

export async function analyze(req, res) {
  if (!req.files?.resume || !req.files?.jd) {
    return res.status(400).json({
      error: "Both resume and jd files are required",
    });
  }

  try {
    const resumeFile = req.files.resume[0];
    const jdFile = req.files.jd[0];

    const resumeText = await extractText(resumeFile);
    const jdText = await extractText(jdFile);

    const result = await analyzeResume(resumeText, jdText);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    [...req.files.resume, ...req.files.jd].forEach(f =>
      fs.unlinkSync(f.path)
    );
  }
}
