<div id="mainChart" data-highcharts-chart="0"></div>

<div id="3dpie-chart" data-highcharts-chart="1"></div>

<div id="bar-chart" data-highcharts-chart="2"></div>

<div id="column-chart" data-highcharts-chart="3"></div>
<script>
	<script type="text/javascript">
   /* 
    g_data = {word_detail : [{word_date:'2016-05-01', count:'2000', class_id:'22', class_name:"娱乐"},
                            {word_date:'2016-05-02', count:'2500', class_id:'22', class_name:"娱乐"},
                            ],

            word_summary : {max_date:'2016-05-11', max_count:'3000', total_count: 0, average:'2000', mobile_ratio:'0.75'} ,
            product_distribution : [{product:'动态', ratio:'0.45'},
                {product:'聊天', ratio:'0.55'},
                ],

            province_distribution : [{province:'河南', ratio:'0.55'},
                {province:'河北', ratio:'0.45'}] ,

//                             male: ratio, female: ratio
            sex_distribution : {male: 0.55, female:0.45},

            header_data : {rank: 1, word: '开心', class_name:'暂无', word_count: 0}, 

            grade_distribution : [{grade: '大一', ratio:'0.55'},{grade: '大二', ratio:'0.15'},{grade: '大三', ratio:'0.1'},
                    {grade: '大四', ratio:'0.1'},{grade: '其他', ratio:'0.1'},]

        };
    */

word_detail = [{"word_date":"2016-07-01","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"821"},{"word_date":"2016-07-02","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1227"},{"word_date":"2016-07-03","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"921"},{"word_date":"2016-07-04","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1235"},{"word_date":"2016-07-05","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1494"},{"word_date":"2016-07-06","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1501"},{"word_date":"2016-07-07","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"633"},{"word_date":"2016-07-08","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1210"},{"word_date":"2016-07-09","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"769"},{"word_date":"2016-07-10","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"635"},{"word_date":"2016-07-11","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"820"},{"word_date":"2016-07-12","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"806"},{"word_date":"2016-07-13","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"999"},{"word_date":"2016-07-14","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"799"},{"word_date":"2016-07-15","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1140"},{"word_date":"2016-07-16","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1398"},{"word_date":"2016-07-17","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1098"},{"word_date":"2016-07-18","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1334"},{"word_date":"2016-07-19","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1290"},{"word_date":"2016-07-20","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1136"},{"word_date":"2016-07-21","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1650"},{"word_date":"2016-07-22","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"795"},{"word_date":"2016-07-23","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1009"},{"word_date":"2016-07-24","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1505"},{"word_date":"2016-07-25","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"940"},{"word_date":"2016-07-26","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"1127"},{"word_date":"2016-07-27","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"740"},{"word_date":"2016-07-28","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"896"},{"word_date":"2016-07-29","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"586"},{"word_date":"2016-07-30","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"505"},{"word_date":"2016-07-31","class_id":"7","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd","count":"569"}];platform_distribution = [{"platform":"mobile","count":"31545"},{"platform":"web","count":"43"}];province_distribution = [{"province":"\u5e7f\u897f","count":"16938"},{"province":"\u56db\u5ddd","count":"8767"},{"province":"\u798f\u5efa","count":"3662"},{"province":"\u5c71\u4e1c","count":"1288"},{"province":"\u7518\u8083","count":"244"},{"province":"\u91cd\u5e86","count":"204"},{"province":"\u6e56\u5317","count":"192"},{"province":"\u4e0a\u6d77","count":"138"},{"province":"","count":"87"},{"province":"\u5e7f\u4e1c","count":"24"},{"province":"\u9655\u897f","count":"21"},{"province":"\u5317\u4eac","count":"12"},{"province":"\u65b0\u7586\u751f\u4ea7\u5efa\u8bbe\u5175\u56e2","count":"6"},{"province":"\u8d35\u5dde","count":"3"},{"province":"\u6e56\u5357","count":"1"},{"province":"\u6d59\u6c5f","count":"1"}];sex_distribution = [{"sex":"F","count":"21975"},{"sex":"M","count":"9613"}];grade_distribution = [{"grade":"2","count":"25483"},{"grade":"3","count":"5730"},{"grade":"4","count":"253"},{"grade":"5","count":"57"},{"grade":"1","count":"39"},{"grade":"0","count":"26"}];product_distribution = [{"product":"chat","count":"31383"},{"product":"feeds","count":"105"},{"product":"vote","count":"88"},{"product":"forum","count":"11"},{"product":"blog","count":"1"}];header_data = {"rank":"1","word":"\u4e48\u4e48\u54d2","class_name":"\u7f51\u7edc\u65b0\u9c9c\u8bcd"};product_map = {"feeds":"\u52a8\u6001","chat":"\u65e5\u5e38","vote":"\u6295\u7968","forum":"\u5fae\u793e\u533a","blog":"\u8f7b\u535a\u5ba2","database":"\u9898\u5e93","file":"\u8d44\u6599\u5e93","fastBuild":"\u5feb\u642d","questionnaire":"\u8f7b\u95ee\u5377","app_piazza":"\u5e94\u7528\u5e7f\u573a"};time_start = '2016-07';time_end = '2016-08';
MAX_PROVINCE = 6; // 显示的省份数

