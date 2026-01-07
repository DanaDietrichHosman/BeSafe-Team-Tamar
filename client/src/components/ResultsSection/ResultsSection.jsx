// import styles from './ResultsSection.module.css';

// const ResultsSection = () => {
//   return (
//     <div className={styles.resultsBox}>
//       <h2 style={{ color: '#d63384' }}>Analysis Results</h2>
//       <p>This is where your histograms and data analysis will appear.</p>
//       <div className={styles.chartPlaceholder}>
//         Chart Placeholder
//       </div>
//     </div>
//   );
// };

// export default ResultsSection;
import { useAnalysis } from '../../context/useAnalysis';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import styles from './ResultsSection.module.css';

const ResultsSection = () => {
  const { analysisResult } = useAnalysis();

  // אם אין עדיין תוצאות מ-Gemini, לא נציג כלום
  if (!analysisResult || !analysisResult.offensiveWords) {
    return null;
  }

  // הנתונים שמוצגים בגרף
  const data = analysisResult.offensiveWords;
  
  // צבעים משתנים לעמודות (אופציונלי)
  const COLORS = ['#d63384', '#e83e8c', '#f06595', '#ff87b7'];

  return (
    <div className={styles.resultsBox}>
      <h2 className={styles.title}>Analysis Results</h2>
      <p className={styles.subtitle}>Frequency of offensive language found in the chat:</p>
      
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="word" tick={{ fill: '#666' }} />
            <YAxis allowDecimals={false} tick={{ fill: '#666' }} />
            <Tooltip 
              cursor={{ fill: '#fdf2f8' }}
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="count" radius={[5, 5, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {data.length === 0 && (
        <p className={styles.noData}>No offensive words were detected. The chat appears safe!</p>
      )}
    </div>
  );
};

export default ResultsSection;