Cocos Creator从1.0版本发布到现在也有一年多了，按理说一些常见的问题网上都有解决方案，例如"**如何自定义首页加载进度条界面**"这种普遍需求，应该所有人都会遇到的，因此也有完善的解决方案才对。我在网上搜了一些文章，虽然也有讨论de的帖子，但是方案都不尽人意。因此只能再次自己动手丰衣足食了，在此我总结一下我的思路和策略，分享给大家，希望后来的人少走弯路，另外这里的方案只针对H5游戏发布，其他平台可以借鉴思路自己实现。

首页加载的loading界面，官网的文档并没有提及，我是通过构建发布后的代码分析的。我的另一篇文章《[Cocos Creator—优化首页打开速度](https://segmentfault.com/a/1190000010403265)》也讲过Cocos Creator加载的策略，有兴趣可以参考。其实Cocos的加载策略很简单，main.js作为加载逻辑和style-mobile.css实现加载ui，但是比较坑的是这两个文件并没有通过工程文件暴露出来，你只能在Cocos Creator的安装目录里面扒出源码，网上有些解决方案是直接修改这两个源文件，是可以达到目的，但有两个弊端：

1. 不利于Cocos Creator的更新，每次升级Cocos Creator到新版本，你都需要从新修改一次
2. 不利于团队协作，团队每个人都需要修改一遍Cocos Creator安装文件

这个方案一看就不靠谱，其实要彻底解决这个问题很简单，让Cocos Creator开发组把这两个文件暴露到工程里面就行了，但不知道为什么这么久还没有实现。

所以我的方案就是做开发组还没有做的事情，自己把这两个文件暴露到工程上，虽然不完美，但能避免上面两个问题。这个方案能实现以下功能：

1. 可以在项目工程下面完美自定义loading界面
2. 能动态把自定义的loading界面代码注入到构建发布后的最终线上代码
3. 能在不修改源码的条件下，通过覆盖代码的方式实现自己的首页加载界面

这个方案好处在于即使Cocos Creator升级，也不影响工程的正常工作和发布。当也不是很完美，例如Cocos Creator开发组把加载逻辑全改了，我们还是需要调整代码，但这个几率比较小，就算出现了，调整起来还是比较快捷的。

方案具体策略如下：

1. **在工程目录还原最终首页加载代码。**在工程根目录新建html文件夹，手动把build/web-mobile/源文件里面的style-mobile.css，main.js，splash.png复制到html文件夹，新建loading.html文件，body标签的结构保持跟最终构建生成的index.html结构一致。
2. **定制自己的UI和加载逻辑。**新建loading.css，新建loading.js，在loading.css实现新的加载界面UI，在loading.js上实现新增的加载逻辑，如果不需要，loading.js可以忽略不加。
3. 通过gulp等构建工具，动态把loading.css合并到build/web-mobile/style-mobile.css，把loading.js合并到build/web-mobile/main.js。

步骤1是为了方便开发的UI能正常覆盖原有的loading界面。如果Cocos Creator升级对相关的加载逻辑做了大幅度更新，影响最终的覆盖，可以手动同步一下style-mobile.css，main.js的代码到最新。

gulp安装请访问：https://gulpjs.com/
nodejs安装请访问：http://nodejs.org/
另外需要安装gulp相关插件：[gulp-concat](https://github.com/contra/gulp-concat) 

gulpfile文件代码：

```javascript
gulp.task('concat-css', function(cb) {
  gulp.src(['./build/web-mobile/style-mobile.css', './html/loading.css'])
  .pipe(concat('style-mobile.css'))
  .pipe(gulp.dest('./build/web-mobile/')
  .on('end', cb));
});
```

由于我没有对main.js修改的需求，所以我这里只做了css的实现，有兴趣的同学可以自己实现js的自定义逻辑。其实思路很简单，但挺实用的。

完整代码可以访问：https://github.com/babyzone2004/cocosMd5，这个示例包含了Cocos Creator图片压缩优化，减少首次文件请求，html压缩，动态更新定制loading图等功能哦。

ps：

我们团队正在招聘优秀的H5游戏开发工程师，如果你符合以下条件：

1. 白鹭引擎/Cocos2d-js/Layabox等H5相关的开发经验
2. 热爱游戏，希望快速成长，不甘平庸

请联系我吧：babyzone2004@qq.com

更多信息请戳：https://www.lagou.com/jobs/3083562.html?source=pl&i=pl-5