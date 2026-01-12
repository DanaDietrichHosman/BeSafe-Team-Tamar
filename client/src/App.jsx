import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage"; // הוספת שם התיקייה לנתיב
import EmergencyPage from "./pages/EmergencyPage/EmergencyPage"; // הוספת שם התיקייה לנתיב
import { AnalysisProvider } from './context/AnalysisProvider';
import styles from './styles/App.module.css';
import projectLogo from './assets/logo.jpg';

function App() {
  return (
    <AnalysisProvider>
      <BrowserRouter>
        <div className={styles.app}>
          {/* ה-Navigation Bar למעלה */}
          <header className={styles.appHeader}>
            <div className={styles.logoContainer}>
              <img src={projectLogo} alt="BeSafe Logo" className={styles.appLogo} />
              <span className={styles.brandName}>BeSafe</span>
            </div>

            <nav className={styles.appNav}>
              <Link to="/" className={styles.appLink}>Home</Link>
              <Link to="/about" className={styles.appLink}>About Us</Link>
              <Link to="/emergency" className={`${styles.appLink} ${styles.emergencyBtnNav}`}>
                🚨 Emergency & 105
              </Link>
            </nav>
          </header>

          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
            </Routes>
          </main>

          <footer className={styles.footer}>
            <p>&copy; 2026 BeSafe Team | QueenB Hackathon</p>
          </footer>
        </div>
      </BrowserRouter>
    </AnalysisProvider>
  );
}

export default App;