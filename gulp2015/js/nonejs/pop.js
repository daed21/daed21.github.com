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

