const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.processCase = async (req, res) => {
  const { summary, command, files } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Build multimodal prompt
  const prompt = `Patient summary: ${summary}\nFiles: ${files.map(f => f.name).join(', ')}\nCommand: ${command || "Generate SOAP note"}\n...`;
  
  // Call Gemini
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  
  // Parse structured output
  const response = await result.response;
  const jsonResponse = extractJSON(response.text()); // Your parsing function
  
  res.json(jsonResponse);
};
