import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are "Nirapad Bot", a compassionate and knowledgeable digital safety assistant for a platform in Bangladesh dedicated to women's safety online. 
Your goal is to provide emotional support, practical safety advice, and general legal guidance regarding cyber violence (Cyberbullying, Deepfakes, Image Abuse, etc.) in the context of Bangladeshi law (e.g., Digital Security Act, Pornography Control Act).

Key Guidelines:
1. Language: Communicate primarily in Bangla (using Bengali script), but can switch to English if the user asks.
2. Tone: Empathetic, calm, non-judgmental, and professional.
3. Limits: You are an AI, not a lawyer or police officer. Always advise users to contact the hotline (999) or use the formal "Report" feature on the website for serious threats.
4. Content: 
   - Explain how to secure social media accounts.
   - Explain what steps to take if someone is being blackmailed.
   - Explain how to preserve digital evidence (screenshots, URLs).
   - Do not ask for personal identifiable information (PII).

Format your responses concisely using bullet points where necessary.
`;

export const initializeChat = (): void => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return;
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
    if (!chatSession) {
      return "দুঃখিত, এই মুহূর্তে এআই সেবাটি উপলব্ধ নয়। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।";
    }
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "দুঃখিত, আমি উত্তরটি বুঝতে পারিনি।";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Attempt to reset session on error
    chatSession = null; 
    return "একটি প্রযুক্তিগত সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।";
  }
};