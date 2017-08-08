$(function() {

    var pageIndex = 0;
    getDataList(pageIndex);
    var pagination_gold = null;
    function getDataList(index) {
        var pageIndex = index;
        $.post("http://www.21boya.cn/dianping/ajax/main/topics/ajax_jiariban.php", {
            action: 'list',
            page: pageIndex + 1,
            area: 22
        },
        function(datas) {
            $(".tlist").html("");

            var click_sign = false;
            totalnum = datas.totalCount;

            $.each(datas.contents,
            function(k, v) {
                var tlist = "";
                if (v.state) {
                    mystate = "[NEW]";
                } else {
                    mystate = "";
                }

                if (k % 2 == 0) {
                    tlist += "<li data-tid='" + v.id + "'>";
                } else {
                    tlist += "<li class='even' data-tid='" + v.id + "'>";
                }
                tlist += "<span class='s-title'><a href='http://www.21boya.cn/dianping/topics/jiariban/detail?id=" + v.id + "' target='_blank' title='" + mystate + v.title + "'>" + mystate + "<em>" + v.title + "</em></a></span>\
                              <span class='s-view'>" + v.views + "</span>\
                              <span class='s-time'>" + v.datetime.substr(0, 16) + "</span>\
                              <span class='s-operate'>\
                                <a href='javascript:;' class='s-edit'>编辑</a>\
                                <a href='javascript:;' class='s-del'>删除</a>\
                                <a href='" + v.file + "' class='s-down' target='_blank'>下载</a>\
                              </span>\
                              <input type='hidden' class='fname' value='" + v.file + "' />\
                            </li>";

                $(".tlist").append(tlist);

            });

            if (pagination_gold == null) {
                pagination_gold = function(totalnum) {
                    $("#pagination_gold").pagination(totalnum, {
                        num_edge_entries: 2,
                        //边缘页数
                        num_display_entries: 4,
                        //主体页数
                        items_per_page: 20,
                        //每页显示20项
                        prev_text: "<",
                        next_text: ">",
                        link_to: "javascript:;",
                        current_page: pageIndex,
                        callback: pageselectCallback
                    });
                }
                pagination_gold(totalnum, pageIndex);
            }

            function pageselectCallback(pageIndex, jq) {
                if (click_sign) {
                    getDataList(pageIndex);
                } else if (click_sign == false) {
                    click_sign = true;
                }
            }
            

            //分页只初始化1次
            /*  if($("#pagination_gold").html().length == ''){
                      pagination_gold(totalnum,pageIndex);
                   }*/

        },
        "json");
    }

                $(".edit_btn a").click(function(){
                    var goval = $(".ptext").val();
                    pagination_gold = null;
                     getDataList(goval-1);

                });
    
});