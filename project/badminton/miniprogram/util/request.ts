import { user, login, userKey } from '../models/user';
let rqTask: WechatMiniprogram.RequestTask;
import type AbortController from './abortController';

export const request = ({ url, data = {}, header = {}, method = 'GET', responseType = 'text' }: WechatMiniprogram.RequestOption<WechatMiniprogram.IAnyObject>, abortController?: AbortController): Promise<any> => {
  return new Promise((resolve) => {
    // 读取本地缓存的header
    // 读取成功（已登录），则置入请求Cookie
    // 否则（未登录），则在请求回调中，将header放入本地缓存
    if (user.token) {
      header['Authorization'] = `Authorization=${user.token};`;
    }
    const requestOpt = {
      method: method,
      url: url,
      data: data,
      responseType: responseType,
      header,
      async success (res: WechatMiniprogram.RequestSuccessCallbackResult<WechatMiniprogram.IAnyObject>) {
        // 登录态失效，后台重新登陆
        if (res.statusCode === 200 && res.data.code != 401) {
          resolve(res.data);
        } else if (res.statusCode === 401 || res.data.code === 401) {
          wx.removeStorage({ key: userKey });
          wx.showModal({
            title: '登录异常',
            content: '是否重试？',
            success (res) {
              if (res.confirm) {
                wx.request(requestOpt);
                console.log('用户点击确定');
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
          const user = await login();
          requestOpt.header.Authorization = user.token;
        } else {
          wx.showToast({
            title: '服务器异常',
            icon: 'error',
            duration: 1500
          });
          console.log('wx.request err', res);
        }
      }, fail (res: any) {
        console.log('wx.request fail', res);
        wx.showModal({
          title: '提示',
          content: JSON.stringify(res)
        });

        // abort会产生600004
        if (res.errno != 600004) {
          wx.showToast({
            title: '网络异常',
            icon: 'error',
            duration: 1500
          });
        }
      }
    };
    rqTask = wx.request(requestOpt);
    abortController && abortController.addTask(rqTask);
  });
};