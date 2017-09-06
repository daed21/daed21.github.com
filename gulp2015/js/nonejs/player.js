(function(root) {
    'use strict';
    //the init funciton
    function player(obj) {
        var Player = this;
        Player.param = obj;
        Player.musicList = [];
        Player.musicIndex = 0;
        Player.status = 'loading';
        Player.fnStack = [];
        //the mode of the player , it can be big modle or small mode
        Player.mode = 'small';
        Player.now = {};

        //create a new player
        Player.Obj = $('<div class="player"></div>');
        $('body').append(Player.Obj);
        Player.Obj.jPlayer({
            swfPath: 'js',
            supplied: 'm4a,oga,mp3',
            //cssSelectorAncestor: '#jp_container_1',
            ready: function() {
                //play event
                $(Player.param.play.DOM).on('click', function() {
                    Player.play();
                });
                //pause event
                $(Player.param.stop.DOM).on('click', function() {
                    Player.pause();
                });

                //drop event
                var touchX = 0;
                $('.player_progress_handle').on('touchstart', function(e) {
                    Player.status = 'touching';
                });
                $('.player_progress_handle').on('touchmove', function(e) {
                    touchX = e.originalEvent.touches[0].pageX;
                    if (e.originalEvent.touches[0].pageX < 0) {
                        touchX = 0;
                    } else if (e.originalEvent.touches[0].pageX > document.documentElement.clientWidth - 18) {
                        touchX = document.documentElement.clientWidth - 18;
                    }
                    $(this).css({
                        'left': touchX
                    });
                    return false;
                });
                $('.player_progress_handle').on('touchend', function(e) {
                    var present = touchX / document.documentElement.clientWidth;
                    Player.play(present);
                    $('.player_progress').css({
                        'width': present * 100 + '%'
                    });
                    Player.status = 'playing';
                });

                //play previous
                $('.playerB_contorl_prev').on('click', function() {
                    if (--Player.musicIndex < 0) {
                        Player.musicIndex = 0;
                    } else {
                        Player.play();
                    }
                    if(Player.musicIndex==0){
                    	$('.playerB_contorl_next,.playerB_contorl_prev').removeClass('active');
                        $(this).addClass('active');
                    }else{
                    	$('.playerB_contorl_next,.playerB_contorl_prev').removeClass('active');
                    }
                });

                //play next
                $('.playerB_contorl_next').on('click', function() {
                    var total = Player.musicList.length;
                    if (++Player.musicIndex >= total) {
                        Player.musicIndex = total - 1;
                    } else {
                        Player.play();
                    }
                    if(Player.musicIndex == total - 1){
                    	$('.playerB_contorl_next,.playerB_contorl_prev').removeClass('active');
                        $(this).addClass('active');
                    }else{
                    	$('.playerB_contorl_next,.playerB_contorl_prev').removeClass('active');
                    }
                });

                Player.status = 'loaded';
                var stackFn = Player.fnStack.shift();
                while (stackFn) {
                    stackFn();
                    stackFn = Player.fnStack.shift();
                }
                //
                $('.playerB_back').on('click', function() {
                	if(Player.status == 'playing'){
	                    $('.player_musicBig').hide();
	                    $('.player_musicMini').show();
	                    $('.voice-playing').addClass('active');
                	}else{
                		$('.player_musicBig').hide();
	                    $('.player_musicMini').hide();
	                    $('.voice-playing').removeClass('active');
                	}
                	// $('.voice-playing').remove();
                	$('.voice-rank-text').show();
                	var $now = $('.voice-song-a[songid='+Player.musicList[Player.musicIndex].id+']');
                	$now.find('.voice-rank-text').hide();
                	$now.append('<em class="voice-playing active"></em>');
                    return false;
                });

                $('.player_musicSwitch').on('click', function() {
                	if($('.player_musicBig').length > 0){
                		$('.player_musicBig').show();
		                $('.player_musicMini').hide();
	                	resize();
	                	$('.playerB_contorl_next,.playerB_contorl_prev').removeClass('active');
	                	if(Player.musicList.length==1){
	                		$('.playerB_contorl_next,.playerB_contorl_prev').addClass('active');
	                		return false;
	                	}
	                	if(Player.musicIndex == Player.musicList.length-1){
	                		$('.playerB_contorl_next').addClass('active');
	                	}else if(Player.musicIndex==0){
	                		$('.playerB_contorl_prev').addClass('active');
	                	}else{
	                		return false;
	                	}
                	}
	                return false;
                });
                //share
                $('.playerB_contorl_share').on('click', function() {
                	share('全国高校#校园好声音#网络大赛火热进行中！我刚给一首《'+(music.now.title || songName)+'》超赞的歌投了票，速来围观！');
                });
                $(document).on('click','.voice-share-cancel',function(){
                    $('.voice-share-pop').remove();
                })
            	//分享方法
				function share(title){
				    //d指的是window
				    title = title;
				    var s = screen,
				        d = document,
				        e = encodeURIComponent;
				    var f = 'http://v.t.sina.com.cn/share/share.php?',
				        u = sharebaseUrl + '/songs/personal?userId=' + (Player.now.uid || uid),
				        p = ['url=', e(u), '&title=', e(title), '&appkey=2924220432', ].join('');
				    function a() {
				    	$('body').append('<div class="voice-share-pop"><iframe id="voice-share-pop" src="'+[f, p].join('')+'"></iframe><a href="javascript:void(0);" class="voice-share-cancel"></a></div>');
				    }
				    if (/Firefox/.test(navigator.userAgent)) {
				        setTimeout(a, 0);
				    } else {
				        a();
				    }
				}
                //vote
                $('.playerB_contorl_start,.player_vote').on('click', function() {
                    $.ajax({
                        type: "get",
                        url: g_url.playerVoteUrl,
                        dataType: "jsonp",
                        jsonp: "callback",
                        data : {
                        	toid : Player.now.uid
                        },
                        success: function(data) {
                            if (data&&data.err == 0) {
                                Player.now.isvote = true;
                                $('.playerB_contorl_start,.player_vote').css('fill', '#f15b2c');
                                $('.voice-song-a[userid='+Player.now.uid+']').find('.icon-vote').addClass('active');
			                	setTimeout(function(){
			                		$('.voice-song-a[userid='+Player.now.uid+']').find('.icon-vote').removeClass('active');
			                	},2000);
			                	var lovedom = $('.voice-song-a[userid='+Player.now.uid+']').find('.voice-vote-num');
                                lovedom.text(parseInt(lovedom.text())+1);
                                $('.palyer_musicLove').text('累计'+data.votes);
                                var schoolid = $('.voice-pop-inschool').data('schoolid');
                                var dom = $('.voice-rank-country .voice-school-a[tid='+schoolid+']').find('.voice-vote-num');
                                var nowlove = dom.text()+1;
                                dom.text(parseInt(dom.text())+1);
                                voice.pop('投票成功');
                            } else if (data.err == 5717) {
                        		voice.pop('投满5次了，去玩翻牌吧~');
                            } else if(data.err == 5701) {
                                //voice.pop('请到客户端登录');
                    		    if (/android/i.test(navigator.userAgent)){
                                    // alert('android')
                                    window.location = 'yibans://platformapi/startApp?url=http%3A%2F%2Fvoice.yiban.cn%2Fsongs%2Fpersonal%3FuserId%3D5049181';
                                    location.reload();
                                    setTimeout(function(){
                                        window.location = 'http://y.yiban.cn/downloads/Yiban_Circle.apk';
                                    }, 1000);
                                }else if (/ipad|iphone|mac/i.test(navigator.userAgent)){
                                    // alert('ios')
                                    window.location = 'yibans://platformapi/startApp?url=http%3A%2F%2Fvoice.yiban.cn%2Fsongs%2Fpersonal%3FuserId%3D5049181';
                                    location.reload();
                                    setTimeout(function(){
                                        window.location = 'itms-apps://itunes.apple.com/cn/app/yi-ban/id914927889?mt=8';
                                    }, 10);
                                }else{
                                    return false;
                                }
                        	}else{
                        	    voice.pop('换一首试试吧~');
                        	}
                        }
                    });
                });
            },
            play: function() {
                $(Player.param.title).html(Player.now.title || '未知歌名');
                $(Player.param.artist).html(Player.now.artist || '未知歌手');
                $(Player.param.cover).attr('src', Player.now.cover || '/public/images/voice/mobile/player/nocover.gif');
                $('.playerB_cover').attr({'xlink:href' : Player.now.cover || '/public/images/voice/mobile/player/nocover.gif','href' : Player.now.cover || '/public/images/voice/mobile/player/nocover.gif'});
                $('.palyer_musicSchool').html((Player.now.school !== 'null' && Player.now.school) || '未知学校');
                $('.palyer_musicLove').text('累计'+ (Player.now.love || 0));
                if (Player.now.origin=='1') {
                    $('.player_musicType').show();
                } else {
                    $('.player_musicType').hide();
                }
                var schoolNamewidth = $('.palyer_musicSchool').outerWidth(),
                    pwidth = $('.playerB_bottom_box').eq(1).outerWidth();
                if(schoolNamewidth > pwidth){
                    schoolNamewidth = pwidth - 10;
                }
                $('.playerB_bottom_school').css({'width':schoolNamewidth});
                
                if (Player.now.isvote) {
                    $('.playerB_contorl_start,.player_vote').css('fill', '#f15b2c');
                } else {
                    $('.playerB_contorl_start,.player_vote').css('fill', 'white');
                }
                if (Player.param.play.fn){
                    Player.param.play.fn.apply(Player.param, arguments);
                }
                var $this = $('.voice-song-a[songmark='+Player.now.songmark+']'),
                    $p = $this.parent(),
                    index = $p.index();
                var top = $p.outerHeight()*(index+1)-39;
                $this.parents('ol').siblings('em').css('top',top).show().addClass('active');
                $('.voice-rank-text,.voice-new-date,.icon-c,.voice-rank-num').show();
                $this.find('.voice-rank-text,.voice-new-date,.icon-c,.voice-rank-num').hide();
            },
            pause: function() {
                if (Player.param.stop.fn)
                    Player.param.stop.fn.apply(Player.param, arguments);
            },
            ended: function() {
                Player.pause();
                var total = Player.musicList.length;
                if (++Player.musicIndex >= total) {
                    Player.musicIndex = 0;
                }
                Player.play();
                var top = $('.voice-song-a').parent().outerHeight()*(Player.musicIndex+1)-39;
                $('.voice-playing').css('top',top);
                $('.voice-rank-text,.voice-new-date,.icon-c,.voice-rank-num').show();
                $('.voice-song-a[songid='+ Player.now.id +']').find('.voice-rank-text,.voice-new-date,.icon-c,.voice-rank-num').hide();
            },
            timeupdate: function() {
                var ply = $(this);
                var total = ply.data('jPlayer').status.duration;
                var played = ply.data('jPlayer').status.currentTime;
                function toTime(timeStamp) {
                    var second = parseInt(timeStamp);
                    var showSecond = second % 60;
                    showSecond = showSecond < 10 ? '0' + showSecond : showSecond;
                    var showMin = parseInt(second / 60) % 60;
                    showMin = showMin < 10 ? '0' + showMin : showMin;
                    var result = showMin + ':' + showSecond;
                    return result;
                }
                $('.playerB_player_timeGrey').html(toTime(total));
                $('.playerB_player_timeNowNumber').html(toTime(played));
                var progress = played / total * 100 + '%';
                $(Player.param.sta).css({
                    'width': progress
                });
                if (Player.status !== 'touching') {
                    $('.player_progress_handle').css({
                        'left': progress
                    });
                }
            }
        });

        function resize() {
            var BPlayerWidth = $('.playerB_player').width();
            var BPlayerHeight = $('.playerB_player').height();
            var useWidth = Math.min(BPlayerWidth, BPlayerHeight) - 20;
            $('#PlayerBox').css({
                'width': useWidth,
                'height': useWidth,
                'top': (BPlayerHeight - useWidth) / 2
            });

            $('.playerB_player_time').css({
                'bottom': BPlayerHeight - useWidth
            });

            //big modle's control size
            var boxWidth = $('.playerB_control').width() / 5;
            var boxHeight = $('.playerB_control').height();
            var useWidth = Math.min(boxWidth, boxHeight);

            var startHeight = useWidth * 0.3;
            var nextHeight = (useWidth - 20) * 0.5;
            $('.playerB_contorl_start,.playerB_contorl_share').css({
                'height': startHeight,
                'marginTop': -startHeight/2
            });
            $('.playerB_start_wapper,.playerB_share_wapper').css({
            	'height': nextHeight,
                'width': nextHeight,
                'marginTop': -(nextHeight+20) / 2
            });
            $('.playerB_contorl_prev,.playerB_contorl_next').css({
                'height': nextHeight,
                'width': nextHeight,
                'marginTop': (boxHeight - nextHeight - 20) / 2,
                'border-radius': nextHeight + 20 * 0.5
            });

            var playHeight = useWidth * 0.8 - 10;
            $('.playerB_contorl_pause,.playerB_contorl_play').css({
                'height': playHeight,
                'width': playHeight,
                'border-radius': playHeight,
                'marginTop': (boxHeight - playHeight - 20) / 2
            });
            
            var schoolNamewidth = $('.palyer_musicSchool').outerWidth(),
                pwidth = $('.playerB_bottom_box').eq(1).outerWidth();
            if(schoolNamewidth > pwidth){
                schoolNamewidth = pwidth - 10;
            }
            $('.playerB_bottom_school').css({'width':schoolNamewidth});
            
        }

        //TODO:fix big modle
        setTimeout(function() {
            resize();
        }, 0);
        setTimeout(function() {
            resize();
        }, 1000);

        $(window).on('resize', function() {
            resize();
        })
    }

    player.prototype.addMusic = function(obj) {
        var player = this;

        if (obj instanceof Array) {
            for (var i = 0; i < obj.length; i++) {
                add(obj[i]);
            }
        } else {
            add(obj);
        }

        function add(obj) {
            if (player.status == 'loading') {
                player.fnStack.push(function() {
                    player.musicList.push(obj);
                });
            } else {
                player.musicList.push(obj);
            }
        }
    };

    player.prototype.removeMusic = function(obj) {
        var player = this;
        player.pause();
        player.musicList = [];
        player.musicIndex = 0;
    };

    player.prototype.pause = function() {
    	var player = this;
        if (player.status == 'loading') {
            player.fnStack.push(function() {
                player.Obj.jPlayer('pause');
                player.status = 'ready';
            });
        } else {
            player.Obj.jPlayer('pause');
            player.status = 'ready';
        }
        $('.playerB_player').removeClass('playerB_player_run');
    };

    player.prototype.play = function(time) {
        var player = this;
        if (player.musicList.length <= 0) {
            player.musicIndex = 0;
            return false;
        }
        var playTime;
        if (time) {
            playTime = player.Obj.data('jPlayer').status.duration * time;
        } else {
            playTime = null;
        }
        player.now = player.musicList[player.musicIndex];
        var isThisMusic = (player.Obj.data('jPlayer').status.media.artist == player.now.artist) && (player.Obj.data('jPlayer').status.media.title == player.now.title)
        if (player.status == 'loading') {
            player.fnStack.push(function() {
                if (!isThisMusic) {
                    player.Obj.jPlayer('setMedia', player.now);
                    var bgIndex = player.now.title.charCodeAt(0) % 7;
	                if(!bgIndex){
	                	bgIndex = 1;
	                }
                    $('.player_musicBig').css({
                        'background-image': 'url("/public/images/voice/mobile/player/bg00' + bgIndex + '.jpg")'
                    })
                }
                player.Obj.jPlayer('play', playTime);
                player.status = 'playing';
            });
        } else {
            if (!isThisMusic) {
                player.Obj.jPlayer('setMedia', player.now);
                var bgIndex = player.now.title.charCodeAt(0) % 7;
                if(!bgIndex){
                	bgIndex = 1;
                }
                $('.player_musicBig').css({
                    'background-image': 'url("/public/images/voice/mobile/player/bg00' + bgIndex + '.jpg")'
                });
            }
            player.Obj.jPlayer('play', playTime);
            player.status = 'playing';
        }
        $('.playerB_player').addClass('playerB_player_run');
    };

    player.prototype.playLast = function() {
        var player = this;
        Player.pause();
        var total = Player.musicList.length;
        Player.musicIndex = total - 1;
        Player.play();
    }
    
    player.prototype.end = function(fn){
        var player = this;
        fn&&fn();
    }
    
    root.player = new player({
        sta: '.player_progress',
        title: '.palyer_musicName',
        artist: '.palyer_musicAuthor',
        cover: '.player_musicSmallIcon',
        play: {
            'DOM': '.player_minContro_play,.playerB_contorl_play',
            'fn': function() {
                $('.player_minContro_stop,.playerB_contorl_pause').css({'opacity':1,'z-index':100});
                $('.player_minContro_play,.playerB_contorl_play').css({'opacity':0,'z-index':50});
                setTimeout(function(){
	                $('.playerB_contorl_play').hide();
	                $('.playerB_contorl_pause').show();
                },300);
            }
        },
        stop: {
            'DOM': '.player_minContro_stop,.playerB_contorl_pause',
            'fn': function() {
                $('.player_minContro_stop,.playerB_contorl_pause').css({'opacity':0,'z-index':50});
                $('.player_minContro_play,.playerB_contorl_play').css({'opacity':1,'z-index':100});
                setTimeout(function(){
	                $('.playerB_contorl_pause').hide();
                	$('.playerB_contorl_play').show();
                },300);
            }
        }
    });
})(window);


