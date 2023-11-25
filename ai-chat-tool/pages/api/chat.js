// pages/api/chat.js
import { withOpenAIClient } from '../../lib/openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { thread_id, message } = req.body;

    if (!thread_id) {
      return res.status(400).json({ error: 'Missing thread_id' });
    }

    try {
      const client = withOpenAIClient();
      
      // Send the message to the specified thread
      await client.createMessage({
        thread_id: thread_id,
        role: 'user',
        content: message
      });

      // Create and start a new run in the conversation thread
      const run = await client.createRun({
        thread_id: thread_id
        // You can add additional parameters if needed
      });

      res.status(200).json({ run_id: run.id });
    } catch (error) {
      console.error('Error in chat:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
