function int_nav_menu_height() {
	mobile_menu.css("max-height", 'auto'), $(window).width() <= 1024 ? $(".header").addClass("mobile-device") : $(window).width() > 1024 && $(".header").removeClass("mobile-device")
}
$(document).ready(function() {
	int_nav_menu_height()
}), $(window).resize(function() {
	int_nav_menu_height()
});
var mobile_menu_icon = $(".nav-mobile"),
	mobile_menu = $(".nav-menu");
mobile_menu_icon.click(function() {
	$(this).hasClass("active") ? $(this).hasClass("active") && (mobile_menu_icon.removeClass("active"), mobile_menu.removeClass("active")) : (mobile_menu_icon.addClass("active"), mobile_menu.addClass("active"))
});
var menu_Sub = $(".menu-has-sub"),
	menu_Sub_Li;
$(".mobile-device .menu-has-sub").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down"), menu_Sub.click(function() {
	return $(".header").hasClass("mobile-device") ? (menu_Sub_Li = $(this).parent("li:first"), menu_Sub_Li.hasClass("menu-opened") ? menu_Sub_Li.find(".sub-dropdown:first").slideUp(function() {
		menu_Sub_Li.removeClass("menu-opened"), menu_Sub_Li.find(".menu-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down")
	}) : ($(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up"), menu_Sub_Li.addClass("menu-opened"), menu_Sub_Li.find(".sub-dropdown:first").slideDown()), !1) : !1
}), menu_Sub_Li = menu_Sub.parent("li"), menu_Sub_Li.hover(function() {
	$(".header").hasClass("mobile-device") || $(this).find(".sub-dropdown:first").stop(!0, !0).fadeIn("fast")
}, function() {
	$(".header").hasClass("mobile-device") || $(this).find(".sub-dropdown:first").stop(!0, !0).delay(100).fadeOut("fast")
});