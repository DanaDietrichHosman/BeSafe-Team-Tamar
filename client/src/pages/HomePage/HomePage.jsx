import Header from '../../components/Header/Header';
import UploadSection from '../../components/UploadSection/UploadSection';
import ResultsSection from '../../components/ResultsSection/ResultsSection';
import { useAnalysis } from '../../context/useAnalysis'; 
import styles from './Home.module.css';

const Home = () => {
  // אנחנו צריכים רק את analysisResult כדי לדעת אם להציג את רכיב התוצאות
  // ואת isLoading כדי להציג את התוצאות (או ה-Spinner) בזמן אמת
  const { analysisResult, isLoading } = useAnalysis();

  return (
    <div className={styles.homeContainer}>
      <Header />
      
      {/* ה-UploadSection עכשיו עצמאי ומושך הכל מה-Context */}
      <UploadSection />

      {/* מציגים את ה-ResultsSection אם יש תוצאות או אם אנחנו בתהליך טעינה */}
      {(analysisResult || isLoading) && <ResultsSection />}
    </div>
  );
};

export default Home;