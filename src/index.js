import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        if (registration.waiting) {
          registration.unregister().then(() => {
            window.location.reload();
          });
        }
      })
      .catch(error => console.error('SW error:', error));
  });
}