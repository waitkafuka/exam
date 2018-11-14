$(document).ready(function(){
    $('.cptj-content-wrap .cp-tab-box').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.cp-content-box').hide();
        $('.cp-content-box.'+$(this).attr('target')).show();
    })
})