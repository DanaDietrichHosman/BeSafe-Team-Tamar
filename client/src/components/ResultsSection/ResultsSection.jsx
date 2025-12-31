import styles from './ResultsSection.module.css';

const ResultsSection = () => {
  return (
    <div className={styles.resultsBox}>
      <h2 style={{ color: '#d63384' }}>Analysis Results</h2>
      <p>This is where your histograms and data analysis will appear.</p>
      <div className={styles.chartPlaceholder}>
        Chart Placeholder
      </div>
    </div>
  );
};

export default ResultsSection;