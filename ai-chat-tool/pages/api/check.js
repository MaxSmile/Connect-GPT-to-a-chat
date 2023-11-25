import { withOpenAIClient } from '../../lib/openai';
import { createLead } from '../../lib/functions';
import { writeLog } from '../../lib/logger';

export default async function handler(req, res) {
  const { thread_id, run_id } = req.body;

  if (!thread_id || !run_id) {
    writeLog("Error: Missing thread_id or run_id in /check");
    return res.status(400).json({ response: "error" });
  }

  const client = withOpenAIClient();
  const startTime = Date.now();

  try {
    while (Date.now() - startTime < 9000) {
      const runStatus = await client.beta.threads.runs.retrieve(thread_id, run_id);
      writeLog(`Checking run status: ${runStatus.status}`);

      if (runStatus.status === 'completed') {
        const messages = await client.beta.threads.messages.list(thread_id);
        const messageContent = messages[0].content;

        writeLog("Run completed, returning response");
        return res.status(200).json({
          response: messageContent,
          status: "completed"
        });
      }

      if (runStatus.status === 'requires_action') {
        for (let toolCall of runStatus.requiredAction.submitToolOutputs.toolCalls) {
          if (toolCall.function.name === "create_lead") {
            const args = JSON.parse(toolCall.function.arguments);
            const output = await createLead(args.name, args.phone);

            await client.beta.threads.runs.submitToolOutputs(thread_id, run_id, [{
              tool_call_id: toolCall.id,
              output: JSON.stringify(output)
            }]);
          }
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    writeLog("Run timed out");
    return res.status(200).json({ response: "timeout" });
  } catch (error) {
    writeLog(`Error in checking run: ${error}`);
    return res.status(500).json({ error: 'Internal Server Error. '+error.message });
  }
}
