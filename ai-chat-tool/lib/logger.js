// /lib/logger.js
import fs from 'fs';
import path from 'path';

// Function to append logs to a file
export function writeLog(message) {
  const logsFilePath = path.resolve('public/logs.txt'); 

  try {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${message}\n`;

    // Append the log entry to the file
    fs.appendFileSync(logsFilePath, logEntry, 'utf8');
  } catch (error) {
    console.error('Error writing to log file:', error);
    // Handle the error as needed
  }
}
