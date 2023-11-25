// pages/api/logs.js
import fs from 'fs';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Make sure the path to the logs file is correct and accessible
      const logs = fs.readFileSync('public/logs.txt', 'utf8');
      res.status(200).json({ logs });
    } catch (error) {
      console.error('Error reading logs:', error);
      res.status(500).json({ error: 'Failed to read logs', message: error.message });
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
