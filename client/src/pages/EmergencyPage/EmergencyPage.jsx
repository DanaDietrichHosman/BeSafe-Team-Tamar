import { parentTips, emergencyInfo } from './SafetyData';
import styles from './Emergency.module.css';

const EmergencyPage = () => {
  return (
    <div className={styles.emergencyPage}>
      <section className={styles.emergencyHero}>
        <h1>{emergencyInfo.title}</h1>
        <p>{emergencyInfo.description}</p>
        <button 
          className={styles.emergencyBtn}
          onClick={() => window.location.href = `tel:${emergencyInfo.phone}`}
        >
          {emergencyInfo.buttonText}
        </button>
      </section>

      <h2 className={styles.sectionTitle}>Parental Action Guide</h2>
      <div className={styles.tipsGrid}>
        {parentTips.map(tip => (
          <div key={tip.id} className={styles.tipCard}>
            <span className={styles.tipIcon}>{tip.icon}</span>
            <h3>{tip.title}</h3>
            <p>{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyPage;