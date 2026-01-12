import { useState } from 'react';
import JSZip from "jszip"; 
import { useAnalysis } from '../../context/useAnalysis'; 
import styles from './UploadSection.module.css';

const UploadSection = () => {
  const { setChatText, runAnalysis, isLoading, chatText } = useAnalysis();
  const [previewText, setPreviewText] = useState("");

  // --- פונקציית ניקוי הטקסט (הופכת את הניתוח למדויק יותר) ---
  const cleanWhatsAppText = (rawText) => {
    const lines = rawText.split('\n');
    const cleanedLines = lines.map(line => {
      const systemPhrases = ["encrypted", "business account", "Tap to learn more", "Messages and calls are", "You deleted this message"];
      if (systemPhrases.some(phrase => line.includes(phrase))) return null; 

      let content = line;
      if (content.includes(' - ')) content = content.split(' - ').slice(1).join(' - '); 
      if (content.includes(': ')) content = content.split(': ').slice(1).join(': ');

      return content.trim();
    });
    return cleanedLines.filter(line => line && line.length > 0).join('\n');
  };

  // --- טיפול בהעלאת קובץ (ZIP או TXT) ---
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    let extractedText = "";

    try {
      // טיפול בקובץ ZIP
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        const zip = new JSZip();
        const content = await zip.loadAsync(file);
        const txtFileName = Object.keys(content.files).find(name => name.toLowerCase().endsWith(".txt"));

        if (txtFileName) {
          extractedText = await content.files[txtFileName].async("string");
        } else {
          alert("No .txt file found inside this ZIP!");
          return;
        }
      } 
      // טיפול בקובץ טקסט רגיל
      else {
        extractedText = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsText(file);
        });
      }

      if (extractedText) {
        const cleaned = cleanWhatsAppText(extractedText);
        setPreviewText(cleaned); // לתצוגה מקומית
        setChatText(cleaned);    // לעדכון ה-Context לניתוח
      }
    } catch (error) {
      console.error("File Error:", error);
      alert("Error reading file");
    }
  };

  const handleAnalyzeClick = () => {
    if (!chatText) {
      alert("Please upload a WhatsApp .zip or .txt file first! 😊");
      return;
    }
    runAnalysis();
  };

  return (
    <div className={styles.uploadBox}>
      <h2 className={styles.stepTitle}>Upload Chat</h2>
      
      <div className={styles.instructions}>
        <b className={styles.instructionTitle}>How to export your chat:</b>
        <ul className={styles.list}>
          <li>Open the WhatsApp chat.</li>
          <li>Tap the <b>three dots (⋮)</b> or the <b>Contact Name</b>.</li>
          <li>Select <b>More</b> {'>'} <b>Export Chat</b>.</li>
          <li>Choose <b>Without Media</b>.</li>
          <li>Upload the <b>.zip</b> file you received here.</li>
        </ul>
      </div>

      {/* החלפת ה-FileSelector ב-input מובנה לטיפול גמיש */}
      <div className={styles.fileInputWrapper}>
        <input 
          type="file" 
          accept=".txt, .zip" 
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>

      {previewText && (
        <div className={styles.previewBox}>
          <strong className={styles.previewTitle}>📄 Chat Preview (Cleaned):</strong>
          <div className={styles.previewScroll}>
            {previewText.substring(0, 800)}...
          </div>
        </div>
      )}

      <button 
        onClick={handleAnalyzeClick} 
        disabled={isLoading} 
        className={styles.analyzeBtn}
      >
        {isLoading ? "Analyzing..." : "Analyze Chat Now"}
      </button>
    </div>
  );
};

export default UploadSection;