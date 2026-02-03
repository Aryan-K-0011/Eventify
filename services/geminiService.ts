import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getEventAdvice = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert event planner for "Eventify". 
      Your tone is professional, enthusiastic, and helpful.
      User Query: "${query}"
      
      Provide a concise, creative, and structured response (max 200 words) offering event ideas, themes, or logistical advice. Use bullet points where appropriate.`,
    });
    
    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the planning assistant right now.";
  }
};