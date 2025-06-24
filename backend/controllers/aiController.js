// controllers/aiController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const csv = require("csv-parser");
const fs = require("fs");
const pdfParse = require("pdf-parse");

// Helper: Parse CSV lab files to JSON
async function parseLabCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

// Helper: Parse PDF lab files to text
async function parseLabPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

// Helper: Build prompt dynamically
function buildPrompt({ summary, labData, imageInfo, command }) {
  let prompt = "";
  if (summary) prompt += `Patient summary: ${summary}\n`;
  if (labData) prompt += `Lab results: ${JSON.stringify(labData)}\n`;
  if (imageInfo) prompt += `Image findings: ${imageInfo}\n`;
  if (command) prompt += `Command: ${command}\n`;
  prompt += "Task: Generate a SOAP note, differential diagnoses, recommended investigations, treatment options, per-file interpretations, and a confidence score. Return as JSON.";
  return prompt;
}

exports.processCase = async (req, res) => {
  try {
    const { summary, command } = req.body;
    const files = req.files || [];

    let labData = [];
    let imageInfo = [];

    // Parse files
    for (const file of files) {
      if (file.mimetype === "text/csv") {
        const csvData = await parseLabCSV(file.path);
        labData.push({ name: file.originalname, data: csvData });
      } else if (file.mimetype === "application/pdf") {
        const pdfText = await parseLabPDF(file.path);
        labData.push({ name: file.originalname, data: pdfText });
      } else if (
        file.mimetype.startsWith("image/") ||
        file.mimetype === "application/dicom"
      ) {
        imageInfo.push(file.originalname);
      }
      // Clean up file after parsing if needed
      fs.unlink(file.path, () => {});
    }

    // Build prompt
    const prompt = buildPrompt({
      summary,
      labData: labData.length ? labData : undefined,
      imageInfo: imageInfo.length ? imageInfo.join(", ") : undefined,
      command,
    });

    // Call Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from LLM output
    let jsonResponse;
    try {
      const match = text.match(/\{[\s\S]*\}/);
      jsonResponse = match ? JSON.parse(match[0]) : { raw: text };
    } catch (e) {
      jsonResponse = { raw: text };
    }

    res.json(jsonResponse);
  } catch (err) {
    res.status(500).json({ message: "AI processing failed", error: err.message });
  }
};
