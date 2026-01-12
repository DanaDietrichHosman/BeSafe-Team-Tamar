import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import EmergencyPage from "./pages/EmergencyPage/EmergencyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";

import { AnalysisProvider } from './context/AnalysisProvider';
import { useAnalysis } from './context/useAnalysis';
import styles from './styles/App.module.css';
import projectLogo from './assets/logo.jpg';

/**
 * רכיב עזר לניווט - מתקן את הבעיה שהדפים מחפשים נתיבים שלא קיימים
 */
const NavigationWrapper = ({ component: Component }) => {
  const navigate = useNavigate();
  // מבטיח ניווט לנתיבים המדויקים שהגדרנו ב-Routes למטה
  return <Component onNavigate={(path) => {
    if (path === 'home') navigate('/home');
    else if (path === 'register') navigate('/register');
    else if (path === 'login') navigate('/');
    else navigate(`/${path}`);
  }} />;
};

NavigationWrapper.propTypes = {
  component: PropTypes.elementType.isRequired
};

function AppContent() {
  const { user, logoutUser } = useAnalysis();

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <div className={styles.logoContainer}>
          <img src={projectLogo} alt="BeSafe Logo" className={styles.appLogo} />
          <span className={styles.brandName}>BeSafe</span>
        </div>

        <nav className={styles.appNav}>
          {/* הקישורים שיופיעו רק אם המשתמש מחובר בהצלחה */}
          {user ? (
            <>
              <Link to="/home" className={styles.appLink}>Home</Link>
              <Link to="/history" className={styles.appLink}>My History</Link>
              <Link to="/about" className={styles.appLink}>About Us</Link>
              <button onClick={logoutUser} className={styles.logoutBtn}>
                Logout ({user.name})
              </button>
            </>
          ) : (
            <>
              <Link to="/" className={styles.appLink}>Login</Link>
              <Link to="/register" className={styles.appLink}>Register</Link>
            </>
          )}

          <Link to="/emergency" className={`${styles.appLink} ${styles.emergencyBtnNav}`}>
            🚨 Emergency & 105
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <Routes>
          {/* עמוד הכניסה הראשי (נתיב ה-/) הוא דף ההתחברות */}
          <Route path="/" element={<NavigationWrapper component={LoginPage} />} />
          
          {/* נתיב ההרשמה */}
          <Route path="/register" element={<NavigationWrapper component={RegisterPage} />} />
          
          {/* דפים שנגישים רק אם המשתמש מחובר (user קיים ב-Context) */}
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/" />} />
          
          {/* דפים ציבוריים תמיד */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />

          {/* טיפול במקרה של ניווט לנתיב לא קיים (מונע את שגיאות ה-console שראית) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 BeSafe Team | QueenB Hackathon</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AnalysisProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AnalysisProvider>
  );
}

export default App;