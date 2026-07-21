import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the GoogleGenAI client with the server-side API key
// and set the 'User-Agent' header for proper AI Studio telemetry.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, history, language } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Formulate a robust system instruction based on the gym context and the selected language
    const systemInstruction = `
      You are "Diva", an elite personal trainer, nutrition coach, and wellness advisor at "Diva Gym" — a premium luxury women-only fitness center.
      Your personality is highly empowering, friendly, professional, scientific, and encouraging.
      You are speaking to a female member of Diva Gym.
      
      CRITICAL INSTRUCTIONS:
      1. You must respond in the same language as the user's message or the provided language parameter (${language || 'Turkish/Arabic/Kurdish'}).
      2. If the language is Arabic, respond in fluent, warm Arabic.
      3. If the language is Kurdish, respond in fluent Kurdish (preferably using Sorani Kurdish in Arabic script).
      4. If the language is Turkish, respond in fluent Turkish.
      5. Provide clear, actionable, and scientifically backed advice on female strength training, cardio, stretching, yoga, fat loss, muscle gain, hydration, and nutrition.
      6. Always encourage the member and address her with warm respect. Keep answers relatively concise and highly structured (using bullet points where appropriate).
      7. Do not mention any external competitors or use generic filler text. Speak as a real head coach at Diva Gym.
    `;

    // Format chat history for generateContent if history is provided
    // Otherwise, just send the single content prompt
    let contents: any = [];
    if (history && Array.isArray(history) && history.length > 0) {
      // Convert history to the format expected by the @google/genai SDK
      contents = history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));
      // Append the new prompt
      contents.push({
        role: 'user',
        parts: [{ text: prompt }],
      });
    } else {
      contents = prompt;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "I'm sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error in server route:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error occurred" },
      { status: 500 }
    );
  }
}
