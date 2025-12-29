import { useState } from 'react';

const FileHandler = () => {
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const rawText = e.target.result;
        
        // 1. Split the big text into an array of individual lines
        const lines = rawText.split('\n');

        // 2. Process each line to remove the timestamp and name
        const cleanedLines = lines.map(line => {
          // WhatsApp lines: [Date, Time] Name: Message
          const parts = line.split(': ');
          
          if (parts.length > 1) {
            // Take everything AFTER the first ": "
            return parts.slice(1).join(': ').trim();
          }
          return line.trim();
        });

        // 3. Join back and update the screen
        const finalOutput = cleanedLines.filter(line => line !== "").join('\n');
        setFileContent(finalOutput);
        console.log("File cleaned successfully!");
      };

      reader.readAsText(file);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h3>Step 1: Upload WhatsApp Chat</h3>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      
      <div style={{ marginTop: '10px', whiteSpace: 'pre-wrap', backgroundColor: '#f9f9f9', maxHeight: '200px', overflowY: 'auto' }}>
        <strong>Raw Content:</strong>
        <p>{fileContent}</p>
      </div>
    </div>
  );
};

export default FileHandler;