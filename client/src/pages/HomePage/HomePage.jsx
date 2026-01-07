import Header from '../../components/Header/Header';
import UploadSection from '../../components/UploadSection/UploadSection';
import ResultsSection from '../../components/ResultsSection/ResultsSection';
import { useAnalysis } from '../../context/useAnalysis'; 
import styles from './Home.module.css';

const Home = () => {
  const { 
    chatText, setChatText, 
    isLoading, 
    analysisResult,
    runAnalysis 
  } = useAnalysis();

  const handleFileReady = (cleanedText) => {
    console.log("Cleaned text received in Home!"); 
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
      
      {/* עדכון כאן: מעבירים את handleFileReady ל-onFileUpload */}
      <UploadSection 
        onFileUpload={handleFileReady} 
        onAnalyze={handleAnalyze} 
        isLoading={isLoading} 
      />

      {analysisResult && <ResultsSection />}
    </div>
  );
};

export default Home;