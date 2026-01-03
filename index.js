// React应用入口文件
// 由于GitHub Pages不支持TypeScript，我们创建一个简单的JavaScript入口文件
// 这个文件会被index.html直接引用，用于渲染React应用

console.log('开始渲染React应用...');

// 检查是否存在React和ReactDOM
if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
  console.error('React或ReactDOM未定义');
} else {
  // 渲染简单的欢迎页面
  const container = document.getElementById('root');
  if (container) {
    console.log('找到了root容器');
    try {
      // 渲染一个简单的欢迎页面
      ReactDOM.render(
        React.createElement('div', { className: 'welcome-page' },
          React.createElement('h1', { className: 'welcome-title' }, '快乐数学'),
          React.createElement('p', { className: 'welcome-subtitle' }, '同步人教版课程'),
          React.createElement('div', { className: 'welcome-content' },
            React.createElement('div', { className: 'welcome-character' }, '🐼'),
            React.createElement('p', { className: 'welcome-text' }, '欢迎来到快乐数学！'),
            React.createElement('p', { className: 'welcome-description' }, '这里有有趣的数学游戏和练习，帮助你提高数学成绩。'),
            React.createElement('div', { className: 'welcome-actions' },
              React.createElement('button', { className: 'welcome-button', onClick: () => window.location.reload() }, '刷新页面'),
              React.createElement('button', { className: 'welcome-button', onClick: () => window.open('https://github.com', '_blank') }, '访问GitHub')
            )
          )
        ),
        container
      );
      console.log('React应用渲染完成');
    } catch (error) {
      console.error('React应用渲染失败:', error);
    }
  } else {
    console.error('未找到root容器');
  }
}