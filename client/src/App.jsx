import { BrowserRouter, Routes, Route, Link } from 'react-router';
import Home from './pages/HomePage/HomePage';
import { AnalysisProvider } from './context/AnalysisProvider'; // הייבוא החדש
import styles from './styles/App.module.css';
import projectLogo from './assets/logo.jpg';

function App() {
  return (
    <AnalysisProvider> {/* עטיפת האפליקציה ב-Provider */}
      <BrowserRouter>
        <div className={styles.app}>
          <header className={styles.appHeader}>
            <img src={projectLogo} alt="Logo" className={styles.appLogo} />
            <nav className={styles.appNav}>
              <Link to="/" className={styles.appLink}>Home</Link>
            </nav>
          </header>
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <footer className={styles.footer}>
            <p>&copy; 2026 BeSafe Team</p>
          </footer>
        </div>
      </BrowserRouter>
    </AnalysisProvider>
  );
}

export default App;