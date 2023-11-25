// pages/api/start.js
import { writeLog } from '@/lib/logger';
import { withOpenAIClient } from '../../lib/openai';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = withOpenAIClient();

      // Create a new conversation thread
      const thread = await client.beta.threads.create();

      writeLog("New conversation started with thread ID:" + thread.id);
      res.status(200).json({ thread_id: thread.id });
    } catch (error) {
      writeLog('Error in starting conversation:'+ error.message);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
