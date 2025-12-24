import React, { useState } from 'react';
import styles from './Home.module.css';

const Home = () => {
  const [chatText, setChatText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false); // New state for results visibility

  // Function to handle file selection and reading
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setChatText(content);
        console.log("File loaded successfully.");
      };
      reader.readAsText(file);
    }
  };

  // Function to simulate analysis logic
  const handleAnalyze = () => {
    if (!chatText) {
      alert("Please upload a file first!");
      return;
    }
    setIsLoading(true);
    setShowResults(false);

    // Simulate a delay for the analysis process
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true); // Show results after simulation
    }, 2000);
  };

  return (
    <div className={styles.home} style={{ 
      direction: 'ltr', 
      textAlign: 'center', 
      padding: '20px', 
      minHeight: '100vh', 
      paddingBottom: '100px',
      overflowY: 'auto' 
    }}>
      {/* Main Title */}
      <h1 className={styles.headline} style={{ color: '#d63384', fontSize: '3.5rem', marginBottom: '15px' }}>
        BeSafe
      </h1>

      {/* The Highlighted Slogan */}
      <div style={{
        backgroundColor: 'rgba(214, 51, 132, 0.1)', 
        display: 'inline-block',
        padding: '12px 30px',
        borderRadius: '50px',
        border: '1px solid rgba(214, 51, 132, 0.2)',
        marginBottom: '20px'
      }}>
        <p style={{ 
          fontSize: '1.4rem', 
          color: '#333', 
          fontWeight: '700', 
          margin: 0,
          letterSpacing: '0.5px'
        }}>
          🛡️ Early detection of harmful content in WhatsApp conversations.
        </p>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '30px', 
        border: '2px dashed #d63384', 
        borderRadius: '15px',
        backgroundColor: '#fff',
        maxWidth: '650px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ marginBottom: '15px', color: '#333' }}>Step 1: Upload Chat</h2>
        
        <div style={{ textAlign: 'left', backgroundColor: '#fdf2f8', padding: '15px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.95rem' }}>
          <b style={{ color: '#d63384' }}>How to export your chat:</b>
          <ol style={{ marginTop: '10px', lineHeight: '1.6', color: '#444' }}>
            <li>Open the WhatsApp chat you want to analyze.</li>
            <li>Tap the <b>three dots (⋮)</b> or the <b>Contact Name</b> at the top.</li>
            <li>Select <b>More</b> {'>'} <b>Export Chat</b>.</li>
            <li>When asked, choose <b>"Without Media"/ "With Media"</b>.</li>
            <li>Save the generated <b>.zip</b> file, open it, and upload the <b>.txt</b> file inside.</li>
          </ol>
        </div>

        <p style={{ fontWeight: '500' }}>Select your WhatsApp <b>.txt</b> file below:</p>
        
        <input 
          type="file" 
          accept=".txt" 
          onChange={handleFileUpload}
          style={{ 
            margin: '20px 0', 
            display: 'block', 
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px'
          }} 
        />

        <button 
          onClick={handleAnalyze}
          disabled={isLoading}
          style={{ 
            padding: '15px 40px', 
            fontSize: '1.2rem', 
            cursor: isLoading ? 'not-allowed' : 'pointer',
            backgroundColor: '#d63384',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontWeight: 'bold',
            width: '100%',
            boxShadow: '0 4px 15px rgba(214, 51, 132, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          {isLoading ? "Analyzing..." : "Analyze Chat Now"}
        </button>
      </div>

      {/* Results Section Placeholder */}
      {showResults && (
        <div style={{ 
          marginTop: '40px', 
          padding: '30px', 
          backgroundColor: '#fff', 
          borderRadius: '15px', 
          maxWidth: '800px', 
          marginLeft: 'auto', 
          marginRight: 'auto',
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
          border: '1px solid #eee'
        }}>
          <h2 style={{ color: '#d63384' }}>Analysis Results</h2>
          <p>This is where your histograms and data analysis will appear.</p>
          <div style={{ height: '200px', backgroundColor: '#f9f9f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', border: '1px dashed #ddd' }}>
             Chart Placeholder
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;