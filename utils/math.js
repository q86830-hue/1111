
const generateLevel = (id) => {
  const levelId = parseInt(id);
  
  // 同步人教版一上进度
  if (levelId === 101) { // 1. 数一数
    return {
      type: 'COUNTING',
      question: '请数一数图中有多少个苹果？',
      config: { count: Math.floor(Math.random() * 5) + 3 },
      getOptions: (conf) => [conf.count - 1, conf.count, conf.count + 1].sort(() => Math.random() - 0.5)
    };
  }
  
  if (levelId === 103) { // 1-5的加法
    const left = Math.floor(Math.random() * 3) + 1;
    const right = Math.floor(Math.random() * 2) + 1;
    return {
      type: 'ADDITION',
      question: `${left} + ${right} = ?`,
      config: { left, right },
      getOptions: (conf) => [conf.left + conf.right, conf.left + conf.right + 1, conf.left + conf.right - 1].sort(() => Math.random() - 0.5)
    };
  }

  if (levelId === 104) { // 认识图形
    const shapes = ['circle', 'square'];
    const target = shapes[Math.floor(Math.random() * shapes.length)];
    return {
      type: 'SHAPE',
      question: `请找出：${target == 'circle' ? '圆形' : '正方形'}`,
      config: { targetShape: target },
      options: ['圆形', '正方形', '三角形']
    };
  }

  return null;
};

module.exports = { generateLevel };
