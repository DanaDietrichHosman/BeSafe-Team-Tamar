import { useState } from 'react';
import PropTypes from 'prop-types';
import { AnalysisContext } from './AnalysisContext'; 
import { analyzeChatWithGemini } from '../services/geminiService'; 

export const AnalysisProvider = ({ children }) => {
  const [chatText, setChatText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const runAnalysis = async () => {
    if (!chatText) return;
    
    setIsLoading(true);
    setAnalysisResult(null);
    console.log("Analysis started...");

    try {
      // 1️⃣ שלב א': ניתוח הטקסט מול ה-AI (Gemini)
      const result = await analyzeChatWithGemini(chatText); 
      console.log("Gemini Success! Result:", result);
      setAnalysisResult(result);

      // 2️⃣ שלב ב': שליחת התוצאות לשרת ה-Node.js כדי לשמור ב-MongoDB
      // אנחנו שולחים את המערך offensiveWords כפי שהשרת מצפה לקבל
      console.log("Saving to local database...");
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          offensiveWords: result.offensiveWords 
        })
      });

      if (!response.ok) {
        throw new Error("Server failed to save analysis results.");
      }

      const serverData = await response.json();
      console.log("Full-Stack Success! Data saved in DB:", serverData);

    } catch (error) {
      console.error("Workflow Error:", error);
      // מציגים שגיאה ידידותית למשתמש
      alert("Analysis failed. Please make sure the server (Port 5000) and MongoDB are running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnalysisContext.Provider value={{ 
      chatText, setChatText, 
      isLoading, setIsLoading, 
      analysisResult, setAnalysisResult,
      runAnalysis 
    }}>
      {children}
    </AnalysisContext.Provider>
  );
};

AnalysisProvider.propTypes = {
  children: PropTypes.node.isRequired
};