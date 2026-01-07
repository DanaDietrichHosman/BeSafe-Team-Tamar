import Content from "../models/content.js";

/**
 * קונטרולר לניהול שמירת נתוני ניתוח הצ'אט
 */
export const analyzeText = async (req, res) => {
  try {
    // אנחנו מצפים לקבל את מערך המילים הפוגעניות ישירות מהפרונטד
    const { offensiveWords } = req.body; 

    // בדיקה שהתקבלו נתונים תקינים
    if (!offensiveWords || !Array.isArray(offensiveWords)) {
      return res.status(400).json({ 
        success: false, 
        message: "No analysis data provided (offensiveWords array is missing)" 
      });
    }

    // 1️⃣ התאמה למבנה ה-DB (ללא קטגוריות, כפי שביקשתן)
    const dataToSave = offensiveWords.map((item) => ({
      word: item.word,
      count: item.count
    }));

    // 2️⃣ שמירה למסד הנתונים MongoDB
    // insertMany שומר את כל המערך בפעולה אחת
    const savedData = await Content.insertMany(dataToSave);

    // 3️⃣ החזרת תשובה חיובית ללקוח (Client)
    res.status(200).json({
      success: true,
      message: "Analysis results saved successfully to database",
      count: savedData.length
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};