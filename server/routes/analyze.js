const express = require('express');
const multer = require('multer');
const { parseChat } = require('../utils/parseChat');
const { computeMetrics } = require('../utils/computeMetrics');
const { generateInsights } = require('../utils/ai');

const router = express.Router();

// Configure multer for in-memory processing
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

router.post('/', upload.single('chatFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const rawText = req.file.buffer.toString('utf-8').replace(/\0/g, '');
    
    // Step 1: Parse
    const messages = parseChat(rawText);
    if (messages.length < 5) {
      const firstLines = rawText.split(/\r\n|\n|\r/).slice(0, 3).map(l => l.trim()).join(' | ');
      return res.status(400).json({ error: `Debug: Parser found ${messages.length} msgs. Lines start with: ${firstLines}` });
    }

    // Step 2: Metrics
    const metrics = computeMetrics(messages);
    if (!metrics) {
      return res.status(400).json({ error: 'Failed to compute metrics.' });
    }

    // Step 3: AI Insights
    const aiAnalysis = await generateInsights(metrics);

    // Combine for frontend
    const responseData = {
      metrics: metrics.metrics,
      participants: metrics.participants,
      analysis: aiAnalysis,
      // For charting mock/dummy trend lines for MVP, we can derive simple arrays
      // In a real app we'd map timestamps to bins
      trends: {
        responseTime: [
          { date: 'Week 1', you: metrics.metrics.userA.avgResponseTimeHours, them: metrics.metrics.userB.avgResponseTimeHours },
          { date: 'Week 2', you: metrics.metrics.userA.avgResponseTimeHours * 1.1, them: metrics.metrics.userB.avgResponseTimeHours * 1.5 },
          { date: 'Week 3', you: metrics.metrics.userA.avgResponseTimeHours * 0.9, them: metrics.metrics.userB.avgResponseTimeHours * 2.0 }
        ],
        messageLength: [
          { date: 'Week 1', length: (metrics.metrics.userA.avgMessageLength + metrics.metrics.userB.avgMessageLength)/2 },
          { date: 'Week 2', length: (metrics.metrics.userA.avgMessageLength + metrics.metrics.userB.avgMessageLength)/2.5 },
          { date: 'Week 3', length: (metrics.metrics.userA.avgMessageLength + metrics.metrics.userB.avgMessageLength)/3 }
        ]
      }
    };

    res.json(responseData);

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred during analysis.' });
  }
});

module.exports = router;
