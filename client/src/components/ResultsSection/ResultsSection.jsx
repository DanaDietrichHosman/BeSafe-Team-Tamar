import { useAnalysis } from '../../context/useAnalysis';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import styles from './ResultsSection.module.css';

const ResultsSection = () => {
  const { analysisResult, isLoading } = useAnalysis();

  if (isLoading) {
    return (
      <div className={styles.resultsBox}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Analyzing chat dynamics with SafeChat ...</p>
        </div>
      </div>
    );
  }

  if (!analysisResult || !analysisResult.offensiveWords) return null;

  const { offensiveWords, RiskLevel, contextAnalysis, recommendation } = analysisResult;
  const COLORS = ['#d63384', '#e83e8c', '#f06595', '#ff87b7'];

  // נרמול הציון לטווח של 1-10
  const displayScore = Math.min(Math.max(RiskLevel, 1), 10);

  const getRiskDetails = (score) => {
    if (score >= 8) return { label: "High Risk", color: "#dc3545" }; // אדום
    if (score >= 5) return { label: "Medium Risk", color: "#ff9800" }; // כתום
    return { label: "Low Risk", color: "#28a745" }; // ירוק
  };

  const risk = getRiskDetails(displayScore);

  return (
    <div className={styles.resultsBox}>
      <h2 className={styles.title}>Digital Safety Analysis Report</h2>

      {/* תצוגת ציון משופרת */}
      <div className={styles.scoreSection} style={{ borderLeftColor: risk.color }}>
        <div className={styles.scoreHeader}>
          <div className={styles.scoreBadge} style={{ backgroundColor: risk.color }}>
            Risk Level: {displayScore} / 10
          </div>
          <span className={styles.riskStatus} style={{ color: risk.color }}>
            {risk.label}
          </span>
        </div>
        <div className={styles.contextBox}>
          <p className={styles.analysisText}>
            <span className={styles.contextLabel}>Social Context:</span> {contextAnalysis}
          </p>
        </div>
      </div>

      <p className={styles.subtitle}>Frequency of offensive language detected:</p>
      
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={offensiveWords} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis 
              dataKey="word" 
              tick={{ fill: '#666', fontSize: 12 }} 
              interval={0} 
              angle={-45} 
              textAnchor="end" 
              height={60} 
            />
            <YAxis allowDecimals={false} tick={{ fill: '#666' }} />
            <Tooltip 
              cursor={{ fill: '#fdf2f8' }}
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="count" radius={[5, 5, 0, 0]}>
              {offensiveWords.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {recommendation && (
        <div className={styles.recommendationBox}>
          <h4>💡 System Actionable Recommendation:</h4>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;