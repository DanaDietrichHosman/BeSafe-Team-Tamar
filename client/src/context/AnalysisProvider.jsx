import { useState } from 'react';
import PropTypes from 'prop-types';
import { AnalysisContext } from './AnalysisContext'; 

export const AnalysisProvider = ({ children }) => {
  const [chatText, setChatText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <AnalysisContext.Provider value={{ 
      chatText, setChatText, 
      isLoading, setIsLoading, 
      analysisResult, setAnalysisResult 
    }}>
      {children}
    </AnalysisContext.Provider>
  );
};

AnalysisProvider.propTypes = {
  children: PropTypes.node.isRequired
};