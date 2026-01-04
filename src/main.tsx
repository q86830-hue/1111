import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';
import { ErrorBoundary } from '../components/ErrorBoundary';
import './index.css';

console.log('开始渲染React应用...');
console.log('React版本:', React.version);

const container = document.getElementById('root');
if (container) {
  console.log('找到了root容器');
  try {
    const root = createRoot(container);
    console.log('创建了React根实例');
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('React应用渲染完成');
  } catch (error) {
    console.error('React应用渲染失败:', error);
    // 渲染降级UI
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #eff6ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="background: white; padding: 2rem; border-radius: 2rem; box-shadow: 0 10px 40px rgba(0,0,0,0.1); text-align: center; max-width: 400px;">
          <h2 style="font-size: 3rem; margin-bottom: 1rem;">😯</h2>
          <h3 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">抱歉，应用加载失败</h3>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">请刷新页面重试</p>
          <button onclick="window.location.reload()" style="background-color: #3b82f6; color: white; font-weight: bold; padding: 0.75rem 1.5rem; border: none; border-radius: 9999px; cursor: pointer; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
            刷新页面
          </button>
        </div>
      </div>
    `;
  }
} else {
  console.error('未找到root容器');
  // 直接在body中渲染错误信息
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #eff6ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  errorDiv.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 2rem; box-shadow: 0 10px 40px rgba(0,0,0,0.1); text-align: center; max-width: 400px;">
      <h2 style="font-size: 3rem; margin-bottom: 1rem;">😯</h2>
      <h3 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">抱歉，应用无法加载</h3>
      <p style="color: #6b7280; margin-bottom: 1.5rem;">未找到应用根容器</p>
      <button onclick="window.location.reload()" style="background-color: #3b82f6; color: white; font-weight: bold; padding: 0.75rem 1.5rem; border: none; border-radius: 9999px; cursor: pointer; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
        刷新页面
      </button>
    </div>
  `;
  document.body.appendChild(errorDiv);
}