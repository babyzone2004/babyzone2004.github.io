import CustomPage from '../../common/CustomPage';
import controlerBehavior from '../../common/controlerBehavior';
const { wxml, style } = require('./demo.js')

const app = getApp<IAppOption>();
CustomPage({
  behaviors: [controlerBehavior],
  data: {
    courtFee: '',
    ballFee: '',
    totalCost: '',
    totalPeople: '',
    femaleCount: '',
    discountPerFemale: '',
    maleShare: 0,
    femaleShare: 0,
    wxml: ''
  },

  onLoad(options: any) {
    const receiptData = JSON.parse(decodeURIComponent(options.data));
    this.setData({
      ...receiptData
    });
    this.setData({wxml: `
      <view class="card">
          <view class="card-header">
            <text class="title">AA费用清单</text>
          </view>
          <view class="divider"></view>
          <view class="card-content">
            <view class="row">
              <text class="label">场地费：</text>
              <text class="value">${receiptData.courtFee} 元</text>
            </view>
            <view class="row">
              <text class="label">球费：</text>
              <text class="value">${receiptData.ballFee} 元</text>
            </view>
            <view class="row">
              <text class="label">总共费用：</text>
              <text class="value total">${receiptData.totalCost} 元</text>
            </view>
            <view class="row">
              <text class="label">总人数：</text>
              <text class="value">${receiptData.totalPeople} 人</text>
            </view>
            <view class="row">
              <text class="label">女生人数：</text>
              <text class="value">${receiptData.femaleCount} 人</text>
            </view>
            <view class="row">
              <text class="label">女生人均优惠：</text>
              <text class="value">${receiptData.discountPerFemale} 元</text>
            </view>
            <view class="divider"></view>
            <view class="row">
              <text class="label highlight">男生：</text>
              <text class="value highlight">${receiptData.maleShare} 元</text>
            </view>
            <view class="row">
              <text class="label highlight">女生：</text>
              <text class="value highlight">${receiptData.femaleShare} 元</text>
            </view>
          </view>
        </view>
      `})
  },
  copy () {
    const receipt = `
-------------
AA费用清单
-------------
场地费：${this.data.courtFee}元
球费：${this.data.ballFee}元
总共费用：${this.data.totalCost}元
总人数：${this.data.totalPeople}人
女生人数：${this.data.femaleCount}人
女生人均优惠：${this.data.discountPerFemale}元

---------
人均费用
---------
男生：${this.data.maleShare}元
女生：${this.data.femaleShare}元

`;
    wx.setClipboardData({
      data: receipt,
      success: () => {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000,
          success: function (res) {
            console.log('show succ', res);
          },
          fail: function (res) {
            console.log('fail', res);
          }
        });
      }
    });
  },
  generateImage() {
    const self = this;
    const wxml2canvas = this.selectComponent('#wxmlToCanvas');
    if (!wxml2canvas) {
      console.error('Component not found');
      return;
    }

    wx.createSelectorQuery()
  .select('#content') // 选择你想要绘制的元素
  .boundingClientRect((rect) => {
    if (rect.width === 0 || rect.height === 0) {
      wx.showToast({
        title: '元素宽高不能为0',
        icon: 'none'
      });
      return;
    }
    wxml2canvas.renderToCanvas({ wxml: self.data.wxml, style }).then((res: any) => {
      return wxml2canvas.canvasToTempFilePath();
    }).then((res: any) => {
      console.log('res.tempFilePath', res.tempFilePath);
      const tempFilePath = res.tempFilePath;
      this.saveAndShareImage(tempFilePath);
    }).catch((err: any) => {
      console.error(err);
      wx.showToast({
        title: '生成图片失败',
        icon: 'none'
      });
    });;
  })
  .exec();
  },
  saveAndShareImage(tempFilePath: any) {
    // wx.saveImageToPhotosAlbum({
    //   filePath: tempFilePath,
    //   success: () => {
    //     wx.showModal({
    //       title: '图片已保存',
    //       content: '费用清单图片已保存到相册，可以分享给好友。',
    //       showCancel: false
    //     });
    //   },
    //   fail: (err) => {
    //     console.log(err);
    //     wx.showToast({
    //       title: '保存失败，请检查权限',
    //       icon: 'none'
    //     });
    //   }
    // });

    wx.showShareMenu({
      withShareTicket: true,
      success: () => {
        wx.showShareImageMenu({
          path: tempFilePath,
          success: () => {
            wx.showToast({
              title: '分享成功',
              icon: 'success'
            });
          }
        })
      }
    });
  }
});