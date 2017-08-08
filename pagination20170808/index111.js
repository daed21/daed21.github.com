define(function(require, exports) {
    var param = {},
        tplData = {};
    var init = function() {
        gohome();
    };

    //区县列表页
    var topcontent = function(){
      var items_per_page = 20; //当前分页 20
      var pageIndex= 0;
      var totalnum = 0;
      $.getUrlParam = function(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) return unescape(r[2]); return null;
      }

      var getaid  = function (){
        var curUrl = location.search,
            proidVal = '';
        if(curUrl){
          var cindex = curUrl.indexOf('aid');
          if(cindex > -1){
            proidVal = $.getUrlParam('aid');
          }
        }
        return proidVal;
      }

      getDataList(0);
      var pagination_gold=null;
      function getDataList(index){
       var pageIndex = index;
      $.ajax({
        type:'post',
        url:'/dianping/ajax/main/topics/ajax_jiariban.php',
        data:{action: 'list',page:pageIndex + 1,area:getaid()},
        dataType:"json",
        success:function(datas){
          $(".gold_pagination a").attr("href","javascript:;");
          $(".clist").html("");
           if(!getaid()){ 
            window.location.href="/dianping/topics/jiariban/index"; 
          }
          var click_sign = false;
          totalnum = datas.totalCount;
          if (pagination_gold == null) {
            pagination_gold = function(totalnum){
              $("#pagination_gold").pagination(totalnum, {
                num_edge_entries: 2, //边缘页数
                num_display_entries: 8, //主体页数
                items_per_page: 20, //每页显示20项
                prev_text: "<",
                next_text: ">",
                current_page : pageIndex,
                callback:function(pageIndex, jq) {
                  if (click_sign) {
                    getDataList(pageIndex);
                  }
                  if (click_sign == false) {
                    click_sign = true;
                    $(".gold_pagination a").attr("href","javascript:;");
                  }
                }
              });
            }
            pagination_gold(totalnum);
          }
          
          if(datas.contents.length>0){
            $(".nav_area,.h2_area").html(datas.areaName);
            $(".cinfo").html("共计发布"+datas.totalCount+"份简报");
            $.each(datas.contents,function(k,v){
                var clist ="";

                if(v.state){
                  mystate ="[NEW]";
                }else{ mystate ="";}

                 clist += "<li>\
                          <a href='/dianping/topics/jiariban/detail?id="+v.id+"' target='_blank' title='"+mystate+v.title+"'>\
                          <span class='con-tit'>"+mystate+v.title+"</span>\
                          <span class='con-date'>"+v.datetime.substr(0,10)+"</span>\
                          </a></li>";
                $(".clist").append(clist);
            });

          }else{
            
            $(".nav_area,.h2_area").html(datas.areaName);
            $(".cinfo").html("共计发布 0 份简报");
            $(".gold_pagination").html("");
            var nolist = "<li class='no-data'>暂无简报</li>";
             $(".clist").html(nolist);
          }
                 
        }, //success
        error:function(){  }
        }); //ajax
      } //getlist end
    } //area end

    //管理
    var topadmin = function(){

      $.getUrlParams = function(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) return unescape(r[2]); return null;
      }

      var getareaid  = function () {
        var curUrls = location.search,
            proidVals = '';
        if(curUrls){
          var cindexs = curUrls.indexOf('areaid');
          if(cindexs > -1){
            proidVals = $.getUrlParams('areaid');
          }
        }
        return proidVals;
      }

      var items_per_page = 20; //当前分页 20
      var pageIndex= 0;
      var totalnum = 0;

      //渲染下拉菜单 动态菜单
      $.ajax({
        type:'post',
        url:'/dianping/ajax/main/topics/ajax_jiariban.php',
        data:{action: 'homelist'},
        dataType:"json",
        success:function(datas){
              var dtsel = "";
              dtsel +="<option value='0'>请选择区县</option>";
            $.each(datas.areas,function(k,v){
              dtsel +="<option value="+v.id+">"+v.areaName+"</option>";
            });
            $(".mysel").append(dtsel);
            
            
            //超级管理菜单动态选中
            if(onlyaid==0){
                if(!getareaid()){window.location.href="/dianping/topics/jiariban/admin?areaid="+datas.areas[0].id; }
                if(getareaid()){
                  var alen = datas.areas.length -1;
                  getDataList(0,getareaid());
                  var nowid = getareaid();
                  $('.mysel option[value='+nowid+']').attr('selected','selected');
                  areaId = getareaid(); //全局区县
                  if(nowid>=parseInt(datas.areas[0].id) && nowid<=parseInt(datas.areas[alen].id)){
                    $(".b-wrap").show();
                  }else{$(".b-wrap").hide();}
                  //全部下载
                  $(".b-all a").attr("href",'/dianping/topics/jiariban/download?areaId='+nowid);
                }

            }else if(onlyaid>0){
                getDataList(0,onlyaid);
            }
                                
        }, //success
        error:function(){}
        }); //ajax

      //限制访问其他区县
      if(onlyaid>0){
        if(getareaid()){ window.location.href="/dianping/topics/jiariban/admin";}
      }

      //下拉菜单选择
      $(".mysel").change(function(){
          var sel = $(".mysel").val();
          window.location.href="/dianping/topics/jiariban/admin?areaid="+sel;
      
      });

      var pagination_gold=null;
      function getDataList(index,areaId){
       var pageIndex = index;
      $.ajax({
        type:'post',
        url:'/dianping/ajax/main/topics/ajax_jiariban.php',
        data:{action: 'list',page:pageIndex+1,area:areaId},
        dataType:"json",
        success:function(datas){
          $(".gold_pagination a").attr("href","javascript:;");
          $(".tlist").html("");
          var click_sign = false;
          totalnum = datas.totalCount;
          if (pagination_gold == null) {
            pagination_gold = function(totalnum){
              $("#pagination_gold").pagination(totalnum, {
                num_edge_entries: 2, //边缘页数
                num_display_entries: 8, //主体页数
                items_per_page: 20, //每页显示20项
                prev_text: "<",
                next_text: ">",
                current_page : pageIndex,
                callback:function(pageIndex, jq) {
                  if (click_sign) {
                    getDataList(pageIndex,areaId);
                  }
                  if (click_sign == false) {
                    click_sign = true;
                    $(".gold_pagination a").attr("href","javascript:;");
                  }
                }
              });
            }
            pagination_gold(totalnum);
          }
          
          if(datas.contents.length>0){ $(".b-wrap .b-all").show();
            $(".nav_area,.h2_area").html(datas.areaName);
            $(".cinfo").html("共计发布"+datas.totalCount+"份简报");
            $.each(datas.contents,function(k,v){
                var tlist ="";
                if(v.state){
                  mystate ="[NEW]";
                }else{ mystate ="";}
                 
                if(k%2==0){
                  tlist +="<li data-tid='"+v.id+"'>";
                }else{
                  tlist +="<li class='even' data-tid='"+v.id+"'>";
                }
                tlist +="<span class='s-title'><a href='/dianping/topics/jiariban/detail?id="+v.id+"' target='_blank' title='"+mystate+v.title+"'>"+mystate+"<em>"+v.title+"</em></a></span>\
                            <span class='s-view'>"+v.views+"</span>\
                            <span class='s-time'>"+v.datetime.substr(0,16)+"</span>\
                            <span class='s-operate'>\
                              <a href='javascript:;' class='s-edit'>编辑</a>\
                              <a href='javascript:;' class='s-del'>删除</a>\
                              <a href='"+v.file+"' class='s-down' target='_blank'>下载</a>\
                            </span>\
                            <input type='hidden' class='fname' value='"+v.file+"' />\
                          </li>";

                $(".tlist").append(tlist);
            });

          }else{
            if(areaId==0){$(".b-wrap .b-up").hide();}
            
            $(".nav_area,.h2_area").html(datas.areaName);
            $(".cinfo").html("共计发布 0 份简报");
            $(".gold_pagination").html("");
            var nolist = "<li class='no-data'>暂无简报</li>";
             $(".tlist").html(nolist);
             $(".b-wrap .b-all").hide();
          }                 
        }, //success
        error:function(){}
        }); //ajax
      } //getlist end

      //上传box关闭
      $(".close-up").click(function(){
        $(".myup,.boxbg").fadeOut();
      });
      //编辑关闭
      $(".close-edit").click(function(){
        $(".myedit,.boxbg").fadeOut();
      });

      //删除关闭
      $(".close-sure,.sure_cancel").click(function(){
        $(".mysure,.boxbg").fadeOut();
      });
      
      //上传
      $(".b-up a").click(function(){
        $(".uparea").val(areaId);
        $(".myup,.boxbg").fadeIn();
      });


      //上传
      $(".J_submitButton").click(function(){
/*            var browser = navigator.appName; 
            if(browser=="Netscape"){
              chroms();
            }else{ 
              if(navigator.userAgent.indexOf("MSIE")>0){iee();}else{chroms();}
            }*/
        var mytit = $("#ytit").val();
        var titlen = mytit.length;
 /*       $(".uparea").val(getareaid()); //区县值*/
        var myfile = $("#yfile").val();

          if(myfile){
                function findSize(){
                    var fileInput = $("#yfile").val();
                    var byteSize  =  $("#yfile")[0].files[0].size;
                    return ( Math.ceil(byteSize / 1024) ); // Size returned in KB.
                }
                var dfile = findSize(); //alert(dfile);
            }

            var pos = myfile.lastIndexOf("."); 
            var lastname = myfile.substring(pos,myfile.length);

        if(mytit==""){
          $(".y-tit").html("请填写简报标题");
        }else{
          if(titlen>30){
            $(".y-tit").html("标题最长不超过30个字符");
          }else{$(".y-tit").html("");}
        }

        if(myfile==""){
          $(".y-file").html("请上传文档");
        }else{$(".y-file").html("");}


         if(myfile==""){
          $(".y-file").html("请上传附件");
          }else if((lastname.toLowerCase() != ".doc" )&&(lastname.toLowerCase() != ".docx")){
            $(".y-file").html("文档格式为.doc或.docx");
          }else if(dfile >= 10240){
                  $(".y-file").html("请上传不超过10m的doc、docx");
          }else{$(".y-file").html("");}



        if(mytit!="" && titlen<=30 && myfile!="" && dfile < 10240 && ((lastname.toLowerCase() == ".doc" ) || (lastname.toLowerCase() == ".docx"))){
/*            var sub = "<span class='btn-sub'><a href='javascript:;'>上传中</a></span><span class='fsub'>正在上传，请耐心等待</span>"
            $(".form-btn").html(sub);*/
            $("#myform").submit();

        }
        
      }); //sub end

      $("#myform").validate({
        submitHandler: function(form){
            $(form).ajaxSubmit({
              success: function(ret) {
                  ret = eval("(" + ret + ")");
                if (ret.state == 1 && ret.msg != "上传成功") {
                    alert(ret.msg);
                } else {
                    $(".mytip .box_word").html("上传成功");
                    $(".mytip").fadeIn();
                    $(".myup").fadeOut();
                    $(".mytip .close-success").click(function(){
                      history.go(0);
                    });
                    
                }
              },
              error: function() {
                alert("网络错误，请稍后再试！");
              },
              complete: function() {
  
              }
            });
        }
      });

      //列表编辑
      $(".tlist").on("click",".s-operate .s-edit",function(){
          var parent = $(this).parent().parent();
          var tid = parent.attr("data-tid");
          var mytit = parent.find(".s-title a em").html();//简报标题
          var myfname = parent.find(".fname").val(); 
          //var myfname2 = myfname.match(/1\/(.*)/)[1];
          var mindex = myfname.lastIndexOf("\/");
          myfname = myfname.substring(mindex + 1,myfname.length); //文档名称

          $("#myform2 .tid").val(tid);
          $("#myform2 #ytit2").val(mytit);
          $("#myform2 .mfilename").html(myfname);
          $(".myedit,.boxbg").fadeIn();

      }); //edit end

      //编辑提交
      $(".btn-edit").click(function(){
          var mtit = $("#ytit2").val();
          var tid = $("#myform2 .tid").val();
          var mtitlen = mtit.length;

        if(mtit==""){
          $(".y-tit").html("请填写简报标题");
        }else{
          if(mtitlen>30){
            $(".y-tit").html("标题最长不超过30个字符");
          }else{$(".y-tit").html("");}
        }

        if(mtit!="" && mtitlen<=30){
            myform2ajax();
        }
        function myform2ajax(){
          $.ajax({
            type:'post',
            url:'/dianping/ajax/main/topics/ajax_jiariban.php',
            data:{action:'edit',id:tid,title:mtit},
            dataType:"json",
            success:function(datas){
              if(datas.status==1){
                $(".box_word").html("编辑成功");
                $(".myedit").fadeOut();
                $(".mytip").fadeIn();
              }else if(datas.status==0){alert(datas.message);}

              $(".close-success").click(function(){
                  $(".mytip,.boxbg").fadeOut();
                  //location.reload();
                  var pid = 0;
                  if($(".gold_pagination span.current").hasClass("prev")){
                      pid = 0;
                  }else if($(".gold_pagination span.current").hasClass("next")){
                      pid = $(".gold_pagination span.current.next").prev().text()-1;
                  }else {
                      pid = $(".gold_pagination span.current").html()-1;
                  }
                  getDataList(pid,areaId);
              });

            }, //success
            error:function(){ }
          }); //ajax
        }
      });

      //删除
      $(".tlist").on("click",".s-operate .s-del",function(){         
           $(".mysure,.boxbg").fadeIn();
            var tid =$(this).parent().parent().attr("data-tid");
            $(".mysure .sure_del").attr("data-del",tid);

      }); //del end

      $(".mysure").on("click",".sure_del",function(){
          var did = $(".mysure .sure_del").attr("data-del");
          $.ajax({
            type:'post',
            url:'/dianping/ajax/main/topics/ajax_jiariban.php',
            data:{action:'delete',id:did},
            dataType:"json",
            success:function(datas){
               if(datas.status==1){
                $(".box_word").html("删除成功");
                $(".mysure").fadeOut();
                $(".mytip").fadeIn();
              }else if(datas.status==0){alert(datas.message);}

              $(".close-success").click(function(){
                  $(".mytip,.boxbg").fadeOut();

                  var pid = 0;
                  if($(".gold_pagination span.current").hasClass("prev")){
                      pid = 0;
                  }else if($(".gold_pagination span.current").hasClass("next")){
                      pid = $(".gold_pagination span.current.next").prev().text()-1;
                  }else {
                      pid = $(".gold_pagination span.current").html()-1;
                  }
                  getDataList(pid,areaId);

              });

            }, //success
            error:function(){ }
            }); //ajax
      });

    } //admin end


    //首页
    var tophome = function(){
        if(power){
          $(".manage_btn span").css({"display":"block"});
        }else{
          $(".manage_btn span").css({"display":"none"});
        }

        $(".manage_btn span a").click(function(){
            if(power){
              window.location.href = "/dianping/topics/jiariban/admin";
            }
        });

        $(".t_act").myScroll({
            speed:50,
            rowHeight:32
        });
        //首页简报
        $.ajax({
        type:'post',
        url:'/dianping/ajax/main/topics/ajax_jiariban.php',
        data:{action: 'homelist'},
        dataType:"json",
        success:function(datas){

          if(datas.recommends.length<1){
              $(".t_act ul").html("<li class='no-data'>暂无简报</li>");
          }else{
            $.each(datas.recommends,function(k,v){
            var news = "";
            var mystate ="";
            /* if(v.state){
              mystate ="[NEW]";
            }else{ mystate ="";}*/
            news +="<li>\
                    <a href='/dianping/topics/jiariban/detail?id="+v.id+"' target='_blank' title='"+v.title+"'>\
                    <span class='t-info'>【"+v.areaName+"】"+v.title+"</span>\
                    <span class='t-date'>"+v.datetime.substr(0,10)+"</span>\
                    </a></li>";
            $(".t_act ul").append(news);
            }); 
          }

          $.each(datas.areas,function(a,e){
              var myarea = "";
              var myinfo = "";
            if(e.totalCount > 0 && e.state){
              myinfo ="[NEW]";
            }else{ myinfo ="";}
            
            var myq = "myq0";
            if(e.totalCount > 0){

              if(a>=0 && a<=3){
                myq = "myq1"; 
              }else if(a>=4 && a<=7){
                myq = "myq2";
              }else if(a>=8 && a<=11){
                myq = "myq3";            
              }else if(a>=12 && a<=15){
               myq = "myq4";            
              }else{
                myq = "myq0";             
              }
              myarea += "<li class='"+myq+"'><h4>"+e.areaName+"</h4>\
              <p class='qnum'><span>共计<em> "+e.totalCount+" </em>份简报</span><span><a href='/dianping/topics/jiariban/detail?id="+e.lastContentId+"' target='_blank' title='"+myinfo+e.lastContent+"'>"+myinfo+"&nbsp;"+e.lastContent+"</a></span></p>\
              <p class='qmore'><a href='/dianping/topics/jiariban/contents?aid="+e.id+"'>更多&gt;&gt;</a></p>\
              </li>";

            }else{
              myq = "myq0";
              myarea += "<li class='"+myq+"'><h4>"+e.areaName+"</h4>\
              <p class='qnum'><span>&nbsp;</span></p>\
              <p class='qmore'>更多&gt;&gt;</p>\
              </li>";
            }
              $(".arealist ul").append(myarea);
          });
        },
        error:function(){ }
        });

    } //tophome

    var gohome = function(){
      if($(".home_wrap").hasClass("myhome")){
        tophome();
      }
      if($(".home_wrap").hasClass("mycontent")){
        topcontent();
      }
      if($(".home_wrap").hasClass("myadmin")){
        topadmin();
      }
    }
    return init;
})
