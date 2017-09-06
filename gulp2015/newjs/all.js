(function(slideFn){
	window.voice = window.voice || {};
	var slide  = slideFn();
	voice.slide = slide.slide;
})(function(){
	var slide = slide || {};
	slide = function(picArray){
		slide.picArray = picArray;
		slideAction(slide.picArray);
	}
	function slideAction(picArray){
		var $pic = $('.voice-banner-pic'),
			$point = $('.voice-banner-point'),
			len = picArray.length;
		var windoWidth = $window.width();
		//渲染
		var list = {picArray:picArray};
		var columnTpl = Tpl.template.Framework.banner;
		var pointTpl = '';
		if(len > 1){
			for(var i = 0; i < len; i++){
				if(i==0){
					pointTpl +='<em class="point fl active"></em>';
				}else{
					pointTpl +='<em class="point fl"></em>';
				}
			}
			$point.html(pointTpl).css('margin-left',-$point.width()/2);
		}
		var htmlpic = juicer(columnTpl,list);
		$pic.html(htmlpic);
		$('.voice-banner-column').width(windoWidth);
		
		//动画
		var index = 0;
		setinterval = setInterval(function() {
            index++;
            if (index > len-1) {
            	index = 0;
            }
            moveFn(index);
        }, 5000);
        function moveFn(index){
        	$pic.stop().animate({
                'left' : -(windoWidth * index)
            });
            $point.children().removeClass('active');
            $point.children().eq(index).addClass('active');
        }
        
        //
        var myTouch = util.toucher(document.getElementById('bannerBox'));
        var $picleft = 0, swipeLeftX, swipeRightX, swipeEndX,moveX,iswipeLeft = false,iswipeRight = false;
        
		myTouch.on('swipeLeft','.voice-banner-column',function(e){
			clearInterval(setinterval);
			iswipeLeft = true;
			swipeLeftX = e.pageX;
		});
		myTouch.on('swipeRight','.voice-banner-column',function(e){
			clearInterval(setinterval);
			iswipeRight = true;
			swipeRightX = e.pageX;
		});
        myTouch.on('swipeEnd','.voice-banner-column',function(e){
        	swipeEndX = e.pageX;
        	if(iswipeLeft){
        		moveX = -(swipeEndX - swipeLeftX);
	        	if(moveX > 10){
	        		index++;
	        	}
	        	if(index > len - 1){
	        		index = len - 1;
	        	}
        		$pic.animate({'left':-windoWidth*index},200);
	            $point.children().removeClass('active');
	            $point.children().eq(index).addClass('active');
        	}else if(iswipeRight){
        		moveX = swipeEndX - iswipeRight;
        		if(moveX > 10){
        			index--;
        		}
        		if(index < 0){
        			index = 0;
        		}
        		$pic.animate({'left':-windoWidth*index},200);
	            $point.children().removeClass('active');
	            $point.children().eq(index).addClass('active');
        	}else{
        		return false;
        	}
        	iswipeLeft = false;
        	iswipeRight = false;
		});
	}
	return {'slide':slide};
});
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-08-03 17:39:06
 * @version $Id$
 */

$(function(){
	$('.choose_div').on('click',function() {
		$('.choose_div').removeClass('choose_div_on');
		$(this).addClass('choose_div_on');
	});
})

/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.5",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.5",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.5",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.5",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.5",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.5",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),
d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.5",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
$(function(){
	
	var redeemLottery = function (){
		$.ajax({
			'url':'/lottery/redeemLottery',
			'type':'post',
			'data':{
					'id':1,	
					},
			'success':function(ndata){
						var ndata= eval("("+ndata+")");
						if (ndata.code==200){
							showAlert(ndata.message+"领取成功" , function(){
								location.href="/ticket/index/show/#djq";
							});
							return true;
						}else if (ndata.code==4){
							showAlert('请登录易班领取' , function(){
								location.href="http://"+BaseUrl+"/login?go="+location.href;
							});
						}else if (ndata.code==5){
							showAlert('您已领取过',function(){
								location.href="/ticket/index/show/#djq";
							});
						}else if (data.code==6){
								 var pop_html = '<div class="draw_pop"></div>'
												$(this).popping({
												"width":300,
												"height":322,
												"title":"",
												"html": pop_html
												
												});
							}else{
							showAlert(ndata.message)
						}
					}
		});
	}
	$("#lotteryBtn").rotate({ 
	   bind: 
		 { 
			click: function(){
					$.ajax({
						'url':'/lottery/getLottery',
						'type':'post',
						'data':{
								'id':1,	
								},
						'success' : function (data){
							var data=eval("("+data+")");
							if (data.code==200){
								var lottery = data.data;
								var lotteryList = {
											'5元代金券':210,
											'8元代金券':270,
											'15元代金券':330,
											'20元代金券':30,
											'50元代金券':90,
											'100元代金券':150,
										};
								var lotteryname = lottery.title;
								if (typeof(eval('lotteryList["'+lotteryname+'"]'))!='undefined'){
									lotteryitem = eval('lotteryList["'+lotteryname+'"]');
									$('#lotteryBtn').stopRotate();
									$("#lotteryBtn").rotate({
										angle:0, 
										duration: 5000, 
										animateTo: lotteryitem+1440, 
										callback:function(){
											showAlert('恭喜您获得'+lotteryname , function(){
												redeemLottery();
											});
										}
									}); 
								}else{
									showAlert('请重试');
								}
							}else if (data.code==3){
								redeemLottery();
							}else if (data.code==5){
								showAlert('您已领取过',function(){
									location.href="/ticket/index/show/#djq";
								});
							}else if (data.code==6){
								 var pop_html = '<div class="draw_pop"></div>'
												$(this).popping({
												"width":300,
												"height":322,
												"title":"",
												"html": pop_html
												
												});
							}else{
								showAlert(data.message);
							}
						}
						
					});
			}
		 } 
	   
	});
	
})// JavaScript Document
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
/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.3",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b="length"in a&&a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;

