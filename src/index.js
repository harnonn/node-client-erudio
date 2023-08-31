import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('REACT_APP_API_URL: ' + process.env.REACT_APP_API_URL);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);