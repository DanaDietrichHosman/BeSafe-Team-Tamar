import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAnalysis } from '../../context/useAnalysis';
import styles from './HistoryPage.module.css';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAnalysis(); 

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !user.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/history/${user.email}`);
        if (response.data.success) {
          setHistory(response.data.history);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  if (loading) return <div className={styles.center}>Loading history...</div>;
  if (!user) return <div className={styles.center}>Please log in to view your history.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Analysis History for {user.name}</h1>
      <div className={styles.list}>
        {history.length > 0 ? (
          history.map((item) => (
            <div key={item._id} className={styles.analysisWrapper}>
              <button 
                className={`${styles.cardButton} ${expandedId === item._id ? styles.active : ''}`}
                onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.icon}>📊</span>
                  <div className={styles.headerInfo}>
                    <span className={styles.date}>
                      {new Date(item.createdAt).toLocaleString('en-US')}
                    </span>
                    <span className={`${styles.riskBadge} ${item.riskLevel > 5 ? styles.highRisk : styles.lowRisk}`}>
                      Risk Level: {item.riskLevel}/10
                    </span>
                  </div>
                </div>
                <span className={styles.arrow}>{expandedId === item._id ? '▲' : '▼'}</span>
              </button>

              {expandedId === item._id && (
                <div className={styles.detailsPanel}>
                  <div className={styles.section}>
                    <h4 className={styles.detailsTitle}>Context Analysis:</h4>
                    <p className={styles.contextText}>{item.contextAnalysis}</p>
                  </div>

                  <div className={styles.section}>
                    <h4 className={styles.detailsTitle}>Our Recommendation:</h4>
                    <p className={styles.recommendationText}>{item.recommendation}</p>
                  </div>

                  <div className={styles.section}>
                    <h4 className={styles.detailsTitle}>Detected Words:</h4>
                    <div className={styles.resultsGrid}>
                      {item.analysisData && item.analysisData.length > 0 ? (
                        item.analysisData.map((data, index) => (
                          <div key={index} className={styles.resultItem}>
                            <span className={styles.word}>{data.word}</span>
                            <span className={styles.count}>{data.count} times</span>
                          </div>
                        ))
                      ) : (
                        <p className={styles.noData}>No offensive words detected in this analysis.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={styles.center}>No analysis history found.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;