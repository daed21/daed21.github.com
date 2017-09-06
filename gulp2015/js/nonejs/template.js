(function(){
    window.Tpl = window.Tpl || {};
    Tpl.template = {
        load : '<div class="voice-loading"><div class="loading-gray"></div><div class="loading-color"></div></div>',
        schoolTeam : '<em class="icon-origin iblock">校队</em>',
        Framework : {
            nav : '<header class="voice-header font15 txtcenter color-orange">'+
            			'<nav class="voice-header-wapper">'+
	                        '<div class="fl voice-header-tab" type="school">校园榜</div>'+
	                        '<div class="fl voice-header-tab" type="voiced">声音库</div>'+
                        '</nav>'+
                        '<div class="voice-header-bg"></div>'+
                    '</header>'+
                    '<div class="voice-wapper" id="main-scroll">'+
                        '<div id="scroll-bar">'+
                            //主要页面
                        '</div>'+
                    '</div>',
            banner : '{@each picArray as pic}'+
					 '<div class="fl voice-banner-column">'+
                        '{@if pic.type == "链接"}'+
                        '<a href="{@if pic.url !== null}$${pic.url}{@else}javascript:void(0);{@/if}">'+
                            '<img src="$${pic.image}" />'+
                            '<div class="voice-banner-detail">'+
                                '<div class="voice-banner-title"><span class="font13">$${pic.title}</span></div>'+
                                '<div class="voice-banner-type font12">详情>></div>'+
                            '</div>'+
                            '<div class="voice-banner-bg"></div>'+
                        '</a>'+
                        '{@else if pic.type == "图片"}'+
                        '<img src="$${pic.image}" />'+
                        '<div class="voice-banner-detail">'+
                            '<div class="voice-banner-title"><span class="font13">$${pic.title}</span></div>'+
                        '</div>'+
                        '<div class="voice-banner-bg"></div>'+
                        '{@else if pic.type == "视频"}'+
                        '<a href="{@if pic.url !== null}$${pic.url}{@else}javascript:void(0);{@/if}">'+
                            '<img src="$${pic.image}"/>'+
                            '<div class="voice-banner-detail">'+
                                '<div class="voice-banner-title"><span class="font13">$${pic.title}</span></div>'+
                                '<div class="voice-banner-type voice-banner-border voice-type-pic"></div>'+
                            '</div>'+
                            '<div class="voice-banner-bg"></div>'+
                        '</a>'+
                        '{@/if}'+
	                 '</div>'+
	                 '{@/each}',
            menu : '<div class="voice-main-nav">'+
                        '<ul class="voice-menu-temporary font14 clear">'+
                            '<li type="v-hot" data-page="1"><a class="voice-list active" href="javascript:void(0)"><span>人气</span></a></li>'+
                            '<li type="v-new" data-page="1"><a class="voice-list" href="javascript:void(0)"><span>最新</span></a></li>'+
                            '<li type="v-origin" data-page="1"><a class="voice-list" href="javascript:void(0)"><span>原创</span></a></li>'+
                            '<li type="v-search"><a class="voice-list-search" href="javascript:void(0)"><span>搜索</span></a></li>'+
                            '<span class="voice-menu-bg"></span>'+
                        '</ul>'+
                    '</div>',
        },
        list : {
            //人气
            Hot : '{@each list as hot }'+
	        		'<li>'+
	                    '<a href="javascript:vois(0)" class="voice-song-a" songId=$${hot.songId} songUrl=$${hot.songUrl} userId=$${hot.userId} songmark="hot$${hot.songId}">'+
	                        '{@if hot.rank == "1"}'+
	                        '<span class="voice-rank-icon voice-rank-1"><i>1</i><em class="voice-first icon"></em></span>'+
	                        '{@else if  hot.rank == "2"}'+
	                        '<span class="voice-rank-icon voice-rank-2"><i>2</i></span>'+
	                        '{@else if  hot.rank == "3"}'+
	                        '<span class="voice-rank-icon voice-rank-3"><i>3</i></span>'+
	                        '{@else}'+
	                        '<span class="voice-rank-text"><i>$${hot.rank}</i></span>'+
	                        '{@/if}'+
	                        '<div class="voice-info {@if hot.songName == undefined || hot.userName == undefined}line35{@/if}">'+
	                            '<div class="voice-info-main">'+
	                                '<p class="font15">$${hot.songName}</p>'+
	                                '<p class="font12"><span>$${hot.userName}</span>{@if hot.teamFlag==1}<em class="icon-origin iblock">校队</em>{@/if}</p>'+
	                            '</div>'+
	                        '</div>'+
	                        '<span class="voice-vote clear">'+
	                            '<i class="fl iblock icon-vote {@if hot.voted==1}active{@/if}"></i>'+
	                            '<i class="voice-vote-num fl">{@if hot.score == false}0{@else}$${hot.score}{@/if}</i>'+
	                        '</span>'+
	                        '<p class="voice-songInfo">{"songmark":"'+'hot$${hot.songId}'+'","uid":"'+'$${hot.userId}'+'","school":"'+'$${hot.schoolName}'+'","artist":"'+'$${hot.userName}'+'","title":"'+'$${hot.songName}'+'","mp3":"'+'$${hot.songUrl}'+'","cover":"'+'$${hot.songImg}'+'","love":"'+'$${hot.score}'+'","id":"'+'$${hot.songId}'+'","origin":"'+'$${hot.original}'+'","isvote":"'+'$${hot.canVote}'+'"}</p>'+
	                    '</a>'+
	                '</li>'+
	                '{@/each}',
            //原创
            Ori : '{@each list as ori }'+
                    '<li>'+
                        '<a href="javascript:vois(0)" class="voice-song-a" songId=$${ori.songId} songUrl=$${ori.songUrl} userId=$${ori.userId} songmark="ori$${ori.songId}">'+
                            '{@if ori.rank == "1"}'+
                            '<span class="voice-rank-icon voice-rank-1"><i>1</i><em class="voice-first icon"></em></span>'+
                            '{@else if  ori.rank == "2"}'+
                            '<span class="voice-rank-icon voice-rank-2"><i>2</i></span>'+
                            '{@else if  ori.rank == "3"}'+
                            '<span class="voice-rank-icon voice-rank-3"><i>3</i></span>'+
                            '{@else}'+
                            '<span class="voice-rank-text"><i>$${ori.rank}</i></span>'+
                            '{@/if}'+
                            '<div class="voice-info {@if ori.songName == undefined || ori.userName == undefined}line35{@/if}">'+
                                '<div class="voice-info-main">'+
                                    '<p class="font15">$${ori.songName}</p>'+
                                    '<p class="font12"><span>$${ori.userName}</span>{@if ori.teamFlag==1}<em class="icon-origin iblock">校队</em>{@/if}</p>'+
                                '</div>'+
                            '</div>'+
                            '<span class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote {@if ori.voted==1}active{@/if}"></i>'+
                                '<i class="voice-vote-num fl">{@if ori.score == false}0{@else}$${ori.score}{@/if}</i>'+
                            '</span>'+
                            '<p class="voice-songInfo">{"songmark":"'+'ori$${ori.songId}'+'","uid":"'+'$${ori.userId}'+'","school":"'+'$${ori.schoolName}'+'","artist":"'+'$${ori.userName}'+'","title":"'+'$${ori.songName}'+'","mp3":"'+'$${ori.songUrl}'+'","cover":"'+'$${ori.songImg}'+'","love":"'+'$${ori.score}'+'","id":"'+'$${ori.songId}'+'","origin":"'+'$${ori.original}'+'","isvote":"'+'$${ori.canVote}'+'"}</p>'+
                        '</a>'+
                    '</li>'+
                    '{@/each}',
            //最新
            Newest : '{@each list as newest }'+ 
        			 '<li>'+
                        '<a href="javascript:vois(0)" class="voice-song-a" userId=$${newest.userId} songId=$${newest.songId} songmark="new$${newest.songId}">'+
                            '<span class="voice-new-date"><p class="font10">$${newest.month}</p><p class="font13">$${newest.day}</p></span>'+
                            '<div class="voice-info {@if newest.songName == undefined || newest.userName == undefined}line35{@/if}">'+
                                '<div class="voice-info-main">'+
                                    '<p class="font15">$${newest.songName}</p>'+
                                    '<p class="font12"><span>$${newest.userName}</span>{@if newest.teamFlag==1}<em class="icon-origin iblock">校队</em>{@/if}</p>'+
                                '</div>'+
                            '</div>'+
                            '<span class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote {@if newest.voted==1}active{@/if}"></i>'+
                                '<i class="voice-vote-num fl">{@if newest.score == false}0{@else}$${newest.score}{@/if}</i>'+
                            '</span>'+
                            '<p class="voice-songInfo">{"songmark":"'+'new$${newest.songId}'+'","uid":"'+'$${newest.userId}'+'","school":"'+'$${newest.schoolName}'+'","artist":"'+'$${newest.userName}'+'","title":"'+'$${newest.songName}'+'","mp3":"'+'$${newest.songUrl}'+'","cover":"'+'$${newest.songImg}'+'","love":"'+'$${newest.score}'+'","id":"'+'$${newest.songId}'+'","origin":"'+'$${newest.original}'+'","isvote":"'+'$${newest.canVote}'+'"}</p>'+
	                    '</a>'+
                    '</li>'+
	                '{@/each}',
        	//搜索
        	search : '<div class="voice-search">'+
    					'<div class="voice-search-wapper">'+
	        				'<div class="voice-search-type">'+
	        					'<a class="voice-search-title" searchType="1" href="javascript:void(0);"><span class="font13">歌曲名</span><span class="voice-dda"></span></a>'+
	        					'<div class="voice-search-typelist font13">'+
	        						'<div><a class="searchType" href="javascript:void(0);" searchType="1">歌曲名</a></div>'+
	        						'<div><a class="searchType" href="javascript:void(0);" searchType="2">歌手名</a></div>'+
	        						'<div><a class="searchType" href="javascript:void(0);" searchType="3">学校名</a></div>'+
	        					'</div>'+
	        				'</div>'+
	        				'<div class="voice-search-main">'+
	        					'<input id="v-search" type="text"/>'+
	        				'</div>'+
	        				'<a class="voice-search-btn" href="javascript:void(0);">'+
	        					
	        				'</a>'+
        				'</div>'+
		        	'</div>',
			searchList : '{@each list as search}'+ 
						 '<li>'+
		                    '<a href="javascript:vois(0)" class="voice-song-a" userId="$${search.userId}" songUrl="$${search.songUrl}" songId="$${search.songId}" songmark="song$${search.songId}">'+
		                        '<div class="voice-search-name  {@if search.songName == undefined || search.userName == undefined}line35{@/if}">'+
		                            '<div class="voice-info-main">'+
		                                '<p class="font15">$${search.songName}</p>'+
		                                '<p class="font12"><span>$${search.userName}</span>{@if search.teamFlag==1}<em class="icon-origin iblock">校队</em>{@/if}</p>'+
		                            '</div>'+
		                        '</div>'+
		                        '<span class="voice-vote clear">'+
		                            '<i class="fl iblock icon-vote"></i>'+
		                            '<i class="voice-vote-num fl">{@if search.score == false}0{@else}$${search.score}{@/if}</i>'+
		                        '</span>'+
		                        '<p class="voice-songInfo">{"songmark":"'+'song$${search.songId}'+'","uid":"'+'$${search.userId}'+'","school":"'+'$${search.schoolName}'+'","artist":"'+'$${search.userName}'+'","title":"'+'$${search.songName}'+'","mp3":"'+'$${search.songUrl}'+'","cover":"'+'$${search.songImg}'+'","love":"'+'$${search.score}'+'","id":"'+'$${search.songId}'+'","origin":"'+'$${search.original}'+'","isvote":"'+'$${search.canVote}'+'"}</p>'+
		                    '</a>'+
		                '</li>'+
		                '{@/each}',
        },
        info : {
        	userInfo : '<p><em class="icon-mike iblock"></em><span class="voice-song-name color-orange font18">{songName}</span><em class="icon-origin iblock" style="display:none;">原创</em></p>'+
                		'<p class="voice-user-singer">'+
                			'<span><em class="icon-userhead iblock"></em><em class="voice-song-info color-brown font15">{nickName}</em></span>'+
                			'<span><em class="icon-vote iblock"></em><em class="voice-song-info color-brown font12">{score}</em></span>'+
            			'</p>'+
            			'<p class="voice-user-rink font12 color-brown"><em class="icon-rink iblock"></em><span>校内排名：{rankinschool}</span></p>'+
            			'<p class="font12 color-brown voice-user-rank"><span>个人总排名：{rank}</span></p>'+
            			'<p class="voice-songInfo">{"uid":"{userId}","school":"{schoolName}","artist":"{userName}","title":"{songName}","mp3":"{songUrl}","cover":"{songImg}","love":"{score}","id":"{songId}","origin":"{original}","isvote":"true"}</p>',
        	schoolInfo : '<p><em class="icon-school iblock"></em><span class="voice-song-name color-orange font18">{schoolName}</span></p>'+
                		'<p class="voice-user-singer voice-user-school">'+
                			'<em class="voice-user-rink font12 color-brown"><em class="icon-rink iblock"></em><span>学校排名：{schoolrank}</span></em>'+
                			'<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown">{schoolscore}</i>'+
                            '</em>'+
            			'</p>'+
            			'<p></p>',
        },
        rink : {
        	inschooltitle : '<div class="voice-rank-title font18 voice-school-title"><a href="javascript:void(0);" class="voice-back"><span class="block line41 txtcenter"></span><em class="icon-next iblock fr active"></em></a></div>'+
				                '<div class="voice-rank voice-rank-school" id="inscroll-wapper">'+
				                	'<div>'+
				                	    '<em class="voice-playing"></em>'+
				                		'<ol class="voice-rank-ol voice-list-rank">'+
				                		
				                		'</ol>'+
				                        '<div id="inpullUp">'+
				                            '<div class="pullUpLabel">上拉加载更多</div>'+
				                        '</div>'+
				                	'</div>'+
				                '</div>',
        	outschooltitle : '<div class="voice-rank-title font18 voice-school-title"><a href="javascript:void(0);" class="voice-back"><span class="block line41 txtcenter"></span><em class="icon-next iblock fr active"></em></a></div>'+
				                '<div class="voice-rank voice-rank-school" id="outscroll-wapper">'+
				                	'<div>'+
				                	    '<em class="voice-playing"></em>'+
				                		'<ol class="voice-rank-ol voice-list-rank">'+
				                		
				                		'</ol>'+
				                        '<div id="outpullUp">'+
				                            '<div class="pullUpLabel">上拉加载更多</div>'+
				                        '</div>'+
				                	'</div>'+
				                '</div>',
        	schoolRinkList : '{@each list as inschool}'+
    	                     '{@if inschool.iscountry == 1 && inschool.teamFlag == 1}'+
        					 '<li>'+
	                			'<a href="javascript:void(0);" class="clear voice-song-a" tid="'+'$${inschool.tid}'+'" userId="'+'$${inschool.userId}'+'" songId="$${inschool.songId}" songmark="song$${inschool.songId}">'+
	                				'{@if inschool.rank == "1"}'+
	                				'<em class="icon-s-1 icon-c iblock fl">1</em>'+
			                        '{@else if  inschool.rank == "2"}'+
			                        '<em class="icon-s-2 icon-c iblock fl">2</em>'+
			                        '{@else if  inschool.rank == "3"}'+
			                        '<em class="icon-s-3 icon-c iblock fl">3</em>'+
			                        '{@else}'+
			                        '<em class="fl font14 voice-rank-num">$${inschool.rank}</em>'+
			                        '{@/if}'+
	                				'<div class="font14 voice-rink-name {@if (inschool.userName || inschool.teamFlag==1)&&inschool.songName}haveName{@/if}">'+
		                				'<p>$${inschool.songName}</p>'+
		                				'<p><span>$${inschool.userName}</span>{@if inschool.teamFlag==1}<em class="icon-origin iblock">校队</em>{@/if}</p>'+
	                				'</div>'+
	                				'<em class="voice-vote clear">'+
		                                '<i class="fl iblock icon-vote"></i>'+
		                                '<i class="voice-vote-num fl font12 color-brown">{@if inschool.newscore == false}0{@else}$${inschool.newscore}{@/if}</i>'+
		                            '</em>'+
		                            '<p class="voice-songInfo">{"songmark":"'+'song$${inschool.songId}'+'","uid":"'+'$${inschool.userId}'+'","school":"'+'$${inschool.schoolName}'+'","artist":"'+'$${inschool.userName}'+'","title":"'+'$${inschool.songName}'+'","mp3":"'+'$${inschool.songUrl}'+'","love":"'+'$${inschool.score}'+'","id":"'+'$${inschool.songId}'+'","origin":"'+'$${inschool.original}'+'","isvote":"'+'$${inschool.canVote}'+'","cover":"'+'{@if inschool.cover!==undefined}$${inschool.songImg}{@else}{@/if}'+'"}</p>'+
	    						'</a>'+
		                    '</li>'+
		                    '{@else if inschool.iscountry == 0}'+
		                    '<li>'+
                                '<a href="javascript:void(0);" class="clear voice-song-a" tid="'+'$${inschool.tid}'+'" userId="'+'$${inschool.userId}'+'" songId="$${inschool.songId}" songmark="song$${inschool.songId}">'+
                                    '{@if inschool.rank == "1"}'+
                                    '<em class="icon-s-1 icon-c iblock fl">1</em>'+
                                    '{@else if  inschool.rank == "2"}'+
                                    '<em class="icon-s-2 icon-c iblock fl">2</em>'+
                                    '{@else if  inschool.rank == "3"}'+
                                    '<em class="icon-s-3 icon-c iblock fl">3</em>'+
                                    '{@else}'+
                                    '<em class="fl font14 voice-rank-num">$${inschool.rank}</em>'+
                                    '{@/if}'+
                                    '<div class="font14 voice-rink-name {@if (inschool.userName || inschool.teamFlag==1)&&inschool.songName}haveName{@/if}">'+
                                        '<p>$${inschool.songName}</p>'+
                                        '<p><span>$${inschool.userName}</span>{@if inschool.teamFlag==1}<em class="icon-origin iblock">校队</em>{@/if}</p>'+
                                    '</div>'+
                                    '<em class="voice-vote clear">'+
                                        '<i class="fl iblock icon-vote"></i>'+
                                        '<i class="voice-vote-num fl font12 color-brown">{@if inschool.newscore == false}0{@else}$${inschool.newscore}{@/if}</i>'+
                                    '</em>'+
                                    '<p class="voice-songInfo">{"songmark":"'+'song$${inschool.songId}'+'","uid":"'+'$${inschool.userId}'+'","school":"'+'$${inschool.schoolName}'+'","artist":"'+'$${inschool.userName}'+'","title":"'+'$${inschool.songName}'+'","mp3":"'+'$${inschool.songUrl}'+'","love":"'+'$${inschool.score}'+'","id":"'+'$${inschool.songId}'+'","origin":"'+'$${inschool.original}'+'","isvote":"'+'$${inschool.canVote}'+'","cover":"'+'{@if inschool.cover!==undefined}$${inschool.songImg}{@else}{@/if}'+'"}</p>'+
                                '</a>'+
                            '</li>'+
		                    '{@/if}'+
	    					'{@/each}',
        	cityRinkList :  '{@each list as outschool}'+
        					'<li>'+
	                			'<a href="javascript:void(0);" class="clear voice-school-a" tid="'+'$${outschool.tid}'+'">'+
	                				'{@if outschool.rank == "1"}'+
	                				'<em class="icon-$${outschool.type}-1 icon-c iblock fl">1</em>'+
			                        '{@else if  outschool.rank == "2"}'+
			                        '<em class="icon-$${outschool.type}-2 icon-c iblock fl">2</em>'+
			                        '{@else if  outschool.rank == "3"}'+
			                        '<em class="icon-$${outschool.type}-3 icon-c iblock fl">3</em>'+
			                        '{@else}'+
			                        '<em class="fl font14 voice-rank-num">$${outschool.rank}</em>'+
			                        '{@/if}'+
	                				'<div class="font14 voice-rink-name"><p class="name">$${outschool.college}</p></div>'+
	                				'<em class="voice-vote clear">'+
		                                '<i class="fl iblock icon-vote"></i>'+
		                                '<i class="voice-vote-num fl font12 color-brown">$${outschool.score}</i>'+
		                            '</em>'+
	            				'</a>'+
	    					'</li>'+
	    					'{@/each}',
        },
        home2 : '<div id="scroll-bar">'+
        '<section class="voice-banner">'+
            '<div class="voice-banner-pic" id="bannerBox">'+
            	//banner图片
            '</div>'+
            '<div class="voice-banner-point">'+
            	//banner张数
            '</div>'+
        '</section>'+
        '<section class="voice-main">'+
            '<div class="voice-user clear">'+
            	'<div class="voice-user-head"><img src="" /></div>'+
            	'<div class="voice-user-info">'+
            		//学校或个人信息
            	'</div>'+
            '</div>'+
            '<div class="voice-rank voice-rank-country">'+
                '<div class="voice-rank-title font18"><a mark="country"><span class="iblock border-orange">全国校园好声音总决赛</span></a></div>'+
                '<ul class="clear voice-group">'+
                  '<li class="fl"><a class="active" href="javascript:void(0);"><span>全国总决赛</span></a></li>'+
                  '<span class="voice-group-bg"><em></em></span>'+
                '</ul>'+
                '<ol class="voice-rank-ol voice-country-ol">'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                        	'<em class="fl font14 voice-rank-num">1</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                        	'<em class="fl font14 voice-rank-num">2</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">3</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">4</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">5</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">6</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">7</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">8</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                '</ol>'+
                '<ol class="voice-country-ol" style="display:none;">'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="icon-g-1 icon-c iblock fl"></em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="icon-g-2 icon-c iblock fl"></em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">3</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">4</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                '</ol>'+
                '<ol class="voice-country-ol" style="display:none;">'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="icon-g-1 icon-c iblock fl"></em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="icon-g-2 icon-c iblock fl"></em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">3</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">4</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                '</ol>'+
                '<ol class="voice-country-ol" style="display:none;">'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="icon-g-1 icon-c iblock fl"></em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="icon-g-2 icon-c iblock fl"></em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">3</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a href="javascript:void(0);" class="clear voice-school-a">'+
                            '<em class="fl font14 voice-rank-num">4</em>'+
                            '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                            '<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
                        '</a>'+
                    '</li>'+
                '</ol>'+
            '</div>'+
            '<div class="voice-rank" style="display:none;">'+
            	'<div class="voice-rank-title font18"><a href="javascript:void(0);" class="voice-school-a voice-title-a"><span class="iblock border-orange">全校排行榜</span><em class="icon-next iblock fr"></em></a></div>'+
            	'<div style="position:relative;">'+
                	'<em class="voice-playing"></em>'+
                	'<ol class="voice-rank-ol voice-list-rank">'+
                		'<li>'+
                			'<a href="javascript:void(0);" class="clear voice-song-a">'+
                				'<em class="icon-s-1 icon-c iblock fl"></em>'+
                				'<div class="font14 voice-schoolr-name"><p></p><p class="font12"><span></span></p></div>'+
                				'<em class="voice-vote clear">'+
	                                '<i class="fl iblock icon-vote"></i>'+
	                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
	                            '</em>'+
	                        '</a>'+
    					'</li>'+
                		'<li>'+
                			'<a href="javascript:void(0);" class="clear voice-song-a">'+
                				'<em class="icon-s-2 icon-c iblock fl"></em>'+
                				'<div class="font14 voice-schoolr-name"><p></p><p class="font12"><span></span></p></div>'+
                				'<em class="voice-vote clear">'+
	                                '<i class="fl iblock icon-vote"></i>'+
	                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
	                            '</em>'+
	                        '</a>'+
    					'</li>'+
                		'<li>'+
                			'<a href="javascript:void(0);" class="clear voice-song-a">'+
                				'<em class="icon-s-3 icon-c iblock fl"></em>'+
                				'<div class="font14 voice-schoolr-name"><p></p><p class="font12"><span></span></p></div>'+
                				'<em class="voice-vote clear">'+
	                                '<i class="fl iblock icon-vote"></i>'+
	                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
	                            '</em>'+
	                        '</a>'+
    					'</li>'+
    					'<li>'+
                			'<a href="javascript:void(0);" class="clear voice-song-a">'+
                				'<em class="fl font14 voice-rank-num">4</em>'+
                				'<div class="font14 voice-schoolr-name"><p></p><p class="font12"><span></span></p></div>'+
                				'<em class="voice-vote clear">'+
	                                '<i class="fl iblock icon-vote"></i>'+
	                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
	                            '</em>'+
	                        '</a>'+
    					'</li>'+
    					'<li>'+
                			'<a href="javascript:void(0);" class="clear voice-song-a">'+
                				'<em class="fl font14 voice-rank-num">5</em>'+
                				'<div class="font14 voice-schoolr-name"><p></p><p class="font12"><span></span></p></div>'+
                				'<em class="voice-vote clear">'+
	                                '<i class="fl iblock icon-vote"></i>'+
	                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
	                            '</em>'+
	                        '</a>'+
    					'</li>'+
                	'</ol>'+
                '</div>'+
            '</div>'+
            '<div class="voice-rank" style="display:none;">'+
            	'<div class="voice-rank-title font18">'+
            		'<a href="javascript:void(0);" class="voice-school-rink voice-school-city" mark="province" areaType="1"><span class="iblock border-blue voice-city-rink">全省排行榜</span><em class="icon-next iblock fr"></em></a>'+
        		'</div>'+
            	'<ol class="voice-rank-ol">'+
            		'<li>'+
            			'<a href="javascript:void(0);" class="clear voice-school-a">'+
            				'<em class="icon-p-1 icon-c iblock fl"></em>'+
            				'<div class="font14 voice-rink-name"><p class="name"></p></div>'+
            				'<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
        				'</a>'+
					'</li>'+
            		'<li>'+
            			'<a href="javascript:void(0);" class="clear voice-school-a">'+
            				'<em class="icon-p-2 icon-c iblock fl"></em>'+
            				'<div class="font14 voice-rink-name"><p class="name"></p></div>'+
            				'<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
        				'</a>'+
					'</li>'+
            		'<li>'+
            			'<a href="javascript:void(0);" class="clear voice-school-a">'+
            				'<em class="icon-p-3 icon-c iblock fl"></em>'+
            				'<div class="font14 voice-rink-name"><p class="name"></p></div>'+
            				'<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
        				'</a>'+
					'</li>'+
					'<li>'+
            			'<a href="javascript:void(0);" class="clear voice-school-a">'+
            				'<em class="fl font14 voice-rank-num">4</em>'+
            				'<div class="font14 voice-rink-name"><p class="name"></p></div>'+
            				'<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
        				'</a>'+
					'</li>'+
					'<li>'+
            			'<a href="javascript:void(0);" class="clear voice-school-a">'+
            				'<em class="fl font14 voice-rank-num">5</em>'+
            				'<div class="font14 voice-rink-name"><p class="name"></p></div>'+
            				'<em class="voice-vote clear">'+
                                '<i class="fl iblock icon-vote"></i>'+
                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
                            '</em>'+
        				'</a>'+
					'</li>'+
            	'</ol>'+
            '</div>'+
        '</section>'+
    '</div>',
        home : '<div id="scroll-bar">'+
	                '<section class="voice-banner">'+
	                    '<div class="voice-banner-pic" id="bannerBox">'+
	                    	//banner图片
	                    '</div>'+
	                    '<div class="voice-banner-point">'+
	                    	//banner张数
	                    '</div>'+
	                '</section>'+
	                '<section class="voice-main">'+
	                    '<div class="voice-user clear">'+
	                    	'<div class="voice-user-head"><img src="" /></div>'+
	                    	'<div class="voice-user-info">'+
	                    		//学校或个人信息
	                    	'</div>'+
	                    '</div>'+
                        '<div class="voice-rank voice-rank-country">'+
                            '<div class="voice-rank-title font18"><a mark="country"><span class="iblock border-orange">全国校园好声音总决赛</span></a></div>'+
                            '<ul class="clear voice-group">'+
                              '<li class="fl"><a class="active" href="javascript:void(0);"><span>全国总决赛</span></a></li>'+
                              '<span class="voice-group-bg"><em></em></span>'+
                            '</ul>'+
                            '<ol class="voice-rank-ol voice-country-ol">'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="icon-g-1 icon-c iblock fl"></em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="icon-g-2 icon-c iblock fl"></em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">3</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">4</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">5</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">6</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">7</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">8</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                            '</ol>'+
                            '<ol class="voice-country-ol" style="display:none;">'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="icon-g-1 icon-c iblock fl"></em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="icon-g-2 icon-c iblock fl"></em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">3</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">4</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                            '</ol>'+
                            '<ol class="voice-country-ol" style="display:none;">'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="icon-g-1 icon-c iblock fl"></em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="icon-g-2 icon-c iblock fl"></em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">3</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">4</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                            '</ol>'+
                            '<ol class="voice-country-ol" style="display:none;">'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="icon-g-1 icon-c iblock fl"></em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="icon-g-2 icon-c iblock fl"></em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">3</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a href="javascript:void(0);" class="clear voice-school-a">'+
                                        '<em class="fl font14 voice-rank-num">4</em>'+
                                        '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
                                        '<em class="voice-vote clear">'+
                                            '<i class="fl iblock icon-vote"></i>'+
                                            '<i class="voice-vote-num fl font12 color-brown"></i>'+
                                        '</em>'+
                                    '</a>'+
                                '</li>'+
                            '</ol>'+
                        '</div>'+
	                    '<div class="voice-rank" style="display:none;">'+
	                    	'<div class="voice-rank-title font18"><a href="javascript:void(0);" class="voice-school-a voice-title-a"><span class="iblock border-orange">全校排行榜</span><em class="icon-next iblock fr"></em></a></div>'+
	                    	'<div style="position:relative;">'+
    	                    	'<em class="voice-playing"></em>'+
    	                    	'<ol class="voice-rank-ol voice-list-rank">'+
    	                    		'<li>'+
    	                    			'<a href="javascript:void(0);" class="clear voice-song-a">'+
    	                    				'<em class="icon-s-1 icon-c iblock fl"></em>'+
    	                    				'<div class="font14 voice-schoolr-name"><p></p><p class="font12"><span></span></p></div>'+
    	                    				'<em class="voice-vote clear">'+
    			                                '<i class="fl iblock icon-vote"></i>'+
    			                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
    			                            '</em>'+
    			                        '</a>'+
    	        					'</li>'+
    	                    		'<li>'+
    	                    			'<a href="javascript:void(0);" class="clear voice-song-a">'+
    	                    				'<em class="icon-s-2 icon-c iblock fl"></em>'+
    	                    				'<div class="font14 voice-schoolr-name"><p></p><p class="font12"><span></span></p></div>'+
    	                    				'<em class="voice-vote clear">'+
    			                                '<i class="fl iblock icon-vote"></i>'+
    			                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
    			                            '</em>'+
    			                        '</a>'+
    	        					'</li>'+
    	                    		'<li>'+
    	                    			'<a href="javascript:void(0);" class="clear voice-song-a">'+
    	                    				'<em class="icon-s-3 icon-c iblock fl"></em>'+
    	                    				'<div class="font14 voice-schoolr-name"><p></p><p class="font12"><span></span></p></div>'+
    	                    				'<em class="voice-vote clear">'+
    			                                '<i class="fl iblock icon-vote"></i>'+
    			                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
    			                            '</em>'+
    			                        '</a>'+
    	        					'</li>'+
    	        					'<li>'+
    	                    			'<a href="javascript:void(0);" class="clear voice-song-a">'+
    	                    				'<em class="fl font14 voice-rank-num">4</em>'+
    	                    				'<div class="font14 voice-schoolr-name"><p></p><p class="font12"><span></span></p></div>'+
    	                    				'<em class="voice-vote clear">'+
    			                                '<i class="fl iblock icon-vote"></i>'+
    			                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
    			                            '</em>'+
    			                        '</a>'+
    	        					'</li>'+
    	        					'<li>'+
    	                    			'<a href="javascript:void(0);" class="clear voice-song-a">'+
    	                    				'<em class="fl font14 voice-rank-num">5</em>'+
    	                    				'<div class="font14 voice-schoolr-name"><p></p><p class="font12"><span></span></p></div>'+
    	                    				'<em class="voice-vote clear">'+
    			                                '<i class="fl iblock icon-vote"></i>'+
    			                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
    			                            '</em>'+
    			                        '</a>'+
    	        					'</li>'+
    	                    	'</ol>'+
                            '</div>'+
	                    '</div>'+
	                    '<div class="voice-rank" style="display:none;">'+
	                    	'<div class="voice-rank-title font18">'+
	                    		'<a href="javascript:void(0);" class="voice-school-rink voice-school-city" mark="province" areaType="1"><span class="iblock border-blue voice-city-rink">全省排行榜</span><em class="icon-next iblock fr"></em></a>'+
	                		'</div>'+
	                    	'<ol class="voice-rank-ol">'+
	                    		'<li>'+
	                    			'<a href="javascript:void(0);" class="clear voice-school-a">'+
	                    				'<em class="icon-p-1 icon-c iblock fl"></em>'+
	                    				'<div class="font14 voice-rink-name"><p class="name"></p></div>'+
	                    				'<em class="voice-vote clear">'+
			                                '<i class="fl iblock icon-vote"></i>'+
			                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
			                            '</em>'+
	                				'</a>'+
	        					'</li>'+
	                    		'<li>'+
	                    			'<a href="javascript:void(0);" class="clear voice-school-a">'+
	                    				'<em class="icon-p-2 icon-c iblock fl"></em>'+
	                    				'<div class="font14 voice-rink-name"><p class="name"></p></div>'+
	                    				'<em class="voice-vote clear">'+
			                                '<i class="fl iblock icon-vote"></i>'+
			                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
			                            '</em>'+
	                				'</a>'+
	        					'</li>'+
	                    		'<li>'+
	                    			'<a href="javascript:void(0);" class="clear voice-school-a">'+
	                    				'<em class="icon-p-3 icon-c iblock fl"></em>'+
	                    				'<div class="font14 voice-rink-name"><p class="name"></p></div>'+
	                    				'<em class="voice-vote clear">'+
			                                '<i class="fl iblock icon-vote"></i>'+
			                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
			                            '</em>'+
	                				'</a>'+
	        					'</li>'+
	        					'<li>'+
	                    			'<a href="javascript:void(0);" class="clear voice-school-a">'+
	                    				'<em class="fl font14 voice-rank-num">4</em>'+
	                    				'<div class="font14 voice-rink-name"><p class="name"></p></div>'+
	                    				'<em class="voice-vote clear">'+
			                                '<i class="fl iblock icon-vote"></i>'+
			                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
			                            '</em>'+
	                				'</a>'+
	        					'</li>'+
	        					'<li>'+
	                    			'<a href="javascript:void(0);" class="clear voice-school-a">'+
	                    				'<em class="fl font14 voice-rank-num">5</em>'+
	                    				'<div class="font14 voice-rink-name"><p class="name"></p></div>'+
	                    				'<em class="voice-vote clear">'+
			                                '<i class="fl iblock icon-vote"></i>'+
			                                '<i class="voice-vote-num fl font12 color-brown"></i>'+
			                            '</em>'+
	                				'</a>'+
	        					'</li>'+
	                    	'</ol>'+
	                    '</div>'+
	                    //区域
	                    // '<div class="voice-rank" style="display:none;">'+
	                    	// '<div class="voice-rank-title font18">'+
	                    		// '<a href="javascript:void(0);" class="voice-school-rink" mark="district" areaType="2"><span class="iblock border-blue voice-city-rink">全区排行榜</span><em class="icon-next iblock fr"></em></a>'+
	                		// '</div>'+
	                    	// '<ol class="voice-rank-ol">'+
	                    		// '<li>'+
	                    			// '<a href="javascript:void(0);" class="clear voice-school-a">'+
	                    				// '<em class="icon-d-1 icon-c iblock fl"></em>'+
	                    				// '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
	                    				// '<em class="voice-vote clear">'+
			                                // '<i class="fl iblock icon-vote"></i>'+
			                                // '<i class="voice-vote-num fl font12 color-brown"></i>'+
			                            // '</em>'+
	                				// '</a>'+
	        					// '</li>'+
	                    		// '<li>'+
	                    			// '<a href="javascript:void(0);" class="clear voice-school-a">'+
	                    				// '<em class="icon-d-2 icon-c iblock fl"></em>'+
	                    				// '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
	                    				// '<em class="voice-vote clear">'+
			                                // '<i class="fl iblock icon-vote"></i>'+
			                                // '<i class="voice-vote-num fl font12 color-brown"></i>'+
			                            // '</em>'+
	                				// '</a>'+
	        					// '</li>'+
	                    		// '<li>'+
	                    			// '<a href="javascript:void(0);" class="clear voice-school-a">'+
	                    				// '<em class="icon-d-3 icon-c iblock fl"></em>'+
	                    				// '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
	                    				// '<em class="voice-vote clear">'+
			                                // '<i class="fl iblock icon-vote"></i>'+
			                                // '<i class="voice-vote-num fl font12 color-brown"></i>'+
			                            // '</em>'+
	                				// '</a>'+
	        					// '</li>'+
	        					// '<li>'+
	                    			// '<a href="javascript:void(0);" class="clear voice-school-a">'+
	                    				// '<em class="fl font14 voice-rank-num">4</em>'+
	                    				// '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
	                    				// '<em class="voice-vote clear">'+
			                                // '<i class="fl iblock icon-vote"></i>'+
			                                // '<i class="voice-vote-num fl font12 color-brown"></i>'+
			                            // '</em>'+
	                				// '</a>'+
	        					// '</li>'+
	        					// '<li>'+
	                    			// '<a href="javascript:void(0);" class="clear voice-school-a">'+
	                    				// '<em class="fl font14 voice-rank-num">5</em>'+
	                    				// '<div class="font14 voice-rink-name"><p class="name"></p></div>'+
	                    				// '<em class="voice-vote clear">'+
			                                // '<i class="fl iblock icon-vote"></i>'+
			                                // '<i class="voice-vote-num fl font12 color-brown"></i>'+
			                            // '</em>'+
	                				// '</a>'+
	        					// '</li>'+
	                    	// '</ol>'+
	                    // '</div>'+
	                '</section>'+
		        '</div>',
    	voice : '<div id="scroll-bar">'+
	                '<section class="voice-banner">'+
	                    '<div class="voice-banner-pic" id="bannerBox">'+
	                    	//banner图片
	                    '</div>'+
	                    '<div class="voice-banner-point">'+
	                    	//banner张数
	                    '</div>'+
	                '</section>'+
	                '<section class="voice-main" id="voice-main">'+
                        '<ul class="voice-main-menu font14 clear">'+
                            '<li type="v-origin" data-page="1"><a class="voice-list active" href="javascript:void(0)"><span>原创</span></a></li>'+
                            '<li type="v-hot" data-page="1"><a class="voice-list" href="javascript:void(0)"><span>人气</span></a></li>'+
                            '<li type="v-new" data-page="1"><a class="voice-list" href="javascript:void(0)"><span>最新</span></a></li>'+
                            '<li type="v-search"><a class="voice-list-search" href="javascript:void(0)"><span>搜索</span></a></li>'+
                            '<span class="voice-menu-bg"><em></em></span>'+
                        '</ul>'+
                        '<div class="voice-scroll-wapper">'+
	                        '<div id="voice-scroll">'+
	                        	'<div>'+
                                    '<div style="position:relative;">'+
                                        '<em class="voice-playing"></em>'+
                                        '<ol class="voice-main-rank font15 voice-main-origin voice-list-rank" data-ranktype="3">'+
                                            //原创
                                        '</ol>'+
                                    '</div>'+
	                        	    '<div style="position:relative;">'+
                                        '<em class="voice-playing"></em>'+
    			                        '<ol class="voice-main-rank font15 voice-main-hot voice-list-rank" data-ranktype="1" style="display:none;">'+
    			                        	//人气
    			                        '</ol>'+
			                        '</div>'+
                                    '<div style="position:relative;">'+
                                        '<em class="voice-playing"></em>'+
    			                        '<ol class="voice-main-rank font15 voice-main-new voice-list-rank" data-ranktype="2" style="display:none;">'+
    			                        	//最新
    			                        '</ol>'+
                                    '</div>'+
                                    '<div style="position:relative;">'+
                                        '<em class="voice-playing"></em>'+
    			                        '<ol class="voice-main-rank font15 voice-main-search voice-list-rank" style="display:none;">'+
    			                        	//搜索
    			                        '</ol>'+
                                    '</div>'+
			                        '<div id="pullUp">'+
			                            '<div class="pullUpLabel">上拉加载更多</div>'+
			                        '</div>'+
	                        	'</div>'+
	                        '</div>'+
                        '</div>'+
                    '</section>'+
	            '</div>',
    }
})();
