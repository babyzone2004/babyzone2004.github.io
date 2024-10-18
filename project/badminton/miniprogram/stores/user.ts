import { Store } from 'westore';
import { loginPromise, updateUserInfo, getUserInfo, setUserInfo, type User } from '../models/user';

class UserStore extends Store<any> {
  constructor () {
    super();
  }

  async init () {
    const userInfo = await loginPromise;
    this.data.userInfo = userInfo;
    this.update();
  }

  async updateUserInfo () {
    const data = await updateUserInfo();
    console.log('updateUserInfo', data);
    this.render('userInfo', data);
  }

  async getUserInfo () {
    const data = await getUserInfo();
    console.log('getUserInfo', data);
    this.render('userInfo', data);
  }

  render (origin: string, target: WechatMiniprogram.IAnyObject) {
    Object.assign(this.data[origin], target);
    this.update();
  }
  /**
   * 扣除key
   * @param num
   */
  decreaseAmount (num: number) {
    this.data.userInfo.amount -= num;
    if (this.data.userInfo.amount < 0) {
      this.data.userInfo.amount = 0;
    }
    wx.setStorageSync('amount', this.data.userInfo.amount)
    this.update();
  }

  addAmount (num: number) {
    this.data.userInfo.amount += num;
    this.update();
    wx.setStorageSync('amount', this.data.userInfo.amount)
  }

  setUserInfo (userInfo: User) {
    this.render('userInfo', setUserInfo(userInfo));
    this.update();
  }
}

const userStore = new UserStore();
export default userStore;