return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function aa(){return!0}function ba(){return!1}function ca(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ca()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ca()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?aa:ba):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=aa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=aa,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=aa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=ba;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ba),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function da(a){var b=ea.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var ea="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fa=/ jQuery\d+="(?:null|\d+)"/g,ga=new RegExp("<(?:"+ea+")[\\s/>]","i"),ha=/^\s+/,ia=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja=/<([\w:]+)/,ka=/<tbody/i,la=/<|&#?\w+;/,ma=/<(?:script|style|link)/i,na=/checked\s*(?:[^=]|=\s*.checked.)/i,oa=/^$|\/(?:java|ecma)script/i,pa=/^true\/(.*)/,qa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ra={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sa=da(y),ta=sa.appendChild(y.createElement("div"));ra.optgroup=ra.option,ra.tbody=ra.tfoot=ra.colgroup=ra.caption=ra.thead,ra.th=ra.td;function ua(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ua(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function va(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wa(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xa(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function ya(a){var b=pa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function za(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Aa(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Ba(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xa(b).text=a.text,ya(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!ga.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ta.innerHTML=a.outerHTML,ta.removeChild(f=ta.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ua(f),h=ua(a),g=0;null!=(e=h[g]);++g)d[g]&&Ba(e,d[g]);if(b)if(c)for(h=h||ua(a),d=d||ua(f),g=0;null!=(e=h[g]);g++)Aa(e,d[g]);else Aa(a,f);return d=ua(f,"script"),d.length>0&&za(d,!i&&ua(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=da(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(la.test(f)){h=h||o.appendChild(b.createElement("div")),i=(ja.exec(f)||["",""])[1].toLowerCase(),l=ra[i]||ra._default,h.innerHTML=l[1]+f.replace(ia,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&ha.test(f)&&p.push(b.createTextNode(ha.exec(f)[0])),!k.tbody){f="table"!==i||ka.test(f)?"<table>"!==l[1]||ka.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ua(p,"input"),va),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ua(o.appendChild(f),"script"),g&&za(h),c)){e=0;while(f=h[e++])oa.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ua(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&za(ua(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ua(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fa,""):void 0;if(!("string"!=typeof a||ma.test(a)||!k.htmlSerialize&&ga.test(a)||!k.leadingWhitespace&&ha.test(a)||ra[(ja.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ia,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ua(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ua(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&na.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ua(i,"script"),xa),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ua(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,ya),j=0;f>j;j++)d=g[j],oa.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qa,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Ca,Da={};function Ea(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fa(a){var b=y,c=Da[a];return c||(c=Ea(a,b),"none"!==c&&c||(Ca=(Ca||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ca[0].contentWindow||Ca[0].contentDocument).document,b.write(),b.close(),c=Ea(a,b),Ca.detach()),Da[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Ga=/^margin/,Ha=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ia,Ja,Ka=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ia=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Ha.test(g)&&Ga.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ia=function(a){return a.currentStyle},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ha.test(g)&&!Ka.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function La(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ma=/alpha\([^)]*\)/i,Na=/opacity\s*=\s*([^)]*)/,Oa=/^(none|table(?!-c[ea]).+)/,Pa=new RegExp("^("+S+")(.*)$","i"),Qa=new RegExp("^([+-])=("+S+")","i"),Ra={position:"absolute",visibility:"hidden",display:"block"},Sa={letterSpacing:"0",fontWeight:"400"},Ta=["Webkit","O","Moz","ms"];function Ua(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ta.length;while(e--)if(b=Ta[e]+c,b in a)return b;return d}function Va(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fa(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wa(a,b,c){var d=Pa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Ya(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ia(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Ja(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ha.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xa(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ja(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ua(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qa.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ua(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Ja(a,b,d)),"normal"===f&&b in Sa&&(f=Sa[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Oa.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Ra,function(){return Ya(a,b,d)}):Ya(a,b,d):void 0},set:function(a,c,d){var e=d&&Ia(a);return Wa(a,c,d?Xa(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Na.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Ma,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Ma.test(f)?f.replace(Ma,e):f+" "+e)}}),m.cssHooks.marginRight=La(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Ja,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Ga.test(a)||(m.cssHooks[a+b].set=Wa)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ia(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Va(this,!0)},hide:function(){return Va(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Za(a,b,c,d,e){
return new Za.prototype.init(a,b,c,d,e)}m.Tween=Za,Za.prototype={constructor:Za,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Za.propHooks[this.prop];return a&&a.get?a.get(this):Za.propHooks._default.get(this)},run:function(a){var b,c=Za.propHooks[this.prop];return this.options.duration?this.pos=b=m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Za.propHooks._default.set(this),this}},Za.prototype.init.prototype=Za.prototype,Za.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Za.propHooks.scrollTop=Za.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Za.prototype.init,m.fx.step={};var $a,_a,ab=/^(?:toggle|show|hide)$/,bb=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cb=/queueHooks$/,db=[ib],eb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bb.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bb.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fb(){return setTimeout(function(){$a=void 0}),$a=m.now()}function gb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hb(a,b,c){for(var d,e=(eb[b]||[]).concat(eb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fa(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fa(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ab.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fa(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hb(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=db.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$a||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$a||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);g>f;f++)if(d=db[f].call(j,a,k,j.opts))return d;return m.map(k,hb,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kb,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],eb[c]=eb[c]||[],eb[c].unshift(b)},prefilter:function(a,b){b?db.unshift(a):db.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kb(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),m.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($a=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$a=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_a||(_a=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_a),_a=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lb=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lb,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mb,nb,ob=m.expr.attrHandle,pb=/^(?:checked|selected)$/i,qb=k.getSetAttribute,rb=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nb:mb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rb&&qb||!pb.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qb?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nb={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rb&&qb||!pb.test(c)?a.setAttribute(!qb&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ob[b]||m.find.attr;ob[b]=rb&&qb||!pb.test(b)?function(a,b,d){var e,f;return d||(f=ob[b],ob[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,ob[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rb&&qb||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mb&&mb.set(a,b,c)}}),qb||(mb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},ob.id=ob.name=ob.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mb.set},m.attrHooks.contenteditable={set:function(a,b,c){mb.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sb=/^(?:input|select|textarea|button|object)$/i,tb=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sb.test(a.nodeName)||tb.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var ub=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vb=m.now(),wb=/\?/,xb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yb,zb,Ab=/#.*$/,Bb=/([?&])_=[^&]*/,Cb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Db=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Eb=/^(?:GET|HEAD)$/,Fb=/^\/\//,Gb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hb={},Ib={},Jb="*/".concat("*");try{zb=location.href}catch(Kb){zb=y.createElement("a"),zb.href="",zb=zb.href}yb=Gb.exec(zb.toLowerCase())||[];function Lb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mb(a,b,c,d){var e={},f=a===Ib;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nb(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Ob(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zb,type:"GET",isLocal:Db.test(yb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nb(Nb(a,m.ajaxSettings),b):Nb(m.ajaxSettings,a)},ajaxPrefilter:Lb(Hb),ajaxTransport:Lb(Ib),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cb.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zb)+"").replace(Ab,"").replace(Fb,yb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gb.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yb[1]&&c[2]===yb[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yb[3]||("http:"===yb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mb(Hb,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Eb.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wb.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bb.test(e)?e.replace(Bb,"$1_="+vb++):e+(wb.test(e)?"&":"?")+"_="+vb++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jb+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mb(Ib,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Ob(k,v,c)),u=Pb(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qb=/%20/g,Rb=/\[\]$/,Sb=/\r?\n/g,Tb=/^(?:submit|button|image|reset|file)$/i,Ub=/^(?:input|select|textarea|keygen)/i;function Vb(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rb.test(a)?d(a,e):Vb(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vb(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vb(c,a[c],b,e);return d.join("&").replace(Qb,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Ub.test(this.nodeName)&&!Tb.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sb,"\r\n")}}):{name:b.name,value:c.replace(Sb,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zb()||$b()}:Zb;var Wb=0,Xb={},Yb=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xb)Xb[a](void 0,!0)}),k.cors=!!Yb&&"withCredentials"in Yb,Yb=k.ajax=!!Yb,Yb&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xb[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xb[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zb(){try{return new a.XMLHttpRequest}catch(b){}}function $b(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _b=[],ac=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_b.pop()||m.expando+"_"+vb++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ac.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ac.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ac,"$1"+e):b.jsonp!==!1&&(b.url+=(wb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_b.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bc=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bc)return bc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cc=a.document.documentElement;function dc(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cc;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cc})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=La(k.pixelPosition,function(a,c){return c?(c=Ja(a,b),Ha.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ec=a.jQuery,fc=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fc),b&&a.jQuery===m&&(a.jQuery=ec),m},typeof b===K&&(a.jQuery=a.$=m),m});

/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

// VERSION: 2.2 LAST UPDATE: 13.03.2012
/* 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * 
 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
 * Website: http://code.google.com/p/jqueryrotate/ 
 */

// Documentation removed from script file (was kinda useless and outdated)

(function($) {
var supportedCSS,styles=document.getElementsByTagName("head")[0].style,toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
for (var a=0;a<toCheck.length;a++) if (styles[toCheck[a]] !== undefined) supportedCSS = toCheck[a];
// Bad eval to preven google closure to remove it from code o_O
// After compresion replace it back to var IE = 'v' == '\v'
var IE = eval('"v"=="\v"');

jQuery.fn.extend({
    rotate:function(parameters)
    {
        if (this.length===0||typeof parameters=="undefined") return;
            if (typeof parameters=="number") parameters={angle:parameters};
        var returned=[];
        for (var i=0,i0=this.length;i<i0;i++)
            {
                var element=this.get(i);	
                if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {

                    var paramClone = $.extend(true, {}, parameters); 
                    var newRotObject = new Wilq32.PhotoEffect(element,paramClone)._rootObj;

                    returned.push($(newRotObject));
                }
                else {
                    element.Wilq32.PhotoEffect._handleRotation(parameters);
                }
            }
            return returned;
    },
    getRotateAngle: function(){
        var ret = [];
        for (var i=0,i0=this.length;i<i0;i++)
            {
                var element=this.get(i);	
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    ret[i] = element.Wilq32.PhotoEffect._angle;
                }
            }
            return ret;
    },
    stopRotate: function(){
        for (var i=0,i0=this.length;i<i0;i++)
            {
                var element=this.get(i);	
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    clearTimeout(element.Wilq32.PhotoEffect._timer);
                }
            }
    }
});

// Library agnostic interface

Wilq32=window.Wilq32||{};
Wilq32.PhotoEffect=(function(){

	if (supportedCSS) {
		return function(img,parameters){
			img.Wilq32 = {
				PhotoEffect: this
			};
            
            this._img = this._rootObj = this._eventObj = img;
            this._handleRotation(parameters);
		}
	} else {
		return function(img,parameters) {
			// Make sure that class and id are also copied - just in case you would like to refeer to an newly created object
            this._img = img;

			this._rootObj=document.createElement('span');
			this._rootObj.style.display="inline-block";
			this._rootObj.Wilq32 = 
				{
					PhotoEffect: this
				};
			img.parentNode.insertBefore(this._rootObj,img);
			
			if (img.complete) {
				this._Loader(parameters);
			} else {
				var self=this;
				// TODO: Remove jQuery dependency
				jQuery(this._img).bind("load", function()
				{
					self._Loader(parameters);
				});
			}
		}
	}
})();

Wilq32.PhotoEffect.prototype={
    _setupParameters : function (parameters){
		this._parameters = this._parameters || {};
        if (typeof this._angle !== "number") this._angle = 0 ;
        if (typeof parameters.angle==="number") this._angle = parameters.angle;
        this._parameters.animateTo = (typeof parameters.animateTo==="number") ? (parameters.animateTo) : (this._angle); 

        this._parameters.step = parameters.step || this._parameters.step || null;
		this._parameters.easing = parameters.easing || this._parameters.easing || function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b; }
		this._parameters.duration = parameters.duration || this._parameters.duration || 1000;
        this._parameters.callback = parameters.callback || this._parameters.callback || function(){};
        if (parameters.bind && parameters.bind != this._parameters.bind) this._BindEvents(parameters.bind); 
	},
	_handleRotation : function(parameters){
          this._setupParameters(parameters);
          if (this._angle==this._parameters.animateTo) {
              this._rotate(this._angle);
          }
          else { 
              this._animateStart();          
          }
	},

	_BindEvents:function(events){
		if (events && this._eventObj) 
		{
            // Unbinding previous Events
            if (this._parameters.bind){
                var oldEvents = this._parameters.bind;
                for (var a in oldEvents) if (oldEvents.hasOwnProperty(a)) 
                        // TODO: Remove jQuery dependency
                        jQuery(this._eventObj).unbind(a,oldEvents[a]);
            }

            this._parameters.bind = events;
			for (var a in events) if (events.hasOwnProperty(a)) 
				// TODO: Remove jQuery dependency
					jQuery(this._eventObj).bind(a,events[a]);
		}
	},

	_Loader:(function()
	{
		if (IE)
		return function(parameters)
		{
			var width=this._img.width;
			var height=this._img.height;
			this._img.parentNode.removeChild(this._img);
							
			this._vimage = this.createVMLNode('image');
			this._vimage.src=this._img.src;
			this._vimage.style.height=height+"px";
			this._vimage.style.width=width+"px";
			this._vimage.style.position="absolute"; // FIXES IE PROBLEM - its only rendered if its on absolute position!
			this._vimage.style.top = "0px";
			this._vimage.style.left = "0px";

			/* Group minifying a small 1px precision problem when rotating object */
			this._container =  this.createVMLNode('group');
			this._container.style.width=width;
			this._container.style.height=height;
			this._container.style.position="absolute";
			this._container.setAttribute('coordsize',width-1+','+(height-1)); // This -1, -1 trying to fix ugly problem with small displacement on IE
			this._container.appendChild(this._vimage);
			
			this._rootObj.appendChild(this._container);
			this._rootObj.style.position="relative"; // FIXES IE PROBLEM
			this._rootObj.style.width=width+"px";
			this._rootObj.style.height=height+"px";
			this._rootObj.setAttribute('id',this._img.getAttribute('id'));
			this._rootObj.className=this._img.className;			
		    this._eventObj = this._rootObj;	
		    this._handleRotation(parameters);	
		}
		else
		return function (parameters)
		{
			this._rootObj.setAttribute('id',this._img.getAttribute('id'));
			this._rootObj.className=this._img.className;
			
			this._width=this._img.width;
			this._height=this._img.height;
			this._widthHalf=this._width/2; // used for optimisation
			this._heightHalf=this._height/2;// used for optimisation
			
			var _widthMax=Math.sqrt((this._height)*(this._height) + (this._width) * (this._width));

			this._widthAdd = _widthMax - this._width;
			this._heightAdd = _widthMax - this._height;	// widthMax because maxWidth=maxHeight
			this._widthAddHalf=this._widthAdd/2; // used for optimisation
			this._heightAddHalf=this._heightAdd/2;// used for optimisation
			
			this._img.parentNode.removeChild(this._img);	
			
			this._aspectW = ((parseInt(this._img.style.width,10)) || this._width)/this._img.width;
			this._aspectH = ((parseInt(this._img.style.height,10)) || this._height)/this._img.height;
			
			this._canvas=document.createElement('canvas');
			this._canvas.setAttribute('width',this._width);
			this._canvas.style.position="relative";
			this._canvas.style.left = -this._widthAddHalf + "px";
			this._canvas.style.top = -this._heightAddHalf + "px";
			this._canvas.Wilq32 = this._rootObj.Wilq32;
			
			this._rootObj.appendChild(this._canvas);
			this._rootObj.style.width=this._width+"px";
			this._rootObj.style.height=this._height+"px";
            this._eventObj = this._canvas;
			
			this._cnv=this._canvas.getContext('2d');
            this._handleRotation(parameters);
		}
	})(),

	_animateStart:function()
	{	
		if (this._timer) {
			clearTimeout(this._timer);
		}
		this._animateStartTime = +new Date;
		this._animateStartAngle = this._angle;
		this._animate();
	},
    _animate:function()
    {
         var actualTime = +new Date;
         var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;

         // TODO: Bug for animatedGif for static rotation ? (to test)
         if (checkEnd && !this._parameters.animatedGif) 
         {
             clearTimeout(this._timer);
         }
         else 
         {
             if (this._canvas||this._vimage||this._img) {
                 var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                 this._rotate((~~(angle*10))/10);
             }
             if (this._parameters.step) {
                this._parameters.step(this._angle);
             }
             var self = this;
             this._timer = setTimeout(function()
                     {
                     self._animate.call(self);
                     }, 10);
         }

         // To fix Bug that prevents using recursive function in callback I moved this function to back
         if (this._parameters.callback && checkEnd){
             this._angle = this._parameters.animateTo;
             this._rotate(this._angle);
             this._parameters.callback.call(this._rootObj);
         }
     },

	_rotate : (function()
	{
		var rad = Math.PI/180;
		if (IE)
		return function(angle)
		{
            this._angle = angle;
			this._container.style.rotation=(angle%360)+"deg";
		}
		else if (supportedCSS)
		return function(angle){
            this._angle = angle;
			this._img.style[supportedCSS]="rotate("+(angle%360)+"deg)";
		}
		else 
		return function(angle)
		{
            this._angle = angle;
			angle=(angle%360)* rad;
			// clear canvas	
			this._canvas.width = this._width+this._widthAdd;
			this._canvas.height = this._height+this._heightAdd;
						
			// REMEMBER: all drawings are read from backwards.. so first function is translate, then rotate, then translate, translate..
			this._cnv.translate(this._widthAddHalf,this._heightAddHalf);	// at least center image on screen
			this._cnv.translate(this._widthHalf,this._heightHalf);			// we move image back to its orginal 
			this._cnv.rotate(angle);										// rotate image
			this._cnv.translate(-this._widthHalf,-this._heightHalf);		// move image to its center, so we can rotate around its center
			this._cnv.scale(this._aspectW,this._aspectH); // SCALE - if needed ;)
			this._cnv.drawImage(this._img, 0, 0);							// First - we draw image
		}

	})()
}

if (IE)
{
Wilq32.PhotoEffect.prototype.createVMLNode=(function(){
document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
		try {
			!document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
			return function (tagName) {
				return document.createElement('<rvml:' + tagName + ' class="rvml">');
			};
		} catch (e) {
			return function (tagName) {
				return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
			};
		}		
})();
}

})(jQuery);

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

/**
 * 
 * @authors TianZhihan (tzh@yiban.cn)
 * @date    2015-10-12 9:31:00
 * @version $Id$
 */
$(function(){
	$('.detail_up').hide();
$('.detail_down').click(function(){
var detail_words = $(".detail_words");
    curheight = detail_words.height();
    autoheight = detail_words.css("height","auto").height();
detail_words.height(curheight).animate({height:autoheight},300);
$('.detail_down').hide();$('.detail_up').show();
	});

$('.detail_up').click(function(){
$(".detail_words").animate({"height":"90px"});
$('.detail_down').show();$('.detail_up').hide();
	});

//home mine foot
 $(window).scroll(function () {
   if($(document).height() > $(window).height()){
    if ($(document).scrollTop() + $(window).height() >= $(document).height()){
    	$(".foot_info").fadeOut(); }else{$(".foot_info").fadeIn();}
     }

 if($(document).height() <= $(window).height()){
 $(".list_block .foot_black").css("display","block");$(".foot_info").fadeIn();
}


}); //$(".foot_black").hide();
//homelist
function scrollhome(sbox,left,right,img,speed,out){
var left = $(left);
var right = $(right); 
var sbox = $(sbox);	  
var img = $(img).find('ul');
wid=207;
window.onresize = window.onload = function(){
var boxw = $(".home_kv").width();	

$(".t-ul li,.t-ul li img").width(boxw); 
$(".t-ul").width(boxw);
$(".t-ul li a img").width(boxw);
wid = img.find('li').outerWidth(true);
var himg = $(".t-ul ul>li").height();
$(".t-ul").height(himg);
if($(".detail_block").height() <= $(window).height()){$(".list_block .foot_black").css("display","block");$(".foot_info").fadeIn();}

}

	  var sp = speed;
	  left.click(function(){
			img.animate({'margin-left':-wid},function()
					  {img.find('li').eq(0).appendTo(img);
					   img.css({'margin-left':0});
					   });

			});
	  right.click(function(){
			img.find('li:last').prependTo(img);
			img.css({'margin-left':-wid});
			img.animate({'margin-left':0});
			});
var topimg = $(".t-ul li").length;
//alert(topimg);
	if(topimg <= 1 ){$(".btn_pre,.btn_next").css("display","none"); }
if(topimg >=2 ){	  
	$(".t-ul").touchSlider({
		flexible : true,
		speed : 300,
		btn_prev : $(".btn_pre"),
        btn_next : $(".btn_next"),        
        paging : $(".home_dot a"),
	 	counter : function (e){
		 	$(".home_dot a").removeClass("on").eq(e.current-1).addClass("on");
	 	}
	});
}
	  if(topimg >=2 && out == true)
	  {ad = setInterval(function(){ left.click();},sp*1000); // right  
	   sbox.hover(function(){clearInterval(ad);},function(){ad = setInterval(function(){ left.click();},sp*1000);}); 

	$(".t-ul").bind("touchstart",function(){
		clearInterval(ad);
	}).bind("touchend", function(){
		ad = setInterval(function(){ left.click();},sp*1000);
	});
	  }
	 }

scrollhome(".home_kv",".btn_pre",".btn_next",".t-ul",4,true);

});
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

$(function(){
	celebration.popusecon($(".voucher_use"));
  celebration.poplivcon($(".voucher_liv"));
})
var celebration=celebration||{};
var up=up||{};
(function(f){
  var popusecon = function(oEvt){
    oEvt.bind("click",function(){ 
        
                            
//弹出 没有代金券 
function noVoucher(){
 var login1 = '<div class="m_con">\
                    <div class="m_header">没有可用的代金券</div>\
                    <a href="javascript:;" class="m_use_btn">确&nbsp;&nbsp;认</a>\
                  </div>'
      $(this).popping({
        "width":300,
        "height":200,
        "title":"",
        "html": login1,
        'callback':function(m_mpop_u){
            var m_flag = true;
            if (m_flag == true) {
              $('.m_use_btn').click(function() {
                m_mpop_u.close()
              });
            }
          
        }
      });
      }
//end


  function pleaseLogin(msg){
        var html = '<div class="m_con">\
      <div class="m_header">'+msg+'</div>\
      <a href="javascript:;" class="m_active_btn m_active_btn_1">确&nbsp;&nbsp;定</a>\
      </div>'
         //m_mpop_l.close()
       $(this).popping({
          "width":300,
          "height":200,
          "title":"",
          "html": html,
          'callback':function(m_mpop_n){
              $('.m_active_btn_1').click(function() {
                m_mpop_n.close();
              })
          }
        })
                    
        }
        var order_id = $("#order_id").val();
        $.ajax({
                   type:'post',
                   url:'/ticket/ajax/myVoucher',
                   data:{order_id:order_id},
                   dataType:"text",
                   success:function(rs){ 
                           var data = eval("("+rs+")");
                           if(data.code == 11){
                                pleaseLogin('请登录');      
                                return false;
                           } else if(data.code == 12){
                               pleaseLogin('参数有误');  
                               return false;
                          }else if(data.code == 13){
                               pleaseLogin('没有可用的代金券');  
                               return false;
                          }
                      
                       if(data.msg=='no'){
                           noVoucher();
                           return false;
                       }
                       var r = eval("(" + rs + ")");
                       var ht1 = '<div class="m_con">\
                                  <div class="m_header_v">选择代金券</div>\
                                ';
                       for(var i in r){
                           ht1+='<div class="m_input_wrap_v"><label for=""><input type="radio" name="voucher" class="m_radio" value="'+r[i].id+'"/>'+r[i].name+'&nbsp;&nbsp;'+r[i].price+'元</label></div>\
                           ';
                       }
                    ht1 += ' <a href="javascript:;" class="m_use_btn">使&nbsp;&nbsp;用</a></div> ';
                      $(this).popping({
                        "width":300,
                        "height":400,
                        "title":"",
                        "html": ht1,
                        'callback':function(m_mpop_u){
                              var m_flag = true;
                              $('.m_use_btn').click(function() {
                                   var voucher = $("input[name='voucher']:checked").val();
                                   var order_num = $("#orderNum").val();
                                   if(!voucher){return false;}
                                   //去扣减
                                   $.ajax({
                                       type:"POST",
                                       url:"/ticket/ajax/usevoucher",
                                       dataType:"text",
                                       data:{UserVoucher_id:voucher,orderNum:order_num},
                                       success:function(data){
                                           var data = eval('('+data+')');
                                           if(data.code==200){
                                               $("#voucher_flag").val("voucher_on");
                                               $("#uvid").val(data.uvid);
                                               var i = parseFloat($('#cp_flag').html());
                                               var p = parseFloat(data.price);
                                               var new_price = (i*100-p*100)/100;
                                               var new_pricenum = new_price.toFixed(2);
                                               if(i<p){
                                                   $('#cp_flag').html(0+'元');
                                               }else{
                                                   $('#cp_flag').html(new_pricenum+'元');
                                               }
                                               $("#voucher_html").hide();
                                               m_mpop_u.close();
                                               location.reload(true); 
                                           }else{
                                               noVoucher();
                                             // $('.m_header').html('对不起没有可用代金券'); 
                                           }
                                       }
                                   });                                   
                                   //if (m_flag == true) {
                                       //m_mpop_u.close()
                                    //}else{
                                      // $('.m_header').html('对不起没有可用代金券');
                                    // }
                              });

                            function m_pop_style(){
                              $('.m_input_wrap').hide();
                              $('.m_header').addClass('m_header_margin');
                            }
                        }
                      });                                                        
                   },
                   error:function(data){
                       var data = eval('('+data+')');                       
                   }
               });
    });
  }
  f.popusecon = popusecon;
  var poplivcon = function(oEvt){
    oEvt.bind("click",function(){
        
       
        function pleaseLogin(){
        var html = '<div class="m_con">\
      <div class="m_header">请先登录</div>\
      <a href="javascript:;" class="m_active_btn m_active_btn_5">确&nbsp;&nbsp;定</a>\
      </div>'
         //m_mpop_l.close()
       $(this).popping({
          "width":300,
          "height":200,
          "title":"",
          "html": html,
          'callback':function(m_mpop_n){
              $('.m_active_btn_5').click(function() {
                m_mpop_n.close();
              })
          }
        })
                    
        }
        
         var login_id = $("#login_id").val();
         if(login_id == 0){
            pleaseLogin(); 
            return false;
         }
         
       
      var html1 = '<div class="m_con">\
                    <div class="m_header">请输入代金券激活码</div>\
                    <div class="m_input_wrap"><input type="text" name="activeCode" id="activeCode" class="m_input" /></div>\
                    <a href="javascript:;" class="m_active_btn">激&nbsp;&nbsp;活</a>\
                  </div>'
      var html2 = '<div class="m_con">\
      <div class="m_header">恭喜您激活成功</div>\
      <a href="javascript:;" class="m_active_btn m_active_btn_1">确&nbsp;&nbsp;定</a>\
      </div>'
      var html3 = '<div class="m_con">\
      <div class="m_header">对不起激活码错误</div>\
      <a href="javascript:;" class="m_active_btn m_active_btn_2">确&nbsp;&nbsp;定</a>\
      </div>'
      var html4 = '<div class="m_con">\
          <div class="m_header">每个人一种抵用券只能激活一次</div>\
          <a href="javascript:;" class="m_active_btn m_active_btn_2">确&nbsp;&nbsp;定</a>\
          </div>'
      $(this).popping({
        "width":300,
        "height":200,
        "title":"",
        "html": html1,
        'callback':function(m_mpop_l){
          $('.m_active_btn').click(function() {
              
               var code = $('#activeCode').val().trim();
               var m_flag=false;
               $.ajax({
                   type:'post',
                   url:'/ticket/ajax/checkcode',
                   data:{code:code},
                   dataType:"text",
                    success:function(r){  
                        var rs = eval('('+r+')');
                            if(rs.code==505){
                                    getrepeat();
                            }else if(rs.code==200){
                                    getok();
                            }else{
                                    getfail() ;
                            }
                            return ;

                       },
                   error:function(XMLResponse){
                      
                   }
               });
               
               
               function getok(){
                    m_mpop_l.close()
                 $(this).popping({
                      "width":300,
                      "height":300,
                      "title":"",
                      "html": html2,
                      'callback':function(m_mpop_m){
                          $('.m_active_btn_1').click(function() {
                             $('.m_header').addClass('m_header_margin');
                            m_mpop_m.close()
                          })
                      }
                    })
               }
               
               function getfail(){
                     m_mpop_l.close()
               $(this).popping({
                      "width":300,
                      "height":200,
                      "title":"",
                      "html": html3,
                      'callback':function(m_mpop_n){
                          $('.m_active_btn_2').click(function() {
                            m_mpop_n.close()
                          })
                      }
                    })
               }
               
               function getrepeat(){
                     m_mpop_l.close()
               $(this).popping({
                      "width":300,
                      "height":200,
                      "title":"",
                      "html": html4,
                      'callback':function(m_mpop_n){
                          $('.m_active_btn_2').click(function() {
                            m_mpop_n.close()
                          })
                      }
                    })
               }
               
              
            
            
            function m_pop_style(){
              $('.m_input_wrap').hide();
              $('.m_header').addClass('m_header_margin');
            }
          });
        }
      });
    });
  }
  f.poplivcon = poplivcon;

})(celebration);


;(function($,window){
	$.Popping = function(options,element){
		this.$ele = $(element);
		this._init(options);
	}
	$.Popping.defaults={
		"height": 228,
		"width": 514
	}
	$.Popping.prototype={
		_init:function(options){
			var _this = this;
			this.options = $.extend(true,{},$.Popping.defaults,options);
			if($(".popup").length){
				setTimeout(function(){
					_this._creatpopping();
				},560);
			}else{
				this._creatpopping();
			}
		},
		_creatpopping:function(){
			var _this = this;
			if($(".popup").length==0){
				var h = (this.options.height)?(this.options.height+'px'):'100%';
				var isdream='',htmlobj;
				if(typeof this.options.isdream!=="undefined"){
					isdream=this.options.isdream;
				}
				var html='<div class="popupdiv"></div><div class="popupBox"><div class="popup '+isdream+'" style="width:'+this.options.width+'px;"><div id="close"></div>';
				if(typeof this.options.isdream=="undefined"){
					html += '<div class="title">'+this.options.title+'</div>';
				}
				html += '<div class="con" style="width:'+this.options.width+'px;height:'+h+'">';
				html += this.options.html;
				html += '</div></div>';
				var htmlobj = $(html);
				$("body").append(htmlobj);
				
				function fix(){
			        var b_width=document.documentElement.clientWidth,
			            b_height= document.documentElement.clientHeight;
			        var scrollLeft=$(window).scrollLeft(),
			            scrollTop=$(window).scrollTop();
			        var left,right,_left,_right;
			        return{
			            _width:b_width,   //可见宽
			            _height:b_height,    //可见高
			            left_box : b_width/2+scrollLeft,
			            top_box:b_height/2+scrollTop,
			            left:scrollLeft,
			            top:scrollTop
			        }
			    }
				$(".popupdiv,.popupBox").css({
					"height":fix()._height,
					"width":fix()._width,
					"top":fix().top,
					"left":fix().left
				});
				$(".popup").css({
					"top":(fix()._height-$(".popup").height())/2,
                	"left":(fix()._width-$(".popup").width())/2
				});
				$(".popup").css({
					"-webkit-transform": "rotateY(0deg)",
					"-moz-transform": "rotateY(0deg)",
					"-o-transform": "rotateY(0deg)",
					"-ms-transform": "rotateY(0deg)",
					"transform": "rotateY(0deg)",
					"opacity": 1
				})
				
				
				$(window).on("scroll resize",function(){
					$(".popupdiv,.popupBox").css({
						"height":fix()._height,
						"width":fix()._width,
						"top":fix().top,
						"left":fix().left
					})
					$(".popup").css({
						"top":(fix()._height-$(".popup").height())/2,
                		"left":(fix()._width-$(".popup").width())/2
					})
				})
				$(".popup #close").click(function(){					
					_this.close();
				})
				if(typeof _this.options.callback=="function"){
					_this.options.callback(_this,htmlobj);
				}
				
			}
		},
		close:function(){
			$(".popup").css({
				"-webkit-transform": "rotateY(180deg)",
				"-moz-transform": "rotateY(180deg)",
				"-o-transform": "rotateY(180deg)",
				"-ms-transform": "rotateY(180deg)",
				"transform": "rotateY(180deg)",
				"opacity": 0
			})
			setTimeout(function(){
				$(".popupdiv,.popupBox").remove();
			},560)
			//location.reload()
		}
	}
	$.fn.popping=function(options){
		var instance = $(this).data("popping");
		if(typeof options==='string'){
			
		}else{
			this.each(function(){
				if(instance){
					instance._init(options);
				}else{
					instance=$(this).data("popping",new $.Popping(options,this))
				}
			})
		}
		return instance;
	}
})(jQuery,window);


$(function(){
	celebration.popstaruse($(".mystar_use"));
  rat1('star1','result1',2);
  rat2('star2','result2',2);
})

var celebration=celebration||{};
var up=up||{};

(function(t){
  var popstaruse = function(oStar){
    oStar.bind("click",function(){
      var html1 =  '<div class="m_con">\
                    <div class="m_header">评分</div>\
                    <div class="m_input_wrap"> <div id="star3" data-score="0" ></div><div id="result3"></div> <input type="hidden" name="score" >   </div>\
                    <a href="javascript:;" class="m_active_btn">确&nbsp;&nbsp;定</a>\
                    </div>'
      $(this).popping({
        "width":300,
        "height":200,
        "title":"",
        "html": html1,
	'callback':function(m_mpop_u){
                $('.m_active_btn').click(function() {
                    
                              
          var score = $("#star3").data('score');
          var pid = $('#pid').val();
          $.ajax({
              type:"post",
              url:"/ticket/ajax/setscore/",
              dataType:"text",
              data:{score:score*2,pid:pid},
              success:function(r){
                  if(r=="expired"){ 
                      alert('会话过期');
                  }else{
                      m_mpop_u.close();
                      location.reload(true);
                  }
                 
              },
              error:function(XMLResponse){
                     m_mpop_u.close();
                     location.reload(true);
              }
          });
          
          
                   
              });
          
        }
      });

      rat3('star3','result3',2);

//alert($("#star3").attr('data-score'));



      //$('.m_active_btn').click(function() {

//
//      });

    });
  }
  t.popstaruse = popstaruse;

})(celebration);


function rat3(star3,result3,m3){
  star3= '#' + star3;
  result3= '#' + result3;
  $(result3).hide();//将结果DIV隐藏
  $(star3).raty({
    score: function(){return $("#star3").attr('data-score'); },
    hints: ['bad','good','nice','great','perfect'],
    path: "../../../../../../public/images/mobile", //css/img
    number:5,
    starOff: 'star-off-big.png', //star-off-big.png
    starOn: 'star-on-big.png', //star-on-big.png
    starHalf : 'star-half-big.png',
    size:25,
    start:10,
    showHalf: true,
    target: result3,
    targetKeep : true,//targetKeep 属性设置为true，用户的选择值才会被保持在目标DIV中，否则只是鼠标悬停时有值，而鼠标离开后这个值就会消失
    click: function (score, evt) {
      $("#star3").attr('data-score',score);
       
      //第一种方式：直接取值
    //  alert('你的评分是'+score*m3+'分');
    }
  });
}
function rat1(star1,result1,m1){
  star1= '#' + star1;
  result1= '#' + result1;
  $(result1).hide();//将结果DIV隐藏
  $(star1).raty({
    score: function(){return $("#star1").attr('data-score'); },
    hints: ['bad','good','nice','great','perfect'],
    path: "../../../../../../public/images/mobile", //css/img
readOnly: true, 
    //score: 4, //只读 4颗星星
    number:5,
    starOff: 'star-off.png', //star-off-big.png
    starOn: 'star-on.png', //star-on-big.png
    starHalf : 'star-half.png',
    size:20,
    start:10,
    showHalf: true,
    target: result1,
    targetKeep : true,//targetKeep 属性设置为true，用户的选择值才会被保持在目标DIV中，否则只是鼠标悬停时有值，而鼠标离开后这个值就会消失
    click: function (score, evt) {
   // $("#star1").attr('data-score',score);      
      //第一种方式：直接取值
    //  alert('你的评分是'+score*m1+'分');
    }
  });
}


function rat2(star2,result2,m2){
  star2= '#' + star2;
  result2= '#' + result2;
  $(result2).hide();//将结果DIV隐藏
  $(star2).raty({
    score: function(){return $("#star2").attr('data-score'); },
    // score: 4,
    hints: ['bad','good','nice','great','perfect'],
    path: "../../../../../../public/images/mobile", //css/img
    number:5,
readOnly: true,
    starOff: 'star-off.png', //star-off-big.png
    starOn: 'star-on.png', //star-on-big.png
    starHalf : 'star-half.png',
    size:20,
    start:10,
    showHalf: true,
    target: result2,
    targetKeep : true,//targetKeep 属性设置为true，用户的选择值才会被保持在目标DIV中，否则只是鼠标悬停时有值，而鼠标离开后这个值就会消失
    click: function (score, evt) {
//$("#star2").attr('data-score',score); 

      //第一种方式：直接取值
    //  alert('你的评分是'+score*m2+'分'); //5*2=10分
    }

  });

  /*第二种方式可以设置一个隐蔽的HTML元素来保存用户的选择值，然后可以在脚本里面通过jQuery选中这个元素来处理该值。 弹出结果
  var text = $(result).text();
  $('img').click(function () {
    if ($(result).text() != text) {
      alert('你的评分是'+$(result).text()/m+'分');
      alert(result);
      return;
    }
  });*/
}


/*!
 * Retina.js v1.3.0
 *
 * Copyright 2014 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */
!function(){function a(){}function b(a){return f.retinaImageSuffix+a}function c(a,c){if(this.path=a||"","undefined"!=typeof c&&null!==c)this.at_2x_path=c,this.perform_check=!1;else{if(void 0!==document.createElement){var d=document.createElement("a");d.href=this.path,d.pathname=d.pathname.replace(g,b),this.at_2x_path=d.href}else{var e=this.path.split("?");e[0]=e[0].replace(g,b),this.at_2x_path=e.join("?")}this.perform_check=!0}}function d(a){this.el=a,this.path=new c(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var b=this;this.path.check_2x_variant(function(a){a&&b.swap()})}var e="undefined"==typeof exports?window:exports,f={retinaImageSuffix:"@2x",check_mime_type:!0,force_original_dimensions:!0};e.Retina=a,a.configure=function(a){null===a&&(a={});for(var b in a)a.hasOwnProperty(b)&&(f[b]=a[b])},a.init=function(a){null===a&&(a=e);var b=a.onload||function(){};a.onload=function(){var a,c,e=document.getElementsByTagName("img"),f=[];for(a=0;a<e.length;a+=1)c=e[a],c.getAttributeNode("data-no-retina")||f.push(new d(c));b()}},a.isRetina=function(){var a="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";return e.devicePixelRatio>1?!0:e.matchMedia&&e.matchMedia(a).matches?!0:!1};var g=/\.\w+$/;e.RetinaImagePath=c,c.confirmed_paths=[],c.prototype.is_external=function(){return!(!this.path.match(/^https?\:/i)||this.path.match("//"+document.domain))},c.prototype.check_2x_variant=function(a){var b,d=this;return this.is_external()?a(!1):this.perform_check||"undefined"==typeof this.at_2x_path||null===this.at_2x_path?this.at_2x_path in c.confirmed_paths?a(!0):(b=new XMLHttpRequest,b.open("HEAD",this.at_2x_path),b.onreadystatechange=function(){if(4!==b.readyState)return a(!1);if(b.status>=200&&b.status<=399){if(f.check_mime_type){var e=b.getResponseHeader("Content-Type");if(null===e||!e.match(/^image/i))return a(!1)}return c.confirmed_paths.push(d.at_2x_path),a(!0)}return a(!1)},b.send(),void 0):a(!0)},e.RetinaImage=d,d.prototype.swap=function(a){function b(){c.el.complete?(f.force_original_dimensions&&(c.el.setAttribute("width",c.el.offsetWidth),c.el.setAttribute("height",c.el.offsetHeight)),c.el.setAttribute("src",a)):setTimeout(b,5)}"undefined"==typeof a&&(a=this.path.at_2x_path);var c=this;b()},a.isRetina()&&a.init(e)}();
/*
 * -------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating.
 * @date    2015-08-18 9:31:00
 * @version $Id$
 *
 * Usage:
 * -------------------------------------------------------------------
 * $('#star').raty();
 *
 * <div id="star"></div>
 *
 */

;(function($) {

	var methods = {
		init: function(settings) {
			return this.each(function() {
				var self	= this,
					$this	= $(self).empty();
	
				self.opt = $.extend(true, {}, $.fn.raty.defaults, settings);

				$this.data('settings', self.opt);

				self.opt.number = methods.between(self.opt.number, 0, 20);

				if (self.opt.path.substring(self.opt.path.length - 1, self.opt.path.length) != '/') {
					self.opt.path += '/';
				}

				if (typeof self.opt.score == 'function') {
					self.opt.score = self.opt.score.call(self);
				}

				if (self.opt.score) {
					self.opt.score = methods.between(self.opt.score, 0, self.opt.number);					
				}

				for (var i = 1; i <= self.opt.number; i++) {
					$('<img />', {
						src		: self.opt.path + ((!self.opt.score || self.opt.score < i) ? self.opt.starOff : self.opt.starOn),
						alt		: i,
						title	: (i <= self.opt.hints.length && self.opt.hints[i - 1] !== null) ? self.opt.hints[i - 1] : i
					}).appendTo(self);

					if (self.opt.space) {
						$this.append((i < self.opt.number) ? '&#160;' : '');
					}
				}

				self.stars = $this.children('img:not(".raty-cancel")');
				self.score = $('<input />', { type: 'hidden', name: self.opt.scoreName }).appendTo(self);

				if (self.opt.score && self.opt.score > 0) {
					self.score.val(self.opt.score);
					methods.roundStar.call(self, self.opt.score);
				}

				if (self.opt.iconRange) {
					methods.fill.call(self, self.opt.score);	
				}

				methods.setTarget.call(self, self.opt.score, self.opt.targetKeep);

				var space	= self.opt.space ? 4 : 0,
					width	= self.opt.width || (self.opt.number * self.opt.size + self.opt.number * space);

				if (self.opt.cancel) {
					self.cancel = $('<img />', { src: self.opt.path + self.opt.cancelOff, alt: 'x', title: self.opt.cancelHint, 'class': 'raty-cancel' });

					if (self.opt.cancelPlace == 'left') {
						$this.prepend('&#160;').prepend(self.cancel);
					} else {
						$this.append('&#160;').append(self.cancel);
					}

					width += (self.opt.size + space);
				}

				if (self.opt.readOnly) {
					methods.fixHint.call(self);

					if (self.cancel) {
						self.cancel.hide();
					}
				} else {
					$this.css('cursor', 'pointer');

					methods.bindAction.call(self);
				}

				$this.css('width', width);
			});
		}, between: function(value, min, max) {
			return Math.min(Math.max(parseFloat(value), min), max);
		}, bindAction: function() {
			var self	= this,
				$this	= $(self);

			$this.mouseleave(function() {
				var score = self.score.val() || undefined;

				methods.initialize.call(self, score);
				methods.setTarget.call(self, score, self.opt.targetKeep);

				if (self.opt.mouseover) {
					self.opt.mouseover.call(self, score);
				}
			});

			var action = self.opt.half ? 'mousemove' : 'mouseover';

			if (self.opt.cancel) {
				self.cancel.mouseenter(function() {
					$(this).attr('src', self.opt.path + self.opt.cancelOn);

					self.stars.attr('src', self.opt.path + self.opt.starOff);

					methods.setTarget.call(self, null, true);

					if (self.opt.mouseover) {
						self.opt.mouseover.call(self, null);
					}
				}).mouseleave(function() {
					$(this).attr('src', self.opt.path + self.opt.cancelOff);

					if (self.opt.mouseover) {
						self.opt.mouseover.call(self, self.score.val() || null);
					}
				}).click(function(evt) {
					self.score.removeAttr('value');

					if (self.opt.click) {
			          self.opt.click.call(self, null, evt);
			        }
				});
			}

			self.stars.bind(action, function(evt) {
				var value = parseInt(this.alt, 10);

				if (self.opt.half) {
					var position	= parseFloat((evt.pageX - $(this).offset().left) / self.opt.size),
						diff		= (position > .5) ? 1 : .5;

					value = parseFloat(this.alt) - 1 + diff;

					methods.fill.call(self, value);

					if (self.opt.precision) {
						value = value - diff + position;
					}

					methods.showHalf.call(self, value);
				} else {
					methods.fill.call(self, value);
				}

				$this.data('score', value);

				methods.setTarget.call(self, value, true);

				if (self.opt.mouseover) {
					self.opt.mouseover.call(self, value, evt);
				}
			}).click(function(evt) {
				self.score.val((self.opt.half || self.opt.precision) ? $this.data('score') : this.alt);

				if (self.opt.click) {
					self.opt.click.call(self, self.score.val(), evt);
				}
			});
		}, cancel: function(isClick) {
			return $(this).each(function() {
				var self	= this, 
					$this	= $(self);

				if ($this.data('readonly') === true) {
					return this;
				}

				if (isClick) {
					methods.click.call(self, null);
				} else {
					methods.score.call(self, null);
				}

				self.score.removeAttr('value');
			});
		}, click: function(score) {
			return $(this).each(function() {
				if ($(this).data('readonly') === true) {
					return this;
				}

				methods.initialize.call(this, score);

				if (this.opt.click) {
					this.opt.click.call(this, score);
				} else {
					methods.error.call(this, 'you must add the "click: function(score, evt) { }" callback.');
				}

				methods.setTarget.call(this, score, true);
			});
		}, error: function(message) {
			$(this).html(message);

			$.error(message);
		}, fill: function(score) {
			var self	= this,
				number	= self.stars.length,
				count	= 0,
				$star	,
				star	,
				icon	;

			for (var i = 1; i <= number; i++) {
				$star = self.stars.eq(i - 1);

				if (self.opt.iconRange && self.opt.iconRange.length > count) {
					star = self.opt.iconRange[count];

					if (self.opt.single) {
						icon = (i == score) ? (star.on || self.opt.starOn) : (star.off || self.opt.starOff);
					} else {
						icon = (i <= score) ? (star.on || self.opt.starOn) : (star.off || self.opt.starOff);
					}

					if (i <= star.range) {
						$star.attr('src', self.opt.path + icon);
					}

					if (i == star.range) {
						count++;
					}
				} else {
					if (self.opt.single) {
						icon = (i == score) ? self.opt.starOn : self.opt.starOff;
					} else {
						icon = (i <= score) ? self.opt.starOn : self.opt.starOff;
					}

					$star.attr('src', self.opt.path + icon);
				}
			}
		}, fixHint: function() {
			var $this	= $(this),
				score	= parseInt(this.score.val(), 10),
				hint	= this.opt.noRatedMsg;

			if (!isNaN(score) && score > 0) {
				hint = (score <= this.opt.hints.length && this.opt.hints[score - 1] !== null) ? this.opt.hints[score - 1] : score;
			}

			$this.data('readonly', true).css('cursor', 'default').attr('title', hint);

			this.score.attr('readonly', 'readonly');
			this.stars.attr('title', hint);
		}, getScore: function() {
			var score	= [],
				value	;

			$(this).each(function() {
				value = this.score.val();

				score.push(value ? parseFloat(value) : undefined);
			});

			return (score.length > 1) ? score : score[0];
		}, readOnly: function(isReadOnly) {
			return this.each(function() {
				var $this = $(this);

				if ($this.data('readonly') === isReadOnly) {
					return this;
				}

				if (this.cancel) {
					if (isReadOnly) {
						this.cancel.hide();
					} else {
						this.cancel.show();
					}
				}

				if (isReadOnly) {
					$this.unbind();

					$this.children('img').unbind();

					methods.fixHint.call(this);
				} else {
					methods.bindAction.call(this);
					methods.unfixHint.call(this);
				}

				$this.data('readonly', isReadOnly);
			});
		}, reload: function() {
			return methods.set.call(this, {});
		}, roundStar: function(score) {
			var diff = (score - Math.floor(score)).toFixed(2);

			if (diff > this.opt.round.down) {
				var icon = this.opt.starOn;								// Full up: [x.76 .. x.99]

				if (diff < this.opt.round.up && this.opt.halfShow) {	// Half: [x.26 .. x.75]
					icon = this.opt.starHalf;
				} else if (diff < this.opt.round.full) {				// Full down: [x.00 .. x.5]
					icon = this.opt.starOff;
				}

				this.stars.eq(Math.ceil(score) - 1).attr('src', this.opt.path + icon);
			}															// Full down: [x.00 .. x.25]
		}, score: function() {
			return arguments.length ? methods.setScore.apply(this, arguments) : methods.getScore.call(this);
		}, set: function(settings) {
			this.each(function() {
				var $this	= $(this),
					actual	= $this.data('settings'),
					clone	= $this.clone().removeAttr('style').insertBefore($this);

				$this.remove();

				clone.raty($.extend(actual, settings));
			});

			return $(this.selector);
		}, setScore: function(score) {
			return $(this).each(function() {
				if ($(this).data('readonly') === true) {
					return this;
				}

				methods.initialize.call(this, score);
				methods.setTarget.call(this, score, true);
			});
		}, setTarget: function(value, isKeep) {
			if (this.opt.target) {
				var $target = $(this.opt.target);

				if ($target.length == 0) {
					methods.error.call(this, 'target selector invalid or missing!');
				}

				var score = value;

				if (!isKeep || score === undefined) {
					score = this.opt.targetText;
				} else {
					if (this.opt.targetType == 'hint') {
						score = (score === null && this.opt.cancel)
								? this.opt.cancelHint
								: this.opt.hints[Math.ceil(score - 1)];
					} else {
						score = this.opt.precision
								? parseFloat(score).toFixed(1)
								: parseInt(score, 10);
					}
				}

				if (this.opt.targetFormat.indexOf('{score}') < 0) {
					methods.error.call(this, 'template "{score}" missing!');
				}

				if (value !== null) {
					score = this.opt.targetFormat.toString().replace('{score}', score);
				}

				if ($target.is(':input')) {
					$target.val(score);
				} else {
					$target.html(score);
				}
			}
		}, showHalf: function(score) {
			var diff = (score - Math.floor(score)).toFixed(1);

			if (diff > 0 && diff < .6) {
				this.stars.eq(Math.ceil(score) - 1).attr('src', this.opt.path + this.opt.starHalf);
			}
		}, initialize: function(score) {
			score = !score ? 0 : methods.between(score, 0, this.opt.number);

			methods.fill.call(this, score);

			if (score > 0) {
				if (this.opt.halfShow) {
					methods.roundStar.call(this, score);
				}

				this.score.val(score);
			}
		}, unfixHint: function() {
			for (var i = 0; i < this.opt.number; i++) {
				this.stars.eq(i).attr('title', (i < this.opt.hints.length && this.opt.hints[i] !== null) ? this.opt.hints[i] : i);
			}

			$(this).data('readonly', false).css('cursor', 'pointer').removeAttr('title');

			this.score.attr('readonly', 'readonly');
		}
	};

	$.fn.raty = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist!');
		} 
	};

	$.fn.raty.defaults = {
		cancel			: false,
		cancelHint		: 'cancel this rating!',
		cancelOff		: 'cancel-off.png',
		cancelOn		: 'cancel-on.png',
		cancelPlace		: 'left',
		click			: undefined,
		half			: false,
		halfShow		: true,
		hints			: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100' ],
		iconRange		: undefined,
		mouseover		: undefined,
		noRatedMsg		: 'not rated yet',
		number			: 10,
		path			: 'img/',
		precision		: false,
		round			: { down: .25, full: .6, up: .76 },
		readOnly		: false,
		score			: undefined,
		scoreName		: 'score',
		single			: false,
		size			: 16,
		space			: true,
		starHalf		: 'star-half.png',
		starOff			: 'star-off.png',
		starOn			: 'star-on.png',
		target			: undefined,
		targetFormat	: '{score}',
		targetKeep		: false,
		targetText		: '',
		targetType		: 'hint',
		width			: undefined
	};

})(jQuery);

/*
 * Swiper 2.7.5
 * Mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2010-2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: January 4, 2015
*/
var Swiper=function(a,b){"use strict";function c(a,b){return document.querySelectorAll?(b||document).querySelectorAll(a):jQuery(a,b)}function d(a){return"[object Array]"===Object.prototype.toString.apply(a)?!0:!1}function e(){var a=G-J;return b.freeMode&&(a=G-J),b.slidesPerView>D.slides.length&&!b.centeredSlides&&(a=0),0>a&&(a=0),a}function f(){function a(a){var c,d,e=function(){"undefined"!=typeof D&&null!==D&&(void 0!==D.imagesLoaded&&D.imagesLoaded++,D.imagesLoaded===D.imagesToLoad.length&&(D.reInit(),b.onImagesReady&&D.fireCallback(b.onImagesReady,D)))};a.complete?e():(d=a.currentSrc||a.getAttribute("src"),d?(c=new Image,c.onload=e,c.onerror=e,c.src=d):e())}var d=D.h.addEventListener,e="wrapper"===b.eventTarget?D.wrapper:D.container;if(D.browser.ie10||D.browser.ie11?(d(e,D.touchEvents.touchStart,p),d(document,D.touchEvents.touchMove,q),d(document,D.touchEvents.touchEnd,r)):(D.support.touch&&(d(e,"touchstart",p),d(e,"touchmove",q),d(e,"touchend",r)),b.simulateTouch&&(d(e,"mousedown",p),d(document,"mousemove",q),d(document,"mouseup",r))),b.autoResize&&d(window,"resize",D.resizeFix),g(),D._wheelEvent=!1,b.mousewheelControl){if(void 0!==document.onmousewheel&&(D._wheelEvent="mousewheel"),!D._wheelEvent)try{new WheelEvent("wheel"),D._wheelEvent="wheel"}catch(f){}D._wheelEvent||(D._wheelEvent="DOMMouseScroll"),D._wheelEvent&&d(D.container,D._wheelEvent,j)}if(b.keyboardControl&&d(document,"keydown",i),b.updateOnImagesReady){D.imagesToLoad=c("img",D.container);for(var h=0;h<D.imagesToLoad.length;h++)a(D.imagesToLoad[h])}}function g(){var a,d=D.h.addEventListener;if(b.preventLinks){var e=c("a",D.container);for(a=0;a<e.length;a++)d(e[a],"click",n)}if(b.releaseFormElements){var f=c("input, textarea, select",D.container);for(a=0;a<f.length;a++)d(f[a],D.touchEvents.touchStart,o,!0),D.support.touch&&b.simulateTouch&&d(f[a],"mousedown",o,!0)}if(b.onSlideClick)for(a=0;a<D.slides.length;a++)d(D.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<D.slides.length;a++)d(D.slides[a],D.touchEvents.touchStart,l)}function h(){var a,d=D.h.removeEventListener;if(b.onSlideClick)for(a=0;a<D.slides.length;a++)d(D.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<D.slides.length;a++)d(D.slides[a],D.touchEvents.touchStart,l);if(b.releaseFormElements){var e=c("input, textarea, select",D.container);for(a=0;a<e.length;a++)d(e[a],D.touchEvents.touchStart,o,!0),D.support.touch&&b.simulateTouch&&d(e[a],"mousedown",o,!0)}if(b.preventLinks){var f=c("a",D.container);for(a=0;a<f.length;a++)d(f[a],"click",n)}}function i(a){var b=a.keyCode||a.charCode;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey)){if(37===b||39===b||38===b||40===b){for(var c=!1,d=D.h.getOffset(D.container),e=D.h.windowScroll().left,f=D.h.windowScroll().top,g=D.h.windowWidth(),h=D.h.windowHeight(),i=[[d.left,d.top],[d.left+D.width,d.top],[d.left,d.top+D.height],[d.left+D.width,d.top+D.height]],j=0;j<i.length;j++){var k=i[j];k[0]>=e&&k[0]<=e+g&&k[1]>=f&&k[1]<=f+h&&(c=!0)}if(!c)return}N?((37===b||39===b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),39===b&&D.swipeNext(),37===b&&D.swipePrev()):((38===b||40===b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),40===b&&D.swipeNext(),38===b&&D.swipePrev())}}function j(a){var c=D._wheelEvent,d=0;if(a.detail)d=-a.detail;else if("mousewheel"===c)if(b.mousewheelControlForceToAxis)if(N){if(!(Math.abs(a.wheelDeltaX)>Math.abs(a.wheelDeltaY)))return;d=a.wheelDeltaX}else{if(!(Math.abs(a.wheelDeltaY)>Math.abs(a.wheelDeltaX)))return;d=a.wheelDeltaY}else d=a.wheelDelta;else if("DOMMouseScroll"===c)d=-a.detail;else if("wheel"===c)if(b.mousewheelControlForceToAxis)if(N){if(!(Math.abs(a.deltaX)>Math.abs(a.deltaY)))return;d=-a.deltaX}else{if(!(Math.abs(a.deltaY)>Math.abs(a.deltaX)))return;d=-a.deltaY}else d=Math.abs(a.deltaX)>Math.abs(a.deltaY)?-a.deltaX:-a.deltaY;if(b.freeMode){var f=D.getWrapperTranslate()+d;if(f>0&&(f=0),f<-e()&&(f=-e()),D.setWrapperTransition(0),D.setWrapperTranslate(f),D.updateActiveSlide(f),0===f||f===-e())return}else(new Date).getTime()-V>60&&(0>d?D.swipeNext():D.swipePrev()),V=(new Date).getTime();return b.autoplay&&D.stopAutoplay(!0),a.preventDefault?a.preventDefault():a.returnValue=!1,!1}function k(a){D.allowSlideClick&&(m(a),D.fireCallback(b.onSlideClick,D,a))}function l(a){m(a),D.fireCallback(b.onSlideTouch,D,a)}function m(a){if(a.currentTarget)D.clickedSlide=a.currentTarget;else{var c=a.srcElement;do{if(c.className.indexOf(b.slideClass)>-1)break;c=c.parentNode}while(c);D.clickedSlide=c}D.clickedSlideIndex=D.slides.indexOf(D.clickedSlide),D.clickedSlideLoopIndex=D.clickedSlideIndex-(D.loopedSlides||0)}function n(a){return D.allowLinks?void 0:(a.preventDefault?a.preventDefault():a.returnValue=!1,b.preventLinksPropagation&&"stopPropagation"in a&&a.stopPropagation(),!1)}function o(a){return a.stopPropagation?a.stopPropagation():a.returnValue=!1,!1}function p(a){if(b.preventLinks&&(D.allowLinks=!0),D.isTouched||b.onlyExternal)return!1;var c=a.target||a.srcElement;document.activeElement&&document.activeElement!==document.body&&document.activeElement!==c&&document.activeElement.blur();var d="input select textarea".split(" ");if(b.noSwiping&&c&&t(c))return!1;if(_=!1,D.isTouched=!0,$="touchstart"===a.type,!$&&"which"in a&&3===a.which)return D.isTouched=!1,!1;if(!$||1===a.targetTouches.length){D.callPlugins("onTouchStartBegin"),!$&&!D.isAndroid&&d.indexOf(c.tagName.toLowerCase())<0&&(a.preventDefault?a.preventDefault():a.returnValue=!1);var e=$?a.targetTouches[0].pageX:a.pageX||a.clientX,f=$?a.targetTouches[0].pageY:a.pageY||a.clientY;D.touches.startX=D.touches.currentX=e,D.touches.startY=D.touches.currentY=f,D.touches.start=D.touches.current=N?e:f,D.setWrapperTransition(0),D.positions.start=D.positions.current=D.getWrapperTranslate(),D.setWrapperTranslate(D.positions.start),D.times.start=(new Date).getTime(),I=void 0,b.moveStartThreshold>0&&(X=!1),b.onTouchStart&&D.fireCallback(b.onTouchStart,D,a),D.callPlugins("onTouchStartEnd")}}function q(a){if(D.isTouched&&!b.onlyExternal&&(!$||"mousemove"!==a.type)){var c=$?a.targetTouches[0].pageX:a.pageX||a.clientX,d=$?a.targetTouches[0].pageY:a.pageY||a.clientY;if("undefined"==typeof I&&N&&(I=!!(I||Math.abs(d-D.touches.startY)>Math.abs(c-D.touches.startX))),"undefined"!=typeof I||N||(I=!!(I||Math.abs(d-D.touches.startY)<Math.abs(c-D.touches.startX))),I)return void(D.isTouched=!1);if(N){if(!b.swipeToNext&&c<D.touches.startX||!b.swipeToPrev&&c>D.touches.startX)return}else if(!b.swipeToNext&&d<D.touches.startY||!b.swipeToPrev&&d>D.touches.startY)return;if(a.assignedToSwiper)return void(D.isTouched=!1);if(a.assignedToSwiper=!0,b.preventLinks&&(D.allowLinks=!1),b.onSlideClick&&(D.allowSlideClick=!1),b.autoplay&&D.stopAutoplay(!0),!$||1===a.touches.length){if(D.isMoved||(D.callPlugins("onTouchMoveStart"),b.loop&&(D.fixLoop(),D.positions.start=D.getWrapperTranslate()),b.onTouchMoveStart&&D.fireCallback(b.onTouchMoveStart,D)),D.isMoved=!0,a.preventDefault?a.preventDefault():a.returnValue=!1,D.touches.current=N?c:d,D.positions.current=(D.touches.current-D.touches.start)*b.touchRatio+D.positions.start,D.positions.current>0&&b.onResistanceBefore&&D.fireCallback(b.onResistanceBefore,D,D.positions.current),D.positions.current<-e()&&b.onResistanceAfter&&D.fireCallback(b.onResistanceAfter,D,Math.abs(D.positions.current+e())),b.resistance&&"100%"!==b.resistance){var f;if(D.positions.current>0&&(f=1-D.positions.current/J/2,D.positions.current=.5>f?J/2:D.positions.current*f),D.positions.current<-e()){var g=(D.touches.current-D.touches.start)*b.touchRatio+(e()+D.positions.start);f=(J+g)/J;var h=D.positions.current-g*(1-f)/2,i=-e()-J/2;D.positions.current=i>h||0>=f?i:h}}if(b.resistance&&"100%"===b.resistance&&(D.positions.current>0&&(!b.freeMode||b.freeModeFluid)&&(D.positions.current=0),D.positions.current<-e()&&(!b.freeMode||b.freeModeFluid)&&(D.positions.current=-e())),!b.followFinger)return;if(b.moveStartThreshold)if(Math.abs(D.touches.current-D.touches.start)>b.moveStartThreshold||X){if(!X)return X=!0,void(D.touches.start=D.touches.current);D.setWrapperTranslate(D.positions.current)}else D.positions.current=D.positions.start;else D.setWrapperTranslate(D.positions.current);return(b.freeMode||b.watchActiveIndex)&&D.updateActiveSlide(D.positions.current),b.grabCursor&&(D.container.style.cursor="move",D.container.style.cursor="grabbing",D.container.style.cursor="-moz-grabbin",D.container.style.cursor="-webkit-grabbing"),Y||(Y=D.touches.current),Z||(Z=(new Date).getTime()),D.velocity=(D.touches.current-Y)/((new Date).getTime()-Z)/2,Math.abs(D.touches.current-Y)<2&&(D.velocity=0),Y=D.touches.current,Z=(new Date).getTime(),D.callPlugins("onTouchMoveEnd"),b.onTouchMove&&D.fireCallback(b.onTouchMove,D,a),!1}}}function r(a){if(I&&D.swipeReset(),!b.onlyExternal&&D.isTouched){D.isTouched=!1,b.grabCursor&&(D.container.style.cursor="move",D.container.style.cursor="grab",D.container.style.cursor="-moz-grab",D.container.style.cursor="-webkit-grab"),D.positions.current||0===D.positions.current||(D.positions.current=D.positions.start),b.followFinger&&D.setWrapperTranslate(D.positions.current),D.times.end=(new Date).getTime(),D.touches.diff=D.touches.current-D.touches.start,D.touches.abs=Math.abs(D.touches.diff),D.positions.diff=D.positions.current-D.positions.start,D.positions.abs=Math.abs(D.positions.diff);var c=D.positions.diff,d=D.positions.abs,f=D.times.end-D.times.start;5>d&&300>f&&D.allowLinks===!1&&(b.freeMode||0===d||D.swipeReset(),b.preventLinks&&(D.allowLinks=!0),b.onSlideClick&&(D.allowSlideClick=!0)),setTimeout(function(){"undefined"!=typeof D&&null!==D&&(b.preventLinks&&(D.allowLinks=!0),b.onSlideClick&&(D.allowSlideClick=!0))},100);var g=e();if(!D.isMoved&&b.freeMode)return D.isMoved=!1,b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),void D.callPlugins("onTouchEnd");if(!D.isMoved||D.positions.current>0||D.positions.current<-g)return D.swipeReset(),b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),void D.callPlugins("onTouchEnd");if(D.isMoved=!1,b.freeMode){if(b.freeModeFluid){var h,i=1e3*b.momentumRatio,j=D.velocity*i,k=D.positions.current+j,l=!1,m=20*Math.abs(D.velocity)*b.momentumBounceRatio;-g>k&&(b.momentumBounce&&D.support.transitions?(-m>k+g&&(k=-g-m),h=-g,l=!0,_=!0):k=-g),k>0&&(b.momentumBounce&&D.support.transitions?(k>m&&(k=m),h=0,l=!0,_=!0):k=0),0!==D.velocity&&(i=Math.abs((k-D.positions.current)/D.velocity)),D.setWrapperTranslate(k),D.setWrapperTransition(i),b.momentumBounce&&l&&D.wrapperTransitionEnd(function(){_&&(b.onMomentumBounce&&D.fireCallback(b.onMomentumBounce,D),D.callPlugins("onMomentumBounce"),D.setWrapperTranslate(h),D.setWrapperTransition(300))}),D.updateActiveSlide(k)}return(!b.freeModeFluid||f>=300)&&D.updateActiveSlide(D.positions.current),b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),void D.callPlugins("onTouchEnd")}H=0>c?"toNext":"toPrev","toNext"===H&&300>=f&&(30>d||!b.shortSwipes?D.swipeReset():D.swipeNext(!0,!0)),"toPrev"===H&&300>=f&&(30>d||!b.shortSwipes?D.swipeReset():D.swipePrev(!0,!0));var n=0;if("auto"===b.slidesPerView){for(var o,p=Math.abs(D.getWrapperTranslate()),q=0,r=0;r<D.slides.length;r++)if(o=N?D.slides[r].getWidth(!0,b.roundLengths):D.slides[r].getHeight(!0,b.roundLengths),q+=o,q>p){n=o;break}n>J&&(n=J)}else n=F*b.slidesPerView;"toNext"===H&&f>300&&(d>=n*b.longSwipesRatio?D.swipeNext(!0,!0):D.swipeReset()),"toPrev"===H&&f>300&&(d>=n*b.longSwipesRatio?D.swipePrev(!0,!0):D.swipeReset()),b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),D.callPlugins("onTouchEnd")}}function s(a,b){return a&&a.getAttribute("class")&&a.getAttribute("class").indexOf(b)>-1}function t(a){var c=!1;do s(a,b.noSwipingClass)&&(c=!0),a=a.parentElement;while(!c&&a.parentElement&&!s(a,b.wrapperClass));return!c&&s(a,b.wrapperClass)&&s(a,b.noSwipingClass)&&(c=!0),c}function u(a,b){var c,d=document.createElement("div");return d.innerHTML=b,c=d.firstChild,c.className+=" "+a,c.outerHTML}function v(a,c,d){function e(){var f=+new Date,l=f-g;h+=i*l/(1e3/60),k="toNext"===j?h>a:a>h,k?(D.setWrapperTranslate(Math.ceil(h)),D._DOMAnimating=!0,window.setTimeout(function(){e()},1e3/60)):(b.onSlideChangeEnd&&("to"===c?d.runCallbacks===!0&&D.fireCallback(b.onSlideChangeEnd,D,j):D.fireCallback(b.onSlideChangeEnd,D,j)),D.setWrapperTranslate(a),D._DOMAnimating=!1)}var f="to"===c&&d.speed>=0?d.speed:b.speed,g=+new Date;if(D.support.transitions||!b.DOMAnimation)D.setWrapperTranslate(a),D.setWrapperTransition(f);else{var h=D.getWrapperTranslate(),i=Math.ceil((a-h)/f*(1e3/60)),j=h>a?"toNext":"toPrev",k="toNext"===j?h>a:a>h;if(D._DOMAnimating)return;e()}D.updateActiveSlide(a),b.onSlideNext&&"next"===c&&d.runCallbacks===!0&&D.fireCallback(b.onSlideNext,D,a),b.onSlidePrev&&"prev"===c&&d.runCallbacks===!0&&D.fireCallback(b.onSlidePrev,D,a),b.onSlideReset&&"reset"===c&&d.runCallbacks===!0&&D.fireCallback(b.onSlideReset,D,a),"next"!==c&&"prev"!==c&&"to"!==c||d.runCallbacks!==!0||w(c)}function w(a){if(D.callPlugins("onSlideChangeStart"),b.onSlideChangeStart)if(b.queueStartCallbacks&&D.support.transitions){if(D._queueStartCallbacks)return;D._queueStartCallbacks=!0,D.fireCallback(b.onSlideChangeStart,D,a),D.wrapperTransitionEnd(function(){D._queueStartCallbacks=!1})}else D.fireCallback(b.onSlideChangeStart,D,a);if(b.onSlideChangeEnd)if(D.support.transitions)if(b.queueEndCallbacks){if(D._queueEndCallbacks)return;D._queueEndCallbacks=!0,D.wrapperTransitionEnd(function(c){D.fireCallback(b.onSlideChangeEnd,c,a)})}else D.wrapperTransitionEnd(function(c){D.fireCallback(b.onSlideChangeEnd,c,a)});else b.DOMAnimation||setTimeout(function(){D.fireCallback(b.onSlideChangeEnd,D,a)},10)}function x(){var a=D.paginationButtons;if(a)for(var b=0;b<a.length;b++)D.h.removeEventListener(a[b],"click",z)}function y(){var a=D.paginationButtons;if(a)for(var b=0;b<a.length;b++)D.h.addEventListener(a[b],"click",z)}function z(a){for(var c,d=a.target||a.srcElement,e=D.paginationButtons,f=0;f<e.length;f++)d===e[f]&&(c=f);b.autoplay&&D.stopAutoplay(!0),D.swipeTo(c)}function A(){ab=setTimeout(function(){b.loop?(D.fixLoop(),D.swipeNext(!0,!0)):D.swipeNext(!0,!0)||(b.autoplayStopOnLast?(clearTimeout(ab),ab=void 0):D.swipeTo(0)),D.wrapperTransitionEnd(function(){"undefined"!=typeof ab&&A()})},b.autoplay)}function B(){D.calcSlides(),b.loader.slides.length>0&&0===D.slides.length&&D.loadSlides(),b.loop&&D.createLoop(),D.init(),f(),b.pagination&&D.createPagination(!0),b.loop||b.initialSlide>0?D.swipeTo(b.initialSlide,0,!1):D.updateActiveSlide(0),b.autoplay&&D.startAutoplay(),D.centerIndex=D.activeIndex,b.onSwiperCreated&&D.fireCallback(b.onSwiperCreated,D),D.callPlugins("onSwiperCreated")}if(!document.body.outerHTML&&document.body.__defineGetter__&&HTMLElement){var C=HTMLElement.prototype;C.__defineGetter__&&C.__defineGetter__("outerHTML",function(){return(new XMLSerializer).serializeToString(this)})}if(window.getComputedStyle||(window.getComputedStyle=function(a){return this.el=a,this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;return"float"===b&&(b="styleFloat"),c.test(b)&&(b=b.replace(c,function(){return arguments[2].toUpperCase()})),a.currentStyle[b]?a.currentStyle[b]:null},this}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;d>c;c++)if(this[c]===a)return c;return-1}),(document.querySelectorAll||window.jQuery)&&"undefined"!=typeof a&&(a.nodeType||0!==c(a).length)){var D=this;D.touches={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,diff:0,abs:0},D.positions={start:0,abs:0,diff:0,current:0},D.times={start:0,end:0},D.id=(new Date).getTime(),D.container=a.nodeType?a:c(a)[0],D.isTouched=!1,D.isMoved=!1,D.activeIndex=0,D.centerIndex=0,D.activeLoaderIndex=0,D.activeLoopIndex=0,D.previousIndex=null,D.velocity=0,D.snapGrid=[],D.slidesGrid=[],D.imagesToLoad=[],D.imagesLoaded=0,D.wrapperLeft=0,D.wrapperRight=0,D.wrapperTop=0,D.wrapperBottom=0,D.isAndroid=navigator.userAgent.toLowerCase().indexOf("android")>=0;var E,F,G,H,I,J,K={eventTarget:"wrapper",mode:"horizontal",touchRatio:1,speed:300,freeMode:!1,freeModeFluid:!1,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,slidesPerView:1,slidesPerGroup:1,slidesPerViewFit:!0,simulateTouch:!0,followFinger:!0,shortSwipes:!0,longSwipesRatio:.5,moveStartThreshold:!1,onlyExternal:!1,createPagination:!0,pagination:!1,paginationElement:"span",paginationClickable:!1,paginationAsRange:!0,resistance:!0,scrollContainer:!1,preventLinks:!0,preventLinksPropagation:!1,noSwiping:!1,noSwipingClass:"swiper-no-swiping",initialSlide:0,keyboardControl:!1,mousewheelControl:!1,mousewheelControlForceToAxis:!1,useCSS3Transforms:!0,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,loop:!1,loopAdditionalSlides:0,roundLengths:!1,calculateHeight:!1,cssWidthAndHeight:!1,updateOnImagesReady:!0,releaseFormElements:!0,watchActiveIndex:!1,visibilityFullFit:!1,offsetPxBefore:0,offsetPxAfter:0,offsetSlidesBefore:0,offsetSlidesAfter:0,centeredSlides:!1,queueStartCallbacks:!1,queueEndCallbacks:!1,autoResize:!0,resizeReInit:!1,DOMAnimation:!0,loader:{slides:[],slidesHTMLType:"inner",surroundGroups:1,logic:"reload",loadAllSlides:!1},swipeToPrev:!0,swipeToNext:!0,slideElement:"div",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",wrapperClass:"swiper-wrapper",paginationElementClass:"swiper-pagination-switch",paginationActiveClass:"swiper-active-switch",paginationVisibleClass:"swiper-visible-switch"};b=b||{};for(var L in K)if(L in b&&"object"==typeof b[L])for(var M in K[L])M in b[L]||(b[L][M]=K[L][M]);else L in b||(b[L]=K[L]);D.params=b,b.scrollContainer&&(b.freeMode=!0,b.freeModeFluid=!0),b.loop&&(b.resistance="100%");var N="horizontal"===b.mode,O=["mousedown","mousemove","mouseup"];D.browser.ie10&&(O=["MSPointerDown","MSPointerMove","MSPointerUp"]),D.browser.ie11&&(O=["pointerdown","pointermove","pointerup"]),D.touchEvents={touchStart:D.support.touch||!b.simulateTouch?"touchstart":O[0],touchMove:D.support.touch||!b.simulateTouch?"touchmove":O[1],touchEnd:D.support.touch||!b.simulateTouch?"touchend":O[2]};for(var P=D.container.childNodes.length-1;P>=0;P--)if(D.container.childNodes[P].className)for(var Q=D.container.childNodes[P].className.split(/\s+/),R=0;R<Q.length;R++)Q[R]===b.wrapperClass&&(E=D.container.childNodes[P]);D.wrapper=E,D._extendSwiperSlide=function(a){return a.append=function(){return b.loop?a.insertAfter(D.slides.length-D.loopedSlides):(D.wrapper.appendChild(a),D.reInit()),a},a.prepend=function(){return b.loop?(D.wrapper.insertBefore(a,D.slides[D.loopedSlides]),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()):D.wrapper.insertBefore(a,D.wrapper.firstChild),D.reInit(),a},a.insertAfter=function(c){if("undefined"==typeof c)return!1;var d;return b.loop?(d=D.slides[c+1+D.loopedSlides],d?D.wrapper.insertBefore(a,d):D.wrapper.appendChild(a),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()):(d=D.slides[c+1],D.wrapper.insertBefore(a,d)),D.reInit(),a},a.clone=function(){return D._extendSwiperSlide(a.cloneNode(!0))},a.remove=function(){D.wrapper.removeChild(a),D.reInit()},a.html=function(b){return"undefined"==typeof b?a.innerHTML:(a.innerHTML=b,a)},a.index=function(){for(var b,c=D.slides.length-1;c>=0;c--)a===D.slides[c]&&(b=c);return b},a.isActive=function(){return a.index()===D.activeIndex?!0:!1},a.swiperSlideDataStorage||(a.swiperSlideDataStorage={}),a.getData=function(b){return a.swiperSlideDataStorage[b]},a.setData=function(b,c){return a.swiperSlideDataStorage[b]=c,a},a.data=function(b,c){return"undefined"==typeof c?a.getAttribute("data-"+b):(a.setAttribute("data-"+b,c),a)},a.getWidth=function(b,c){return D.h.getWidth(a,b,c)},a.getHeight=function(b,c){return D.h.getHeight(a,b,c)},a.getOffset=function(){return D.h.getOffset(a)},a},D.calcSlides=function(a){var c=D.slides?D.slides.length:!1;D.slides=[],D.displaySlides=[];for(var d=0;d<D.wrapper.childNodes.length;d++)if(D.wrapper.childNodes[d].className)for(var e=D.wrapper.childNodes[d].className,f=e.split(/\s+/),i=0;i<f.length;i++)f[i]===b.slideClass&&D.slides.push(D.wrapper.childNodes[d]);for(d=D.slides.length-1;d>=0;d--)D._extendSwiperSlide(D.slides[d]);c!==!1&&(c!==D.slides.length||a)&&(h(),g(),D.updateActiveSlide(),D.params.pagination&&D.createPagination(),D.callPlugins("numberOfSlidesChanged"))},D.createSlide=function(a,c,d){c=c||D.params.slideClass,d=d||b.slideElement;var e=document.createElement(d);return e.innerHTML=a||"",e.className=c,D._extendSwiperSlide(e)},D.appendSlide=function(a,b,c){return a?a.nodeType?D._extendSwiperSlide(a).append():D.createSlide(a,b,c).append():void 0},D.prependSlide=function(a,b,c){return a?a.nodeType?D._extendSwiperSlide(a).prepend():D.createSlide(a,b,c).prepend():void 0},D.insertSlideAfter=function(a,b,c,d){return"undefined"==typeof a?!1:b.nodeType?D._extendSwiperSlide(b).insertAfter(a):D.createSlide(b,c,d).insertAfter(a)},D.removeSlide=function(a){if(D.slides[a]){if(b.loop){if(!D.slides[a+D.loopedSlides])return!1;D.slides[a+D.loopedSlides].remove(),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()}else D.slides[a].remove();return!0}return!1},D.removeLastSlide=function(){return D.slides.length>0?(b.loop?(D.slides[D.slides.length-1-D.loopedSlides].remove(),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()):D.slides[D.slides.length-1].remove(),!0):!1},D.removeAllSlides=function(){for(var a=D.slides.length,b=D.slides.length-1;b>=0;b--)D.slides[b].remove(),b===a-1&&D.setWrapperTranslate(0)},D.getSlide=function(a){return D.slides[a]},D.getLastSlide=function(){return D.slides[D.slides.length-1]},D.getFirstSlide=function(){return D.slides[0]},D.activeSlide=function(){return D.slides[D.activeIndex]},D.fireCallback=function(){var a=arguments[0];if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)"function"==typeof a[c]&&a[c](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);else"[object String]"===Object.prototype.toString.call(a)?b["on"+a]&&D.fireCallback(b["on"+a],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]):a(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},D.addCallback=function(a,b){var c,e=this;return e.params["on"+a]?d(this.params["on"+a])?this.params["on"+a].push(b):"function"==typeof this.params["on"+a]?(c=this.params["on"+a],this.params["on"+a]=[],this.params["on"+a].push(c),this.params["on"+a].push(b)):void 0:(this.params["on"+a]=[],this.params["on"+a].push(b))},D.removeCallbacks=function(a){D.params["on"+a]&&(D.params["on"+a]=null)};var S=[];for(var T in D.plugins)if(b[T]){var U=D.plugins[T](D,b[T]);U&&S.push(U)}D.callPlugins=function(a,b){b||(b={});for(var c=0;c<S.length;c++)a in S[c]&&S[c][a](b)},!D.browser.ie10&&!D.browser.ie11||b.onlyExternal||D.wrapper.classList.add("swiper-wp8-"+(N?"horizontal":"vertical")),b.freeMode&&(D.container.className+=" swiper-free-mode"),D.initialized=!1,D.init=function(a,c){var d=D.h.getWidth(D.container,!1,b.roundLengths),e=D.h.getHeight(D.container,!1,b.roundLengths);if(d!==D.width||e!==D.height||a){D.width=d,D.height=e;var f,g,h,i,j,k,l;J=N?d:e;var m=D.wrapper;if(a&&D.calcSlides(c),"auto"===b.slidesPerView){var n=0,o=0;b.slidesOffset>0&&(m.style.paddingLeft="",m.style.paddingRight="",m.style.paddingTop="",m.style.paddingBottom=""),m.style.width="",m.style.height="",b.offsetPxBefore>0&&(N?D.wrapperLeft=b.offsetPxBefore:D.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(N?D.wrapperRight=b.offsetPxAfter:D.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(N?(D.wrapperLeft=(J-this.slides[0].getWidth(!0,b.roundLengths))/2,D.wrapperRight=(J-D.slides[D.slides.length-1].getWidth(!0,b.roundLengths))/2):(D.wrapperTop=(J-D.slides[0].getHeight(!0,b.roundLengths))/2,D.wrapperBottom=(J-D.slides[D.slides.length-1].getHeight(!0,b.roundLengths))/2)),N?(D.wrapperLeft>=0&&(m.style.paddingLeft=D.wrapperLeft+"px"),D.wrapperRight>=0&&(m.style.paddingRight=D.wrapperRight+"px")):(D.wrapperTop>=0&&(m.style.paddingTop=D.wrapperTop+"px"),D.wrapperBottom>=0&&(m.style.paddingBottom=D.wrapperBottom+"px")),k=0;var p=0;for(D.snapGrid=[],D.slidesGrid=[],h=0,l=0;l<D.slides.length;l++){f=D.slides[l].getWidth(!0,b.roundLengths),g=D.slides[l].getHeight(!0,b.roundLengths),b.calculateHeight&&(h=Math.max(h,g));var q=N?f:g;if(b.centeredSlides){var r=l===D.slides.length-1?0:D.slides[l+1].getWidth(!0,b.roundLengths),s=l===D.slides.length-1?0:D.slides[l+1].getHeight(!0,b.roundLengths),t=N?r:s;if(q>J){if(b.slidesPerViewFit)D.snapGrid.push(k+D.wrapperLeft),D.snapGrid.push(k+q-J+D.wrapperLeft);else for(var u=0;u<=Math.floor(q/(J+D.wrapperLeft));u++)D.snapGrid.push(0===u?k+D.wrapperLeft:k+D.wrapperLeft+J*u);D.slidesGrid.push(k+D.wrapperLeft)}else D.snapGrid.push(p),D.slidesGrid.push(p);p+=q/2+t/2}else{if(q>J)if(b.slidesPerViewFit)D.snapGrid.push(k),D.snapGrid.push(k+q-J);else if(0!==J)for(var v=0;v<=Math.floor(q/J);v++)D.snapGrid.push(k+J*v);else D.snapGrid.push(k);else D.snapGrid.push(k);D.slidesGrid.push(k)}k+=q,n+=f,o+=g}b.calculateHeight&&(D.height=h),N?(G=n+D.wrapperRight+D.wrapperLeft,b.cssWidthAndHeight&&"height"!==b.cssWidthAndHeight||(m.style.width=n+"px"),b.cssWidthAndHeight&&"width"!==b.cssWidthAndHeight||(m.style.height=D.height+"px")):(b.cssWidthAndHeight&&"height"!==b.cssWidthAndHeight||(m.style.width=D.width+"px"),b.cssWidthAndHeight&&"width"!==b.cssWidthAndHeight||(m.style.height=o+"px"),G=o+D.wrapperTop+D.wrapperBottom)}else if(b.scrollContainer)m.style.width="",m.style.height="",i=D.slides[0].getWidth(!0,b.roundLengths),j=D.slides[0].getHeight(!0,b.roundLengths),G=N?i:j,m.style.width=i+"px",m.style.height=j+"px",F=N?i:j;else{if(b.calculateHeight){for(h=0,j=0,N||(D.container.style.height=""),m.style.height="",l=0;l<D.slides.length;l++)D.slides[l].style.height="",h=Math.max(D.slides[l].getHeight(!0),h),N||(j+=D.slides[l].getHeight(!0));g=h,D.height=g,N?j=g:(J=g,D.container.style.height=J+"px")}else g=N?D.height:D.height/b.slidesPerView,b.roundLengths&&(g=Math.ceil(g)),j=N?D.height:D.slides.length*g;for(f=N?D.width/b.slidesPerView:D.width,b.roundLengths&&(f=Math.ceil(f)),i=N?D.slides.length*f:D.width,F=N?f:g,b.offsetSlidesBefore>0&&(N?D.wrapperLeft=F*b.offsetSlidesBefore:D.wrapperTop=F*b.offsetSlidesBefore),b.offsetSlidesAfter>0&&(N?D.wrapperRight=F*b.offsetSlidesAfter:D.wrapperBottom=F*b.offsetSlidesAfter),b.offsetPxBefore>0&&(N?D.wrapperLeft=b.offsetPxBefore:D.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(N?D.wrapperRight=b.offsetPxAfter:D.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(N?(D.wrapperLeft=(J-F)/2,D.wrapperRight=(J-F)/2):(D.wrapperTop=(J-F)/2,D.wrapperBottom=(J-F)/2)),N?(D.wrapperLeft>0&&(m.style.paddingLeft=D.wrapperLeft+"px"),D.wrapperRight>0&&(m.style.paddingRight=D.wrapperRight+"px")):(D.wrapperTop>0&&(m.style.paddingTop=D.wrapperTop+"px"),D.wrapperBottom>0&&(m.style.paddingBottom=D.wrapperBottom+"px")),G=N?i+D.wrapperRight+D.wrapperLeft:j+D.wrapperTop+D.wrapperBottom,parseFloat(i)>0&&(!b.cssWidthAndHeight||"height"===b.cssWidthAndHeight)&&(m.style.width=i+"px"),parseFloat(j)>0&&(!b.cssWidthAndHeight||"width"===b.cssWidthAndHeight)&&(m.style.height=j+"px"),k=0,D.snapGrid=[],D.slidesGrid=[],l=0;l<D.slides.length;l++)D.snapGrid.push(k),D.slidesGrid.push(k),k+=F,parseFloat(f)>0&&(!b.cssWidthAndHeight||"height"===b.cssWidthAndHeight)&&(D.slides[l].style.width=f+"px"),parseFloat(g)>0&&(!b.cssWidthAndHeight||"width"===b.cssWidthAndHeight)&&(D.slides[l].style.height=g+"px")}D.initialized?(D.callPlugins("onInit"),b.onInit&&D.fireCallback(b.onInit,D)):(D.callPlugins("onFirstInit"),b.onFirstInit&&D.fireCallback(b.onFirstInit,D)),D.initialized=!0}},D.reInit=function(a){D.init(!0,a)},D.resizeFix=function(a){D.callPlugins("beforeResizeFix"),D.init(b.resizeReInit||a),b.freeMode?D.getWrapperTranslate()<-e()&&(D.setWrapperTransition(0),D.setWrapperTranslate(-e())):(D.swipeTo(b.loop?D.activeLoopIndex:D.activeIndex,0,!1),b.autoplay&&(D.support.transitions&&"undefined"!=typeof ab?"undefined"!=typeof ab&&(clearTimeout(ab),ab=void 0,D.startAutoplay()):"undefined"!=typeof bb&&(clearInterval(bb),bb=void 0,D.startAutoplay()))),D.callPlugins("afterResizeFix")},D.destroy=function(a){var c=D.h.removeEventListener,d="wrapper"===b.eventTarget?D.wrapper:D.container;if(D.browser.ie10||D.browser.ie11?(c(d,D.touchEvents.touchStart,p),c(document,D.touchEvents.touchMove,q),c(document,D.touchEvents.touchEnd,r)):(D.support.touch&&(c(d,"touchstart",p),c(d,"touchmove",q),c(d,"touchend",r)),b.simulateTouch&&(c(d,"mousedown",p),c(document,"mousemove",q),c(document,"mouseup",r))),b.autoResize&&c(window,"resize",D.resizeFix),h(),b.paginationClickable&&x(),b.mousewheelControl&&D._wheelEvent&&c(D.container,D._wheelEvent,j),b.keyboardControl&&c(document,"keydown",i),b.autoplay&&D.stopAutoplay(),a){D.wrapper.removeAttribute("style");for(var e=0;e<D.slides.length;e++)D.slides[e].removeAttribute("style")}D.callPlugins("onDestroy"),window.jQuery&&window.jQuery(D.container).data("swiper")&&window.jQuery(D.container).removeData("swiper"),window.Zepto&&window.Zepto(D.container).data("swiper")&&window.Zepto(D.container).removeData("swiper"),D=null},D.disableKeyboardControl=function(){b.keyboardControl=!1,D.h.removeEventListener(document,"keydown",i)},D.enableKeyboardControl=function(){b.keyboardControl=!0,D.h.addEventListener(document,"keydown",i)};var V=(new Date).getTime();if(D.disableMousewheelControl=function(){return D._wheelEvent?(b.mousewheelControl=!1,D.h.removeEventListener(D.container,D._wheelEvent,j),!0):!1},D.enableMousewheelControl=function(){return D._wheelEvent?(b.mousewheelControl=!0,D.h.addEventListener(D.container,D._wheelEvent,j),!0):!1},b.grabCursor){var W=D.container.style;W.cursor="move",W.cursor="grab",W.cursor="-moz-grab",W.cursor="-webkit-grab"}D.allowSlideClick=!0,D.allowLinks=!0;var X,Y,Z,$=!1,_=!0;D.swipeNext=function(a,c){"undefined"==typeof a&&(a=!0),!c&&b.loop&&D.fixLoop(),!c&&b.autoplay&&D.stopAutoplay(!0),D.callPlugins("onSwipeNext");var d=D.getWrapperTranslate().toFixed(2),f=d;if("auto"===b.slidesPerView){for(var g=0;g<D.snapGrid.length;g++)if(-d>=D.snapGrid[g].toFixed(2)&&-d<D.snapGrid[g+1].toFixed(2)){f=-D.snapGrid[g+1];break}}else{var h=F*b.slidesPerGroup;f=-(Math.floor(Math.abs(d)/Math.floor(h))*h+h)}return f<-e()&&(f=-e()),f===d?!1:(v(f,"next",{runCallbacks:a}),!0)},D.swipePrev=function(a,c){"undefined"==typeof a&&(a=!0),!c&&b.loop&&D.fixLoop(),!c&&b.autoplay&&D.stopAutoplay(!0),D.callPlugins("onSwipePrev");var d,e=Math.ceil(D.getWrapperTranslate());if("auto"===b.slidesPerView){d=0;for(var f=1;f<D.snapGrid.length;f++){if(-e===D.snapGrid[f]){d=-D.snapGrid[f-1];break}if(-e>D.snapGrid[f]&&-e<D.snapGrid[f+1]){d=-D.snapGrid[f];break}}}else{var g=F*b.slidesPerGroup;d=-(Math.ceil(-e/g)-1)*g}return d>0&&(d=0),d===e?!1:(v(d,"prev",{runCallbacks:a}),!0)},D.swipeReset=function(a){"undefined"==typeof a&&(a=!0),D.callPlugins("onSwipeReset");{var c,d=D.getWrapperTranslate(),f=F*b.slidesPerGroup;-e()}if("auto"===b.slidesPerView){c=0;for(var g=0;g<D.snapGrid.length;g++){if(-d===D.snapGrid[g])return;if(-d>=D.snapGrid[g]&&-d<D.snapGrid[g+1]){c=D.positions.diff>0?-D.snapGrid[g+1]:-D.snapGrid[g];break}}-d>=D.snapGrid[D.snapGrid.length-1]&&(c=-D.snapGrid[D.snapGrid.length-1]),d<=-e()&&(c=-e())}else c=0>d?Math.round(d/f)*f:0,d<=-e()&&(c=-e());return b.scrollContainer&&(c=0>d?d:0),c<-e()&&(c=-e()),b.scrollContainer&&J>F&&(c=0),c===d?!1:(v(c,"reset",{runCallbacks:a}),!0)},D.swipeTo=function(a,c,d){a=parseInt(a,10),D.callPlugins("onSwipeTo",{index:a,speed:c}),b.loop&&(a+=D.loopedSlides);var f=D.getWrapperTranslate();if(!(a>D.slides.length-1||0>a)){var g;return g="auto"===b.slidesPerView?-D.slidesGrid[a]:-a*F,g<-e()&&(g=-e()),g===f?!1:("undefined"==typeof d&&(d=!0),v(g,"to",{index:a,speed:c,runCallbacks:d}),!0)}},D._queueStartCallbacks=!1,D._queueEndCallbacks=!1,D.updateActiveSlide=function(a){if(D.initialized&&0!==D.slides.length){D.previousIndex=D.activeIndex,"undefined"==typeof a&&(a=D.getWrapperTranslate()),a>0&&(a=0);var c;if("auto"===b.slidesPerView){if(D.activeIndex=D.slidesGrid.indexOf(-a),D.activeIndex<0){for(c=0;c<D.slidesGrid.length-1&&!(-a>D.slidesGrid[c]&&-a<D.slidesGrid[c+1]);c++);var d=Math.abs(D.slidesGrid[c]+a),e=Math.abs(D.slidesGrid[c+1]+a);
D.activeIndex=e>=d?c:c+1}}else D.activeIndex=Math[b.visibilityFullFit?"ceil":"round"](-a/F);if(D.activeIndex===D.slides.length&&(D.activeIndex=D.slides.length-1),D.activeIndex<0&&(D.activeIndex=0),D.slides[D.activeIndex]){if(D.calcVisibleSlides(a),D.support.classList){var f;for(c=0;c<D.slides.length;c++)f=D.slides[c],f.classList.remove(b.slideActiveClass),D.visibleSlides.indexOf(f)>=0?f.classList.add(b.slideVisibleClass):f.classList.remove(b.slideVisibleClass);D.slides[D.activeIndex].classList.add(b.slideActiveClass)}else{var g=new RegExp("\\s*"+b.slideActiveClass),h=new RegExp("\\s*"+b.slideVisibleClass);for(c=0;c<D.slides.length;c++)D.slides[c].className=D.slides[c].className.replace(g,"").replace(h,""),D.visibleSlides.indexOf(D.slides[c])>=0&&(D.slides[c].className+=" "+b.slideVisibleClass);D.slides[D.activeIndex].className+=" "+b.slideActiveClass}if(b.loop){var i=D.loopedSlides;D.activeLoopIndex=D.activeIndex-i,D.activeLoopIndex>=D.slides.length-2*i&&(D.activeLoopIndex=D.slides.length-2*i-D.activeLoopIndex),D.activeLoopIndex<0&&(D.activeLoopIndex=D.slides.length-2*i+D.activeLoopIndex),D.activeLoopIndex<0&&(D.activeLoopIndex=0)}else D.activeLoopIndex=D.activeIndex;b.pagination&&D.updatePagination(a)}}},D.createPagination=function(a){if(b.paginationClickable&&D.paginationButtons&&x(),D.paginationContainer=b.pagination.nodeType?b.pagination:c(b.pagination)[0],b.createPagination){var d="",e=D.slides.length,f=e;b.loop&&(f-=2*D.loopedSlides);for(var g=0;f>g;g++)d+="<"+b.paginationElement+' class="'+b.paginationElementClass+'"></'+b.paginationElement+">";D.paginationContainer.innerHTML=d}D.paginationButtons=c("."+b.paginationElementClass,D.paginationContainer),a||D.updatePagination(),D.callPlugins("onCreatePagination"),b.paginationClickable&&y()},D.updatePagination=function(a){if(b.pagination&&!(D.slides.length<1)){var d=c("."+b.paginationActiveClass,D.paginationContainer);if(d){var e=D.paginationButtons;if(0!==e.length){for(var f=0;f<e.length;f++)e[f].className=b.paginationElementClass;var g=b.loop?D.loopedSlides:0;if(b.paginationAsRange){D.visibleSlides||D.calcVisibleSlides(a);var h,i=[];for(h=0;h<D.visibleSlides.length;h++){var j=D.slides.indexOf(D.visibleSlides[h])-g;b.loop&&0>j&&(j=D.slides.length-2*D.loopedSlides+j),b.loop&&j>=D.slides.length-2*D.loopedSlides&&(j=D.slides.length-2*D.loopedSlides-j,j=Math.abs(j)),i.push(j)}for(h=0;h<i.length;h++)e[i[h]]&&(e[i[h]].className+=" "+b.paginationVisibleClass);b.loop?void 0!==e[D.activeLoopIndex]&&(e[D.activeLoopIndex].className+=" "+b.paginationActiveClass):e[D.activeIndex]&&(e[D.activeIndex].className+=" "+b.paginationActiveClass)}else b.loop?e[D.activeLoopIndex]&&(e[D.activeLoopIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass):e[D.activeIndex]&&(e[D.activeIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass)}}}},D.calcVisibleSlides=function(a){var c=[],d=0,e=0,f=0;N&&D.wrapperLeft>0&&(a+=D.wrapperLeft),!N&&D.wrapperTop>0&&(a+=D.wrapperTop);for(var g=0;g<D.slides.length;g++){d+=e,e="auto"===b.slidesPerView?N?D.h.getWidth(D.slides[g],!0,b.roundLengths):D.h.getHeight(D.slides[g],!0,b.roundLengths):F,f=d+e;var h=!1;b.visibilityFullFit?(d>=-a&&-a+J>=f&&(h=!0),-a>=d&&f>=-a+J&&(h=!0)):(f>-a&&-a+J>=f&&(h=!0),d>=-a&&-a+J>d&&(h=!0),-a>d&&f>-a+J&&(h=!0)),h&&c.push(D.slides[g])}0===c.length&&(c=[D.slides[D.activeIndex]]),D.visibleSlides=c};var ab,bb;D.startAutoplay=function(){if(D.support.transitions){if("undefined"!=typeof ab)return!1;if(!b.autoplay)return;D.callPlugins("onAutoplayStart"),b.onAutoplayStart&&D.fireCallback(b.onAutoplayStart,D),A()}else{if("undefined"!=typeof bb)return!1;if(!b.autoplay)return;D.callPlugins("onAutoplayStart"),b.onAutoplayStart&&D.fireCallback(b.onAutoplayStart,D),bb=setInterval(function(){b.loop?(D.fixLoop(),D.swipeNext(!0,!0)):D.swipeNext(!0,!0)||(b.autoplayStopOnLast?(clearInterval(bb),bb=void 0):D.swipeTo(0))},b.autoplay)}},D.stopAutoplay=function(a){if(D.support.transitions){if(!ab)return;ab&&clearTimeout(ab),ab=void 0,a&&!b.autoplayDisableOnInteraction&&D.wrapperTransitionEnd(function(){A()}),D.callPlugins("onAutoplayStop"),b.onAutoplayStop&&D.fireCallback(b.onAutoplayStop,D)}else bb&&clearInterval(bb),bb=void 0,D.callPlugins("onAutoplayStop"),b.onAutoplayStop&&D.fireCallback(b.onAutoplayStop,D)},D.loopCreated=!1,D.removeLoopedSlides=function(){if(D.loopCreated)for(var a=0;a<D.slides.length;a++)D.slides[a].getData("looped")===!0&&D.wrapper.removeChild(D.slides[a])},D.createLoop=function(){if(0!==D.slides.length){D.loopedSlides="auto"===b.slidesPerView?b.loopedSlides||1:b.slidesPerView+b.loopAdditionalSlides,D.loopedSlides>D.slides.length&&(D.loopedSlides=D.slides.length);var a,c="",d="",e="",f=D.slides.length,g=Math.floor(D.loopedSlides/f),h=D.loopedSlides%f;for(a=0;g*f>a;a++){var i=a;if(a>=f){var j=Math.floor(a/f);i=a-f*j}e+=D.slides[i].outerHTML}for(a=0;h>a;a++)d+=u(b.slideDuplicateClass,D.slides[a].outerHTML);for(a=f-h;f>a;a++)c+=u(b.slideDuplicateClass,D.slides[a].outerHTML);var k=c+e+E.innerHTML+e+d;for(E.innerHTML=k,D.loopCreated=!0,D.calcSlides(),a=0;a<D.slides.length;a++)(a<D.loopedSlides||a>=D.slides.length-D.loopedSlides)&&D.slides[a].setData("looped",!0);D.callPlugins("onCreateLoop")}},D.fixLoop=function(){var a;D.activeIndex<D.loopedSlides?(a=D.slides.length-3*D.loopedSlides+D.activeIndex,D.swipeTo(a,0,!1)):("auto"===b.slidesPerView&&D.activeIndex>=2*D.loopedSlides||D.activeIndex>D.slides.length-2*b.slidesPerView)&&(a=-D.slides.length+D.activeIndex+D.loopedSlides,D.swipeTo(a,0,!1))},D.loadSlides=function(){var a="";D.activeLoaderIndex=0;for(var c=b.loader.slides,d=b.loader.loadAllSlides?c.length:b.slidesPerView*(1+b.loader.surroundGroups),e=0;d>e;e++)a+="outer"===b.loader.slidesHTMLType?c[e]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+e+'">'+c[e]+"</"+b.slideElement+">";D.wrapper.innerHTML=a,D.calcSlides(!0),b.loader.loadAllSlides||D.wrapperTransitionEnd(D.reloadSlides,!0)},D.reloadSlides=function(){var a=b.loader.slides,c=parseInt(D.activeSlide().data("swiperindex"),10);if(!(0>c||c>a.length-1)){D.activeLoaderIndex=c;var d=Math.max(0,c-b.slidesPerView*b.loader.surroundGroups),e=Math.min(c+b.slidesPerView*(1+b.loader.surroundGroups)-1,a.length-1);if(c>0){var f=-F*(c-d);D.setWrapperTranslate(f),D.setWrapperTransition(0)}var g;if("reload"===b.loader.logic){D.wrapper.innerHTML="";var h="";for(g=d;e>=g;g++)h+="outer"===b.loader.slidesHTMLType?a[g]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+g+'">'+a[g]+"</"+b.slideElement+">";D.wrapper.innerHTML=h}else{var i=1e3,j=0;for(g=0;g<D.slides.length;g++){var k=D.slides[g].data("swiperindex");d>k||k>e?D.wrapper.removeChild(D.slides[g]):(i=Math.min(k,i),j=Math.max(k,j))}for(g=d;e>=g;g++){var l;i>g&&(l=document.createElement(b.slideElement),l.className=b.slideClass,l.setAttribute("data-swiperindex",g),l.innerHTML=a[g],D.wrapper.insertBefore(l,D.wrapper.firstChild)),g>j&&(l=document.createElement(b.slideElement),l.className=b.slideClass,l.setAttribute("data-swiperindex",g),l.innerHTML=a[g],D.wrapper.appendChild(l))}}D.reInit(!0)}},B()}};Swiper.prototype={plugins:{},wrapperTransitionEnd:function(a,b){"use strict";function c(h){if(h.target===f&&(a(e),e.params.queueEndCallbacks&&(e._queueEndCallbacks=!1),!b))for(d=0;d<g.length;d++)e.h.removeEventListener(f,g[d],c)}var d,e=this,f=e.wrapper,g=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"];if(a)for(d=0;d<g.length;d++)e.h.addEventListener(f,g[d],c)},getWrapperTranslate:function(a){"use strict";var b,c,d,e,f=this.wrapper;return"undefined"==typeof a&&(a="horizontal"===this.params.mode?"x":"y"),this.support.transforms&&this.params.useCSS3Transforms?(d=window.getComputedStyle(f,null),window.WebKitCSSMatrix?e=new WebKitCSSMatrix("none"===d.webkitTransform?"":d.webkitTransform):(e=d.MozTransform||d.OTransform||d.MsTransform||d.msTransform||d.transform||d.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),b=e.toString().split(",")),"x"===a&&(c=window.WebKitCSSMatrix?e.m41:parseFloat(16===b.length?b[12]:b[4])),"y"===a&&(c=window.WebKitCSSMatrix?e.m42:parseFloat(16===b.length?b[13]:b[5]))):("x"===a&&(c=parseFloat(f.style.left,10)||0),"y"===a&&(c=parseFloat(f.style.top,10)||0)),c||0},setWrapperTranslate:function(a,b,c){"use strict";var d,e=this.wrapper.style,f={x:0,y:0,z:0};3===arguments.length?(f.x=a,f.y=b,f.z=c):("undefined"==typeof b&&(b="horizontal"===this.params.mode?"x":"y"),f[b]=a),this.support.transforms&&this.params.useCSS3Transforms?(d=this.support.transforms3d?"translate3d("+f.x+"px, "+f.y+"px, "+f.z+"px)":"translate("+f.x+"px, "+f.y+"px)",e.webkitTransform=e.MsTransform=e.msTransform=e.MozTransform=e.OTransform=e.transform=d):(e.left=f.x+"px",e.top=f.y+"px"),this.callPlugins("onSetWrapperTransform",f),this.params.onSetWrapperTransform&&this.fireCallback(this.params.onSetWrapperTransform,this,f)},setWrapperTransition:function(a){"use strict";var b=this.wrapper.style;b.webkitTransitionDuration=b.MsTransitionDuration=b.msTransitionDuration=b.MozTransitionDuration=b.OTransitionDuration=b.transitionDuration=a/1e3+"s",this.callPlugins("onSetWrapperTransition",{duration:a}),this.params.onSetWrapperTransition&&this.fireCallback(this.params.onSetWrapperTransition,this,a)},h:{getWidth:function(a,b,c){"use strict";var d=window.getComputedStyle(a,null).getPropertyValue("width"),e=parseFloat(d);return(isNaN(e)||d.indexOf("%")>0||0>e)&&(e=a.offsetWidth-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),b&&(e+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),c?Math.ceil(e):e},getHeight:function(a,b,c){"use strict";if(b)return a.offsetHeight;var d=window.getComputedStyle(a,null).getPropertyValue("height"),e=parseFloat(d);return(isNaN(e)||d.indexOf("%")>0||0>e)&&(e=a.offsetHeight-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),b&&(e+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),c?Math.ceil(e):e},getOffset:function(a){"use strict";var b=a.getBoundingClientRect(),c=document.body,d=a.clientTop||c.clientTop||0,e=a.clientLeft||c.clientLeft||0,f=window.pageYOffset||a.scrollTop,g=window.pageXOffset||a.scrollLeft;return document.documentElement&&!window.pageYOffset&&(f=document.documentElement.scrollTop,g=document.documentElement.scrollLeft),{top:b.top+f-d,left:b.left+g-e}},windowWidth:function(){"use strict";return window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:void 0},windowHeight:function(){"use strict";return window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:void 0},windowScroll:function(){"use strict";return"undefined"!=typeof pageYOffset?{left:window.pageXOffset,top:window.pageYOffset}:document.documentElement?{left:document.documentElement.scrollLeft,top:document.documentElement.scrollTop}:void 0},addEventListener:function(a,b,c,d){"use strict";"undefined"==typeof d&&(d=!1),a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},removeEventListener:function(a,b,c,d){"use strict";"undefined"==typeof d&&(d=!1),a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)}},setTransform:function(a,b){"use strict";var c=a.style;c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=b},setTranslate:function(a,b){"use strict";var c=a.style,d={x:b.x||0,y:b.y||0,z:b.z||0},e=this.support.transforms3d?"translate3d("+d.x+"px,"+d.y+"px,"+d.z+"px)":"translate("+d.x+"px,"+d.y+"px)";c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=e,this.support.transforms||(c.left=d.x+"px",c.top=d.y+"px")},setTransition:function(a,b){"use strict";var c=a.style;c.webkitTransitionDuration=c.MsTransitionDuration=c.msTransitionDuration=c.MozTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms"},support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){"use strict";return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){"use strict";var a=document.createElement("div").style;return"webkitPerspective"in a||"MozPerspective"in a||"OPerspective"in a||"MsPerspective"in a||"perspective"in a}(),transforms:window.Modernizr&&Modernizr.csstransforms===!0||function(){"use strict";var a=document.createElement("div").style;return"transform"in a||"WebkitTransform"in a||"MozTransform"in a||"msTransform"in a||"MsTransform"in a||"OTransform"in a}(),transitions:window.Modernizr&&Modernizr.csstransitions===!0||function(){"use strict";var a=document.createElement("div").style;return"transition"in a||"WebkitTransition"in a||"MozTransition"in a||"msTransition"in a||"MsTransition"in a||"OTransition"in a}(),classList:function(){"use strict";var a=document.createElement("div");return"classList"in a}()},browser:{ie8:function(){"use strict";var a=-1;if("Microsoft Internet Explorer"===navigator.appName){var b=navigator.userAgent,c=new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);null!==c.exec(b)&&(a=parseFloat(RegExp.$1))}return-1!==a&&9>a}(),ie10:window.navigator.msPointerEnabled,ie11:window.navigator.pointerEnabled}},(window.jQuery||window.Zepto)&&!function(a){"use strict";a.fn.swiper=function(b){var c;return this.each(function(d){var e=a(this),f=new Swiper(e[0],b);d||(c=f),e.data("swiper",f)}),c}}(window.jQuery||window.Zepto),"undefined"!=typeof module&&(module.exports=Swiper),"function"==typeof define&&define.amd&&define([],function(){"use strict";return Swiper});
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

