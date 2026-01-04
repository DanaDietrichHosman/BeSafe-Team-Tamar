import Content from "../models/content.js";

/*
  סימולציה של Gemini
  בהמשך מחליפים ל-API אמיתי
*/
const analyzeWithGemini = async (inputText) => {
  console.log("Text sent to Gemini:", inputText); // שימוש אמיתי

  return [
    {
      word: "קללה",
      count: 5,
      category: "אלימות מילולית",
    },
    {
      word: "אידיוט",
      count: 2,
      category: "השפלה",
    },
  ];
};

export const analyzeText = async (req, res) => {
  try {
    const { text, title } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // 1️⃣ ניתוח
    const analysis = await analyzeWithGemini(text);

    // 2️⃣ התאמה ל-DB
    const dataToSave = analysis.map((item) => ({
      title: title || "Chat Analysis",
      word: item.word,
      count: item.count,
      category: item.category,
    }));

    // 3️⃣ שמירה למונגו
    await Content.insertMany(dataToSave);

    // 4️⃣ החזרה לפרונט
    res.status(200).json({
      success: true,
      data: dataToSave,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
