import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// 导入Tailwind CSS样式
import './src/index.css';

console.log('开始渲染React应用...');
console.log('React版本:', React.version);

// 渲染应用
const container = document.getElementById('root');
if (container) {
  console.log('找到了root容器');
  try {
    const root = createRoot(container);
    console.log('创建了React根实例');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('React应用渲染完成');
  } catch (error) {
    console.error('React应用渲染失败:', error);
  }
} else {
  console.error('未找到root容器');
}