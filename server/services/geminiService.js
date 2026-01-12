import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeChatWithGemini = async (chatText) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest", // מומלץ להשתמש בגרסה העדכנית ביותר
      generationConfig: { 
        responseMimeType: "application/json",
        temperature: 0.1 // הופך את התוצאות להרבה יותר עקביות ופחות אקראיות
      }
    });

    const prompt = `
    You are 'BeSafe AI', an expert in digital safety and cyberbullying.
    Analyze the following WhatsApp chat and return a JSON object.

    SCORING RULES FOR RiskLevel (Scale 1-10):
    - 1-2 (LOW): Friendly talk, no insults, supportive environment.
    - 3-5 (MEDIUM): Occasional mild insults or teasing between friends.
    - 6-8 (HIGH): Clear bullying, body shaming, or exclusion (e.g., calling someone "zero", "fat", or "loser").
    - 9-10 (CRITICAL): Coordinated attacks by multiple people, death threats, or explicit group exclusion (e.g., "don't come tomorrow", "we will deal with you").

    IMPORTANT RULES:
    1. If words like 'אפס', 'שמן', 'זבל', or 'טיפש' appear, RiskLevel MUST be 8+.
    2. 'offensiveWords' MUST stay in the original HEBREW from the chat. No translations.
    
    Return ONLY this JSON structure:
    {
      "offensiveWords": [{"word": "string", "count": number}],
      "RiskLevel": number (1 to 10),
      "contextAnalysis": "detailed explanation in English",
      "recommendation": "practical advice in English"
    }

    Chat Content to analyze:
    ${chatText}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      offensiveWords: [], 
      RiskLevel: 1, // ברירת מחדל בטוחה בשגיאה
      contextAnalysis: "Analysis failed due to server error.", 
      recommendation: "Please try again later." 
    };
  }
};