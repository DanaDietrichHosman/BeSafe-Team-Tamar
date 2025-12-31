import PropTypes from 'prop-types';
import styles from './FileSelector.module.css';

const FileSelector = ({ onFileChange }) => {
  return (
    <div className={styles.fileSelectorContainer}>
      <p className={styles.label}>Select your WhatsApp <b>.txt</b> file below:</p>
      <input 
        type="file" 
        accept=".txt" 
        onChange={onFileChange}
        className={styles.fileInput}
      />
    </div>
  );
};

FileSelector.propTypes = {
  onFileChange: PropTypes.func.isRequired
};

export default FileSelector;