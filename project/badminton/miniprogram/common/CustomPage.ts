// import { user } from '../models/user';
/**
 * 所有页面的全局方法
 * @param options
 * @returns
 */
const CustomPage: WechatMiniprogram.Page.Constructor = function (options) {
  return Page(
    Object.assign({}, {
      onShareAppMessage () {
        return {
          title: '球费AA助手',
          path: `pages/index/index`,
          // 长宽比是 5:4
          imageUrl: '/images/share.jpg'
        };
      },
      onShareTimeline () {
        const query = `shareUid=0`;
        console.log('query', query);
        return {
          title: '球费AA助手',
          query: query,
          // 长宽比是 1:1
          imageUrl: '/images/share.jpg'
        };
      }
    }, options)
  );
};

export default CustomPage;
