// lib/functions.js
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { writeLog } from './logger';
import { initializeOpenAIClient } from './openai';
import { assistant_instructions } from './prompt';


//const openaiApiKey = process.env.OPENAI_API_KEY;
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

export async function createAssistant() {
    const assistantFilePath = path.resolve('./assistant.json');

    try {
        // Check if the assistant file exists
        try {
            await fs.access(assistantFilePath, fs.constants.F_OK);
            const assistantData = JSON.parse(await fs.readFile(assistantFilePath, 'utf8'));
            writeLog("Loaded existing assistant ID.");
            return assistantData.assistant_id;
        } catch (readError) {
            // File not found, create a new assistant
            const client = initializeOpenAIClient();

            // Logic to create a new assistant (adjust according to OpenAI Node.js SDK)
            // Example: Creating a file and then an assistant
            const file = await client.files.create({
                file: fs.createReadStream('public/knowledge.md'), // Adjust the path
                purpose: 'assistants'
            });

            // Assuming `client` is an instance of the OpenAI client
            // const myAssistant = await openai.beta.assistants.create({
            //     instructions:
            //       "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
            //     name: "Math Tutor",
            //     tools: [{ type: "code_interpreter" }],
            //     model: "gpt-4",
            //   });
            const assistant = await client.beta.assistants.create({
                model: "gpt-4-1106-preview",
                instructions: assistant_instructions,
                tools: [
                    {
                        type: "retrieval", // This adds the knowledge base as a tool
                        // Additional configuration for the retrieval tool, if necessary
                    },
                    {
                        type: "function", // This adds a function, like lead capture, as a tool
                        function: {
                            name: "create_lead",
                            description: "Capture lead details and save to Airtable.",
                            parameters: {
                                type: "object",
                                properties: {
                                    name: { type: "string", description: "Full name of the lead." },
                                    phone: { type: "string", description: "Phone number of the lead including country code." }
                                },
                                required: ["name", "phone"]
                            }
                        }
                    }
                    // Add more tools as needed
                ],
                file_ids: [file.id] // Assuming `file` is the result from client.files.create
            });


            // Save the new assistant ID to a file
            await fs.writeFile(assistantFilePath, JSON.stringify({ assistant_id: assistant.id }));
            writeLog("Created a new assistant and saved the ID.");

            return assistant.id;
        }
    } catch (error) {
        writeLog(`Error in createAssistant: ${error.message}`);
        throw error; // Rethrow the error if you want to handle it further up the chain
    }
}


