

Component({
  properties: {
    amount: {
      type: Number,
      value: 0
    },

  },
  data: {

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: async function () {
      // console.log('attached', this.data.text);

    }
  },
  methods: {
    navToMinePage () {
      wx.switchTab({
        url: '/pages/mine/mine'
      });
    }
  }
});