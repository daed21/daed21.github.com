<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<meta name="screen-orientation" content="portrait">
<meta name="x5-orientation" content="portrait">
<meta name="format-detection" content="telephone=no"/>
<title>全国大学生网络创新创业大赛</title>
<meta content="大学生网络创新创业大赛，网络创新创业，产品硬件类，移动应用软件类，互联网创新项目，大学生网络文化节，实践网络创新，实现创业梦想，易班网" itemprop="keywords" name="keywords"/>
<meta content="为深入学习贯彻党的十八大和十八届三中、四中全会精神，学习贯彻习近平总书记系列重要讲话精神，贯彻落实教育部、国信办《关于进一步加强高等学校网络建设和管理工作的意见》（教思政〔2013〕3号），弘扬敢为人先的创新精神，挖掘和鼓励学生创业的才华和梦想，营造积极向上的网络创新文化。激发全社会关心大学生创业热情，营造大众创业、万众创新的氛围，搭建学生网络创新创业平台，促进学生创新实践能力提升，将大学生互联网创业落到实处，经研究决定举办'2015年全国大学生网络创新创业大赛'活动。大赛面向全国普通高等学校全日制在校学生，分初赛、复赛和决赛三个阶段进行，参赛团队将获得资深专家提供的技术与创业指导，并有机会获得奖金及天使投资、孵化器免费入驻等机会。" itemprop="description" name="description"/>

<script src="../../public/js/jquery-1.11.3.min.js"></script>
<script src="../../public/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="../../public/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/index.css?v=20160406">

</head>
<body>
<?php include_once 'includes/nav.php';?>
<div class="idea_block container-fluid">
 <div class="row">
  <div class="wrap_block">
    <div class="section" id="section1">
      	<div class="intro">
			<h1>第一页内容</h1>
			<p>这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容</p>
		</div>
    </div>
    <div class="section" id="section2">
      	<div class="intro">
			<h1>第二页内容</h1>
		</div>
    </div>
    <div class="section" id="section3">
      	<div class="intro">
			<h1>第三页内容</h1>
		</div>
    </div>
    <div class="section" id="section4">
      	<div class="intro">
			<h1>第四页内容</h1>
		</div>
    </div>

   </div>
 </div>
</div>

<script type="text/javascript" src="js/fullpage.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	function act1(){
     $('#section1 .intro').css({opacity:0,top:'10%'}).animate({opacity:1,top:'5%'},300);
	}
	function act2(){
    $('#section2 .intro').css({opacity:0,top:'10%'}).animate({opacity:1,top:'5%'},300);

	}

  var act=function(anchorLink, index){
     if(index == 1){ 
        act1();
     }
	 if(index == 2){
		act2();
	 }
   }

  var ove=function(index, nextIndex, direction){
	 if(index == 1){ 
        $('#section1 .intro').animate({opacity:0,top:'50%'});
     }
	if(index == 2){
		$('#section2 .intro').animate({opacity:0,top:'50%'});
	 }
   }

			$('.wrap_block').fullpage({
				//sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#ccddff'],
				'anchors': ['home', 'funding', 'sail', 'honor'],
				'afterLoad':act,
				'onLeave':ove,
                'verticalCentered': false,
				'css3': true,
				'navigation': true,
				'navigationPosition': 'right'
			});
		});
	</script>
<?php //include_once 'includes/foot.php';?>

<div style="display:none;">
<script type="text/javascript">
var __pa;

</script> 
<script language="javascript">
function imgdragstart(){return false;}
for(i in document.images)document.images[i].ondragstart=imgdragstart;
</script>
</div>
</body>
</html>