// $(function() {
    // var music = player;
    // music.addMusic([{
        // "artist": "庞麦郎", //作者
        // "title": "我的滑板鞋", //标题
        // "mp3": "http://ichangge-player-music.qiniudn.com/mp3/%E5%BA%9E%E9%BA%A6%E9%83%8E-%E6%88%91%E7%9A%84%E6%BB%91%E6%9D%BF%E9%9E%8B.mp3",
        // "oga": "http://ichangge-player-music.qiniudn.com/ogg/%E5%BA%9E%E9%BA%A6%E9%83%8E-%E6%88%91%E7%9A%84%E6%BB%91%E6%9D%BF%E9%9E%8B.ogg",
        // "cover": "http://www.zgfznews.com/fznews/yule/yinyue/images/2014711368386.jpg", //封面
        // "love": 1234, //赞数
        // "id": 123, //歌曲id
        // "origin": true, //是否原创
        // "isvote": true
    // }, {
        // "artist": "beyond",
        // "title": "我是愤怒",
        // "mp3": "http://ichangge-player-music.qiniudn.com/mp3/beyond-%E6%88%91%E6%98%AF%E6%84%A4%E6%80%92.mp3",
        // "oga": "http://ichangge-player-music.qiniudn.com/ogg/beyond-%E6%88%91%E6%98%AF%E6%84%A4%E6%80%92.ogg",
        // "love": 2234
    // }, {
        // "artist": "陈奕迅",
        // "title": "猜情寻",
        // "mp3": "http://ichangge-player-music.qiniudn.com/mp3/%E9%99%88%E5%A5%95%E8%BF%85-%E7%8C%9C%E6%83%85%E5%AF%BB.mp3",
        // "oga": "http://ichangge-player-music.qiniudn.com/ogg/%E9%99%88%E5%A5%95%E8%BF%85-%E7%8C%9C%E6%83%85%E5%AF%BB.ogg",
        // "cover": "http://img001.photo.21cn.com/photos/album/20080313/o/0EAD28886F082686DA74A2B8829B86E5.jpg",
        // "love": 31234
    // }, {
        // "artist": "Maroon 5",
        // "title": "Maps",
        // "mp3": "http://ichangge-player-music.qiniudn.com/mp3/Maroon5-Maps.mp3",
        // "oga": "http://ichangge-player-music.qiniudn.com/ogg/Maroon5-Maps.ogg",
        // "love": 41234
    // }, {
        // "artist": "林宥嘉",
        // "title": "我总是一个人在练习一个人",
        // "mp3": "http://ichangge-player-music.qiniudn.com/mp3/%E6%9E%97%E5%AE%A5%E5%98%89-%E6%88%91%E6%80%BB%E6%98%AF%E4%B8%80%E4%B8%AA%E4%BA%BA%E5%9C%A8%E7%BB%83%E4%B9%A0%E4%B8%80%E4%B8%AA%E4%BA%BA.mp3",
        // "oga": "http://ichangge-player-music.qiniudn.com/ogg/%E6%9E%97%E5%AE%A5%E5%98%89-%E6%88%91%E6%80%BB%E6%98%AF%E4%B8%80%E4%B8%AA%E4%BA%BA%E5%9C%A8%E7%BB%83%E4%B9%A0%E4%B8%80%E4%B8%AA%E4%BA%BA.ogg"
    // }]);
    // music.play();
// });
