// pages/api/start.js
import { withOpenAIClient } from '../../lib/openai';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = withOpenAIClient();

      // Create a new conversation thread
      // Replace 'createThread' with the actual method provided by the OpenAI JavaScript SDK
      const thread = await client.createThread();

      console.log("New conversation started with thread ID:", thread.id);
      res.status(200).json({ thread_id: thread.id });
    } catch (error) {
      console.error('Error in starting conversation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