// 将小数转为百分数格式,不包括%：
// input    0.3345667  
// output   33.46  

function formatPercenge(num){
    return Math.round(num*1000)/10;
}

/*word_detail : [{word_date:'2016-05-01', count:'2000'},{word_date:'2016-05-02', count:'2500'},]
*/
word_detail = (function(){

    var ts = (new Date(time_start)).valueOf();
    var te = (new Date(time_end)).valueOf();
    var details = [];
    var index = 0; 
    for (var ti = ts; ti < te; ti += 24*3600*1000) {
        var date = (new Date(ti)).toFormattedString('yyyy-MM-dd');   // "2001-02-03"

        if(index < word_detail.length && word_detail[index].word_date == date){
            details.push({word_date:date, count:word_detail[index].count});
            index += 1;
        } else {
            details.push({word_date:date, count:'0'});

        }
    }

    return details;

}());

word_summary= (function () {
    MOBILE_PLATFORM = 'mobile';

    var summary = {max_date:'', max_count:0, total_count: 0, average: 0, mobile_ratio:0};
    var sum_count = 0;
    for (var i = word_detail.length - 1; i >= 0; i--) {
        var item = word_detail[i];
        var icount = parseInt(item.count);
        sum_count += icount;
        if (icount > summary.max_count) {
            summary.max_count = icount;
            summary.max_date = item.word_date;
        }        
    }

    summary.total_count = sum_count;
    summary.average = Math.round(sum_count / word_detail.length);

    sum_count = 0;
    mobile_count = 0;
    for (var i = platform_distribution.length - 1; i >= 0; i--) {
        var item = platform_distribution[i];
        var icount = parseInt(item.count);
        sum_count += icount;
        if (item.platform == MOBILE_PLATFORM) {
            mobile_count += icount;
        } 
    }

    summary.mobile_ratio = formatPercenge(mobile_count / sum_count );    

    return summary;

}());

province_distribution = province_distribution.slice(0, MAX_PROVINCE);
province_distribution = province_distribution.filter(function (item) {return item.province != '';});

for (var i = province_distribution.length - 1; i >= 0; i--) {
    var item = province_distribution[i];
    item.ratio = item.count / word_summary.total_count;
}


for (var i = product_distribution.length - 1; i >= 0; i--) {
    var item = product_distribution[i];
     item.product = product_map[item.product];
    item.ratio = item.count / word_summary.total_count;
}


sex_distribution= (function () {
    var dist = {male: 0.0, female: 0.0};
    for (var i = sex_distribution.length - 1; i >= 0; i--) {
        var item = sex_distribution[i];
        if (item.sex == 'F') {
            dist.female = item.count / word_summary.total_count;
        } else if (item.sex == 'M') {
            dist.male = item.count / word_summary.total_count;
        } else {
            console.log('error sex');
        }

    }
    return dist;

}());

grade_distribution = (function(){

//               大一，大二，大三，大四，其他
    var grade = [{grade: '大一', ratio:0.0},{grade: '大二', ratio:0.0},{grade: '大三', ratio:0.0},{grade: '大四', ratio:0.0},{grade: '其他', ratio:0.0}];

    for (var i = grade_distribution.length - 1; i >= 0; i--) {
        var item = grade_distribution[i];
        if (item.grade == '1') {
            grade[0].ratio +=  item.count / word_summary.total_count;
        } else if (item.grade == '2'){
            grade[1].ratio += item.count / word_summary.total_count;
        } else if (item.grade == '3'){
            grade[2].ratio +=  item.count / word_summary.total_count;
        } else if (item.grade == '4'){
            grade[3].ratio += item.count / word_summary.total_count;
        } else {
            grade[4].ratio += item.count / word_summary.total_count;
        }
    }

    return grade;

} ());


