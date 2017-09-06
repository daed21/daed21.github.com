define(function(require){
    window.$doc = $(document);
    window.$body = $('body');
    window.$window = $(window);
    window.$main = $('.voice-body'),
    window.screenwidth = $window.width();
    
    window.music = player;
    //获取模板
    var TPL = Tpl.template;
    var loadTpl = TPL.load,
    	navTpl = TPL.Framework.nav,
    	bannerTpl = TPL.Framework.banner,
    	menuTpl = TPL.Framework.menu,
    	HotTpl = TPL.list.Hot,
    	OriTpl = TPL.list.Ori,
    	NewestTpl = TPL.list.Newest,
    	searchTpl = TPL.list.search,
    	searchListTpl = TPL.list.searchList,
    	userInfoTpl = TPL.info.userInfo,
    	schoolInfoTpl = TPL.info.schoolInfo,
    	inschoolTitle =  TPL.rink.inschooltitle,
    	outschoolTitle =  TPL.rink.outschooltitle,
    	schoolRinkTpl = TPL.rink.schoolRinkList,
    	cityRinkTpl = TPL.rink.cityRinkList,
    	provinceRinkTpl = TPL.rink.proRinkList,
    	areaRinkTpl = TPL.rink.areaRinkList,
    	countryRinkTpl = TPL.rink.countryRinkList,
    	schoolTeamTpl = TPL.schoolTeam,
    	playerMINITpl = TPL.playermini,
    	playerBigTpl = TPL.playerBig;
	voice.size = {
		homeRinkSize : 5,
		rinkSize : 16
	}
    
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
	}();
	//提示弹框
	voice.pop = function(text,time){
		var time = time || 2000;
		$('body').append('<div class="voice-pop-ts"><span class="font14">'+text+'</span></div>');
		setTimeout(function(){
			$('.voice-pop-ts').css('opacity',0);
			setTimeout(function(){
				$('.voice-pop-ts').remove();
			},300);
		},time);
	}
	//当前登录用户信息
	voice.userInfoAjax = function(fn){
		$.ajax({
	    	type : 'GET',
	    	dataType : 'json',
	    	url : g_url.userInfoUrl,
	    	data : {
	    		uid : g_config.userId
	    	},
	    	success : function(data){
	    		if(data&&data.code==1000){
	    			fn&&fn(data);
	    		}else{
	    			voice.pop('请登录');
	    		}
	    	}
	    });
	}
    //banner
    voice.banner = function(type,fn){
    	$.ajax({
    		type : 'GET',
    		dataType : 'jsonp',
    		url : g_url.bannerUrl+'?v=2014',
    		data : { position : type },
    		success : function(data){
				if(data&&data.code==200){
					fn&&fn(data);		
				}else{
	    			voice.pop(data.message);
				}
			}
		});

    }
    //校级排名
    voice.schoolRink = function(schoolID,page,size,fn){
        if (window.ajax_schoolRink != undefined && window.ajax_schoolRink.readyState < 4) {
            return false;
        }
    	window.ajax_schoolRink = $.ajax({
    		type : 'GET',
    		dataType : 'json',
    		url : g_url.schoolRinkUrl,
    		data : {
    			schoolId : schoolID,
    			page : page,
    			size : size
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
    //省市、区域高校排行
    voice.cityRink = function(page,size,areaType,areaId,fn){
    	window.ajax_cityRink = $.ajax({
    		type : 'GET',
    		dataType : 'json',
    		url : g_url.cityRinkUrl,
    		data : {
    			page : page,
    			size : size,
    			areaType : areaType,
    			areaId : areaId
    		},
    		success : function(data){
    			if(data&&data.code==1000){
    				fn&&fn(data);
    			}else{
	    			voice.pop(data.msg);
    			}
    		}
    	});
    };
    //全国高校排行
    voice.countryRink = function(page,size,fn){
    	window.ajax_countryRink = $.ajax({
    		type : 'GET',
    		dataType : 'json',
    		url : g_url.countryRinkUrl,
    		data : {
    			page : page,
    			size : size,
    			type : 2
    		},
    		success : function(data){
    			if(data&&data.code==1000){
    				 fn&&fn(data);
    			}else{
	    			voice.pop(data.msg);
    			}
    		}
    	});
    };
	//
    voice.pullRefresh = function(pullUpdomId,fn,pullUpAction,moveFn,moveEndFn){
    	var pullUp = document.getElementById(pullUpdomId);
    	var config = {
	        useTransition: true,
	        // onBeforeScrollStart: function (e) { e.preventDefault(); }, //function (e) { e.preventDefault(); }
	        onRefresh : function() {
	            pullUp.className = '';
	            pullUp.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
	        },
	        onScrollMove : function() {
                //阻止浏览器默认事件
                document.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);
	            if (this.y < 0 && this.y < (this.maxScrollY - 5) && !pullUp.className.match('flip')) {
	                pullUp.className = 'flip';
	                pullUp.querySelector('.pullUpLabel').innerHTML = '释放加载';
	                this.maxScrollY = this.maxScrollY;
	            } else if (this.y > (this.maxScrollY + 5) && pullUp.className.match('flip')) {
	                pullUp.className = '';
	                pullUp.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
	                //this.maxScrollY = pullUpOffset;
	            }
	            moveFn&&moveFn();
	        },
	        onScrollEnd : function() {
	            if (pullUp.className.match('flip')) {
	                pullUp.className = 'loading';
	                pullUp.querySelector('.pullUpLabel').innerHTML = loadTpl;
	                pullUpAction&&pullUpAction();
	            }
	            moveEndFn&&moveEndFn();
	        }
	    }
    	fn&&fn(config);
    }
    
    //播放器
    voice.player = function(){
    	
    }
    
    //校园榜
    voice.schoolHomeFn = function(){
    	// if(typeof music !== 'undefined'){
	    	// music.pause();
	    	// $('.player_musicMini').hide();
    	// }
    	if(g_config.displayFlag=='1') {
        	document.getElementById('main-scroll').innerHTML = Tpl.template.home2;
    	} else {
        	document.getElementById('main-scroll').innerHTML = Tpl.template.home;
    	}
    	homeScroll = new iScroll('main-scroll', {
	        useTransition: true,
	        onBeforeScrollStart:function (e) { e.preventDefault(); }
	    });
	    //banner模块
	    voice.banner('1-4-2',function(data){
	    	picArray = data.data;
	    	voice.slide(picArray);
	    });
		var $rinkList = $('.voice-rank-ol'),
            $countryrink = $('.voice-country-ol'),
			$schoolrink = $rinkList.eq(1),
			// $cityrink = $rinkList.eq(2),全市排行
			//$arearink = $rinkList.eq(2),区域排行
			$title = $('.voice-school-rink'),
			$city = $title.eq(0),
			$area = $title.eq(1),
			$schooltitle = $('.voice-title-a');
		//校园榜信息模块
	    voice.userInfoAjax(function(data){
	    	var data = data.data;
			var $userInfo = $('.voice-user-info'),
				$userhead = $('.voice-user-head img'),
				usInfoTpl = '';
			if(data.pic == ''){
				data.pic = '/public/images/voice/mobile/school-head.gif';
			}
			$userhead.attr('src',data.pic);
			if(data.isjoin==1){
				usInfoTpl = userInfoTpl;
				$userInfo.addClass('voice-song-a');
			}else{
				usInfoTpl = schoolInfoTpl;
				$userInfo.removeClass('voice-song-a');
			}
			usInfoTpl = usInfoTpl.replace(/{(\w+)}/g, function(){
				if(data[arguments[1]]){
					return data[arguments[1]];
				}else{
					return '0';
				}
			});
			$userInfo.html(usInfoTpl);
			voice.ID = voice.ID || {};
			voice.userinfo = voice.userinfo || {};
			voice.ID = {
				cityId : data.cityId,
				areaId : data.areaId
			}
			voice.userinfo = {
				schoolID : data.schoolId
			};
		    $city.attr('areaId',voice.ID.cityId);
		    $area.attr('areaId',voice.ID.areaId);
		    $schooltitle.attr('tid',voice.userinfo.schoolID);
		    //校级排名
		    if(typeof voice.userinfo.schoolID !== 'undefined' && voice.userinfo.schoolID !== 0){
		    	voice.schoolRink(voice.userinfo.schoolID,1,voice.size.homeRinkSize,function(data){
			    	SchoolListHomeFn($schoolrink,data);
			    });
		    }else{
		    	$schoolrink.parents('.voice-rank').remove();
		    	homeScroll.refresh();
		    }
		    //省市排行
		    // if(typeof voice.ID.cityId !== 'undefined' && voice.ID.cityId !== 0){
		    	// voice.cityRink(1,voice.size.homeRinkSize,1,voice.ID.cityId,function(data){
			    	// voice.userinfo.iscity = 1;
			    	// if(voice.userinfo.iscity==1){
			    		// $('.voice-school-city').attr({'areaId':voice.ID.cityId});
			    		// $('.voice-city-rink').text('全市排行榜');
			    	// }
			    	// ElseListHomeFn($cityrink,data);
			    // });
		    // }else{
		    	// $cityrink.parents('.voice-rank').remove();
		    	// homeScroll.refresh();
		    // }
		    
	    });
	    
	    //区域排行
	    // voice.cityRink(1,voice.size.homeRinkSize,2,voice.ID.areaId,function(data){
			// ElseListHomeFn($arearink,data);
	    // });
	    //全国排行
	    voice.countryRink(1,voice.size.homeRinkSize,function(data){
	    	countryListHomeFn($countryrink,data);
	    });
	    function countryListHomeFn(dom,data){
            var dataInfo = data.data.info.list;
            var datai = [],_dataInfo = [],listlen = 0,len = dataInfo.length;
            for(var i=0;i<len;i++){
                _dataInfo = dataInfo[i];
                dom.eq(i).find('li').each(function(){
                   var $this = $(this),
                       index = $this.index(),
                       $child = $this.children('a');
                   datai = _dataInfo[index];
                   if(typeof datai !== 'undefined'){
                       listlen++;
                       $child.attr({'tid':datai.tid});
                       $child.find('.name').text(datai.college);
                       $child.find('.voice-vote-num').text(datai.score);
                   }else{
                       $this.remove();
                   }
               });
            }
            if(listlen > 0){
                dom.parents('.voice-rank').show();
            }else{
                dom.parents('.voice-rank').remove();
            }
            homeScroll.refresh();
        }
	    function ElseListHomeFn(dom,data){
	    	 var dataInfo = data.data.info,
	    	 	 iscity = data.data.isCity;
	    	 var datai = 0,listlen = 0;
	    	 dom.find('li').each(function(){
	    	 	var $this = $(this),
	    	 		index = $this.index(),
	    	 		$child = $this.children('a');
	    	 	datai = dataInfo[index];
	    	 	if(typeof datai !== 'undefined'){
	    	 		listlen++;
	    	 		$child.attr({'tid':datai.tid});
		    	 	$child.find('.name').text(datai.college);
		    	 	$child.find('.voice-vote-num').text(datai.score);
		    	 	if(iscity==1){
		    	 		var iconC = $this.find('.icon-c');
		    	 		iconC.addClass('icon-t-'+(index+1));
		    	 	}
	    	 	}else{
	    	 		$this.remove();
	    	 	}
    	 	});
    	 	if(listlen > 0){
	    	 	dom.parents('.voice-rank').show();
    	 	}else{
    	 		dom.parents('.voice-rank').remove();
    	 	}
    	 	homeScroll.refresh();
	    }
	    function SchoolListHomeFn(dom,data){
	    	var data = data.data.info;
	    	var datai = 0,listlen = 0;
    		dom.find('li').each(function(){
    			var $this = $(this),
	    	 		index = $this.index(),
	    	 		$child = $this.children('a');
	    	 	datai = data[index];
	    	 	if(typeof datai !== 'undefined'){
	    	 		listlen++;
	    	 		$child.attr({'songId' : datai.songId,'songUrl' : datai.songUrl,'userId':datai.userId,'songmark' : 'song'+datai.songId});
		    	 	$child.append('<p class="voice-songInfo">{"songmark":"song'+datai.songId+'","uid":"'+datai.userId+'","school":"'+datai.schoolName+'","artist":"'+datai.userName+'","title":"'+datai.songName+'","mp3":"'+datai.songUrl+'","cover":"'+(datai.cover || "")+'","love":"'+datai.score+'","id":"'+datai.songId+'","origin":"'+datai.original+'","isvote":"'+(datai.canVote ? datai.canVote : '')+'"}</p>');
		    	 	$child.find('.voice-schoolr-name p:first-child').text(datai.songName);
		    	 	$child.find('.voice-schoolr-name p:last-child span').text(datai.userName);
		    	 	$child.find('.voice-vote-num').text(datai.newscore);
		    	 	if(datai.teamFlag==1){
		    	 		$child.find('.voice-schoolr-name p:last-child span').append(schoolTeamTpl);
		    	 	}
		    	 	if((datai.userName || datai.teamFlag==1)&&datai.songName){
		    	 	    $child.find('.voice-schoolr-name').addClass('hasname');
		    	 	}
	    	 	}else{
	    	 		$this.remove();
	    	 	}
    	 	});
    	 	if(listlen > 0){
    	 		dom.parents('.voice-rank').show();
    	 	}else{
    	 		dom.parents('.voice-rank').remove();
    	 	}
    	 	homeScroll.refresh();
	    }
    }
    //声音库人气、最新、原创排行
    voice.voiceRink = function(page,size,rankType,fn){
        var type = 1;
        if(rankType == 1){
            type = 2;
        }else{
            type = 1;
        }
		window.ajaxRequest_voice = $.ajax({
    		type : 'GET',
    		dataType : 'json',
    		url : g_url.voiceRinkUrl,
    		data : {
    			page : page,
    			size : size,
    			type : type,
    			rankType : rankType,//1 人气 2最新 3 原创
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
    //搜索
    voice.search = function(searchType,keyword,page,size,fn){
    	$.ajax({
    		type:'GET',
    		dataType:'json',
    		url:g_url.searchUrl,
    		data:{
    			searchType : searchType,
    			keyword : keyword,
    			page : page,
    			size : size
    		},
    		success:function(data){
    			if(data&&data.code==1000){
    				fn&&fn(data);
    			}else if (data.code==1001){
    				voice.pop('输点什么吧~');
    			}else{
	    			voice.pop(data.msg);
    			}
    		}
    	});
    }
    //声音库页面
    voice.voiceHomeFn = function(){
    	// if(typeof music !== 'undefined'){
	    	// music.pause();
	    	// $('.player_musicMini').hide();
    	// }
    	document.getElementById('main-scroll').innerHTML = Tpl.template.voice;
	    var $voice_scroll = $('.voice-scroll-wapper');
    	var $ol = $('.voice-main-rank'),
			$pullUp = $('#pullUp'),
			$tab = $('.voice-header-tab'),
			$tab_bg = $('.voice-header-bg'),
			$menu = $('.voice-main-menu'),
			$bg = $('.voice-menu-bg');
    	$tab.removeClass('active');
    	$tab.eq(1).addClass('active');
    	$tab_bg.css({'left':'50%'});
	    //banner模块
	    voice.banner('1-4-3',function(data){
	    	picArray = data.data;
	    	voice.slide(picArray);
	    });
	    // $voice_scroll.css('height',$window.height() - $voice_scroll.offset().top);
		voice.pullRefresh('pullUp',function(config){
	    	window.voiceScroll = new iScroll('main-scroll',config);
		},voiceScrollFn,backTopFn,backTopFn);
		//人气
    	voice.voiceRink(1,voice.size.rinkSize,1,function(data){
    		var dataInfo = data.data.info,
    			// music = player,
    			len = dataInfo.length;
    		newOFn(data,1,$('.voice-main-hot'),$menu.find('li[type=v-hot]'));
    		voiceScroll.refresh();
    	});
    	//最新
    	voice.voiceRink(1,voice.size.rinkSize,2,function(data){
    		var dataInfo = data.data.info,
    			len = dataInfo.length;
    		newOFn(data,2,$('.voice-main-new'),$menu.find('li[type=v-new]'));
    	});
        //原创
        voice.voiceRink(1,voice.size.rinkSize,3,function(data){
            var dataInfo = data.data.info,
                len = dataInfo.length;
            newOFn(data,3,$('.voice-main-origin'),$menu.find('li[type=v-origin]'));
        });
    	//返回顶部
    	function backTopFn(){
    		if(voiceScroll.y <= -195){
				$('.voice-backTop').show();
			}else{
				$('.voice-backTop').hide();
			}
    	}
    	//人气、最新、原创列表渲染
    	function newOFn(data,rankType,$ol,domType){
    		var dataInfo = data.data.info,
				len = dataInfo.length,
				j = 0,kingtpl = '',datai,
				$pullUp = $('#pullUp');
			for(var i=0; i<len; i++){
				j = i + 1;
				datai = { list : [dataInfo[i]] };
				if(rankType == 2){
					tpl = juicer(NewestTpl,datai);
				}else if(rankType == 3){
					tpl = juicer(OriTpl,datai);
				}else{
				    tpl = juicer(HotTpl,datai);
				}
				$ol.append(tpl);
				voiceScroll.refresh();
	    	}
	    	if(len==0){
                $pullUp.find('.pullUpLabel').text('已无更多');
            }else{
                window.voicePage++;
                domType&&domType.attr('data-page',parseInt(domType.attr('data-page'))+1);
                $pullUp.find('.pullUpLabel').text('上拉加载更多');
            }
	    }
    	//榜单加载更多
    	window.voicePage = 1;
    	function voiceScrollFn(){
    		var $ol,domType = $menu.find('li[type=v-origin]');
			if(rankType == 1){
				$ol = $('.voice-main-hot');
				domType = $menu.find('li[type=v-hot]');
			}else if(rankType == 2){
				$ol = $('.voice-main-new');
				domType = $menu.find('li[type=v-new]');
			}else if(rankType == 3){
				$ol = $('.voice-main-origin');
                domType = $menu.find('li[type=v-origin]');
			}else{
				return false;
			}
			if (ajaxRequest_voice && ajaxRequest_voice.readyState < 4) {
                return false;
            }
    		voice.voiceRink(domType.attr('data-page'),voice.size.rinkSize,rankType,function(data){
				newOFn(data,rankType,$ol,domType);
				$pullUp.show();
			});
    	}
    	//搜索加载更多
    	window.searchPage = 1;
    	function searchScrollFn(){
    		voice.search(searchtype,keyword,searchPage,voice.size.rinkSize,function(data){
				renderSearchFn(data);
			});
    	}
    }
    // 渲染页面
    if(typeList.pageType=='school'){
    	voice.schoolHomeFn();
    }else if(typeList.pageType=='voiced'){
    	voice.voiceHomeFn();
    }else if(typeList.pageType=='pk'){
    	
    }else{
    	return false;
    }
    
    //校园榜交互操作
	window.isearch = false;
	$doc.on('click','.voice-school-a',function(){  //省、市各高校参赛者排行
		var $this = $(this),
			tid = $this.attr('tid'),
			schoolname = $this.find('p.name').text();
		window.schoolId = tid;
		window.schoolName = schoolname;
		$('body').append('<div class="voice-pop voice-pop-inschool" style="left:'+ screenwidth +'px" data-schoolid="'+tid+'">' + inschoolTitle + '</div>');
		
		voice.pullRefresh('inpullUp',function(config){
	    	window.inScroll = new iScroll('inscroll-wapper',config);
		},joinPullUpFn);
		
		setTimeout(function(){
				$('.voice-pop-inschool').css('left',0);
			},1);
    	$('.voice-pop-inschool .txtcenter').text(schoolname+'排行榜');
    	var $p = $this.parents('.voice-rank-country');
		voice.schoolRink(tid,1,voice.size.rinkSize,function(data){
    		schoolRinkFn(data,schoolname,$p.length);
	    });
	}).on('click','.voice-school-rink',function(){ //查看省、市、全国学校排行榜全部
		var $this = $(this),
			mark = $this.attr('mark'),
			areaId = $this.attr('areaId'),
			areaType = $this.attr('areatype');
		window.mark = mark;
		window.areaType = areaType;
		window.areaId = areaId;
		if(mark == 'country'){
			$('body').append('<div class="voice-pop voice-pop-outschool" style="left:'+ screenwidth +'px">' + outschoolTitle + '</div>');

			voice.pullRefresh('outpullUp',function(config){
		    	window.outScroll = new iScroll('outscroll-wapper',config);
			},schoolPullUpFn);
			
			setTimeout(function(){
				$('.voice-pop-outschool').css('left',0);
			},1);
			$('.voice-pop-outschool .txtcenter').text('全国高校排行榜');
			voice.countryRink(1,voice.size.rinkSize,function(data){
				rinkListFn(data,5)
			});
		}else{ //直辖市
			var titleTxt = '',type = 1; 
			if(areaType==2){
				titleTxt = '全区高校排行榜';
				type = 4;
			}else{
				if(voice.userinfo.iscity == 1){
					titleTxt = '全市高校排行榜';
					type = 2;
				}else{
					type = 3;
					titleTxt = '全省高校排行榜';
				}
			}
			window.iconType = type;
			$('body').append('<div class="voice-pop voice-pop-outschool" style="left:'+ screenwidth +'px">' + outschoolTitle + '</div>');
			
			voice.pullRefresh('outpullUp',function(config){
		    	window.outScroll = new iScroll('outscroll-wapper',config);
			},schoolPullUpFn);
			
			
			setTimeout(function(){
				$('.voice-pop-outschool').css('left',0);
			},1);
			$('.voice-pop-outschool .txtcenter').text(titleTxt);
			voice.cityRink(1,voice.size.rinkSize,areaType,areaId,function(data){
				rinkListFn(data,type)
			});
		}
	}).on('click','.voice-header-tab',function(){  //导航
		var $tab = $('.voice-header-tab'),
			$navbg = $('.voice-header-bg');
		var $this = $(this);
		typeList.pageType = $this.attr('type');
		$tab.removeClass('active');
		$this.addClass('active');
		if(typeList.pageType == 'school'){
			$navbg.css('left',0);
			voice.schoolHomeFn();
		}else{
			$navbg.css('left','50%');
			voice.voiceHomeFn();
		}
		window.history.pushState('','','/voice/index/index/' + typeList.pageType);
	}).on('click','.voice-back',function(){
		var $wapper = $(this).parents('.voice-pop'),
			$ptype = $(this).parents('.voice-pop').hasClass('voice-pop-inschool');
		$wapper.css('left',screenwidth);
		setTimeout(function(){
			$wapper.remove();
		},300);
		if($ptype){
			joinPage = 1;
		}else{
			schoolPage = 1;
		}
	}).on('click','.voice-song-a',function(){
	    var $this = $(this),
            $p = $this.parent(),
            index = $p.index(),
	        $ol = $p.parent(),
            $li = $ol.children('li'),
	        this_song = $this.attr('songmark'),
	        song_NUM = $li.length;
        music.pause();
		var top = $this.parent().outerHeight()*(index+1)-39;
		$('.voice-playing').hide();
		$ol.siblings('em').css('top',top).show();
		var len = music.musicList.length;
		if(len == 0){
		    addmusicFn();
		}else{
		    var isexist = 0;
		    var nowmusiclist = music.musicList,
		        len = nowmusiclist.length;
		    for(var i=0; i < len; i++){
		        if(nowmusiclist[i].songmark == this_song){
		            isexist = 1;
		            music.musicIndex = i;
		            music.play();
		            break;
		        }
	        }
	        if(isexist == 0){
	            music.removeMusic();
                addmusicFn();
	        }
        }
		function addmusicFn(){
		    var musicList = new Array();
            var songInfo = '';
            for(var i=0; i < song_NUM; i++){
                songInfo = $ol.find('.voice-songInfo').eq(i).text();
                if(songInfo){
                    songInfo = JSON.parse(songInfo);
                    musicList.push(songInfo);
                }
            }
            music.addMusic(musicList);
            music.musicIndex = index;
            music.play();
		}
		$('.player_musicMini').show();
		$('.voice-rank-text,.voice-new-date,.icon-c,.voice-rank-num').show();
		$this.find('.voice-rank-text,.voice-new-date,.icon-c,.voice-rank-num').hide();
		if(music.status == 'playing'){
			$('.voice-playing').addClass('active');
		}
		if(isearch){
			$('.voice-search-name').removeClass('active');
			$this.find('.voice-search-name').addClass('active');
		}
	}).on('click','.voice-backTop',function(){
		if(typeList.pageType == 'voiced'){
			voiceScroll.scrollToElement(document.getElementById('scroll-bar'),300);
		}else{
			//voiceScroll.scrollToElement(document.getElementById('scroll-bar'),300);
		}
	}).on('click','.player_minContro_stop',function(){
		$('.voice-playing').removeClass('active');
	}).on('click','.player_minContro_play',function(){
		$('.voice-playing').addClass('active');
	}).on('click','.voice-group a',function(){
	    var $a = $('.voice-group a'),
            $boder = $('.voice-group-bg');
	    var $this = $(this),
	        $p = $this.parent(),
	        index = $p.index(),
	        $list = $('.voice-rank-country .voice-country-ol');
        $a.removeClass('active');
        $this.addClass('active');
        $boder.css('left',(25*index)+'%');
        $list.hide().eq(index).show();
	});
	
	//声音库交互
	var voiceId = '';
	var $pullUp = $('#pullUp'),
	    $searchList = $('.voice-main-rank');
    window.rankType = 3;
	$doc.on('click','.voice-list',function(){
	    $('.voice-playing').hide();
		isearch = false;
		var $this = $(this),$p = $this.parent(),$bg = $('.voice-menu-bg'),
			rankType = 3,
			searchInput = ($('.voice-search').length > 0),
			$searchList = $('.voice-search-ol'),
			index = $p.index();
		$bg.css('left',(25*index)+'%');
		typeList.voice.listType = $p.attr('type');
		$pullUp.show();
		window.voicePage = 2;
		$('.voice-main-menu').find('a').removeClass('active');
		$this.addClass('active');
		$('.voice-main-rank').hide();
		if($searchList.length > 0){
			$searchList.remove();
		}
		if(typeList.voice.listType == 'v-hot'){
			$('.voice-main-hot').show();
			searchshowFn();
			rankType = 1;
		}else if(typeList.voice.listType == 'v-new'){
			$('.voice-main-new').show();
			searchshowFn();
			rankType = 2;
		}else if(typeList.voice.listType == 'v-origin'){
			$('.voice-main-origin').show();
			searchshowFn();
			rankType = 3;
		}else{
			return false;
		}
		voiceScroll.refresh();
		window.rankType = rankType;
		function searchshowFn(){
			if(searchInput){
				$('.voice-search').remove();
			}
		}
	}).on('click','.voice-list-search',function(){
		isearch = true;
		$('.voice-main-rank').hide();
		$('.voice-main-search').show();
		var $this = $(this),
		    $p = $this.parent(),
            index = $p.index(),
			$bg = $('.voice-menu-bg'),
			searchInput = ($('.voice-search').length > 0);
        $bg.css('left',(25*index)+'%');
		$('.voice-main-menu').find('a').removeClass('active');
		$this.addClass('active');
		$pullUp.hide();
		if(!searchInput){
			$('.voice-scroll-wapper').before(searchTpl);
		}
    	voiceScroll.refresh();
	});
	$doc.on('click','.voice-search-title',function(){
		var $list = $('.voice-search-typelist');
		var isvisible = $list.is(':visible');
		if(isvisible){
			$list.hide();
		}else{
			$list.show();
		}
	}).on('click','.searchType',function(){
		var $this = $(this),
			$title = $('.voice-search-title');
		$title.attr('searchtype',$this.attr('searchtype'));
		$title.children('span:first-child').text($this.text());
		$this.parents('.voice-search-typelist').hide();
	}).on('click','.voice-search-btn',function(){
		var searchtype = $('.voice-search-title').attr('searchtype'),
			keyword = $('#v-search').val();
		window.searchtype = searchtype;
		window.keyword = keyword;
		voice.search(searchtype,keyword,1,voice.size.rinkSize,function(data){
			renderSearchFn(data);
		});
	});
	
    //搜索列表渲染
	function renderSearchFn(data){
		var dataInfo = data.data.info,datai,
			$ol = $('.voice-main-search');
		$ol.html('');
		var tpl = '';
		if(data.data.length == 0){
			$ol.append('<li style="text-align:center;line-height:50px;">无相关内容，换个关键词试一下吧</li>');
			return false;
		}
		len = dataInfo.length;
		if(len > 0){
			for(var i=0; i<len; i++){
				datai = { list : [dataInfo[i]] };
				tpl = juicer(searchListTpl,datai);
    			$ol.append(tpl);
				voiceScroll.refresh();
    		}
    		if(len > voice.size.rinkSize){
    			$('#pullUp').show();
				voiceScroll.refresh();
	    		window.schoolPage++;
	    		$pullUp.find('.pullUpLabel').text('上拉加载更多');
    		}
		}else{
			$pullUp.find('.pullUpLabel').text('无更多');
			$ol.append('<li style="text-align:center;line-height:50px;">无相关内容，换个关键词试一下吧</li>');
		}
	}
	
    //高校排行
    function rinkListFn(data,type){
    	var icontype = '';
    	if(type==1){
    		icontype = 's';
    	}else if(type==2){
    		icontype = 't';
    	}else if(type==3){
    		icontype = 'p';
    	}else if(type==4){
    		icontype = 'd';
    	}else{
    		icontype = 'c';
    	}
		var $ol = $('.voice-pop-outschool .voice-rank-ol'),
			$pullUp = $('#outpullUp');
		var dataInfo = data.data.info,
			len = dataInfo.length,
			rinkTpl = '',datai;
		for(var i=0; i<len; i++){
			dataInfo[i].type = icontype;
			datai = { list : [dataInfo[i]] };
    		rinkTpl = juicer(cityRinkTpl,datai);
			$ol.append(rinkTpl);
    		outScroll.refresh();
		}
    	if(len==0){
    		$pullUp.find('.pullUpLabel').text('已无更多');
    	}else{
    		window.schoolPage++;
    		$pullUp.find('.pullUpLabel').text('上拉加载更多');
    	}
    }
    //全校参赛者排行
    function schoolRinkFn(data,schoolname,iscountry){
		var $ol = $('.voice-pop-inschool .voice-rank-ol'),
			$pullUp = $('#inpullUp');
    	var dataInfo = data.data.info,
    		len = dataInfo.length,
    		schoolTpl = '',datai;
    	for(var i=0; i<len; i++){
    		datai = { list : [dataInfo[i]] };
            datai.list[0].iscountry = iscountry;
    		schoolTpl = juicer(schoolRinkTpl,datai);
    		$ol.append(schoolTpl);
    		inScroll.refresh();
    	}
    	if(len==0){
    		$pullUp.find('.pullUpLabel').text('已无更多');
    	}else{
    		window.joinPage++;
    		$pullUp.find('.pullUpLabel').text('上拉加载更多');
    	}
    }
	window.schoolPage = 1;
    function schoolPullUpFn(){
    	if(mark=='country'){
    		voice.countryRink(schoolPage,voice.size.rinkSize,function(data){
				rinkListFn(data,5)
			});
    	}else if(mark=='province'){
    		voice.cityRink(schoolPage,voice.size.rinkSize,areaType,areaId,function(data){
				rinkListFn(data,iconType)
			});
    	}
    }
	window.joinPage = 1;
    function joinPullUpFn(){
    	voice.schoolRink(schoolId,joinPage,voice.size.rinkSize,function(data){
    		schoolRinkFn(data,schoolName);
    	});
    }
});