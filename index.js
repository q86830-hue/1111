// 使用CDN提供的React和React DOM
const { React, ReactDOM } = window;

// 直接渲染一个简单的组件
const SimpleApp = () => {
  return React.createElement(
    'div',
    {
      className: 'h-full w-full overflow-hidden bg-blue-50 font-sans p-8'
    },
    React.createElement('h1', {
      className: 'text-3xl font-bold text-center text-blue-600 mb-4'
    }, '快乐数学'),
    React.createElement('p', {
      className: 'text-lg text-center text-gray-700'
    }, '应用已经成功加载！'),
    React.createElement('p', {
      className: 'text-sm text-center text-gray-500 mt-4'
    }, '这是一个简化版本，用于测试加载动画是否能正常隐藏。')
  );
};

// 确保DOM加载完成后再执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initApp() {
  console.log('DOM加载完成，开始初始化应用...');
  
  // 渲染应用
  const container = document.getElementById('root');
  if (container) {
    console.log('找到root容器，开始渲染应用...');
    ReactDOM.createRoot(container).render(React.createElement(SimpleApp));
    console.log('应用渲染完成');
  }
  
  // 隐藏加载动画
  console.log('设置隐藏加载动画的定时器...');
  setTimeout(() => {
    console.log('尝试隐藏加载动画...');
    const loader = document.getElementById('app-loader');
    if (loader) {
      console.log('添加hidden类到加载动画元素');
      loader.classList.add('hidden');
      console.log('加载动画已隐藏');
    } else {
      console.error('未找到加载动画元素');
    }
  }, 500);
}