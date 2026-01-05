import Header from '../../components/Header/Header';
import UploadSection from '../../components/UploadSection/UploadSection';
import ResultsSection from '../../components/ResultsSection/ResultsSection';
import { useAnalysis } from '../../context/useAnalysis'; // שימוש ב-Hook החדש
import styles from './Home.module.css';
import FileSelector from "../../components/FileSelector/FileSelector";

const Home = () => {
  // מושכים את כל הנתונים והפונקציות מה-Context
  const { 
    chatText, setChatText, 
    isLoading, setIsLoading, 
    analysisResult, setAnalysisResult 
  } = useAnalysis();

  const handleFileReady = (cleanedText) => {
    console.log("Cleaned text received in Home!"); // Add this to test
    setChatText(cleanedText); 
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
        onAnalyze={handleAnalyze} 
        isLoading={isLoading} 
      >
        {/* Use your component here instead of the old onFileUpload prop */}
        <FileSelector onFileReady={handleFileReady} />
      </UploadSection>

      {analysisResult && <ResultsSection />}
    </div>
  );
};

export default Home;