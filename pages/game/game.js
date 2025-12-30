
Page({
  data: {
    statusBarHeight: 20,
    timeLeft: 60,
    lives: 5,
    question: "数一数有几个苹果？",
    type: "COUNTING",
    options: [3, 5, 7],
    config: { count: 5 },
    showResult: false,
    isWin: false
  },

  onLoad(options) {
    const sys = wx.getSystemInfoSync();
    this.setData({ statusBarHeight: sys.statusBarHeight });
    this.initLevel(options.id);
  },

  initLevel(id) {
    // 模拟根据人教版进度生成题目
    if (id == 101) {
      this.setData({
        type: "COUNTING",
        question: "数一数，图中有几个苹果？",
        config: { count: 6 },
        options: [4, 6, 8]
      });
    } else if (id == 103) {
      this.setData({
        type: "ADDITION",
        question: "3 + 2 = ?",
        config: { left: 3, right: 2 },
        options: [4, 5, 6]
      });
    }
  },

  onAnswer(e) {
    const val = e.currentTarget.dataset.val;
    const correct = this.checkAnswer(val);
    
    if (correct) {
      this.setData({ showResult: true, isWin: true });
      this.saveProgress();
    } else {
      wx.vibrateShort();
      this.setData({ lives: this.data.lives - 1 });
      if (this.data.lives <= 0) {
        this.setData({ showResult: true, isWin: false });
      }
    }
  },

  checkAnswer(val) {
    if (this.data.type === 'COUNTING') return val === this.data.config.count;
    if (this.data.type === 'ADDITION') return val === (this.data.config.left + this.data.config.right);
    return false;
  },

  saveProgress() {
    // 这里实现本地存储逻辑，解锁下一关
  },

  onBack() {
    wx.navigateBack();
  }
})
