$(document).ready(function () {
    //因为编辑和添加的弹窗一样，这里直接拷贝一个
    var $copy = $('.add-tc-content-box').clone();

    //实例化添加弹窗
    var addConfirm = new Util.Confirm('添加教师', $('.add-tc-content-box'), ["确 定", "取 消"], [function () {
        console.log("确定")
    }, function () {
        addConfirm.hide();
    }]);

    //实例化编辑弹窗
    var editConfirm = new Util.Confirm('编辑教师', $copy, ["确 定", "取 消"], [function () {
        console.log("确定")
    }, function () {
        editConfirm.hide();
    }]);

    //实例化导入弹窗
    var importConfirm = new Util.Confirm('导入教师', $('.import-tc-content-box'), ["确 定", "取 消"], [function () {
        console.log(this);
        location.href = "../wrong-msg/wrong-msg.html"
    }, function () {
        importConfirm.hide();
    }]);

    //实例化删除弹窗
    var delConfirm = new Util.Confirm('删除提示', '确定删除这条数据吗？', ["确 定", "取 消"], [function () {
        //do delete action
        console.log("id:", delConfirm.itemId);
    }, function () {
        delConfirm.hide();
    }]);

    Util.event.bindEvents({
        //点击添加老师按钮
        '.J-add-teacher': function () {
            addConfirm.show();
        },
        //点击导入老师按钮
        '.J-import-teacher': function () {
            importConfirm.show();
        },
        //上传按钮
        '.file-upload-input-box': function () {
            console.log(this);
            $('.upload-file-btn').click();
        },
        //编辑按钮
        '.J-edit-btn': function () {
            var id = $(this).attr('item-id');
            //先根据ID拿到教师的信息，填充进弹窗中
            editConfirm.ele.find('.J-work-num').val('KW0192');
            editConfirm.ele.find('.J-name').val('爱新觉罗罗媚');
            editConfirm.show();
        },
        //删除按钮
        '.J-del-btn': function () {
            var id = $(this).attr('item-id');
            delConfirm.itemId = id;
            delConfirm.show();
        }
    })

})
