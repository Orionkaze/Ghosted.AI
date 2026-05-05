const { GoogleGenAI } = require('@google/genai');

const generateInsights = async (metrics) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Gemini API Key");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
  You are Ghosted.AI, a brutally honest, slightly sarcastic, highly analytical dating coach and behavioral data scientist.
  You analyze chat export metrics between two participants: ${metrics.participants.A} (usually the user who uploaded) and ${metrics.participants.B}.
  
  Here are the metrics computed from their chat:
  ${JSON.stringify(metrics.metrics, null, 2)}
  
  Your job is to deliver a verdict. Analyze the power dynamics, interest levels, and red flags.
  
  Return your response STRICTLY as a JSON object matching this schema:
  {
    "interest_score": number (0 to 100, representing the overall health and mutual interest),
    "more_invested": "string (name of the person trying harder)",
    "ghosting_signs": ["string", "string"], (list of 2-4 detected red flags or patterns based on the data),
    "summary": "string" (a 2-3 sentence brutally honest, sarcastic but accurate summary of the dynamic)
  }
  
  Do not include markdown blocks like \`\`\`json. Just output the raw JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const content = response.text;
    return JSON.parse(content);
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback response if AI fails
    return {
      interest_score: 50,
      more_invested: "Unknown",
      ghosting_signs: ["Could not connect to AI brain"],
      summary: "We failed to connect to Gemini, so we can't roast you right now. Maybe you're fine."
    };
  }
};

module.exports = { generateInsights };
