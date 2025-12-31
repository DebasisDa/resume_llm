import fs from "fs";
import { extractText } from "../utils/fileExtractor.js";
import { analyzeResume } from "../services/gemini.service.js";

export async function analyze(req, res) {
  if (!req.files?.resume || !req.files?.jd) {
    return res.status(400).json({
      error: "Both resume and jd files are required",
    });
  }

  const allowedExtensions = [".docx", ".txt"];
  // Function to check file type
  function validateFile(file) {
    return allowedExtensions.some(ext => file.originalname.endsWith(ext));
  }

  const resumeFile = req.files.resume[0];
  const jdFile = req.files.jd[0];

  if (!validateFile(resumeFile) || !validateFile(jdFile)) {
    // Delete uploaded files
    [resumeFile, jdFile].forEach(f => fs.unlinkSync(f.path));
    return res.status(400).json({ error: "Only .docx and .txt files are allowed" });
  }

  try {
    const resumeText = await extractText(resumeFile);
    const jdText = await extractText(jdFile);

    //const result = await analyzeResume(resumeText, jdText);
    res.json(jdText);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    [...req.files.resume, ...req.files.jd].forEach(f =>
      fs.unlinkSync(f.path)
    );
  }
}
