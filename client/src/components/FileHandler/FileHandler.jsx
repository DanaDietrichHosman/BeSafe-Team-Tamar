import React, { useState } from 'react';

const FileHandler = () => {
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {

        setFileContent(e.target.result);
        console.log("File read successfully!");
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