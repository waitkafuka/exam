$(document).ready(function () {
    //select是一个jQuery选择器表达式
    Util.initSelect('select',function(v,e){
        console.log(v);
        var $td = $(e).parent('td');
        var wrongVal = $td.attr('wrong-val');
        if (v !== wrongVal){
            $td.removeClass('error');
        }else{
            $td.addClass('error');
        }
    })
})