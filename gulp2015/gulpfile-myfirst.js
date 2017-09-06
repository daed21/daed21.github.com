var gulp = require('gulp');

var minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'), // 混淆js压缩
    concat = require('gulp-concat'), // 合并文件
    rename = require('gulp-rename');
// 合并、压缩、重命名css
gulp.task('stylesheets',function(){

gulp.src(['css/*.css'])
    .pipe(concat('timcss.css'))
    .pipe(gulp.dest('newcss'))
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('newcss'));

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


gulp.task('default',function(){
    gulp.start('stylesheets','javascripts');  //执行2个任务
});

gulp.task('watch', function() {
  // 看守所有.scss档
  gulp.watch('css/*.css', ['stylesheets']);
  // 看守所有.js档
  gulp.watch('js/*.js', ['javascripts']);

});