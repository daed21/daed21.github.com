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