
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const startApp = () => {
  console.log("🚀 HappyMath 网页版正在启动...");
  const rootElement = document.getElementById('root');

  if (rootElement) {
    try {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      console.log("✅ React 挂载成功");
    } catch (error) {
      console.error("❌ 渲染失败:", error);
      const overlay = document.getElementById('error-overlay');
      if (overlay) {
        overlay.style.display = 'block';
        overlay.innerText = "渲染错误: " + (error as Error).message;
      }
    }
  } else {
    console.error("❌ 找不到根节点 #root");
  }
};

// 确保 DOM 加载完成后再运行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
