var
chatPopup,
popup = {
	show: function(obj){
		var shawl = $('.wrapper-popup-shawl'),
			popups = $(obj);
		$('html').css('overflow', 'hidden');
		$(shawl).show();
		$(popups).show();
		if(obj = '#terms'){
	    	$('#terms .scroll-pane').jScrollPane();
		}
	},
	hide: function(){
		var shawl = $('.wrapper-popup-shawl'),
			popups = $('.popupWrapper');

		$('html').css('overflow', 'auto');
		$(shawl).hide();
		$(popups).hide();
	},
	chat: function(){
		var chat = $('.chat-poup-wrapper'),
			auth = $('.popupReg-wrapper#fix');

		chatPopup = setTimeout(function(){
			chat.addClass('open');
			auth.addClass('mini');
		},15000)
	},
	chatPause: function() {
		clearTimeout(chatPopup);
	},
	init: function(){
		$(window).on('scroll', function(){
			if($(window).scrollTop() > 100) {
				$('.popupReg-wrapper#fix').addClass('mini-scroll');
			}else {
				$('.popupReg-wrapper#fix').removeClass('mini-scroll');
			}
		});
	}
}