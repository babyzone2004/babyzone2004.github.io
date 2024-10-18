import { request } from '../util/request';
import { host, global, appId } from './global';

const userKey = 'user';
type User = {
  openID?: string
  token?: string
  uid?: string
  userName?: string
  amount: number
  vipStatus?: number
  chargeTip?: string,
  shareTime?: number,
  inviteTime?: number,
  englishName?: string
}
const user: User = {};

function login (): Promise<WechatMiniprogram.IAnyObject> {
  return new Promise((resolve) => {
    const userCache = wx.getStorageSync(userKey);
    const token = userCache.token;
    const exp = userCache.exp;
    console.log(Date.now() / 1000, exp, token && (Date.now() / 1000) < exp);
    // 如果有token并且没有过期，直接用缓存的
    if (token && (Date.now() / 1000) < exp ) {
      Object.assign(user, userCache);
      console.log('read frome user cache', user);
      resolve(user);
    } else {
      wx.login({
        success: async res => {
          console.log('wx.login res.code', res.code);
          const shareUidQuery = global.shareUid? `share_uid=${global.shareUid}`: 'share_uid=0';
          const userInfo = await request({
            url: `${host}/login?app_type=${shareUidQuery}`,
            method: 'POST',
            data: {
              code: res.code
            }
          });
          Object.assign(user, userInfo);
          wx.setStorage({
            key: userKey,
            data: user
          });
          console.log('login user', user);
          resolve(user);
        }
      });
    }
  });
}
// 从服务端获取用户信息
async function updateUserInfo () {
  // const { result } : AnyObject = await wx.cloud.callFunction({
  //   // 云函数名称
  //   name: 'getOpenId',
  //   // 传给云函数的参数
  //   data: {
  //     a: 1,
  //     b: 2,
  //     shareUid: global.shareUid || 0,
  //   },
  // })
  // 通过storage控制用户的配额
  const result = { amount: user.amount || 2, unionid: user.uid || 1000 }
  const res = wx.getStorageSync('amount')
  if(res !== '' && res !== undefined) {
    result.amount = res
  } else {
    wx.setStorageSync('amount', result.amount)
  }

  console.log('result', result);
  Object.assign(user, { uid: result?.unionid, amount: result?.amount });
  return user;
}

function relogin() {
  wx.removeStorageSync(userKey)
  return login();
}
// 获取用户信息
async function getUserInfo () {
  if (!user.userName) {
    const data = await updateUserInfo();
    Object.assign(user, data);
    return user;
  } else {
    return user;
  }
}

function setUserInfo (userInfo: User) {
  Object.assign(user, userInfo);
  wx.setStorage({
    key: userKey,
    data: user
  });
  return user;
}
//代码执行阶段开始登录
const loginPromise = login();
export {
  loginPromise,
  login,
  relogin,
  user,
  updateUserInfo,
  getUserInfo,
  User,
  setUserInfo,
  userKey
};