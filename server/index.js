require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ghosted.AI backend is running.' });
});

// Main analysis route
const analyzeRoute = require('./routes/analyze');
app.use('/api/analyze', analyzeRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
