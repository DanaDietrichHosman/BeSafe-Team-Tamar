import { useState } from 'react';
import PropTypes from 'prop-types';
import { AnalysisContext } from './AnalysisContext'; 
import api from '../services/api'; 

export const AnalysisProvider = ({ children }) => {
  const [chatText, setChatText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // --- תוספת חדשה: ניהול משתמש מחובר ---
  const [user, setUser] = useState(null);

  // פונקציה שנקרא לה מתוך דף ה-Login
  const loginUser = (userData) => {
    setUser(userData); // שומר את האובייקט { name, email } בזיכרון
  };

  // פונקציה להתנתקות
  const logoutUser = () => {
    setUser(null);
    setAnalysisResult(null);
    setChatText("");
  };

  const runAnalysis = async () => {
    if (!chatText) return;

    // הגנה: אם המשתמש לא מחובר, הוא לא יכול לנתח (כי לא יהיה איפה לשמור היסטוריה)
    if (!user) {
      alert("Please log in first to analyze your chat.");
      return;
    }
    
    setIsLoading(true);
    setAnalysisResult(null); 
    console.log("Starting Full-Stack Analysis via Server...");

    try {
      // עדכון קריטי: שליחת הטקסט יחד עם האימייל של המשתמש
      const response = await api.post("/api/analyze", { 
        text: chatText,
        userEmail: user.email // המידע הזה נשלח עכשיו לשרת כדי שיישמר בהיסטוריה
      });

      if (response.data.success) {
        console.log("Analysis Received:", response.data.data);
        setAnalysisResult(response.data.data);
      }

    } catch (error) {
      console.error("Workflow Error:", error);
      
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
      runAnalysis,
      // חשיפת המשתמש והפונקציות החדשות לכל דפי האתר
      user, 
      loginUser, 
      logoutUser 
    }}>
      {children}
    </AnalysisContext.Provider>
  );
};

AnalysisProvider.propTypes = {
  children: PropTypes.node.isRequired
};