import React from 'react';
import { createRoot } from 'react-dom/client';

// 直接渲染一个简单的组件，不依赖App组件
const SimpleApp: React.FC = () => {
  return (
    <div className="h-full w-full overflow-hidden bg-blue-50 font-sans p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">快乐数学</h1>
      <p className="text-lg text-center text-gray-700">应用已经成功加载！</p>
      <p className="text-sm text-center text-gray-500 mt-4">这是一个简化版本，用于测试加载动画是否能正常隐藏。</p>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<SimpleApp />);
}

// 隐藏加载动画
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loader = document.getElementById('app-loader');
    if (loader) {
      loader.classList.add('hidden');
    }
  }, 500);
});