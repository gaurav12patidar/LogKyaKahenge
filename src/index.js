// src/index.js
const express = require('express');
const { logger, log, levels } = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to use the logger
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello, World!');
  log(levels.INFO, 'Root path was accessed');
});

app.listen(PORT, () => {
  log(levels.INFO, `Server is running on http://localhost:${PORT}`);
});
