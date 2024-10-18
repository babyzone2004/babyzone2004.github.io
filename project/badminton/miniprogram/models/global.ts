

const deviceInfo = wx.getSystemInfoSync();

// export const host = 'http://192.168.31.81:9000';
export const isIOS = deviceInfo.system.search('iOS') === -1? false : true;

const global = {
  shareUid: ''
};
export {
  global
};