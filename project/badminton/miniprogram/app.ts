import { global } from './models/global';

App<IAppOption>({
  globalData: {
    theme: 'light',
  },
  onLaunch (msg) {
    console.log('onLaunch', msg, msg.query.shareUid);
    global.shareUid = msg.query.shareUid;
    // wx.getShareInfo(Object object)
  }
});