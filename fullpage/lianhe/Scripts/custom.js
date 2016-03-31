
$( document ).ready( function(){
    var _h = $( window ).height();
    var _w = $( window ).width();
    $( '.section' ).height( _h );
    if($( '#fullPage' ).length > 0){
        /*
        $( '[data-animate]' ).each( function(){
            $( this ).css( 'opacity', '0.0' );
        } );
        */  /*当前页 下一页 方向*/

        var f = function( index, nextIndex, direction){
            var _this = $( '#fullPage .section:eq(' +(nextIndex - 1)+ ')' );
            var _prev = $( '#fullPage .section:eq(' +(index - 1)+ ')' );
            _this.find( '[data-animate]' ).each( function(){
                var _self = $(this);
                var _nums = 50;
                if(_self.css('position')=='static'){
                    _self.css('position','relative');
                }
                switch(_self.data('animate')){
                case 'btt':
                    var _pos = '';
                    var _num = 0;
                    var _base;
                    if(_self.css( 'bottom')!= 'auto'){
                        _pos = 'bottom';
                        _num = _nums * -1;
                        _base = _self.css( 'bottom' );
                    } else{
                        _pos = 'top';
                        _num = _nums;
                        _base = _self.css( 'top')== 'auto' ? 0 : parseFloat( _self.css( 'top'));
                    }
                    _self.css( _pos, _num + _base + 'px' );
                    _self.css( 'opacity', '0' );
                    _self.css( 'transition-duration', '.5s' ); //文字上移
                    _self.css( 'transition-timing-function', 'ease-out' );
                    setTimeout( function(){
                        _self.css( _pos, _base + 'px' );
                        _self.css( 'opacity', '1.0' );
                    }, parseInt( _self.data( 'timeout')) + 200 || 200 );
                    break;
                case 'rtl':
                    break;
                }
            } );
            _prev.find( '[data-animate]' ).each( function(){
                _self = $( this );
                _self.css( 'opacity', '0.0' );
            } );
            if(nextIndex == 1 && _this.is( '.bg-video')){
                $( '.main-content .top' ).addClass( 'transparent' );
            } else{
                $( '.main-content .top' ).removeClass( 'transparent' );
            }

            if(nextIndex != 1){
                $( '.goto-top' ).addClass( 'show' );
            } else{
                $( '.goto-top' ).removeClass( 'show' );
            }

            if(nextIndex != anchors.length){
                $( '.goto-bottom' ).addClass( 'show' );
            } else{
                $( '.goto-bottom' ).removeClass( 'show' );
            }
        }
        $( '#fullPage' ).fullpage({
            'anchors' : anchors,
            'menu' : '#fullpage-menu',
            'onLeave' : f,
            'css3' : true,
            'scrollingSpeed' : 1000,
        } );
        f( 1, 1, 'none' );
    }

    $( '.goto-top' ).on( 'click', function(){
        $.fn.fullpage.moveTo( 1, 0 );
    } );
    $( '.goto-bottom' ).on( 'click', function(){
        $.fn.fullpage.moveTo( anchors.length, 0 );
    } );
/*下拉菜单*/
    $( '.drop-list-button' ).on( 'click', function(){
        var bt = $( this );
        var lt = $( this ).parent().find( '.drop-list' );
        if(lt.hasClass( 'open')){
            lt.removeClass( 'open' );
            bt.removeClass( 'active' );
        } else{
            lt.addClass( 'open' );
            bt.addClass( 'active' );
        }
    } );
/*首页 向下尖头 点击 第2页*/
    $( '.down-icon' ).on( 'click', function(){
        $.fn.fullpage.moveTo( 2, 0 );
    } );

    $( '.pitch-form form .file' ).on( 'change', function(){
        $( '.pitch-form form .file-input' ).val( $( this ).val() ).removeClass( 'warning' );
    } );
    $.fn.tip = function( show, type){
        var _this = $( this );
        if(show &&(_this.data( 'msg')|| _this.data( 'msg-' + type)) && ! _this.data( 'tip')){
            var _v = $( '<div></div>' )
                .html( type ? _this.data( 'msg-' + type ): _this.data( 'msg'))
                .addClass( 'tooltip' )
                .css( 'left', _this.offset().left )
                .css( 'top', _this.offset().top - 28 );
            _this.data( 'tip', _v );
            _v.appendTo( 'body' );
            setTimeout( function(){
                _v.addClass( 'show' );
            }, 100 );
        }
        if(! show && _this.data( 'tip')){
            _this.data( 'tip' ).removeClass( 'show' );
            setTimeout( function(){
                _this.data( 'tip' ).remove();
                _this.data( 'tip', '' );
            }, 300 );
        }
    }
    function important_verify(){
        var _self = $( this );
        if(_self.is( ':text, :password, input[type="email"], textarea')){
            if(_self.val() == ''){
                _self.addClass( 'warning' );
                _self.on( 'mouseover', function(){
                    _self.tip( true );
                } );
                _self.on( 'mouseout', function(){
                    _self.tip( false );
                } );
            }
            _self.on( 'focus', function(){
                _self.removeClass( 'warning' );
                _self.tip( false );
                _self.off( 'mouseover' );
                _self.off( 'mouseout' );
            } );
        }
        if(_self.is( 'input[type="email"], .email')){
            if(_self.val() != '' && ! /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( _self.val())){
                _self.addClass( 'warning' );
                _self.on( 'mouseover', function(){
                    _self.tip( true, 'email' );
                } );
                _self.on( 'mouseout', function(){
                    _self.tip( false, 'email' );
                } );
            }
            _self.on( 'focus', function(){
                _self.removeClass( 'warning' );
                _self.tip( false );
                _self.off( 'mouseover' );
                _self.off( 'mouseout' );
            } );
        }
        if(_self.is( '.select')){
            var _self = _self.find( 'span' );
            if(_self.html().trim() == '&nbsp;'){
                _self.addClass( 'warning' );
                _self.on( 'mouseover', function(){
                    _self.tip( true );
                } );
                _self.on( 'mouseout', function(){
                    _self.tip( false );
                } );
            }
           _self.on( 'click', function(){
                _self.removeClass( 'warning' );
                _self.tip( false );
                _self.off( 'mouseover' );
                _self.off( 'mouseout' );
            } );
        }
        if(_self.is( ':file')){
            var _text = _self.parent().find( '.file-input' );
            if(_self.get(0) && _self.get(0).files.length > 0 && _self.get(0).files[0].size > parseInt( _self.data( 'limit'))){
                _text.addClass( 'warning' );
                _text.on( 'mouseover', function(){
                    _text.tip( true, 'limit' );
                } );
                _text.on( 'mouseout', function(){
                    _text.tip( false, 'limit' );
                } );
            }
            _self.on( 'change', function(){
                _text.removeClass( 'warning' );
                _text.tip( false, 'limit' );
                _text.off( 'mouseover' );
                _text.off( 'mouseout' );
            } );
        }
        if(_self.is( ':file')&& _self.attr( 'accept')){
            var _text = _self.parent().find( '.file-input' );
            if( _self.get(0) && _self.get(0).files.length > 0 && _self.attr( 'accept' ).indexOf( _self.get(0).files[0].type)== -1){
                _text.addClass( 'warning' );
                _text.on( 'mouseover', function(){
                    _text.tip( true, 'type' );
                } );
                _text.on( 'mouseout', function(){
                    _text.tip( false, 'type' );
                } );
            }
            _self.on( 'change', function(){
                _text.removeClass( 'warning' );
                _text.tip( false, 'type' );
                _text.off( 'mouseover' );
                _text.off( 'mouseout' );
            } );
        }
    }
    $( '.important input:text, .important input:password, .important input[type="email"], .important .email, .important textarea, .important .select, .file-upload input:file' ).filter( ':visible' ).on( 'blur', important_verify );
    $( 'form' ).on( 'submit', function(){
        var _this = $( this );
        var _rv = true;
        _this.find( '.important input:text, .important input:password, .important input[type="email"], .important .email, .important textarea, .important .select, .file-upload input:file' ).filter( ':visible' ).each( important_verify );

        if(_this.find( '.warning' ).length > 0)_rv = false;
		if(!_rv) $('p.error').show();

        return _rv;
    } );

    $( '.select' ).each( function(){
        var _this = $( this );
        _this.on( 'click', function(){
            if(_this.is( '[selected]')){
                _this.removeAttr( 'selected' );
            } else{
                _this.attr( 'selected', '' );
            }
        } );
        _this.find( 'ul > li' ).on( 'click', function(){
            _this.find( 'span' ).html( $( this ).html() );
        } );
    } );
    $( '[data-pop]' ).on( 'click', function(){
        var _pop = $( $( this ).data( 'pop'));
        _pop.addClass( 'show' );
    } );
    $( '.pop-layer .close' ).on( 'click', function(){
        var _pop = $( this ).parents( '.pop-layer' );
        _pop.removeClass( 'show' );
    } );
    $( '.file-upload input:file' ).on( 'change', function(){
        $( this ).parent().find( '.file-input' ).val( $( this ).val() );
    } );
    $( '.contact-input select' ).on( 'change', function(){
        $( this ).parents( '.contact-input' ).find( 'p.select-text' ).html( $( this ).find( 'option:selected' ).html() );
    } );

    $( window ).on( 'resize, load', function(){
        if($( '#head-video' ).length > 0){
            var _t = 1920 / 1080;
            var _wt = $( window ).width() / $( window ).height();
            if(_t > _wt){   //浏览器宽 小于 图比例宽 按图高100% 否侧按宽100%
                $( '#head-video' ).css({
                    'max-width' : 'none',
                    'max-height' : '100%',
                } );
            } else{
                $( '#head-video' ).css({
                    'max-width' : '100%',
                    'max-height' : 'none',
                } );
            }
        }
    } );
} );
