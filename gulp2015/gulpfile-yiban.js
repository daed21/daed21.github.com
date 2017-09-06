
var gulp = require('gulp'),
chalk = require('chalk'),//有颜色的log
extend = require('extend'),//jquery extend
each = require('each'),// 编列
gulpReplace = require('gulp-replace'),//jquery extend
inquirer = require('inquirer'),//选择插件
zip = require('gulp-zip'),//压缩
stripBom = require('gulp-stripbom'), //清楚bom
utf8Convert = require('gulp-utf8-convert'),//文件格式转换
runSequence = require('run-sequence');//工作流
fs = require('fs'),//文件处理
Q = require('q'),//进程结束管理
minifyCss = require('gulp-minify-css'),//压缩css
uglify = require('gulp-uglify'),//压缩js
concat = require('gulp-concat'),//合并js
gulpJson = require("gulp-json-editor"),//编辑json
sass = require('gulp-ruby-sass'),
//jsdoc = require("gulp-jsdoc"),//js备注生成doc
rename = require("gulp-rename"),//修改名称
gutil = require('gulp-util'),
notify = require('gulp-notify'),
git = require('gulp-git');

var gulpLess = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var through = require('through2');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

//配置
var config = require('./node_modules/um/config.json'),
um = require("um");//选择列表


var taskList = [

    {
        id: 9,
        text: '监视',
        confirm: true,
        task: function (callBack) {
            runSequence('watch', callBack);
        }
    },

//一级
{
    id: 1,
    text: 'git推送远端：前端文件压缩 -> 文本检测 -> 添加 -> 提交 -> 拉取 -> 推送',
    confirm: true,
    task: function (callBack) {
        runSequence('clearAdd', 'gitAdd', 'utf8bomClearDiff', 'copyMin', 'commitMinCss', 'commitMinJs', 'gitAdd', 'gitCommit', 'gitPull', 'gitPush', callBack);
    }
},
{
    id: 2,
    text: '打包：文本检测 -> 打zip包',
    task: function (callBack) {
        runSequence('copyPack', 'copyMinJs', 'copyMinCss', 'clearAdd', 'gitAdd', 'utf8bomClearDiff', 'gitAdd', 'gitCommit', 'gitPull', 'gitPush', 'utf8bomClear', 'pack', callBack);
    }
},
{
    id: 3,
    text: '初始化',
    confirm: true,
    task: function (callBack) {
        runSequence('recordStartPoint', 'customInit', 'modifyGitText', 'modifyZipText', 'modifyStartPoint', callBack);
    }
},
{
    id: 7,
    text: '修改版本号',
    confirm: true,
    task: function (callBack) {
        runSequence('modifyVersion', callBack);
    }
},




{
    id: 8,
    text: '其他操作'
},

{
    id: 4,
    parentId: 8,
    text: 'git操作'
},
{
    id: 5,
    parentId: 8,
    text: '文件操作'
},
{
    id: 6,
    parentId: 8,
    text: '工具配置修改'
},

//geit
{
    id: 401,
    parentId: 4,
    text: '文本检测 -> 添加 -> 提交',
    task: function (callBack) {
        runSequence('gitAdd', 'utf8bomClearDiff', 'gitAdd', 'gitCommit', callBack);
    }
},
{
    id: 402,
    parentId: 4,
    text: '拉取 -> 推送',
    task: function (callBack) {
        runSequence('gitPull', 'gitPush', callBack);
    }
},
{
    id: 403,
    parentId: 4,
    text: '拉取',
    task: function (callBack) {
        runSequence('gitPull', callBack);
    }
},


//文件操作
{
    id: 501,
    parentId: 5,
    text: 'utf8检测 -> bom去除',
    task: function (callBack) {
        runSequence('utf8bomClear', callBack);
    }
},
{
    id: 502,
    parentId: 5,
    text: '根据打包列表压缩Js Css',
    task: function (callBack) {
        runSequence('minJs', 'minCss', callBack);
    }
},



//工具配置修改
{
    id: 601,
    parentId: 6,
    text: 'git提交注释修改',
    task: function (callBack) {
        runSequence('modifyGitText', callBack);
    }
},
{
    id: 602,
    parentId: 6,
    text: '打包文件名修改',
    task: function (callBack) {
        runSequence('modifyZipText', callBack);
    }
},
{
    id: 603,
    parentId: 6,
    text: '打包起点id修改',
    task: function (callBack) {
        runSequence('modifyStartPoint', callBack);
    }
}

];


