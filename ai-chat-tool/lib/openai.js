// lib/openai.js
import OpenAI from 'openai';

export function withOpenAIClient() {
  return  new OpenAI({apiKey: process.env["OPENAI_API_KEY"]
});

}
