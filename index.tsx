
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const startApp = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    try {
      const root = ReactDOM.createRoot(rootElement);
      root.render(<App />);
    } catch (error) {
      console.error("Mounting Error:", error);
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
