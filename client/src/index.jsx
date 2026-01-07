import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; 
import App from './App.jsx';
// מחקנו את ה-Import של ה-DuckProvider כאן

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* הסרנו את ה-DuckProvider שעטף את ה-App */}
    <App /> 
  </React.StrictMode>
);