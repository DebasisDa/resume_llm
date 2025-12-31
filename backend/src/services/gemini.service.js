import { geminiClient } from "../config/gemini.config.js";

export async function generateShortResponse(text) {
  const response = await geminiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Respond to this prompt in max 50 characters: "${text}"`,
  });

  return response.text;
}

export async function analyzeResume(resumeText, jdText) {
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

Schema:
{
  "strengths": string[],
  "weaknesses": string[],
  "verdict": "STRONG_FIT | PARTIAL_FIT | NOT_A_FIT",
  "keywords_match": string[],
  "keywords_notmatch": string[],
  "comment": string
}
`;

  const response = await geminiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return JSON.parse(response.text);
}
