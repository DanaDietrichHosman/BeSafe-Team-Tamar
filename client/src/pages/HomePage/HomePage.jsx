import Header from '../../components/Header/Header';
import UploadSection from '../../components/UploadSection/UploadSection';
import ResultsSection from '../../components/ResultsSection/ResultsSection';
import { useAnalysis } from '../../context/useAnalysis'; // שימוש ב-Hook החדש
import styles from './Home.module.css';

const Home = () => {
  // מושכים את כל הנתונים והפונקציות מה-Context
  const { 
    chatText, setChatText, 
    isLoading, setIsLoading, 
    analysisResult, setAnalysisResult 
  } = useAnalysis();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setChatText(e.target.result); // עדכון ה-Context
      reader.readAsText(file);
    }
  };

  const handleAnalyze = () => {
    if (!chatText) {
      alert("Please upload a file first!");
      return;
    }
    
    setIsLoading(true); // עדכון ה-Context
    setAnalysisResult(null); // איפוס תוצאות קודמות ב-Context

    setTimeout(() => {
      setIsLoading(false);
      setAnalysisResult("Analysis ready!"); // שמירת התוצאה ב-Context
    }, 2000);
  };

  return (
    <div className={styles.homeContainer}>
      <Header />
      <UploadSection 
        onFileUpload={handleFileUpload} 
        onAnalyze={handleAnalyze} 
        isLoading={isLoading} 
      />
      {/* מציג תוצאות אם קיים מידע ב-analysisResult ב-Context */}
      {analysisResult && <ResultsSection />}
    </div>
  );
};

export default Home;