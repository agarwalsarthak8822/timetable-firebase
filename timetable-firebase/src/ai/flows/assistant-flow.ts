'use server';
/**
 * @fileOverview A simple AI assistant flow.
 *
 * - chat - A function that handles the chat interaction.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {z} from 'zod';
import { askAI } from '@/ai/simple-ai';

const ChatInputSchema = z.object({
  prompt: z.string().describe('The user prompt.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  try {
    console.log('AI Assistant: Processing prompt:', input.prompt);
    const response = await askAI(input.prompt);
    console.log('AI Assistant: Response received:', response);
    return { response };
  } catch (error) {
    console.error('AI Assistant error:', error);
    return { response: 'AI Assistant is currently unavailable. Please try again.' };
  }
}
