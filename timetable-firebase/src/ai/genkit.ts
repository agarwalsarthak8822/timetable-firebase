import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Set the API key directly - using the actual API key
const apiKey = 'AIzaSyBGtN6YQ_2xw_Itn85Vcqp9uB1rxa1e9Xk';

// Also set it as an environment variable for Genkit
process.env.GEMINI_API_KEY = apiKey;
process.env.GOOGLE_API_KEY = apiKey;
process.env.GOOGLE_GENAI_API_KEY = apiKey;

console.log('API Key configured:', apiKey ? 'Yes' : 'No');

export const ai = genkit({
  plugins: [googleAI({
    apiKey: apiKey,
  })],
  model: 'googleai/gemini-2.0-flash', // Updated to match your curl command
});
