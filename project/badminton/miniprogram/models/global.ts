

const deviceInfo = wx.getSystemInfoSync();

export const host = 'https://wx-star-bcbimrfukk.cn-hangzhou.fcapp.run';
// export const host = 'http://192.168.31.81:9000';
export const appId = 'wx305c15a59b70d8dd';
export const isIOS = deviceInfo.system.search('iOS') === -1? false : true;

const global = {
  shareUid: ''
};
export {
  global
};