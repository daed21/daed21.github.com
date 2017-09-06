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

