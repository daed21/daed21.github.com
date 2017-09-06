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