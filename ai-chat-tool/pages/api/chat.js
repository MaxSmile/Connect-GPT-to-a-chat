// pages/api/chat.js
import { createAssistant } from '@/lib/functions';
import { withOpenAIClient } from '../../lib/openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { thread_id, message } = req.body;

    if (!thread_id) {
      return res.status(400).json({ error: 'Missing thread_id' });
    }

    try {
      const client = withOpenAIClient();
      // const threadMessages = await client.beta.threads.messages.create(
      //   "thread_abc123",
      //   { role: "user", content: "How does AI work? Explain it in simple terms." }
      // );
      // Send the message to the specified thread
      await client.beta.threads.messages.create(thread_id,{
        role: 'user',
        content: message
      });

      // Create and start a new run in the conversation thread
      // const run = await openai.beta.threads.runs.create(
      //   "thread_abc123",
      //   { assistant_id: "asst_abc123" }
      // );
      const run = await client.beta.threads.runs.create(thread_id,{
        assistant_id: createAssistant()
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
