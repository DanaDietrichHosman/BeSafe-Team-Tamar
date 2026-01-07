import { useState } from 'react';
import PropTypes from 'prop-types';
import { AnalysisContext } from './AnalysisContext'; 
import { analyzeChatWithGemini } from '../services/geminiService'; // מייבאים את השירות החדש

export const AnalysisProvider = ({ children }) => {
  const [chatText, setChatText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // פונקציית הניתוח החדשה שמדברת עם Gemini
  const runAnalysis = async () => {
    if (!chatText) return;
    
    setIsLoading(true);
    setAnalysisResult(null);
    console.log("Analysis started..."); // לוג לבדיקה ב-Console

    try {
      const result = await analyzeChatWithGemini(chatText); // הקריאה האמיתית ל-AI
      console.log("Success! Result:", result); // לוג לבדיקה ב-Console
      setAnalysisResult(result);
    } catch (error) {
      console.error("Gemini Error:", error);
      setAnalysisResult("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AnalysisContext.Provider value={{ 
      chatText, setChatText, 
      isLoading, setIsLoading, 
      analysisResult, setAnalysisResult,
      runAnalysis // חושפים את הפונקציה לכל האתר
    }}>
      {children}
    </AnalysisContext.Provider>
  );
};

AnalysisProvider.propTypes = {
  children: PropTypes.node.isRequired
};