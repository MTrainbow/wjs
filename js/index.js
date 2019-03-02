$(function ($) {

    banner()

    initMobileTab()

    $('[data-toggle="tooltip"]').tooltip()

})
var banner = function () {
    /**
     * 1.获取数据
     * @param callback
     */
    var getData = function(callback){
        if (window.data){
            callback && callback(window.data)
        } else  {
            $.ajax({
                url:'js/data.json',
                type:'get',
                dataType:'json',
                data:'',
                success:function (data) {
                    console.log(data)
                    window.data = data ; //数据缓存,测试避免多次请求
                    callback && callback(window.data)
                }
            })
        }
    }
    /**
     * 2.配合模版渲染数据
     */
    var render = function () {
        getData(function (data) {
            var isMobile = $(window).width() < 768 ? true : false
            var pointHtml = template('pointTemplete',{list:data})
            var imgHtml = template('m_temp',{list:data,isMobile:isMobile})
            $('.carousel-indicators').html(pointHtml)
            $('.carousel-inner').html(imgHtml)
        })
    }
    /**
     * 3.数据测试和主动触发resize事件,真实开发中可有可无
     */
    $(window).on('resize',function (e) {
        render()
    }).trigger('resize')

    /**
     *  4.针对移动端触摸事件
     */
    var startX = 0
    var distance = 0
    var isMove = false
    $('.wjs_banner').on('touchstart',function (e) {
        startX = e.originalEvent.touches[0].clientX
    }).on('touchmove',function (e) {
        var moveX = e.originalEvent.touches[0].clientX
        distance = moveX - startX
        isMove = true
    }).on('touchend',function (e) {
        //移动端预设的触摸条件
        if (isMove && Math.abs(distance) > 50){
            if (distance > 0){
                //上一张
                $('.carousel').carousel('prev')
            } else {
                $('.carousel').carousel('next')
            }
        }
        //参数重置
        startX = 0
        distance = 0
        isMove = false
    })
}
var initMobileTab = function () {
    /*
    * 1.解决换行
    * */
    var $navTabs = $('.wjs_product .nav-tabs')
    var width = 0
    $navTabs.find('li').each(function (index,item) {
        width += $(this).outerWidth(true)
    })
    console.log(width)
    $navTabs.width(width)

    // 2.调整结构 ,添加盒子设置width：100%  overflow：hidden

    // 3.滑动效果s
    new IScroll($('.nav-tabs-parent')[0],{
        scrollX : true,
        scrollY : false,
        click : true
    })
}