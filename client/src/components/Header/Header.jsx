import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.headline}>BeSafe</h1>
    <div className={styles.sloganBadge}>
      <p className={styles.slogan}>🛡️ Early detection of harmful content in WhatsApp conversations.</p>
    </div>
  </header>
);

export default Header;