//默认方法
gulp.task('default', function () {
    var deferred = Q.defer();
    var choice = new um.choice(taskList);
    return deferred.promise;
});


//默认方法
gulp.task('task1', function () {

    var deferred = Q.defer();

    setTimeout(function () {
    }, 1000)

    return deferred.promise;

});

//默认方法
gulp.task('task2', function () {
    return true;
});


function cmdAdd() {
    return through.obj(function (file, enc, cb) {


        var content = 'define(function (require, exports, module) {' + file.contents.toString();
        content = content + '})';
        content = new Buffer(content);

        file.contents = content;
        return cb(null, file);
    });
}


var packArr = [], diffArr = [];
//打包
(function () {

    //打包
    gulp.task('copyPack', ['getChangeArr'], function () {

        var list = [];
        for (var i in packArr) {
            if (/^assets\//.test(packArr[i])) {
                list.push(packArr[i]);
            }
        }

        return gulp.src(list, {
            base: './assets'
        }).pipe(gulp.dest('./public'));;

    });

    //生成minJs minCss
    gulp.task('copyMinJs', function () {

        var cssList = [];
        for (var i in packArr) {
            if (/^assets\S+\.js$/.test(packArr[i])) {
                cssList.push(packArr[i]);
            }
        }

        console.log('js压缩了' + cssList.length + '个文件');

        return gulp.src(cssList, {
            base: './assets'
        })
             //.pipe(sourcemaps.init())
            .pipe(uglify({ mangle: false }))
            //.pipe(cmdAdd())
            //.pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./public'));

    });

    gulp.task('copyMinCss', function () {

        var cssList = [];
        for (var i in packArr) {
            if (/^assets\S+\.css$/.test(packArr[i])) {
                cssList.push(packArr[i]);
            }
        }

        console.log('css压缩了' + cssList.length + '个文件');

        return gulp.src(cssList, {
            base: './assets'
        })
            //.pipe(sourcemaps.init())
            .pipe(minifyCss())
            //.pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./public'));;

    });


    //打包
    gulp.task('pack', ['getChangeArr'], function () {
        console.log('输出路径：' + config.customFile.src);
        var date = new Date();
        var str = '' + date.getFullYear() + getTwo(date.getMonth() + 1) + getTwo(date.getDate()) + getTwo(date.getHours()) + getTwo(date.getMinutes());

        fs.appendFile(config.customFile.src + '/pack/' + config.git.commitText + '-' + str + '打包说明文件.txt', packArr.length + '个文件\r\n' + packArr.join('\r\n'), function (err) {
            if (err)
                console.log("fail " + err);
            //else
            //console.log("写入文件ok");
        });

        return gulp.src(packArr, {
            base: './'
        }).pipe(zip(config.git.commitText + '-' + str + '.zip')).pipe(gulp.dest(config.customFile.src + '/pack/'));
    });

    //获取打包列表
    gulp.task('getChangeArr', function () {

        var deferred = Q.defer();

        FileGit.getLastLog(function (log) {
            var endPoint = /commit.+/.exec(log)[0].replace('commit ', '');

            if (endPoint == config.startPoint) {
                console.log('打包起点和打包终点相同！');
                deferred.resolve();
                return;
            }

            FileGit.editionDiff(function (stdout) {
                packArr = stdout.split('\n');
                packArr.pop();
                deferred.resolve();
            }, endPoint, config.startPoint);
        });

        return deferred.promise;
    });

}());


