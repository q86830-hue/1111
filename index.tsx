
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const startApp = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    try {
      const root = ReactDOM.createRoot(rootElement);
      // React 18+ replaces the child nodes automatically when render is called,
      // but explicitly clearing for a cleaner transition if needed.
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } catch (error) {
      console.error("Mounting Error:", error);
      if (window.onerror) {
        window.onerror(error.message, 'index.tsx', 0, 0, error);
      }
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