/*touchSlider*/
(function($){$.fn.touchSlider=function(settings){settings.supportsCssTransitions=(function(style){var prefixes=["Webkit","Moz","Ms"];for(var i=0,l=prefixes.length;i<l;i++){if(typeof style[prefixes[i]+"Transition"]!=="undefined"){return true}}return false})(document.createElement("div").style);settings=jQuery.extend({roll:true,flexible:false,btn_prev:null,btn_next:null,paging:null,speed:75,view:1,range:0.15,page:1,transition:false,initComplete:null,counter:null,multi:false},settings);var opts=[];opts=$.extend({},$.fn.touchSlider.defaults,settings);return this.each(function(){$.fn.extend(this,touchSlider);var _this=this;this.opts=opts;this._view=this.opts.view;this._speed=this.opts.speed;this._tg=$(this);this._list=this._tg.children().children();this._width=parseInt(this._tg.css("width"));this._item_w=parseInt(this._list.css("width"));this._len=this._list.length;this._range=this.opts.range*this._width;this._pos=[];this._start=[];this._startX=0;this._startY=0;this._left=0;this._top=0;this._drag=false;this._scroll=false;this._btn_prev;this._btn_next;this.init();$(this).bind("touchstart",this.touchstart).bind("touchmove",this.touchmove).bind("touchend",this.touchend).bind("dragstart",this.touchstart).bind("drag",this.touchmove).bind("dragend",this.touchend);$(window).bind("orientationchange resize",function(){_this.resize(_this)})})};var touchSlider={init:function(){var _this=this;$(this).children().css({"width":this._width+"px","overflow":"visible"});if(this.opts.flexible){this._item_w=this._width/this._view}if(this.opts.roll){this._len=Math.ceil(this._len/this._view)*this._view}var page_gap=(this.opts.page>1&&this.opts.page<=this._len)?(this.opts.page-1)*this._item_w:0;for(var i=0;i<this._len;++i){this._pos[i]=this._item_w*i-page_gap;this._start[i]=this._pos[i];this._list.eq(i).css({"float":"none","display":"block","position":"absolute","top":"0","left":this._pos[i]+"px","width":this._item_w+"px"});if(this.opts.supportsCssTransitions&&this.opts.transition){this._list.eq(i).css({"-moz-transition":"0ms","-moz-transform":"","-ms-transition":"0ms","-ms-transform":"","-webkit-transition":"0ms","-webkit-transform":"","transition":"0ms","transform":""})}}if(this.opts.btn_prev&&this.opts.btn_next){this.opts.btn_prev.bind("click",function(){_this.animate(1,true);return false});this.opts.btn_next.bind("click",function(){_this.animate(-1,true);return false})}if(this.opts.paging){$(this._list).each(function(i,el){var btn_page=_this.opts.paging.eq(i);btn_page.bind("click",function(e){_this.go_page(i,e);return false})})}this.counter();this.initComplete()},initComplete:function(){if(typeof(this.opts.initComplete)=="function"){this.opts.initComplete(this)}},resize:function(e){if(e.opts.flexible){var tmp_w=e._item_w;e._width=parseInt(e._tg.css("width"));e._item_w=e._width/e._view;e._range=e.opts.range*e._width;for(var i=0;i<e._len;++i){e._pos[i]=e._pos[i]/tmp_w*e._item_w;e._start[i]=e._start[i]/tmp_w*e._item_w;e._list.eq(i).css({"left":e._pos[i]+"px","width":e._item_w+"px"});if(this.opts.supportsCssTransitions&&this.opts.transition){e._list.eq(i).css({"-moz-transition":"0ms","-moz-transform":"","-ms-transition":"0ms","-ms-transform":"","-webkit-transition":"0ms","-webkit-transform":"","transition":"0ms","transform":""})}}}this.counter()},touchstart:function(e){if((e.type=="touchstart"&&e.originalEvent.touches.length<=1)||e.type=="dragstart"){this._startX=e.pageX||e.originalEvent.touches[0].pageX;this._startY=e.pageY||e.originalEvent.touches[0].pageY;this._scroll=false;this._start=[];for(var i=0;i<this._len;++i){this._start[i]=this._pos[i]}}},touchmove:function(e){if((e.type=="touchmove"&&e.originalEvent.touches.length<=1)||e.type=="drag"){this._left=(e.pageX||e.originalEvent.touches[0].pageX)-this._startX;this._top=(e.pageY||e.originalEvent.touches[0].pageY)-this._startY;var w=this._left<0?this._left*-1:this._left;var h=this._top<0?this._top*-1:this._top;if(w<h||this._scroll){this._left=0;this._drag=false;this._scroll=true}else{e.preventDefault();this._drag=true;this._scroll=false;this.position(e)}for(var i=0;i<this._len;++i){var tmp=this._start[i]+this._left;if(this.opts.supportsCssTransitions&&this.opts.transition){var trans="translate3d("+tmp+"px,0,0)";this._list.eq(i).css({"left":"","-moz-transition":"0ms","-moz-transform":trans,"-ms-transition":"0ms","-ms-transform":trans,"-webkit-transition":"0ms","-webkit-transform":trans,"transition":"0ms","transform":trans})}else{this._list.eq(i).css("left",tmp+"px")}this._pos[i]=tmp}}},touchend:function(e){if((e.type=="touchend"&&e.originalEvent.touches.length<=1)||e.type=="dragend"){if(this._scroll){this._drag=false;this._scroll=false;return false}this.animate(this.direction());this._drag=false;this._scroll=false}},position:function(d){var gap=this._view*this._item_w;if(d==-1||d==1){this._startX=0;this._start=[];for(var i=0;i<this._len;++i){this._start[i]=this._pos[i]}this._left=d*gap}else{if(this._left>gap){this._left=gap}if(this._left<-gap){this._left=-gap}}if(this.opts.roll){var tmp_pos=[];
for(var i=0;i<this._len;++i){tmp_pos[i]=this._pos[i]}tmp_pos.sort(function(a,b){return a-b});var max_chk=tmp_pos[this._len-this._view];var p_min=$.inArray(tmp_pos[0],this._pos);var p_max=$.inArray(max_chk,this._pos);if(this._view<=1){max_chk=this._len-1}if(this.opts.multi){if((d==1&&tmp_pos[0]>=0)||(this._drag&&tmp_pos[0]>=100)){for(var i=0;i<this._view;++i,++p_min,++p_max){this._start[p_max]=this._start[p_min]-gap;this._list.eq(p_max).css("left",this._start[p_max]+"px")}}else{if((d==-1&&tmp_pos[0]<=0)||(this._drag&&tmp_pos[0]<=-100)){for(var i=0;i<this._view;++i,++p_min,++p_max){this._start[p_min]=this._start[p_max]+gap;this._list.eq(p_min).css("left",this._start[p_min]+"px")}}}}else{if((d==1&&tmp_pos[0]>=0)||(this._drag&&tmp_pos[0]>0)){for(var i=0;i<this._view;++i,++p_min,++p_max){this._start[p_max]=this._start[p_min]-gap;this._list.eq(p_max).css("left",this._start[p_max]+"px")}}else{if((d==-1&&tmp_pos[max_chk]<=0)||(this._drag&&tmp_pos[max_chk]<=0)){for(var i=0;i<this._view;++i,++p_min,++p_max){this._start[p_min]=this._start[p_max]+gap;this._list.eq(p_min).css("left",this._start[p_min]+"px")}}}}}else{if(this.limit_chk()){this._left=this._left/2}}},animate:function(d,btn_click){if(this._drag||!this._scroll||btn_click){var _this=this;var speed=this._speed;if(btn_click){this.position(d)}var gap=d*(this._item_w*this._view);if(this._left==0||(!this.opts.roll&&this.limit_chk())){gap=0}this._list.each(function(i,el){_this._pos[i]=_this._start[i]+gap;if(_this.opts.supportsCssTransitions&&_this.opts.transition){var transition=speed+"ms";var transform="translate3d("+_this._pos[i]+"px,0,0)";if(btn_click){transition="0ms"}$(this).css({"left":"","-moz-transition":transition,"-moz-transform":transform,"-ms-transition":transition,"-ms-transform":transform,"-webkit-transition":transition,"-webkit-transform":transform,"transition":transition,"transform":transform})}else{$(this).stop();$(this).animate({"left":_this._pos[i]+"px"},speed)}});this.counter()}},direction:function(){var r=0;if(this._left<-(this._range)){r=-1}else{if(this._left>this._range){r=1}}if(!this._drag||this._scroll){r=0}return r},limit_chk:function(){var last_p=parseInt((this._len-1)/this._view)*this._view;return((this._start[0]==0&&this._left>0)||(this._start[last_p]==0&&this._left<0))},go_page:function(i,e){var crt=($.inArray(0,this._pos)/this._view)+1;var cal=crt-(i+1);while(cal!=0){if(cal<0){this.animate(-1,true);cal++}else{if(cal>0){this.animate(1,true);cal--}}}},counter:function(){if(typeof(this.opts.counter)=="function"){var param={total:Math.ceil(this._len/this._view),current:($.inArray(0,this._pos)/this._view)+1};this.opts.counter(param)}}}})(jQuery);
/*jquery.event.drag*/
(function(E){E.fn.drag=function(L,K,J){if(K){this.bind("dragstart",L)}if(J){this.bind("dragend",J)}return !L?this.trigger("drag"):this.bind("drag",K?K:L)};var A=E.event,B=A.special,F=B.drag={not:":input",distance:0,which:1,dragging:false,setup:function(J){J=E.extend({distance:F.distance,which:F.which,not:F.not},J||{});J.distance=I(J.distance);A.add(this,"mousedown",H,J);if(this.attachEvent){this.attachEvent("ondragstart",D)}},teardown:function(){A.remove(this,"mousedown",H);if(this===F.dragging){F.dragging=F.proxy=false}G(this,true);if(this.detachEvent){this.detachEvent("ondragstart",D)}}};B.dragstart=B.dragend={setup:function(){},teardown:function(){}};function H(L){var K=this,J,M=L.data||{};if(M.elem){K=L.dragTarget=M.elem;L.dragProxy=F.proxy||K;L.cursorOffsetX=M.pageX-M.left;L.cursorOffsetY=M.pageY-M.top;L.offsetX=L.pageX-L.cursorOffsetX;L.offsetY=L.pageY-L.cursorOffsetY}else{if(F.dragging||(M.which>0&&L.which!=M.which)||E(L.target).is(M.not)){return }}switch(L.type){case"mousedown":E.extend(M,E(K).offset(),{elem:K,target:L.target,pageX:L.pageX,pageY:L.pageY});A.add(document,"mousemove mouseup",H,M);G(K,false);F.dragging=null;return false;case !F.dragging&&"mousemove":if(I(L.pageX-M.pageX)+I(L.pageY-M.pageY)<M.distance){break}L.target=M.target;J=C(L,"dragstart",K);if(J!==false){F.dragging=K;F.proxy=L.dragProxy=E(J||K)[0]}case"mousemove":if(F.dragging){J=C(L,"drag",K);if(B.drop){B.drop.allowed=(J!==false);B.drop.handler(L)}if(J!==false){break}L.type="mouseup"}case"mouseup":A.remove(document,"mousemove mouseup",H);if(F.dragging){if(B.drop){B.drop.handler(L)}C(L,"dragend",K)}G(K,true);F.dragging=F.proxy=M.elem=false;break}return true}function C(M,K,L){M.type=K;var J=E.event.handle.call(L,M);return J===false?false:J||M.result}function I(J){return Math.pow(J,2)}function D(){return(F.dragging===false)}function G(K,J){if(!K){return }K.unselectable=J?"off":"on";K.onselectstart=function(){return J};if(K.style){K.style.MozUserSelect=J?"":"none"}}})(jQuery);
/*homelist mobiletab t-ul touchSlider*/