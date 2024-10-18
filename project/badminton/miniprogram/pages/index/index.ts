import CustomPage from '../../common/CustomPage';

const app = getApp<IAppOption>();
CustomPage({
  data: {
    ...app.globalData,
    courtFee: wx.getStorageSync('courtFee') || '',
    ballFee: wx.getStorageSync('ballFee') || '',
    totalPeople: wx.getStorageSync('totalPeople') || '',
    femaleCount: wx.getStorageSync('femaleCount') || '',
    discountPerFemale: wx.getStorageSync('discountPerFemale') || 5,
    femaleDiscountEnabled: wx.getStorageSync('femaleDiscountEnabled') || false,
    maleShare: '', // 男生分摊费用
    femaleShare: '', // 女生分摊费用
  },
  onLoad () {
    console.log('index onLoad');
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
  },
  onShow () {
    const self = this;
  },
  handleCourtFeeInput(e: any) {
    const value = parseFloat(e.detail.value);
    this.setData({
      courtFee: value
    });
    wx.setStorageSync('courtFee', value);
  },

  handleBallFeeInput(e: any) {
    const value = parseFloat(e.detail.value);
    this.setData({
      ballFee: value
    });
    wx.setStorageSync('ballFee', value);
  },

  handleTotalPeopleInput(e: any) {
    const value = parseInt(e.detail.value);
    this.setData({
      totalPeople: value
    });
    wx.setStorageSync('totalPeople', value);
  },

  handleFemaleCountInput(e: any) {
    const value = parseInt(e.detail.value);
    this.setData({
      femaleCount: value
    });
    wx.setStorageSync('femaleCount', value);
  },

  handleFemaleDiscountInput(e: any) {
    const value = parseFloat(e.detail.value);
    this.setData({
      discountPerFemale: value
    });
    wx.setStorageSync('discountPerFemale', value);
  },

  onSwitchHandler(e: any) {
    const value = e.detail.value;
    this.setData({
      femaleDiscountEnabled: value // 根据开关状态显示/隐藏输入框
    });
    wx.setStorageSync('femaleDiscountEnabled', value);
  },

  calculateShare() {
    const { courtFee, ballFee, totalPeople, femaleCount, discountPerFemale, femaleDiscountEnabled } = this.data;
    
    if (totalPeople === 0) {
      wx.showToast({
        title: '总人数不能为0',
        icon: 'none'
      });
      return;
    }
    if (totalPeople - femaleCount < 0) {
      wx.showToast({
        title: '女生人数太多啦？',
        icon: 'none'
      });
      return;
    }
    let maleShare, femaleShare;
    const totalCost = courtFee + ballFee;
    let maleCount = totalPeople - femaleCount;

    if (femaleDiscountEnabled && femaleCount > 0) {
      const totalmaleCountDiscount = maleCount * discountPerFemale;
      const sharedCost = (totalCost - totalmaleCountDiscount) / totalPeople;
      maleShare = totalPeople - femaleCount === 0? 0 : sharedCost + discountPerFemale ;
      this.generateReceiptPage(totalCost, courtFee, ballFee, totalPeople, femaleCount, discountPerFemale, maleShare, sharedCost, femaleDiscountEnabled);
      // this.setData({
      //   maleShare: maleShare.toFixed(1),
      //   femaleShare: sharedCost.toFixed(1)
      // });
    } else {
      maleShare = femaleShare = totalCost / totalPeople;
      this.generateReceiptPage(totalCost, courtFee, ballFee, totalPeople, femaleCount, discountPerFemale, maleShare, femaleShare, femaleDiscountEnabled);
      // this.setData({
      //   maleShare: sharedCost.toFixed(1),
      //   femaleShare: sharedCost.toFixed(1)
      // });
    }
  },
  generateReceiptPage(totalCost: number, courtFee: number, ballFee: number, totalPeople: number, femaleCount: number, discountPerFemale: number, maleShare: number, femaleShare: number, femaleDiscountEnabled: boolean) {
    const receiptData = {
      courtFee: courtFee.toFixed(2),
      ballFee: ballFee.toFixed(2),
      totalCost: totalCost.toFixed(2),
      totalPeople,
      femaleCount,
      discountPerFemale: discountPerFemale.toFixed(2),
      maleShare: (Math.ceil(maleShare*100)/100).toFixed(2),
      femaleShare: (Math.ceil(femaleShare*100)/100).toFixed(2),
      femaleDiscountEnabled: femaleDiscountEnabled
    };
    wx.navigateTo({
      url: '/pages/receipt/index?data=' + encodeURIComponent(JSON.stringify(receiptData))
    });
  }
});
