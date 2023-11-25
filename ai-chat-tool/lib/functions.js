// lib/functions.js
import axios from 'axios';
import fs from 'fs/promises';

const openaiApiKey = process.env.OPENAI_API_KEY;
const airtableApiKey = process.env.AIRTABLE_API_KEY;

// Add lead to Airtable
export async function createLead(name, phone) {
  const url = "https://api.airtable.com/v0/appLYMCAPQhO6zLH2/Accelerator%20Leads";
  const headers = {
    Authorization: `Bearer ${airtableApiKey}`,
    "Content-Type": "application/json"
  };
  const data = { records: [{ fields: { Name: name, Phone: phone } }] };

  try {
    const response = await axios.post(url, { headers, data });
    console.log("Lead created successfully.");
    return response.data;
  } catch (error) {
    console.error(`Failed to create lead: ${error.response.data}`);
  }
}

// Create or load assistant
export async function createAssistant() {
  const assistantFilePath = 'assistant.json';

  try {
    // Check if the assistant file exists
    if (await fs.access(assistantFilePath, fs.constants.F_OK)) {
      const assistantData = JSON.parse(await fs.readFile(assistantFilePath, 'utf8'));
      console.log("Loaded existing assistant ID.");
      return assistantData.assistant_id;
    }
  } catch (error) {
    // File does not exist, create a new assistant
    // Initialize OpenAI client here (adapt as needed)
    // const client = new OpenAI(openaiApiKey);

    // Your assistant creation logic here...
    // Note: This part will depend on the OpenAI Node.js SDK
  }
}
