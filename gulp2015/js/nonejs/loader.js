define(function(require){
	window.typeList = {
    	pageType : 'school',
    	voice : {listType : 'v-hot'},
    	school : {},
    	pullUpAction : function(){}
    }
    //路由控制
    window.voice = window.voice || {};
    voice.pathname = location.pathname;
    var voiced = /\/voiced(\/|$)/.test(voice.pathname),
    	school = /\/school(\/|$)/.test(voice.pathname);
    if(voiced){
    	//当前页面为声音库
    	typeList.pageType = 'voiced';
    }else{
    	//默认页面为校园榜
    	typeList.pageType = 'school';
    }
    //window.history.pushState('','',voice.pathname + '/' + typeList.pageType + '/' + typeList.voice.listType);
	//组件
    require('juicer');
    require('toucher');
    require('iscroll');
    require('template');
    //功能JS
    //banner
    require('banner');
    require('index');
});
