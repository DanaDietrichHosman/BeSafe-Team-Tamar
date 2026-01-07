import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FileSelector.module.css';

const FileSelector = ({ onFileReady = () => {} }) => {
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const rawText = e.target.result;
        
        // לוגיקה לניקוי הטקסט
        const lines = rawText.split('\n');
        const cleanedLines = lines.map(line => {
          const systemPhrases = ["end-to-end encrypted", "business account", "Tap to learn more", "Messages and calls are"];
          if (systemPhrases.some(phrase => line.includes(phrase))) return null; 

          const splitHyphen = line.split(' - ');
          let contentAfterDate = splitHyphen.length > 1 ? splitHyphen.slice(1).join(' - ') : line;
          const splitName = contentAfterDate.split(': ');
          return splitName.length > 1 ? splitName.slice(1).join(': ').trim() : contentAfterDate.trim();
        });

        const finalOutput = cleanedLines.filter(line => line !== null && line !== "").join('\n');
        
        setFileContent(finalOutput);
        if (onFileReady) onFileReady(finalOutput);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className={styles.fileSelectorContainer}>
      <p className={styles.label}>Select your WhatsApp <b>.txt</b> file below:</p>
      <input 
        type="file" 
        accept=".txt" 
        onChange={handleFileChange} 
        className={styles.fileInput}
      />
      
      {fileContent && (
        <div className={styles.previewBox}>
          <strong className={styles.previewTitle}>Cleaned Content Preview:</strong>
          <p className={styles.previewText}>
            {fileContent.substring(0, 500)}...
          </p>
        </div>
      )}
    </div>
  );
};

FileSelector.propTypes = {
  onFileReady: PropTypes.func
};

export default FileSelector;