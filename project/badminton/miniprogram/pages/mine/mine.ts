import { user } from '../../models/user';
import { request } from '../../util/request';
import { host, isIOS } from '../../models/global';
import CustomPage from '../../common/CustomPage';
import controlerBehavior from '../../common/controlerBehavior';
import userStore from '../../stores/user';

let videoAd: WechatMiniprogram.RewardedVideoAd;
const app = getApp<IAppOption>();
const taskList = [
  {
    title: '观看看广告支持开发者',
    desc: '开发不易，你的支持就是最大的动力',
    icon: 'play2',
    task: 'ad'
  }
];

CustomPage({
  behaviors: [controlerBehavior],
  data: {
    taskList: taskList,
    avatarUrl: '/images/avatar.jpg',
    userName: '微信用户',
    amount: 0,
    isIOS,
    ...app.globalData
  },
  async onShow () {
    wx.showLoading({
      title: '加载中..',
      mask: true
    });
    console.log('mine useronShow ', user);
    await userStore.updateUserInfo();
    this.setData({
      // ['taskList[1].progress']: user.shareTime || 0,
      // ['taskList[2].progress']: user.inviteTime || 0
    });
    wx.hideLoading();
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-1edcc6ea9e045727'
      })
      videoAd.onLoad(() => {
        console.log('广告加载成功');
      });
      videoAd.onError((err) => {
        console.log('广告err', err);
      });
      videoAd.onClose((res) => {
        console.log('广告关闭', res);
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded) {
          // 正常播放结束，可以下发游戏奖励
          userStore.addAmount(5)
          wx.showToast({
            title: '领取成功',
            icon: 'success',
          });
        } else {
          // 播放中途退出，不下发游戏奖励
          console.log('播放中途退出，不下发游戏奖励');
        }
      });
    }
  },
  payIOS () {
    this.setData({
      showGhQrcode: true
    });
  },
  async pay () {
    const order = await request({
      url: `${host}/we/pay/recharge/createOrder`,
      method: 'POST',
      data: {
        payChannel: 1,
        productId: 1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });
    console.log('createOrder success', order);
    const prepayInfo = order.data.prepayInfo;
    // https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_3.shtml
    wx.requestPayment({
      timeStamp: prepayInfo.timestamp,
      nonceStr: prepayInfo.nonceStr,
      package: prepayInfo.packageVal,
      signType: prepayInfo.signType,
      paySign: prepayInfo.paySign,
      async success (res) {
        console.log('requestPayment success', res);
        const orderRes = await request({
          url: `${host}/we/pay/recharge/orderQuery`,
          data: {
            orderId: order.data.orderId
          }
        });
        console.log('orderRes', orderRes);
        if (orderRes.code == 200) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          });
        }
      },
      fail (res) {
        console.log('requestPayment fail', res);
      }
    });
  },

  playAd () {
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        console.log('广告失败重试');
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败');
          });
      });
    }
  },
  async taskTap (e: WechatMiniprogram.TouchEvent) {
    const task = e.currentTarget.dataset.task;
    switch (task) {
    case 'group':{
      this.setData({
        showQrcode: true
      });
      break;
    }
    case 'sign':{
      // const res = await request({
      //   url: `${host}/loginRewards`,
      //   method: 'POST'
      // });
      // console.log(res);
      const hasClaimedTime = wx.getStorageSync('signRewardTime')
      if (hasClaimedTime && Date.now() - parseInt(hasClaimedTime) < 24 * 60 * 60 * 1000) {
        wx.showToast({
          title: '24小时内已领取',
          icon: 'error',
        });
      } else {
        wx.showToast({
          title: '领取成功',
          icon: 'success',
        });
        userStore.addAmount(1)
        wx.setStorageSync('signRewardTime', Date.now())
        // userStore.updateUserInfo();
      }
      break;
    }
    case 'share': {
      // await request({
      //   url: `${host}/we/activity/shareReward`,
      //   method: 'POST'
      // });
      // userStore.updateUserInfo();
      const shareRewardTime = wx.getStorageSync('shareRewardTime')
      if (shareRewardTime && Date.now() - parseInt(shareRewardTime) < 24 * 60 * 60 * 1000) {
        console.log('重复分享');
      } else {
        wx.showToast({
          title: '领取成功',
          icon: 'success',
        });
        userStore.addAmount(2)
        wx.setStorageSync('shareRewardTime', Date.now())
        // userStore.updateUserInfo();
      }
      break;
    }
    case 'ad': {
      if (videoAd) {
        videoAd.show().catch(() => {
          // 失败重试
          videoAd.load()
            .then(() => videoAd.show())
            .catch(err => {
              console.error('激励视频 广告显示失败', err)
            })
        })
      }
      break;
    }
    }
  },
  editName () {
    this.setData({
      showProfile: true
    });
  }
});
