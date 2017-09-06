var gulp = require('gulp');

// 引入组件
var less = require('gulp-less'),            // less
    minifycss = require('gulp-minify-css'), // CSS压缩
    uglify = require('gulp-uglify'),        // js压缩
    concat = require('gulp-concat'),        // 合并文件
    rename = require('gulp-rename'),        // 重命名
    clean = require('gulp-clean');          //清空文件夹


// 合并、压缩、重命名css
gulp.task('stylesheets',['build-less'], function() {
    // 注意这里通过数组的方式写入两个地址,仔细看第一个地址是css目录下的全部css文件,第二个地址是css目录下的areaMap.css文件,但是它前面加了!,这个和.gitignore的写法类似,就是排除掉这个文件.
  gulp.src(['./javis/static/build/css/*.css','!./javis/static/build/css/areaMap.css'])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./javis/static/build/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./javis/static/build/css'));
});

// 合并，压缩js文件
gulp.task('javascripts', function() {
  gulp.src('./javis/static/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./javis/static/build/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./javis/static/build/js'));
});


// 将bower的库文件对应到指定位置
gulp.task('buildlib',function(){

  gulp.src('./bower_components/angular/angular.min.js')
      .pipe(gulp.dest('./javis/static/build/js/'))

  gulp.src('./bower_components/angular/angular.js')
      .pipe(gulp.dest('./javis/static/build/js/'))

  gulp.src('./bower_components/bootstrap/dist/js/bootstrap.min.js')
      .pipe(gulp.dest('./javis/static/build/js/'))

  gulp.src('./bower_components/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('./javis/static/build/js/'))

  gulp.src('./bower_components/angular-route/angular-route.min.js')
      .pipe(gulp.dest('./javis/static/build/js/'))

  gulp.src('./bower_components/angular-animate/angular-animate.min.js')
      .pipe(gulp.dest('./javis/static/build/js/'))

  gulp.src('./bower_components/angular-bootstrap/ui-bootstrap.min.js')
      .pipe(gulp.dest('./javis/static/build/js/'))

  gulp.src('./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js')
      .pipe(gulp.dest('./javis/static/build/js/'))