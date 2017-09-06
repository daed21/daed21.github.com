var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'), // 混淆js压缩
    concat = require('gulp-concat'), // 合并文件
    rename = require('gulp-rename'),
    Q = require('q'),//进程结束管理
    notify = require('gulp-notify'),
    runSequence = require('run-sequence');//工作流

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

//配置
//var config = require('./um/config.json'),
um = require("um");//选择列表

var taskList = [
    {
        id: 1,
        text: '监视',
        confirm: true,
        task: function (callBack) {
            runSequence('watch', callBack);
        }
    }
    ];
// 合并、压缩、重命名css
gulp.task('stylesheets',function(){
gulp.src(['css/*.css'])
    .pipe(concat('timcss.css'))
    .pipe(gulp.dest('newcss'))
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('newcss'))
    .pipe(reload({stream: true}))
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


gulp.task('default',function(){
    var deferred = Q.defer();
    var choice = new um.choice(taskList);
    return deferred.promise;
    //gulp.start('stylesheets','javascripts');  //执行2个任务
});

//保存配置---文件
/*var saveConfig = function () {
    return gulp.src("./node_modules/um/config.json")
    .pipe(gulpJson(function (json) {
        json = config;
        return json;
    })).pipe(gulp.dest("./node_modules/um/"));
};*/

gulp.task('watch', function() {
browserSync.init({
             files: ["css/*.css", "js/*.js","*.html"], //files: "**",监听整个项目
        server: {
            baseDir: "./"
        }
        });
  // 看守所有.scss档
  gulp.watch('css/*.css', ['stylesheets']);
  // 看守所有.js档
  gulp.watch('js/*.js', ['javascripts']);
  gulp.watch("*.html").on('change', browserSync.reload);

});