$(document).ready(function () {
    var addConfirm = new Util.Confirm('添加班级', $('.add-tc-content-box'), ["确 定", "取 消"], [function () {
        console.log("确定")
    }, function () {
        addConfirm.hide();
        console.log('取消')
    }]);

    var importConfirm = new Util.Confirm('批量添加', $('.import-tc-content-box'), ["确 定", "取 消"], [function () {
        console.log(this);
    }, function () {
        importConfirm.hide();
        console.log('取消')
    }]);

    Util.event.bindEvents({
        //点击添加班级按钮
        '.J-add-class': function () {
            addConfirm.show();
            //初始化下拉框美化
            Util.initSelect('.add-class-select', function (v) {
                console.log(v);
            })
        },
        //点击导入班级按钮
        '.J-import-class': function () {
            importConfirm.show();
            //初始化下拉框美化
            Util.initSelect('.import-class-select', function (v) {
                console.log(v); 
            })
        },
        //上传按钮
        '.file-upload-input-box': function () {
            console.log(this);
            $('.upload-file-btn').click();
        }
    })
})