//初始化
(function () {

    //自定义文件初始化
    gulp.task('customInit', function () {
        var folder_exists = fs.existsSync(config.customFile.src + 'custom/');
        if (folder_exists == true) {
            console.log('拷贝 ' + config.customFile.src + 'custom/' + ' 所有文件到项目目录！');
            return gulp.src(config.customFile.src + 'custom/**').pipe(gulp.dest("./"));
        } else {
            each(config.customFile.file).run(function (element, index, next) {
                gulp.src(element).pipe(gulp.dest(config.customFile.src + 'custom/' + element.substring(0, element.lastIndexOf("/") + 1)));
                setTimeout(next, 10);
            });
        }
    });


    //记录打包起点id
    gulp.task('recordStartPoint', function () {
        var deferred = Q.defer();

        FileGit.getLastLog(function (log) {
            config.startPoint = /commit.+/.exec(log)[0].replace('commit ', '');
            saveConfig();
            console.log('记录 最后一次修改的git版本ID 为 打包起点ID！');
            deferred.resolve();
        });

        return deferred.promise;
    });

}());

//git 操作
(function () {

    //清空add
    gulp.task('clearAdd', function () {
        var deferred = Q.defer();

        FileGit.resetHead(function (stdout) {
            deferred.resolve();
        });

        return deferred.promise;
    });

    //添加
    gulp.task('gitAdd', function () {
        return gulp.src(FileGit.getSrc()).pipe(git.add({ args: '-A' }, function (err) {
            if (err) throw err;
        }));
    });


    //提交
    gulp.task('gitCommit', function () {
        var deferred = Q.defer();

        FileGit.diff(function (stdout) {

            if (stdout.length > 0) {
                var list = stdout.split('\n');
                list.pop();

                console.log('提交列表有' + list.length + '个文件！\n');
                inquirer.prompt([{
                    type: 'input',
                    name: 'type',
                    message: chalk.green('输入提交备注:\n')
                }], function (answers) {

                    FileGit.commit(function (stdout) {
                        deferred.resolve();
                    }, config.git.commitText + ' ' + answers.type);

                });

            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    });

    //拉取远程服务器文件
    gulp.task('gitPull', function () {
        var deferred = Q.defer();

        FileGit.pull(function (stdout) {
            deferred.resolve();
        });

        return deferred.promise;
    });

    //文件推送到远程服务器
    gulp.task('gitPush', function () {
        var deferred = Q.defer();

        FileGit.push(function (stdout) {
            deferred.resolve();
        });

        return deferred.promise;
    });


}());

//文件检测
(function () {

    //根据提交列表 生成minJs minCss
    gulp.task('copyMin', function () {
        var list = [];
        for (var i in diffArr) {
            if (/^assets\//.test(diffArr[i])) {
                list.push(diffArr[i]);
            }
        }

        return gulp.src(list, {
            base: './assets'
        }).pipe(gulp.dest('./public'));;
    });

    //根据提交列表 生成minJs minCss
    gulp.task('commitMinJs', function () {

        var cssList = [];
        for (var i in diffArr) {
            if (/^assets\S+\.js$/.test(diffArr[i])) {
                cssList.push(diffArr[i]);
            }
        }

        console.log('js压缩了' + cssList.length + '个文件');

        return gulp.src(cssList, {
            base: './assets'
        })
            //.pipe(sourcemaps.init())
            .pipe(uglify({ mangle: false }))
            //.pipe(cmdAdd())
            //.pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./public'));;

    });
    gulp.task('commitMinCss', function () {

        var cssList = [];
        for (var i in diffArr) {
            if (/^assets\S+\.css$/.test(diffArr[i])) {
                cssList.push(diffArr[i]);
            }
        }

        console.log('css压缩了' + cssList.length + '个文件');

        return gulp.src(cssList, {
            base: './assets'
        })
            //.pipe(sourcemaps.init())
            .pipe(minifyCss())
            //.pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./public'));;

    });

    //压缩js生成
    gulp.task('minJs', ['getChangeArr'], function () {

        var cssList = [];
        for (var i in packArr) {
            if (/^assets\S+\.js$/.test(packArr[i])) {
                cssList.push(packArr[i]);
            }
        }

        console.log('js压缩了' + cssList.length + '个文件');

        return gulp.src(cssList, {
            base: './assets'
        })
            //.pipe(sourcemaps.init())
            .pipe(uglify({ mangle: false }))
            //.pipe(cmdAdd())
            //.pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./public'));;

    });

    //压缩css生成
    gulp.task('minCss', ['getChangeArr'], function () {

        var cssList = [];
        for (var i in packArr) {
            if (/^assets\S+\.css$/.test(packArr[i])) {
                cssList.push(packArr[i]);
            }
        }

        console.log('css压缩了' + cssList.length + '个文件');

        return gulp.src(cssList, {
            base: './assets'
        })
            //.pipe(sourcemaps.init())
            .pipe(minifyCss())
            //.pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./public'));;

    });


    //检查提包列表的编码和bom
    gulp.task('utf8bomClear', ['getChangeArr'], function () {

        console.log("检测了" + packArr.length + "个文件");

        return gulp.src(packArr, {
            base: './'
        }).pipe(utf8Convert({
            encNotMatchHandle: function (file) {
            }
        })).pipe(stripBom({ showLog: false })).pipe(gulp.dest('./'));;

    });


    //检查add列表文件的编码和bom
    gulp.task('utf8bomClearDiff', function () {
        var deferred = Q.defer();

        FileGit.diff(function (stdout) {

            diffArr = stdout.split('\n');
            diffArr.pop();

            console.log("检测了" + diffArr.length + "个文件");
            deferred.resolve(gulp.src(diffArr, {
                base: './'
            }).pipe(utf8Convert()).pipe(stripBom({ showLog: false })).pipe(gulp.dest('./')));

        });

        return deferred.promise;

    });

}());


//配置修改
(function () {

    //git提交名修改 
    gulp.task('modifyGitText', function () {

        var deferred = Q.defer();

        console.log('提交注释: ' + config.git.commitText);
        console.log('(git 提交的注释! 输入修改 直接回车不修改)');
        inquirer.prompt([{
            type: 'input',
            name: 'type',
            message: chalk.green('输入:\n')
        }], function (answers) {
            if (answers.type != '') {
                config.git.commitText = answers.type;
                saveConfig();
            }

            console.log('修改后: ' + config.git.commitText);
            deferred.resolve();
        });

        return deferred.promise;

    });

    //打包文件名修改
    gulp.task('modifyZipText', function () {
        var deferred = Q.defer();

        console.log('打包文件名: ' + config.pack.text);
        console.log('(发包 zip 生成的名称！)');
        inquirer.prompt([{
            type: 'input',
            name: 'type',
            message: chalk.green('输入:\n')
        }], function (answers) {
            if (answers.type != '') {
                config.pack.text = answers.type;
                saveConfig();
            }

            console.log('修改后: ' + config.pack.text);
            deferred.resolve();
        });

        return deferred.promise;

    });


    //打包起点修改
    gulp.task('modifyStartPoint', function () {
        var deferred = Q.defer();

        console.log('打包起点ID: ' + config.startPoint);
        console.log('(打包 版本对比的起点 ID)');
        inquirer.prompt([{
            type: 'input',
            name: 'type',
            message: chalk.green('输入:\n')
        }], function (answers) {

            if (answers.type != '') {
                config.startPoint = answers.type;
                saveConfig();
            }

            console.log('修改后: ' + config.startPoint);
            deferred.resolve();
        });

        return deferred.promise;

    });


    //更新版本号
    gulp.task('modifyVersion', function () {
        var date = new Date();
        var str = '' + date.getFullYear() + getTwo(date.getMonth() + 1) + getTwo(date.getDate()) + getTwo(date.getHours()) + getTwo(date.getMinutes());

        var project = [];
        //packArr.forEach(function (i) {
        //  project = extend(project, getProjectName(i));
        //});

        var file = gulp.src(config.path.version);
        //for (var i in project) {
        //file.pipe(gulpReplace(eval('/version.' + i + '.css=\\d{10,20}/'), 'version.' + i + '.css=' + str))
        //.pipe(gulpReplace(eval('/version.' + i + '.js=\\d{10,20}/'), 'version.' + i + '.js=' + str));

        file.pipe(gulpReplace(eval('/.css=\\d{10,20}/g'), '.css=' + str))
        .pipe(gulpReplace(eval('/.js=\\d{10,20}/g'), '.js=' + str));
        //}
        console.log('新版本号：' + str);
        return file.pipe(gulp.dest(config.path.version.substring(0, config.path.version.lastIndexOf("/") + 1)));
    });

    //根据文件连接获取修改的项目
    function getProjectName(fileUrl) {
        var project = config.project;
        var projectName = {};
        for (var i in project) {

            project[i].path.forEach(function (va) {
                var re = new RegExp('^' + va);
                if (re.test(fileUrl)) {
                    projectName[i] = true;
                }
            });

        }
        return projectName;
    }


}());




//git类
var FileGit = {
    getSrc: function () {
        //return config.special.concat(config.projectPath);
        return config.special;
    },
    resetHead: function (callback, msg) {
        //清空add
        git.exec({ args: 'reset HEAD' }, function (err, stdout) {
            if (err) {
                throw err
            }
            else {
                callback(stdout);
            }
        });
    },
    commit: function (callback, msg) {
        //提交暂存区
        git.exec({ args: 'commit -m "' + msg + '"' }, function (err, stdout) {
            if (err) {
                throw err
            }
            else {
                callback(stdout);
            }
        });
    },
    getLastLog: function (callback) {
        //获取最后一个日记
        git.exec({ args: 'log -1' }, function (err, stdout) {
            if (err) {
                throw err
            }
            else {
                callback(stdout);
            }
        });
    },
    editionDiff: function (callback, first, end) {
        //获取版本差异
        git.exec({ args: 'diff ' + first + ' ' + end + ' --name-only' }, function (err, stdout) {
            if (err) {
                throw err
            }
            else {
                callback(stdout);
            }
        });
    },
    diff: function (callback) {
        //获取差异是否有需要提交的文件
        git.exec({ args: 'diff --cached --name-only' }, function (err, stdout) {
            if (err) {
                throw err
            }
            else {
                callback(stdout);
            }
        });
    },
    pull: function (callback) {
        //获取远程分支
        git.exec({ args: 'branch' }, function (err, stdout) {
            //获取分支名称
            var name = /\*.+/.exec(stdout)[0].replace('*', '');
            git.exec({ args: 'pull origin ' + name }, function (err, stdout) {
                if (err) {
                    throw err
                    callback(stdout);
                }
                else {
                    callback(stdout);
                }
            });
        });
    },
    push: function (callback) {
        //推送远程分支
        git.exec({ args: 'branch' }, function (err, stdout) {
            //获取分支名称
            var name = /\*.+/.exec(stdout)[0].replace('*', '');
            git.exec({ args: 'push origin ' + name }, function (err, stdout) {
                if (err) {
                    throw err;
                }
                else {
                    callback(stdout);
                }
            });
        });

    }
};

//保存配置---文件
var saveConfig = function () {
    return gulp.src("./node_modules/um/config.json")
    .pipe(gulpJson(function (json) {
        json = config;
        return json;
    })).pipe(gulp.dest("./node_modules/um/"));
};


//一位数变两位数
var getTwo = function (str) {
    str = str.toString();
    return str.length == 1 ? "0" + str : str;
};


//js备注
gulp.task('jsdocF', function () {
    return gulp.src("./spm_modules/fixtures/**/*.js")
    .pipe(jsdoc('./spm_modules/fixtures-doc'));
});
gulp.task('jsdoc', function () {
    return gulp.src(config.jsdoc.list)
    .pipe(jsdoc.parser())
    .pipe(jsdoc.generator(config.jsdoc.dest));
});
gulp.task('jsdoc-watch', function () {
    gulp.watch(config.jsdoc.list, ['jsdoc']);
});

//合并框架文件
gulp.task('concat', function () {
    return gulp.src(config.concat.list)
    .pipe(concat(config.concat.name))
        .pipe(uglify())
    .pipe(gulp.dest(config.concat.dest));
});
gulp.task('concat-watch', function () {
    gulp.watch(config.concat.list, ['concat']);
});


//合并框架文件
gulp.task('uglify', function () {

    var uglifyList = [
        './spm_modules/yiban/1.0/scripts/*[^(.min)].js',
        './spm_modules/upload/1.3.1/*[^(.min)].js',
        './spm_modules/bootstrap-datetimepicker/2.3.5/js/*[^(.min)].js',
        './spm_modules/handlebars/4.0.4/*[^(.min)].js'
    ]

    return gulp.src(uglifyList, {
        base: './'
    })
        .pipe(rename(function (path) {
            path.extname = ".min.js"
        }))
        .pipe(uglify({ mangle: false }))
        //.pipe(cmdAdd())
    .pipe(gulp.dest('./'));


});

//less编译
gulp.task('less', function () {
    return gulp.watch(['assets/css/**/*.less', 'spm_modules/yiban/1.0/styles/**/*.less'], function (event) {
        return gulp
          .src(['spm_modules/yiban/1.0/styles/**/[^(_)]*.less', 'assets/css/**/[^(_)]*.less'], {
              base: './'
          }).pipe(gulpLess())
          .pipe(gulp.dest('./'));
    });
});
gulp.task('sass', function () {
    return sass( './public/css/**/*.scss' )
        .on('error', sass.logError)
        //.pipe(gulp.dest( './public/css/'))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(minifyCss())
        .pipe(gulp.dest( './public/css/'))
        //.pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function () {
    browserSync.init({
        proxy: config.developmentLocalHost
    });
    gulp.watch(config.concat.list, ['concat']);

    gulp.watch('assets/js/**/*.tpl', function (event) {
        return gulp
          .src(event.path, {
              base: './assets'
          })
             //.pipe(sourcemaps.init())
             .on('error', gutil.log)
            //.pipe(sourcemaps.write('./maps'))
          .pipe(gulp.dest('./public'))
            .pipe(reload({stream: true}))
		.pipe(notify({ message: 'tpl task complete' }));

    });


    gulp.watch('assets/js/**/*.js', function (event) {
        return gulp
          .src(event.path, {
              base: './assets'
          })
            .pipe(uglify({ mangle: false }))
             .on('error', gutil.log)
          .pipe(gulp.dest('./public'))
            .pipe(reload({stream: true}))
		.pipe(notify({ message: 'js task complete' }));

    });

    gulp.watch('assets/css/**/**/*.css', function (event) {
        return gulp
          .src(event.path, {
              base: './assets'
          })
            //.pipe(sourcemaps.init())
            .pipe(minifyCss())
             .on('error', gutil.log)
            //.pipe(sourcemaps.write('./maps'))
          .pipe(gulp.dest('./public'))
            .pipe(reload({stream: true}))
		.pipe(notify({ message: 'css task complete' }));
    });

    gulp.watch(['assets/css/**/*.less', 'spm_modules/yiban/1.0/styles/**/*.less'], function (event) {
        return gulp
		.src(['spm_modules/yiban/1.0/styles/**/[^(_)]*.less', 'assets/css/**/[^(_)]*.less'], {
			base: './'
		}).pipe(gulpLess())
		.pipe(minifyCss())
		.on('error', gutil.log)
		.pipe(gulp.dest('./'))
            .pipe(reload({stream: true}))
		.pipe(notify({ message: 'less task complete' }));
    });

    var styles = gulp.watch( './public/css/**/*.scss', ['sass']);

    styles.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var deferred = Q.defer();

    return deferred.promise;

});