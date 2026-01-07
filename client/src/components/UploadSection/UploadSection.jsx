import PropTypes from 'prop-types';
import FileSelector from '../FileSelector/FileSelector'; // ייבוא הקומפוננטה החדשה
import styles from './UploadSection.module.css';

const UploadSection = ({ onFileUpload, onAnalyze, isLoading }) => {
  return (
    <div className={styles.uploadBox}>
      <h2 className={styles.stepTitle}>Upload Chat</h2>
      
      <div className={styles.instructions}>
        <b className={styles.instructionTitle}>How to export your chat:</b>
        <ol className={styles.list}>
          <li>Open the WhatsApp chat you want to analyze.</li>
          <li>Tap the <b>three dots (⋮)</b> or the <b>Contact Name</b> at the top.</li>
          <li>Select <b>More</b> {'>'} <b>Export Chat</b>.</li>
          <li>When asked, choose <b>{"'Without Media'"} / {"'With Media'"}</b>.</li>
          <li>Save the generated <b>.zip</b> file, open it, and upload the <b>.txt</b> file inside.</li>
        </ol>
      </div>

      {/* שימוש בקומפוננטה החדשה */}
      <FileSelector onFileChange={onFileUpload} />

      <button 
        onClick={onAnalyze} 
        disabled={isLoading}
        className={styles.analyzeBtn}
      >
        {isLoading ? "Analyzing..." : "Analyze Chat Now"}
      </button>
    </div>
  );
};

UploadSection.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
  onAnalyze: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default UploadSection;