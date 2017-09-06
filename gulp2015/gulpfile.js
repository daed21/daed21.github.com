var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'), // 混淆js压缩
    concat = require('gulp-concat'), // 合并文件
    rename = require('gulp-rename'),
    notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// 合并、压缩、重命名css
gulp.task('stylesheets',function(){
gulp.src(['css/*.css'])
    .pipe(concat('timcss.css'))
    .pipe(gulp.dest('newcss'))
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('newcss'))
    .pipe(reload({stream: true}))  //.pipe(browserSync.stream());
    .pipe(notify({ message: 'tpl task complete' }));
});

// 合并，压缩js文件
gulp.task('javascripts',function(){
    gulp.src(['js/*.js'])
        .pipe(concat('timjs.js'))
        .pipe(gulp.dest('newjs'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('newjs'));	
});


gulp.task('default',['watch']);


gulp.task('watch', function() {
browserSync.init({
             files: ["css/*.css", "js/*.js","*.html"], //files: "**",监听整个项目
        server: {
            baseDir: "./"
        }
        });
  // 看守所有没"_"的.css文件
  gulp.watch('css/[^(_)]*.css', ['stylesheets']);
  // 看守所有.js文件
  gulp.watch('js/*.js', ['javascripts']);
  gulp.watch("*.html").on('change', browserSync.reload);

});