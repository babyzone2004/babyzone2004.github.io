// 获取小程序录音授权
export const getRecordAuth = () => {
  wx.getSetting({
    success (res) {
      console.log('succ');
      console.log(res);
      if (!res.authSetting['scope.record']) {
        wx.authorize({
          scope: 'scope.record',
          success () {
            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
            console.log('succ auth');
          }, fail () {
            console.log('fail auth');
          }
        });
      } else {
        console.log('record has been authed');
      }
    }
  });
};

export const checkChinese = (val: string): boolean => {
  const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  return reg.test(val);
};


/**
 * @description 对目标日期对象进行格式化
 * @function
 * @param {Date} source 目标日期对象
 * @param {string} pattern 日期格式化规则
 * @return {string} 格式化后的字符串
 */

/*
 * @remark
 *
<b>格式表达式，变量含义：</b><br><br>
h: 不带 0 补齐的 12 进制时表示<br>
H: 不带 0 补齐的 24 进制时表示<br>
m: 不带 0 补齐分表示<br>
s: 不带 0 补齐秒表示<br>
M: 不带 0 补齐的月表示<br>
d: 不带 0 补齐的日表示
 *
*/
export const formate = (source: Date, pattern: string): string => {
  function replacer (patternPart: RegExp, result: string) {
    pattern = pattern.replace(patternPart, result);
  }

  const year    = source.getFullYear(),
    month   = (source.getMonth() + 1).toString(),
    date2   = source.getDate().toString(),
    hours   = source.getHours(),
    minutes = source.getMinutes().toString(),
    seconds = source.getSeconds().toString();

  replacer(/yyyy/g, year.toString());
  replacer(/yy/g, year.toString().slice(2));
  replacer(/MM/g, month);
  replacer(/M/g, month);
  replacer(/dd/g, date2);
  replacer(/d/g, date2);

  replacer(/HH/g, hours.toString());
  replacer(/H/g, hours.toString());
  replacer(/hh/g, (hours % 12).toString());
  replacer(/h/g, (hours % 12).toString());
  replacer(/mm/g, minutes);
  replacer(/m/g, minutes);
  replacer(/ss/g, seconds);
  replacer(/s/g, seconds);

  return pattern;
};