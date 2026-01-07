import Header from '../../components/Header/Header';
import UploadSection from '../../components/UploadSection/UploadSection';
import ResultsSection from '../../components/ResultsSection/ResultsSection';
import { useAnalysis } from '../../context/useAnalysis'; // שימוש ב-Hook החדש
import styles from './Home.module.css';

const Home = () => {
  const { 
    chatText, setChatText, 
    isLoading, 
    analysisResult,
    runAnalysis // מושכים את הפונקציה החדשה מה-Context
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
      
      runAnalysis(); 
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