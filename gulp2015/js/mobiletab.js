/**
 * 
 * @authors TianZhihan (tzh@yiban.cn)
 * @date    2015-10-12 9:31:00
 * @version $Id$
 */
$(function(){
	$(".right li a").css({"font-size":"14px","font-style":"italic"});
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

scrollhome(".home_kv",".btn_pre",".btn_next",".t-ul",4,false);

});