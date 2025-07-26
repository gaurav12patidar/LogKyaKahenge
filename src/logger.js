const fs = require('fs');
const path = require('path');

// Log levels
const levels = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

// Default configuration
let logConfig = {
  logDirectory: path.join(__dirname, 'logs'), // Default log directory
};

// Function to update configuration
function configureLogger(config) {
  if (config.logDirectory) {
    logConfig.logDirectory = config.logDirectory;
  }
}

// Function to get month name from month number
function getMonthName(monthIndex) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
}

// Log to console and file
function log(level, logFileName, message) {
  const logMessage = `${new Date().toISOString()} - ${level.toUpperCase()}: ${message}`;

  // Log to console
  if (level === levels.ERROR) {
    console.error(logMessage);
  } else if (level === levels.WARN) {
    console.warn(logMessage);
  } else {
    console.log(logMessage);
  }

  // Get the current date
  const now = new Date();
  const year = now.getFullYear();
  const month = getMonthName(now.getMonth()); // Get month name
  const day = String(now.getDate()).padStart(2, '0');

  // Create directory structure: custom_log/logFileName/YYYY/Month/Day
  const logDirectory = path.join(logConfig.logDirectory, logFileName, year.toString(), month, day);
  fs.mkdirSync(logDirectory, { recursive: true });

  // Write log to the specified file within the date folder
  const logFilePath = path.join(logDirectory, logFileName + '.log');
  fs.appendFileSync(logFilePath, logMessage + '\n');
}

// Middleware function
function logger(req, res, next) {
  const message = `${req.method} ${req.url}`;
  log(levels.INFO, 'request', message); // Default log file for HTTP requests
  next();
}

module.exports = {
  logger,
  log,
  levels,
  configureLogger, // Export configuration function
};
