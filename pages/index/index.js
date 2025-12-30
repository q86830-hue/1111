
Page({
  data: {
    statusBarHeight: 20,
    coins: 0,
    stars: 0,
    levels: [
      { id: 101, title: "数一数", locked: false, stars: 0 },
      { id: 102, title: "比多少", locked: true, stars: 0 },
      { id: 103, title: "1-5的加法", locked: true, stars: 0 },
      { id: 104, title: "认识图形", locked: true, stars: 0 },
      { id: 105, title: "6-10的减法", locked: true, stars: 0 },
      { id: 106, title: "凑十法进位", locked: true, stars: 0 }
    ]
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    this.setData({ statusBarHeight: sys.statusBarHeight });
    this.loadProgress();
  },

  loadProgress() {
    const progress = wx.getStorageSync('math_progress') || {};
    const updatedLevels = this.data.levels.map(l => {
      if (progress[l.id]) {
        return { ...l, ...progress[l.id] };
      }
      return l;
    });
    this.setData({ 
      levels: updatedLevels,
      coins: wx.getStorageSync('math_coins') || 0,
      stars: wx.getStorageSync('math_stars') || 0
    });
  },

  onSelectLevel(e) {
    const id = e.currentTarget.dataset.id;
    const level = this.data.levels.find(l => l.id === id);
    if (level.locked) {
      wx.showToast({ title: '先完成前面的关卡吧！', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: `/pages/game/game?id=${id}`
    });
  }
})
