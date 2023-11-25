// pages/api/logs.js
import { retrieveLogs } from '../../lib/logger';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const logs = await retrieveLogs();
      res.status(200).json({ logs });
    } catch (error) {
      console.error('Error reading logs:', error);
      res.status(500).json({ error: 'Failed to read logs', message: error.message });
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
