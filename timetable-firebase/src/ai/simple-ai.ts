import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBGtN6YQ_2xw_Itn85Vcqp9uB1rxa1e9Xk';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function askAI(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI Error:', error);
    return 'Sorry, I could not generate a response. Please try again.';
  }
}