header_data.word_count = word_summary.total_count;

header_render = template('template-header');
word_distribution_render = template('template-word-distribution');

temp = {header_data: header_data, word_summary: word_summary};

var html = header_render(temp);
document.getElementById('yiban-header').innerHTML = html;

max_grade = {grade: '', ratio: 0};
for (var i = grade_distribution.length - 1; i >= 0; i--) {
    var item = grade_distribution[i];
    if(item.ratio > max_grade.ratio ) {
        max_grade.grade = item.grade;
        max_grade.ratio = item.ratio;
    }
}
max_grade.ratio = formatPercenge(max_grade.ratio);

temp = {province_distribution: province_distribution, male_dist:formatPercenge(sex_distribution.male), 
    female_dist:formatPercenge(sex_distribution.female),
    max_grade: max_grade,
    word_summary: word_summary};
var html = word_distribution_render(temp);
document.getElementById('yiban-word-distribution').innerHTML = html;


$(".js-word").text(header_data.word);

// 过滤掉百分比小于 0.1% 
product_distribution = product_distribution.filter(function (item) {
    return item.ratio > 0.001;
} );

province_distribution = province_distribution.filter(function (item) {
    return item.ratio > 0.001;
} );


g_data = {word_detail:word_detail, word_summary:word_summary, product_distribution:product_distribution,
    province_distribution:province_distribution, sex_distribution:sex_distribution, grade_distribution:grade_distribution};

/**
 * Created by wurenjie on 16/6/23.
 */
/*饼图*/

