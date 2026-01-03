import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// 渲染应用
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

// 隐藏加载动画的逻辑由CSS动画处理，不需要JavaScript