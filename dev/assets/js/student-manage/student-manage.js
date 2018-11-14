$(document).ready(function () {
    console.log("dwwad");
    
    

    var addConfirm = new Util.Confirm('添加学生', $('.add-tc-content-box'), ["确 定", "取 消"], [function () {
        console.log("确定")
    }, function () {
        addConfirm.hide();
        console.log('取消')
    }]);

    var importConfirm = new Util.Confirm('导入学生', $('.import-tc-content-box'), ["确 定", "取 消"], [function () {
        console.log(this);
    }, function () {
        importConfirm.hide();
        console.log('取消')
    }]);

    Util.event.bindEvents({
        //点击添加学生按钮
        '.J-add-student': function () {
            addConfirm.show();
            Util.initSelect('select',function(v){
                console.log(v);
            })
        },
        //点击导入学生按钮
        '.J-import-student': function () {
            importConfirm.show();
        },
        //上传按钮
        '.file-upload-input-box':function(){
            console.log(this);
            $('.upload-file-btn').click();
        }
    })
})