$(function(){

    var chartsData = {};
    function initChartsData(){
        chartsData.mainChartsLabel = [];
        chartsData.mainChartsData = [];
        chartsData.pieChartsData = [];
        chartsData.barChartsCatagory = [];
        chartsData.barChartsData = [];
        chartsData.barChartsLabel = [];
        chartsData.columnCatagory = [];
        chartsData.columnData = [];

        var sex = {
            malePercent : formatPercenge(g_data.sex_distribution.male)+"%",
            femalePercent : formatPercenge(g_data.sex_distribution.female)+"%"
        };
        $.each(g_data.product_distribution,function(i,item){
            chartsData.pieChartsData.push([item.product, item.ratio]);
        });
        $.each(g_data.word_detail,function(i,item){
            chartsData.mainChartsLabel.push(item.word_date.substr(5)); // 去除年份
            chartsData.mainChartsData.push(parseInt(item.count));
        });

        $.each(g_data.province_distribution,function(i,item){
            chartsData.barChartsCatagory.push(item.province);
            chartsData.barChartsData.push(formatPercenge(item.ratio));
            chartsData.barChartsLabel.push(formatPercenge(item.ratio)+'%');

        });
        $('.boy-percentage').css('height',sex.malePercent);
        $('.girl-percentage').css('height',sex.femalePercent);
        $.each(g_data.grade_distribution,function(i,item){
            chartsData.columnCatagory.push(item.grade);
            chartsData.columnData.push(formatPercenge(item.ratio));
        })

    }

    var firstDate = (new Date(g_data.word_detail[0].word_date)).toFormattedString('M月d日');  // 2016-05-01

    var lastDate = (new Date(g_data.word_detail[g_data.word_detail.length - 1].word_date)).toFormattedString('d日');

    var mainChartTitle = '整体趋势 ' + firstDate + '~' + lastDate;

    var charts = {
        mainCharts: {
            $mainChart : $('#mainChart'),
            show: function(){
                this.$mainChart.highcharts({
                    chart : {
                        type : 'area',
                        backgroundColor: 'rgba(0,0,0,0)',
                        height:280,
                        marginRight: 44

                    },
                    title: {
                        useHTML: true,
                        text: '<span class="mainchart-title"><i class="icon-tend"></i>'+ mainChartTitle +'</span>',
                        align:'left'
                    },
                    series:[{
                        data:chartsData.mainChartsData
                    }],
                    plotOptions:{
                        area:{
                            fillOpacity:0.3
                        },
                        series:{
                            marker:{
                                radius:2
                            }
                        }
                    },
                    yAxis:{
                        title:{
                            text: '热度',
                            align: 'high',
                            rotation:0,
                            y:-20,
                            x:-30,
                            style:{
                                color:'rgba(255,255,255,0.8)',
                                fontSize:'1.1rem'
                            }
                        },
                        opposite: true,
                        lineWidth: 1,
                        lineColor:'#7c7582',
                        gridLineWidth:0.5,
                        gridLineColor:'rgba(255,255,255,0.3)',
                        labels:{
                            style:{
                                color:'rgba(255,255,255,0.5)'
                            },
//                            format:'{value:0f}'
                        }


                    },
                    xAxis:{
                        tickLength:0,//刻度线长度
                        categories:chartsData.mainChartsLabel,
                        gridLineColor:'rgba(255,255,255,0.2)',
                        labels:{
                            style:{
                                color:'rgba(255,255,255,0.5)'
                            }
                        }

                    },
                    legend: {
                        enabled: false
                    },
                    credits:{
                        enabled: false
                    },
                    tooltip:{
                        formatter: function(){
                            return Highcharts.numberFormat(this.y,0)
                        }
                    }
                })
            },
        },
        pieCharts : {
            $3dpieChart : $('#3dpie-chart'),
            show: function(){
                this.$3dpieChart.highcharts({
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 15
                        },
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    colors:[
                        '#f8db78',
                        '#f69ec7',
                        '#6b9bf2',
                        '#ff7a7b',
                        '#ff9600',
                        '#a6de6c',
                        '#d1ba93',
                        '#83dfb3',
                        '#f7b266',
                        '#951572'
                    ],
                    title: {
                        text: null
                    },
                    tooltip:{
                        formatter: function(){
                            if(this.percentage > 0.1) {
                                return Highcharts.numberFormat(this.percentage, 1) + '%'
                            }
                        }
                    },
                    plotOptions: {
                        pie: {
                            innerSize: 55,
                            depth: 55,
                            allowPointSelect: true,
                            showInLegend: true,
                            dataLabels: {
                                enabled: true,
                                style:{
                                    color: 'white',
                                    textShadow:'0 0 0',
                                    fontWeight: 'normal',
                                },
                                formatter: function(){
                                    if(this.percentage > 0.1){
                                        return Highcharts.numberFormat(this.percentage,1) + '%'
                                    }
                                }
                            }
                        }
                    },
                    credits:{
                        enabled: false
                    },
                    legend:{
                        itemWidth: 80,
                        symbolPadding:10,
                        symbolWidth: 12,
                        itemMarginBottom:12,
                        itemStyle:{color:'rgba(255,255,255,0.7)'}
                    },
                    series: [{
                        name: 'Delivered amount',
                        data:chartsData.pieChartsData
                    }]
                })
            },
            animate: function(){
                console.log("redraw")
                this.show();
            }

        },
        barCharts : {
            $barChart : $('#bar-chart'),
            show: function(){
                this.$barChart.highcharts({
                    chart: {
                        type: 'bar',
                        backgroundColor: 'rgba(0,0,0,0)',
                        height:300,
                        marginRight: 0
                    },
                    title: {
                        text: 'TOP.'+chartsData.barChartsCatagory.length,
                        align:'left',
                        verticalAlign:'top',
                        style:{
                            color:'white',
                            fontSize:'10px',

                        }

                    },
                    xAxis:[{
                        tickLength:0,//刻度线长度
                        lineWidth: 0, //轴宽度
                        categories: chartsData.barChartsCatagory,
                        labels:{
                            style:{
                                color: 'rgba(255,255,255,0.8)',
                            }
                        },
                        // plotBands: [
                        //     {
                        //         from: 0,
                        //         to: 0.15,
                        //         color: 'rgba(78,58,83,0.6)',
                        //         zIndex: 1
                        //     }
                        // ]
                        // },{
                        //     //右边
                        //     opposite: true,
                        //     categories: chartsData.barChartsLabel,
                        //     lineWidth: 0, //轴宽度
                        //     tickLength:0,//刻度线长度
                        //     linkedTo: 0,
                        //     labels:{
                        //         style:{
                        //             color: 'rgba(255,255,255,0.8)'
                        //         }
                        //     },


                    }],
                    yAxis:{
                        gridLineColor: 'rgba(0,0,0,0)',
                        title:null,
                        labels:{
                            enabled:false
                        },
                        max:101


                    },
                    plotOptions: {
                        groupPadding:0,
                        pointPadding:0,
                        bar: {
                            dataLabels: {
                                enabled: true,
                                color:'white',
                                style:{
                                    textShadow: "0 0 0",
                                    fontWeight:'normal'
                                },
                                formatter: function(){
                                    if(this.y >= 0.1){
                                        return Highcharts.numberFormat(this.y,1) + '%'
                                    }
                                }
                            },

                        },
                    },
                    credits:{
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip:{
                        formatter: function(){
                            if(this.y > 0.1) {
                                return Highcharts.numberFormat(this.y, 1) + '%'
                            }
                        }
                    },
                    series: [{
                        data: chartsData.barChartsData,
                        pointWidth: 10,
                        borderRadius:5,
                        color: '#5ee8bf',
                        borderColor:'#5ee8bf'
                    }],

                })
            },
            animate: function(){
                console.log("barredraw")
                this.show();
            }
        },
        columnCharts:{
            $columnChart : $('#column-chart'),
            show : function(){
                this.$columnChart.highcharts({
                    chart: {
                        type: 'column',
                        backgroundColor: 'rgba(0,0,0,0)',
                        height:200,
                    },
                    title: {
                        text: null
                    },
                    xAxis: {
                        categories: chartsData.columnCatagory,
                        tickLength:0,//刻度线长度
                        labels:{
                            style:{
                                color: 'rgba(255,255,255,0.6)'
                            }
                        },

                    },
                    plotOptions:{
                        series:{
                            borderColor:'null'

                        }
                    },
                    yAxis: {
                        opposite:true,
                        title:null,
                        gridLineColor:'rgba(255,255,255,0.2)',
                        labels:{
                            style:{
                                color: 'rgba(255,255,255,0.5)'
                            },
                            format: '{value} %',

                        },
                        min:0,
                        max:100,

                    },
                    series: [{
                        data: [
                            {
                                y:chartsData.columnData[0],
                                color:'#6b9bf2'
                            },
                            {
                                y:chartsData.columnData[1],
                                color:'#83dfb3'
                            },
                            {
                                y:chartsData.columnData[2],
                                color:'#f8db78'
                            },
                            {
                                y:chartsData.columnData[3],
                                color:'#f69ec7'
                            },
                            {
                                y:chartsData.columnData[4],
                                color:'#ff935e'
                            }
                        ]
                    }
                    ],
                    legend: {
                        enabled: false
                    },
                    credits:{
                        enabled: false
                    },
                    tooltip:{
                        formatter: function(){
                            if(this.y >= 0.1){
                                return Highcharts.numberFormat(this.y,1) + '%'
                            }
                        }
                    }
                })
            }
        }
    };


    var column = {
        sourceCol: $('.source-col'),
        provinceCol: $('.province-col'),
        sexCol: $('.sex-col'),
        gradeCol: $('.grade-col'),
        thisColumn: $('.column'),
        show: function(){

        },
        init: function(){
            $('.container').hide();
            $('#yiban-header').show();
            this.thisColumn.click(function(){
                $(this).next().toggle('500');
                if($(this).find('i.down').length){
                    $(this).find('i.down').removeClass('down').addClass('up');
                }else{
                    $(this).find('i.up').removeClass('up').addClass('down');

                }
            });
            this.sourceCol.click(function() {

                setTimeout(function(){
                    if(!charts.pieCharts.$3dpieChart.data('highcharts-chart')) {
                        charts.pieCharts.show();
                    }
                    $('body,html').animate({scrollTop:$('#3dpie-chart').offset().top},500);
                },500);

            });
            this.provinceCol.click(function(){
                setTimeout(function(){
                    if(!charts.barCharts.$barChart.data('highcharts-chart')) {
                        charts.barCharts.show();
                    }
                    $('body,html').animate({scrollTop:$('#bar-chart').offset().top},500);
                },500);

            });
            this.sexCol.click(function(){
                setTimeout(function(){
                    $('body,html').animate({scrollTop:$('.cont').offset().top},500);
                },500)
            })
            this.gradeCol.click(function(){
                    setTimeout(function(){
                        if(!charts.columnCharts.$columnChart.data('highcharts-chart')) {
                            charts.columnCharts.show();
                        }
                        $('body,html').animate({scrollTop: $(document).height()}, 500);
                    },500)
                })
        }
    }


    function init(){
        initChartsData();
        charts.mainCharts.show();
//        charts.pieCharts.show();
//        charts.barCharts.show();
//        charts.columnCharts.show();

        column.init();
    }
    init();

});
</script>