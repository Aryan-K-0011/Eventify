import { GoogleGenAI } from "@google/genai";

export const getEventAdvice = async (query: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key not found. Please set 'API_KEY' in your environment variables.");
      return "System Error: API Key is missing. Please configure the application settings.";
    }

    const ai = new GoogleGenAI({ apiKey });
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

export const generateEventImage = async (prompt: string): Promise<string | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key not found. Please set 'API_KEY' in your environment variables.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Create a high-end, photorealistic, architectural photography style image of a luxury event based on this concept: ${prompt}. Atmospheric lighting, elegant details, 8k resolution, wide angle shot.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Error:", error);
    return null;
  }
};