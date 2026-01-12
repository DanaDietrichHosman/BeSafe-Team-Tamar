import Content from "../models/content.js";
import { analyzeChatWithGemini } from "../services/geminiService.js";

export const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ success: false, message: "No text provided" });
    }

    // 1. קריאה ל-Gemini - חשוב לוודא שהשירות מחזיר את האובייקט המלא
    const analysis = await analyzeChatWithGemini(text);

    // 2. חילוץ בטוח של הנתונים
    const offensiveWords = analysis?.offensiveWords || [];
    const RiskLevel = analysis?.RiskLevel || 100;
    const contextAnalysis = analysis?.contextAnalysis || "Analysis unavailable";
    const recommendation = analysis?.recommendation || "No recommendation";

    // 3. איפוס מסד הנתונים
    await Content.deleteMany({});
    
    // 4. שמירה ל-DB לצורך הטבלה בפורט 5000
    if (offensiveWords.length > 0) {
      const dataToSave = offensiveWords.map(item => ({
        word: item.word,
        count: item.count
      }));
      await Content.insertMany(dataToSave);
    }

    // 5. שליחת התשובה המלאה - שימי לב למבנה ה-data
    res.status(200).json({
      success: true,
      data: { 
        offensiveWords,
        RiskLevel,
        contextAnalysis,
        recommendation
      }
    });

  } catch (error) {
    console.error("Analysis Controller Error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Internal Server Error" 
    });
  }
};