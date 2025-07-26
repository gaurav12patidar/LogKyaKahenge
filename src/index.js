const express = require('express');
const path = require('path');
const { logger, log, levels, configureLogger } = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure the logger with a custom base directory
configureLogger({
  logDirectory: path.join("E:/Resume/", 'LogKK'), // Base log directory
});

// Middleware to use the logger for requests
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello, World!');
  log(levels.INFO, 'root_access', 'Root path was accessed');
});

app.get('/users', (req, res) => {
  res.send('Users route');
  log(levels.INFO, 'user_access', 'Users path was accessed');
});

app.listen(PORT, () => {
  log(levels.INFO, 'server', `Server is running on http://localhost:${PORT}`);
});
