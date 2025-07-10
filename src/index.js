import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Asumiendo que tu componente principal está en App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
