import Content from "../models/content.js";
import { analyzeChatWithGemini } from "../services/geminiService.js";

// --- פונקציה 1: ניתוח טקסט ---
export const analyzeText = async (req, res) => {
  try {
    const { text, userEmail } = req.body;
    if (!text || !userEmail) return res.status(400).json({ success: false, message: "Missing data" });

    const analysis = await analyzeChatWithGemini(text);

    const riskValue = analysis?.RiskLevel || analysis?.riskLevel || 0;
    const offensiveWords = analysis?.offensiveWords || [];

    const newAnalysisEntry = new Content({
      userEmail,
      riskLevel: riskValue,
      contextAnalysis: analysis?.contextAnalysis || "",
      recommendation: analysis?.recommendation || "",
      analysisData: offensiveWords.map(item => ({ word: item.word, count: item.count }))
    });

    await newAnalysisEntry.save();

    res.status(200).json({
      success: true,
      data: { 
        offensiveWords, 
        RiskLevel: riskValue, 
        riskLevel: riskValue,
        contextAnalysis: analysis?.contextAnalysis,
        recommendation: analysis?.recommendation
      }
    });
  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- פונקציה 2: קבלת היסטוריה ---
export const getUserHistory = async (req, res) => {
  try {
    const { email } = req.params;
    const history = await Content.find({ userEmail: email }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- פונקציה 3: מחיקת היסטוריה ---
export const deleteUserHistory = async (req, res) => {
  try {
    const { email } = req.params;
    await Content.deleteMany({ userEmail: email });
    res.status(200).json({ success: true, message: "History cleared" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};