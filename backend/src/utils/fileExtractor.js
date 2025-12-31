import fs from "fs";
import mammoth from "mammoth";

export async function extractText(file) {
  if (file.originalname.endsWith(".docx")) {
    const buffer = fs.readFileSync(file.path);
    const { value } = await mammoth.extractRawText({ buffer });
    return value;
  }
  return fs.readFileSync(file.path, "utf-8");
}
