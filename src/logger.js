// src/logger.js
const fs = require('fs');
const path = require('path');

// Log levels
const levels = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

// Log to console and file
function log(level, message) {
  const logMessage = `${new Date().toISOString()} - ${level.toUpperCase()}: ${message}`;
  
  // Log to console
  if (level === levels.ERROR) {
    console.error(logMessage);
  } else if (level === levels.WARN) {
    console.warn(logMessage);
  } else {
    console.log(logMessage);
  }

  // Write log to file
  const logFilePath = path.join(__dirname, 'app.log');
  fs.appendFileSync(logFilePath, logMessage + '\n');
}

// Middleware function
function logger(req, res, next) {
  const message = `${req.method} ${req.url}`;
  log(levels.INFO, message);
  next();
}

module.exports = {
  logger,
  log,
  levels,
};
