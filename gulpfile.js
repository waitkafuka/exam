'use strict';

const gulp = require('gulp');//主模块
const compass = require('gulp-compass');//compass
const clean = require('gulp-clean');//清除文件
const changed = require('gulp-changed');//只拷贝改变的文件
const useref = require('gulp-useref');//资源合并
const fileinclude = require('gulp-file-include');//公共代码引用
const gulpSequence = require('gulp-sequence');//顺序执行任务
const plumber = require("gulp-plumber");//错误跳出
const imagemin = require('gulp-imagemin');//图片压缩
const imageminPngquant = require('imagemin-pngquant');//png图片压缩
const browserSync = require('browser-sync');//浏览器同步
const reload = browserSync.reload;//浏览器同步
const pump = require('pump');//更容易定位错误的插件
const uglify = require('gulp-uglify');//js压缩

const config = {
  sassFilePath: "./dev/assets/sass/**/*.scss",
  sassFolderPath: "./dev/assets/sass/",
  imgFilePath: "./dev/assets/img/**/*",
  imgDestPath: "./release/assets/img/",
  htmlFilePath: "./dev/static/**/*.html",
  htmlDestPath: "./release/static/",
  cssPath: "./release/assets/css/",
  jsFilePath: "./dev/assets/js/**/*.js",
  jsDestPath: "./release/assets/js/",
  tplPath: "./dev/tpl/res/*.tpl",
  rbPath: "./config.rb"
}

gulp.task('imgmin', function () {
  const pngq = imageminPngquant({
    quality: 90, //0-100越大质量越高
    speed: 1, //1-10越大速度越快，质量越差
  });
  gulp.src(config.imgFilePath)
    .pipe(imagemin([pngq]))
    .pipe(gulp.dest(config.imgDestPath))
});

gulp.task('uglify', function (cb) {
  pump([
    gulp.src(config.jsFilePath),
    uglify(),
    gulp.dest(config.jsDestPath)
  ],
    cb
  );
});

gulp.task('compass', function (cb) {
  const result = gulp.src(config.sassFilePath)
    .pipe(plumber())
    .pipe(compass({
      config_file: config.rbPath,
      css: config.cssPath,
      sass: config.sassFolderPath
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.cssPath));
  return result;
});

gulp.task('useref-html', function () {
  return gulp.src(config.htmlFilePath)
    .pipe(useref())
    .pipe(gulp.dest(config.htmlDestPath));
});

gulp.task('include-html', function () {
  const result = gulp.src(config.htmlFilePath)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(config.htmlDestPath));
  console.log('include finish');
  return result;
});

gulp.task('clean', function () {
  console.log('clean');
  return gulp.src('./release/', { read: false })
    .pipe(clean());
});

gulp.task('release', function () {
  const stream = gulp.src(["./dev/**/*"])
    .pipe(changed("./release/"))
    .pipe(gulp.dest("./release/"))
  console.log('release finish')
  return stream;
})

gulp.task('clean-sass', function () {
  return gulp.src('./release/assets/sass')
    .pipe(clean());
})

// 监视文件改动并重新载入
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: 'release'
    }
  })
  gulp.watch([config.sassFilePath, config.rbPath], ['compass']);
  gulp.watch([config.htmlFilePath, config.tplPath], ['include-html']);
  gulp.watch('./dev/assets/**/*.js', ['release']);
  gulp.watch('**/*', { cwd: 'release' }, reload);
  console.log('start serving...');
});

gulp.task('watch', ['default'], function () {
  gulp.watch([config.sassFilePath, config.rbPath], ['compass']);
  gulp.watch([config.htmlFilePath, config.tplPath], ['include-html']);
  gulp.watch([config.jsFilePath], ['uglify']);
  console.log('start watching...');
})

gulp.task('default', gulpSequence('release', 'include-html', 'compass', 'clean-sass', 'imgmin', 'uglify'));