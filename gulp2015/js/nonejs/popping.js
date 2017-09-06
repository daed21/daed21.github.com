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

