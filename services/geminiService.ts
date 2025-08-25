
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage, MessageAuthor } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const sendMessageStream = async (
  systemInstruction: string,
  history: ChatMessage[],
  newMessage: string
): Promise<AsyncGenerator<string, void, unknown>> => {
  try {
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
      // Convert our app's history format to Gemini's format
      history: history.map(msg => ({
        role: msg.author === MessageAuthor.USER ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
    });

    const result = await chat.sendMessageStream({ message: newMessage });
    
    const stream = (async function* () {
      for await (const chunk of result) {
        yield chunk.text;
      }
    })();

    return stream;

  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw new Error("Failed to get response from AI. Check console for details.");
  }
};
