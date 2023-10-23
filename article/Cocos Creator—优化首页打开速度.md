Cocos Creator是一个优秀的游戏引擎开发工具，很多地方都针对H5游戏做了专门的优化，这是我比较喜欢Cocos Creator的一点原因。

其中一个优化点是首页的加载速度，开发组为了加快首页的渲染速度，减少白屏时间，把逻辑代码和首页加载代码做了彻底分离。首次页面加载的只是一个相当于加载器的初始化文件，文件体积特别小，不像某些引擎，一开始就需要加载主逻辑js文件，一开始就给我来个上百kb的文件加载，然后才能显示loading条，白屏时间当然会延长不少。

说到这里，不得不吐槽一下Cocos的开发文档，居然没有专门针对首页loading条做任何说明，害我研究了半天都不知道怎么定制自己的首页loading界面。这里如果有遇到不知道怎么定制首页loading界面的同学，可以看我另一篇的文章：《Cocos Creator—定制H5游戏首页loading界面》

话说回来，开发者虽然专门针对首页加载时间做了优化，但对于前端页面优化来说，还是不够彻底的，我们还有不少优化时间。首先，我们看一下用Cocos Creator构建发布后的mobile-web页面请求图：

![WX20170728-210429@2x.png](http://upload-images.jianshu.io/upload_images/3360354-1035c11e70ef59b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在页面首次出现之前，需要发起4个请求，并且这4个请求都是小文件，其实是没有必要的，特别是在服务器端还有gzip压缩的情况，更理想的情况是一个请求就能完成所有的工作。

另外这4个文件都没有经过代码压缩，例如html文件：

![cocos-creator-source.png](http://upload-images.jianshu.io/upload_images/3360354-4a0924e80ea5cde5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里也有不少优化空间。

综上所述，我们有了压缩合并的方案，这里可以通过gulp实现。

有些同学会问：webpack更酷更流行为什么不用webpack？答：因为webpack本质上是模块化打包方案，我们这里只是简单对代码做一些构建处理，用gulp更轻量更合适。

gulp安装请访问：[https://gulpjs.com/](https://gulpjs.com/)

nodejs安装请访问：[http://nodejs.org/](http://nodejs.org/)

另外需要安装gulp相关插件：[gulp-file-inline](https://github.com/Lanfei/gulp-file-inline) [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin)

思路如下：

1. 通过gulp-file-inline把style-mobile.css，settings.js，main.js inline到html文件，减少请求
2. 通过gulp-htmlmin把html文件压缩，减少空格，压缩代码量，减少文件体积

gulpfile文件代码：

```javascript
var gulp = require('gulp');
var fileInline = require('gulp-file-inline');
var htmlmin = require('gulp-htmlmin');

gulp.task('htmlmin', function(cb) {
  gulp.src('./build/web-mobile/*.html')
  .pipe(fileInline())
  .pipe(htmlmin({
      collapseWhitespace:true,
      removeComments: true
  }))
  .pipe(gulp.dest('./build/web-mobile/')
  .on('end', cb));
});
```

在命令行里面执行`gulp`，大功告成！压缩后的请求如下图：

![cocos-creator-min.png](http://upload-images.jianshu.io/upload_images/3360354-b265d5a7850b016c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

大家可以看到，原来的4个请求只剩下build一个请求了，而且经过服务器的gizp压缩，还能缩小到2-3kb的大小，如果配合cdn策略，基本上能让你的H5游戏首页秒开。

完整代码可以访问：https://github.com/babyzone2004/cocosMd5，这个示例包含了Cocos Creator图片压缩优化，减少首次文件请求，html压缩，动态更新定制loading图等功能哦。



ps：

我们团队正在招聘优秀的H5游戏开发工程师，如果你符合以下条件：

1. 白鹭引擎/Cocos2d-js/Layabox等H5相关的开发经验
2. 希望快速成长，不甘平庸

请联系我吧：babyzone2004@qq.com

更多信息请戳：https://www.lagou.com/jobs/3083562.html?source=pl&i=pl-5

