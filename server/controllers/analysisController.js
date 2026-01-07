import Content from "../models/content.js";

/**
 * שמירת תוצאות ניתוח ה-AI למסד הנתונים
 */
export const analyzeText = async (req, res) => {
  try {
    const { offensiveWords } = req.body; 

    if (!offensiveWords || !Array.isArray(offensiveWords)) {
      return res.status(400).json({ 
        success: false, 
        message: "No analysis data provided (offensiveWords array is missing)" 
      });
    }

    // מיפוי הנתונים לשמירה ללא קטגוריות
    const dataToSave = offensiveWords.map((item) => ({
      word: item.word,
      count: item.count
    }));

    // שמירה בבת אחת ל-MongoDB
    const savedData = await Content.insertMany(dataToSave);

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