import { kv } from "@vercel/kv";

// Function to append logs to the KV store
export async function writeLog(message) {
  try {
    // Retrieve the current counter value
    let counter = parseInt(await kv.get('log-counter')) || 0;
    counter += 1;

    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${message}`;

    // Store the log entry with the counter as the key
    await kv.set(counter.toString(), logEntry);

    // Update the counter
    await kv.set('log-counter', counter.toString());

    console.log("Log entry saved successfully.");
  } catch (error) {
    console.error('Error writing to KV store:', error);
  }
}

// Function to retrieve logs from the KV store
export async function retrieveLogs() {
  try {
    const logEntries = [];
    const counter = parseInt(await kv.get('log-counter')) || 0;

    for (let i = 1; i <= counter; i++) {
      const logEntry = await kv.get(i.toString());
      if (logEntry) {
        logEntries.push(logEntry);
      }
    }

    return logEntries;
  } catch (error) {
    console.error('Error retrieving logs:', error);
    return [];
  }
}
