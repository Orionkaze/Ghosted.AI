const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userMessage, chatHistory, metrics } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Missing Gemini API Key' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format chat history for prompt context
    const historyText = chatHistory.map(msg => `${msg.role === 'user' ? 'User' : 'Coach'}: ${msg.content}`).join('\n');

    const prompt = `
    You are Ghosted.AI, a brutally honest, highly analytical, playfully sarcastic, and witty dating coach.
    
    Context about the user's relationship based on their chat data:
    User A (The client): ${metrics?.participants?.A || 'Unknown'}
    User B (The other person): ${metrics?.participants?.B || 'Unknown'}
    Interest Score: ${metrics?.analysis?.interest_score || 'Unknown'}/100
    More Invested: ${metrics?.analysis?.more_invested || 'Unknown'}
    
    Previous conversation with the client:
    ${historyText}

    The client just said: "${userMessage}"
    
    Reply to the client directly. Keep your tone playful, witty, and slightly sarcastic but ultimately helpful. Limit your response to 2-3 short paragraphs.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
      }
    });

    res.json({ reply: response.text });

  } catch (error) {
    console.error("Coach API Error:", error);
    res.status(500).json({ error: 'Failed to generate coaching response.' });
  }
});

module.exports = router;
