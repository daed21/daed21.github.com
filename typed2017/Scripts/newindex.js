/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-08-22 15:29:50
 * @version $Id$
 */
$(function(){
	$.material.init();
});

// 页面滚动head样式更改
var desHei = $('.shetuan-work-des').offset().top;
var conHei = $('.shetuan-work-contact').offset().top;
var tur = true;
$(window).scroll(function(){
	var sHei = $(window).scrollTop();
	if (sHei > 0) {
		$('.header').addClass('header-fixed').addClass('header-prepare');
	}else{
		$('.header').removeClass('header-fixed').removeClass('header-prepare');
	};
  if(sHei >= (desHei-500)) {
      $('.dropdown').removeClass('active');
      $('.dropdown').eq(1).addClass('active');
      if(sHei > (conHei-500)) {
        $('.dropdown').removeClass('active');
        $('.dropdown').eq(2).addClass('active');
        if(tur){ numCount(); tur = false; } 
        // numCount();
      }
  }else{
      $('.dropdown').removeClass('active');
      $('.dropdown').eq(0).addClass('active');
  };
});
// 点击头部页面滚动到相应的位置
$('.shetuan-menubtn').click(function(){
    var $index = $(this).index();
    $('.dropdown').removeClass('active');
    $(this).addClass('active');
    if ($index == 0) {
        $("html,body").animate({scrollTop: 0},600);
    };
    if ($index == 1) {
        $("html,body").animate({scrollTop: desHei},600);
    };
    if ($index == 2) {
        $("html,body").animate({scrollTop: conHei},600);
    };
})
// 文字动态写入效果
$(".element").each(function(){
    var $this = $(this);
    $this.typed({
    strings: $this.attr('data-elements').split(','),
    typeSpeed: 200, // typing speed
    backDelay: 3000 // pause before backspacing
    });
});
// 数字变化效果
function numCount(){
    var shetuannum1 = $('.shetuan-numend1').val();
    var shetuannum2 = $('.shetuan-numend2').val();
    var shetuannum3 = $('.shetuan-numend3').val();
    $('.shetuan-num1').animateNumber(
      {
        number: shetuannum1,
        color: '#fff',
        'font-size': '62px',
        easing: 'easeInQuad'
      },
      5000
    );
    $('.shetuan-num2').animateNumber(
      {
        number: shetuannum2,
        color: '#fff',
        'font-size': '62px',
        easing: 'easeInQuad'
      },
      5000
    );
    $('.shetuan-num3').animateNumber(
      {
        number: shetuannum3,
        color: '#fff',
        'font-size': '62px',
        easing: 'easeInQuad'
      },
      5000
    );
}
// 点击再次发送
$('.shetuan-send-again').click(function(){
    $('.shetuan-send-success').fadeOut('fast');
    $('.shetuan-panel3').fadeIn('fast');
})
