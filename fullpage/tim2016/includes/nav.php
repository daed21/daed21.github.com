<nav class="nav navbar-default navbar-fixed-top navbar-inverse navbar-entity" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="http://www.yiban.cn" class="navbar-brand">
                <img src="images/mobile/logo-min.png" alt="易班网">
            </a>
        </div>
        <div class="collapse navbar-collapse navbar-inverse collapse-entity">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">首页</a></li>
                <li><a href="#">浪漫满屋</a></li>
                <li><a href="#">城市恋人</a></li>
                <li><a href="#">游山玩水</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
               <!-- <?php //if (Logic_User::getInstance()->isGuest()) { ?>
                     <li><a href="/index/signin?go=<?php //echo 'http://' . $_SERVER['HTTP_HOST'] . urlencode($_SERVER['REQUEST_URI']); ?>">登录</a></li> 
                <?php //} else { ?>-->
                    <li class="dropdown">
                        <div class="user-thumb pull-left padding-t5 entity-mobile">
                            <!--<img class=" img-circle" width="40" height="40" alt="User" src="../../../public/images/entity/header.jpg">-->
                            <img src="images/mobile/200.gif" width="40" height="40" class="img-circle" />
                        </div>
                        <a href="#" class="dropdown-toggle pull-left" id="entity-specal" data-toggle="dropdown" style="padding:15px">田之涵<span class="caret"></span></a>
                        <ul class="dropdown-menu navbar-inverse">
<!--<li><span style="background:#595758;"><i class="fa fa-database"></i>&nbsp;网薪:15865</span></li>
<div class="entity-nav-line"></div>
<li><a href="javascript:;" class="dropdown-a">兑换记录</a></li>
<div class="entity-nav-line"></div> -->
                            <li><a href="javascript:;" class="dropdown-a personal-info">个人信息</a></li>
                            <div class="entity-nav-line"></div>
                            <li><a href="javascript:;" class="dropdown-a">退出</a></li>
                        </ul>
                    </li>
               <!-- <?php //} ?> -->
            </ul>
        </div>
    </div>
</nav>