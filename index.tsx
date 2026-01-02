import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

// 隐藏加载动画
setTimeout(() => {
  const loader = document.getElementById('app-loader');
  if (loader) loader.classList.add('hidden');
}, 500);