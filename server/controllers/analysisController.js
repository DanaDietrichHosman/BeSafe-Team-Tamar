import Content from "../models/content.js";
import { analyzeChatWithGemini } from "../services/geminiService.js";

/**
 * Analyze chat text and save results linked to user email
 */
export const analyzeText = async (req, res) => {
  try {
    const { text, userEmail } = req.body;
    
    // Validate inputs
    if (!text) {
      return res.status(400).json({ success: false, message: "No text provided" });
    }

    if (!userEmail) {
      return res.status(400).json({ success: false, message: "User email is required for history tracking" });
    }

    // 1. Call Gemini Service to get analysis
    const analysis = await analyzeChatWithGemini(text);

    // 2. Safe extraction of data
    const offensiveWords = analysis?.offensiveWords || [];
    const riskValue = analysis?.RiskLevel || analysis?.riskLevel || 0;
    const contextAnalysis = analysis?.contextAnalysis || "Analysis unavailable";
    const recommendation = analysis?.recommendation || "No recommendation";

    // 3. Save to Database for History
    // We create a single record containing the full analysis details
    const newAnalysisEntry = new Content({
      userEmail: userEmail,
      riskLevel: riskValue,
      contextAnalysis: contextAnalysis,
      recommendation: recommendation,
      analysisData: offensiveWords.map(item => ({
        word: item.word,
        count: item.count
      }))
    });

    await newAnalysisEntry.save();

    // 4. Send full response back to client
    res.status(200).json({
      success: true,
      data: { 
        offensiveWords,
        RiskLevel: riskValue, // R גדולה - עבור ResultsSection.jsx
        riskLevel: riskValue, // אות קטנה - ליתר ביטחון
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

/**
 * Fetch all analysis history for a specific user
 */
export const getUserHistory = async (req, res) => {
    try {
      const { email } = req.params;
      
      // Fetch user records sorted from newest to oldest
      const history = await Content.find({ userEmail: email }).sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        history: history
      });
    } catch (error) {
      console.error("History Fetch Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
};