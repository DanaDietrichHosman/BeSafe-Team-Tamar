import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FileSelector.module.css';

// eslint-disable-next-line react/prop-types
const FileSelector = ({ onFileReady = () => {} }) => {
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const rawText = e.target.result;
        
        // 1. Logic to remove WhatsApp timestamps and names
        const lines = rawText.split('\n');
        const cleanedLines = lines.map(line => {
          const systemPhrases = [
            "end-to-end encrypted",
            "business account",
            "Tap to learn more",
            "Messages and calls are"
          ];

          if (systemPhrases.some(phrase => line.includes(phrase))) {
            return null; 
          }

          const splitHyphen = line.split(' - ');
          let contentAfterDate = splitHyphen.length > 1 ? splitHyphen.slice(1).join(' - ') : line;

          const splitName = contentAfterDate.split(': ');
          if (splitName.length > 1) {
            return splitName.slice(1).join(': ').trim();
          }
          return contentAfterDate.trim();
        });

        const finalOutput = cleanedLines
          .filter(line => line !== null && line !== "")
          .join('\n');
        
        // 2. Update local preview and "Lift State Up" to Home page
        setFileContent(finalOutput);
        if (onFileReady) {
          onFileReady(finalOutput);
        }
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
      
      {/* 3. Restoring your preview box */}
      {fileContent && (
        <div style={{ 
          marginTop: '15px', 
          backgroundColor: '#f8f9fa', 
          maxHeight: '150px', 
          overflowY: 'auto', 
          textAlign: 'left', 
          padding: '12px', 
          fontSize: '0.85rem',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <strong style={{ color: '#d63384' }}>Cleaned Content Preview:</strong>
          <p style={{ whiteSpace: 'pre-wrap', color: '#444' }}>
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