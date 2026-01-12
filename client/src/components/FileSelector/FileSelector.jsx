import { useState } from 'react';
import PropTypes from 'prop-types';
import JSZip from "jszip"; // ייבוא הספרייה שהתקנת
import styles from './FileSelector.module.css';

const FileSelector = ({ onFileReady = () => {} }) => {
  const [fileContent, setFileContent] = useState("");

  // פונקציה עזר לניקוי הטקסט
  const cleanWhatsAppText = (rawText) => {
    const lines = rawText.split('\n');
    const cleanedLines = lines.map(line => {
      const systemPhrases = ["end-to-end encrypted", "business account", "Tap to learn more", "Messages and calls are", "You deleted this message"];
      if (systemPhrases.some(phrase => line.includes(phrase))) return null; 

      const splitHyphen = line.split(' - ');
      let contentAfterDate = splitHyphen.length > 1 ? splitHyphen.slice(1).join(' - ') : line;
      const splitName = contentAfterDate.split(': ');
      return splitName.length > 1 ? splitName.slice(1).join(': ').trim() : contentAfterDate.trim();
    });

    return cleanedLines.filter(line => line !== null && line !== "").join('\n');
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    let rawText = "";

    try {
      // בדיקה האם מדובר בקובץ ZIP
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        const zip = new JSZip();
        const content = await zip.loadAsync(file);
        
        // חיפוש קובץ ה-txt הראשון בתוך הזיפ
        const txtFileName = Object.keys(content.files).find(name => name.toLowerCase().endsWith(".txt"));

        if (txtFileName) {
          rawText = await content.files[txtFileName].async("string");
        } else {
          alert("No .txt file found inside the ZIP!");
          return;
        }
      } 
      // טיפול בקובץ טקסט רגיל
      else {
        rawText = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsText(file);
        });
      }

      // ניקוי והעברת התוכן
      if (rawText) {
        const cleanedText = cleanWhatsAppText(rawText);
        setFileContent(cleanedText);
        onFileReady(cleanedText);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Error reading file. Please try again.");
    }
  };

  return (
    <div className={styles.fileSelectorContainer}>
      {/* עדכון הכותרת כדי שתכלול גם ZIP */}
      <p className={styles.label}>Select your WhatsApp <b>.txt</b> or <b>.zip</b> file below:</p>
      <input 
        type="file" 
        accept=".txt, .zip" 
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