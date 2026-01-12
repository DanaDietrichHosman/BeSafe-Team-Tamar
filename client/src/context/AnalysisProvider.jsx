import { useState } from 'react';
import PropTypes from 'prop-types';
import { AnalysisContext } from './AnalysisContext'; 
import api from '../services/api'; // הייבוא של ה-Axios Instance שלך

export const AnalysisProvider = ({ children }) => {
  const [chatText, setChatText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const runAnalysis = async () => {
    if (!chatText) return;
    
    setIsLoading(true);
    setAnalysisResult(null); // איפוס תוצאות קודמות למניעת דיליי ויזואלי
    console.log("Starting Full-Stack Analysis via Server...");

    try {
      // שימוש ב-Axios במקום ב-fetch
      const response = await api.post("/api/analyze", { 
        text: chatText 
      });

      if (response.data.success) {
        console.log("Analysis Received:", response.data.data);
        setAnalysisResult(response.data.data);
      }

    } catch (error) {
      console.error("Workflow Error:", error);
      
      // טיפול ספציפי בשגיאת המכסה (429) שראינו בטרמינל
      if (error.response && error.response.status === 429) {
        alert("Gemini AI quota exceeded. Please wait a minute or use a different API key.");
      } else {
        alert("Connection to server failed. Ensure Node.js and MongoDB are running.");
      }
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