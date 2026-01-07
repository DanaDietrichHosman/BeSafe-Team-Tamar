import Header from '../../components/Header/Header';
import UploadSection from '../../components/UploadSection/UploadSection';
import ResultsSection from '../../components/ResultsSection/ResultsSection';
import { useAnalysis } from '../../context/useAnalysis'; // שימוש ב-Hook החדש
import styles from './Home.module.css';
import FileSelector from "../../components/FileSelector/FileSelector";

const Home = () => {
  const { 
    chatText, setChatText, 
    isLoading, 
    analysisResult,
    runAnalysis // מושכים את הפונקציה החדשה מה-Context
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
      
      runAnalysis(); 
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