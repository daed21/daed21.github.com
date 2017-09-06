define(function(require){
	require('iscroll');
	window.voice = window.voice || {};
	pkScroll = new iScroll('main-scroll',{
		useTransition: true,
        onScrollMove : function() {
	        //阻止浏览器默认事件
	        document.addEventListener('touchmove', function(e) {
	            e.preventDefault();
	        }, false);
        }
	});
	window.page = 1;
    
	voice.token = function(){
		$.ajax({
		   type: "get",
	       url: g_url.tokenUrl,
	       dataType: "jsonp",
	       data:{
	       		token : g_config.accessToken
	       },
	       jsonp: "callback",
	       success: function(data){
	           if(data.code==1000){
	           		//成功
	           }else{
	           		//失败
	           }
	       },
		});
	}
	//提示弹框
	voice.pop = function(text,time){
		var time = time || 3000;
		$('body').append('<div class="voice-pop-ts"><span class="font14">'+text+'</span></div>');
		setTimeout(function(){
			$('.voice-pop-ts').css('opacity',0);
			setTimeout(function(){
				$('.voice-pop-ts').remove();
			},300);
		},time);
	}
	//验证码弹窗
	voice.captchapop = function(){
		var date = new Date();
		$('body').append('<div class="voice-captcha-pop"><p class="font16">请输入验证码</p><p><img src="'+ g_url.captchaUrl +'?v='+date+'"></p><div><div class="voice-captcha-input"><input id="captcha-input" type="text"></div></div><p><a href="javascript:void(0);" class="voice-captcha-btn font14"><em class="voice-bg-left"></em><em class="voice-bg-right"></em>确定</a></p></div>');
	}
	//换一组歌曲
	voice.changeSong = function(fn){
		$.ajax({
			data : 'GET',
			dataType : 'jsonp',
			url : g_url.changeUrl,
			data : {
				page : page,
				num : 2,
				type : 1
			},
			success : function(data){
				if(data&&data.code==1000){
					fn&&fn(data);
				}else{
					voice.pop(data.msg);
				}
			}
		});
	}
	//用户信息
	voice.userInfo = function(uid,fn){
		$.ajax({
			data : 'GET',
			dataType : 'json',
			url : g_url.userInfoUrl,
			data : {
				uid : uid,
			},
			success : function(data){
				if(data&&data.code==1000){
					fn&&fn(data);
				}else{
					voice.pop(data.msg);
				}
			}
		});
	}
	voice.changeSong(function(data){
		render(data);
	});
	voice.vote = function(voteid,captcha,fn){
		$.ajax({
			data : 'GET',
			dataType : 'jsonp',
			url : g_url.voteUrl,
	       	data : {
	       		toid : voteid,
	       		captcha : captcha
	       	},
			success : function(data){
				if(data.err == 0){
					fn&&fn(data);
				}else if(data.err == 5701){
					voice.pop('非法操作~',1500);
				}else if(data.err == 5700){
					voice.pop('操作失败~',1500);
				}else{
					voice.pop('投票失败，请重新投票',1500);
				}
			}
		});
	}
	var $vote = $('.voice-vote-btn'),
		$play = $('.voice-play'),
		$wapper = $('.voice-pk-common'),
		$after = $('.voice-vote-after'),
		$btn_change = $('.voice-change-btn'),
		$btn_share = $('.voice-share-btn'),
		$miniPlayer = $('.player_musicMini');
	function render(data){
		var $btn = '',datai,$dom_p;
		voice.userInfo(data.info[0].uid,function(data){
			var data = data.data;
			renderListFn(0,data)
			leftInfo = {
				'artist' : data.userName,
				'title' : data.songName,
				'mp3' : data.songUrl,
				'cover' : '/public/images/voice/mobile/pk-bg-1.gif',
				'love' : data.score,
				'id' : data.songId,
				'origin' : data.original,
				'isvote' : !data.canVote,
				'uid' : data.uid
			}
		});
		voice.userInfo(data.info[1].uid,function(data){
			var data = data.data;
			renderListFn(1,data);
			rightInfo = {
				'artist' : data.userName,
				'title' : data.songName,
				'mp3' : data.songUrl,
				'cover' : '/public/images/voice/mobile/pk-bg-2.gif',
				'love' : data.score,
				'id' : data.songId,
				'origin' : data.original,
				'isvote' : !data.canVote,
				'uid' : data.uid
			}
		});
		window.captcha = data.captcha;
		function renderListFn(i,data){
			$btn = $vote.eq(i);
			$dom_p = $wapper.eq(i).find('.voice-userinfo p');
			$wapper.eq(i).find('.voice-pk-name p').text(data.songName);
			$wapper.eq(i).find('.voice-userinfo img').attr('src',data.songImg);
			$dom_p.eq(1).text(data.userName);
			$dom_p.eq(2).text(data.schoolName);
			$dom_p.eq(3).text(data.score);
			$vote.eq(i).attr({'userId':data.userId});
			$btn_share.eq(i).attr({'userId':data.userId});
			$wapper.eq(i).attr({'userId':data.userId,'songname':data.songName});
		}
	}
	$(document).on('click','.voice-vote-btn',function(){
		var $this = $(this);
		window.$p = $this.parent();
		window.voteid = $this.attr('userId');
		window.index = $p.index();
		if(captcha == 1){
			voice.captchapop();
		}else{
			voice.vote(voteid,'',function(data){
				$wapper.eq(index).addClass('active');
				$play.hide();
				$after.eq(index).show();
				$vote.hide();
				$btn_change.css('display','block');
				$p.find('.voice-change-btn').hide();
				$p.find('.voice-share-btn').css('display','block');
				$('.voice-userinfo').eq(index).find('.font9').text(data.votes);
			});
		}
	}).on('click','.voice-captcha-btn',function(){
		var text = $('#captcha-input').val();
		voice.vote(voteid,text,function(data){
			$wapper.eq(index).addClass('active');
			$play.hide();
			$after.eq(index).show();
			$vote.hide();
			$btn_change.css('display','block');
			$p.find('.voice-change-btn').hide();
			$p.find('.voice-share-btn').css('display','block');
			$('.voice-captcha-pop').remove();
			$('.voice-userinfo').eq(index).find('.font9').text(data.votes);
		});
	}).on('click','.voice-play',function(){
		window.music = player;
		if(music.musicList.length == 0){
			music.addMusic([leftInfo,rightInfo]);
		}
		var	$this = $(this),
			songName = $this.attr('songname'),
			songurl = $this.attr('songurl'),
			mark = $this.attr('mark');
		if(mark=='leftsong'){
			music.musicIndex = 0;
		}else{
			music.musicIndex = 1;
		}
		music.play();
		$play.show();
		$this.hide();
		$miniPlayer.show();
		$vote.slideDown().css('display','block');
		pkScroll.refresh();
	}).on('click','.player_minContro_play',function(){
		$play.removeClass('voice-stop');
	}).on('click','.voice-change-btn',function(){
		page++;
		voice.changeSong(function(data){
			music.musicList = [];
			$wapper.removeClass('active');
			$play.show();
			$play.css('display','block');
			$btn_change.slideUp();
			$btn_share.slideUp();
			setTimeout(function(){
				render(data);
			},700);
		});
	}).on('click','.voice-share-btn',function(){
		var uid = $(this).attr('userid');
		var songname = $('.voice-pk-common[userid='+uid+']').attr('songname');
        var title = '全国高校#校园好声音#网络大赛火热进行中！我刚玩了翻牌游戏，大家一起来玩！';
		share(title);
	}).on('click','.voice-share-cancel',function(){
		$('.voice-share-pop').remove();
	});
	
	//分享方法
	function share(title){
	    //d指的是window
	    var s = screen,
	        d = document,
	        e = encodeURIComponent;
	    var f = 'http://v.t.sina.com.cn/share/share.php?',
	        u = sharebaseUrl + '/songs/personal?userId=' + music.now.uid,
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
});