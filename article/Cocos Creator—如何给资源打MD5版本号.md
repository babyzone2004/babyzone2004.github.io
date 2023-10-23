Cocos Creator 是Cocos最新一代的游戏开发者工具，基于 Cocos2d-x，组件化，脚本化，数据驱动，跨平台发布。Cocos Creator的开发思路已经逐步跟Unity 3D靠拢，写起来也更方便快捷，开发效率更高。

但既然是新东西，免不了各种坑。其中在发布Web Mobile平台上，就有各种小问题，例如给资源加上md5版本号，Cocos Creator就不支持。从16年底开发组就说要支持MD5 Cache，等了大半年，新的1.6内测版本终于增加了MD5 Cache的功能，但效果也是差强人意。

为什么呢？因为正常来说，一般页面除了首页的index.html，其他资源都是要添加md5版本号的，1.6内测版确实增加了版本号，但只给图片等资源做了md5，cocos2d-js-min.js，main.js并没有加，这根本不能用啊喂！

![ubiaoqing57c3df113178b16943.jpg](http://upload-images.jianshu.io/upload_images/3360354-58497eb676a31f40.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



官方不支持，只好自己动手丰衣足食了，具体思路是通过gulp等构建工具实现。
gulp安装请访问：https://gulpjs.com/
nodejs安装请访问：http://nodejs.org/
另外需要安装gulp相关插件：[gulp-rev](https://github.com/sindresorhus/gulp-rev) [gulp-rev-collector](https://github.com/shonny-ua/gulp-rev-collector)

思路如下：

1. 把build/web-mobile/src里面的project.js拷贝到build/web-mobile/，目的是为了匹配main.js里的‘project.js’
2. 通过gulp-rev给js和png图片打md5版本号
3. 通过gulp-rev-collector替换文件原路径到打版本号的路径

gulpfile文件代码：

```javascript
var gulp = require('gulp');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

gulp.task('resRev', function (cb) {
  gulp.src(['./build/web-mobile/**/*.js', './build/web-mobile/*.png'])
      .pipe(rev())
      .pipe(gulp.dest('./build/web-mobile/'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./build/web-mobile/')
      .on('end', cb));
});
gulp.task('default',['resRev'], function(cb) {
  gulp.src(['./build/web-mobile/*.json', './build/web-mobile/index.html'])
      .pipe(revCollector())
      .pipe(gulp.dest('./build/web-mobile/'));
  gulp.src(['./build/web-mobile/*.json', './build/web-mobile/main*.js'])
      .pipe(revCollector({
        replaceReved: true
      }))
      .pipe(gulp.dest('./build/web-mobile/')); 
});

```

在命令行里面执行`gulp`就可以给相应的文件打版本号啦！

完整代码可以访问：https://github.com/babyzone2004/cocosMd5，这个示例包含了Cocos Creator图片压缩优化，减少首次文件请求，html压缩，动态更新定制loading图等功能哦。



ps：

我们团队正在招聘优秀的H5游戏开发工程师，如果你符合以下条件：

1. 白鹭引擎/Cocos2d-js/Layabox等H5相关的开发经验
2. 希望快速成长，不甘平庸

请联系我吧：babyzone2004@qq.com

更多信息请戳：https://www.lagou.com/jobs/3083562.html?source=pl&i=pl-5