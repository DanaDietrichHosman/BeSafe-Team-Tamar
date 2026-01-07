import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. שליפת ה-API Key שהגדרנו ב-.env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 2. אתחול הספריה של גוגל עם המפתח שלנו
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * פונקציה שמקבלת טקסט של צ'אט ומחזירה ניתוח בטיחות מה-AI
 */
export const analyzeChatWithGemini = async (chatText) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest", 
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
    You are 'BeSafe AI', a specialist in digital safety.
    Your task is to analyze the following WhatsApp chat text and identify offensive or harmful words/phrases.
    
    Instructions:
    1. Scan the entire chat content.
    2. Identify all offensive, abusive, or harmful words.
    3. Count the occurrences of each offensive word found.
    4. Return ONLY a JSON object with the following structure:
        {
        "offensiveWords": [
            {"word": "example1", "count": 3},
            {"word": "example2", "count": 1}
        ]
        }
    
    Strict Rules:
    - Do not include any introductory or concluding text.
    - Return ONLY the raw JSON string.
    - If no offensive words are found, return: {"offensiveWords": []}
    
    Chat Content:
    ${chatText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // ניסיון להפוך את התשובה לאובייקט JS
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error", e);
      return { offensiveWords: [] };
    }

  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw new Error("חלה שגיאה בחיבור לבינה המלאכותית.");
  }
};