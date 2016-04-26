<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<meta name="screen-orientation" content="portrait">
<meta name="x5-orientation" content="portrait">
<meta name="format-detection" content="telephone=no"/>
<title>浪漫满屋</title>
<meta content="浪漫满屋" itemprop="keywords" name="keywords"/>
<meta content="浪漫满屋 田之涵" itemprop="description" name="description"/>

<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/index.css?v=20160406">

</head>
<body>
<?php include_once 'includes/nav.php';?>
<div class="idea_block container-fluid">
 <div class="row">
  <div class="wrap_block">
    <div class="section" id="section1">
      	<div class="intro">
			<h1 class="tim" data-times="200">第一页内容</h1>
			<p class="tim" data-times="400">这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容这里是详细内容</p>
		</div>
    </div>
    <div class="section" id="section2">
      	<div class="intro">
			<h1 class="tim">第二页内容</h1>
		</div>
    </div>
    <div class="section" id="section3">
      	<div class="intro" data-times="500">
			<h1 class="tim">第三页内容</h1>
		</div>
    </div>
    <div class="section" id="section4">
      	<div class="intro" data-times="500">
			<h1 class="tim">第四页内容</h1>
		</div>
    </div>

   </div>
 </div>
</div>

<script type="text/javascript" src="js/fullpage.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

 /*   act1();*/
	function act1(){
     $('#section1 .intro').css({opacity:0,top:'150px'}).animate({opacity:1,top:'50px'},500);
	}

  var act=function(anchorLink, index){
     if(index == 1){ 
    
     }

   }



  var ove=function(index, nextIndex, direction){
            var _this = $( '.wrap_block .section:eq(' +(nextIndex - 1)+ ')' ); //当前
            var _prev = $( '.wrap_block .section:eq(' +(index - 1)+ ')' ); //上一页

    _this.find('.tim').each(function(){
        var _self = $(this);
        _self.css({'top':'150px','opacity':'0','transition':'all 0.5s ease-out 0s'});
            setTimeout( function(){
                        _self.css({'top':'50px','opacity':'1.0'});
                    },parseInt( _self.data('times')) || 300); //alert(parseInt( _self.data('times')));
});


/*	 if(index == 1){ 
        $('#section1 .intro').animate({opacity:0,top:'50%'});
     }
	if(index == 2){
		$('#section2 .intro').animate({opacity:0,top:'50%'});
	 }*/


   }

			$('.wrap_block').fullpage({
				//sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#ccddff'],
				'anchors': ['home', 'funding', 'sail', 'honor'],
				/*'afterLoad':act,*/
				'onLeave':ove,
                'verticalCentered': false,
				'css3': true,
				'navigation': true,
				'navigationPosition': 'right'
			});
			ove( 1, 1, 'none' );
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