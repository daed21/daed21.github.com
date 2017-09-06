/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-08-03 17:39:06
 * @version $Id$
 */

$(function(){
	$(".choose_div").on('click',function() {
		$('.choose_div').removeClass('choose_div_on');
		$(this).addClass('choose_div_on');
	});
})
