import { generateShortResponse } from "../services/gemini.service.js";

export async function testPrompt(req, res) {
  const { text } = req.query;

  if (!text || text.length > 20) {
    return res.status(400).json({
      error: "Prompt is required and max 20 characters",
    });
  }

  try {
    const response = await generateShortResponse(text);
    const output = response.length > 50 ? response.slice(0, 50) : response;

    res.json({ prompt: text, response: output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
