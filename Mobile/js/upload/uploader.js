/**
 * Created by yongrong on 16/7/13.
 */
var $list = $("#fileList");
var uploader_fileName = "thumbnail";

var uploader = WebUploader.create({
    auto: true,
    swf: 'lib/webuploader/0.1.5/Uploader.swf',

    // 文件接收服务端。
    server: '/FileUpload/ManifestUpload',

    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#filePicker',

    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false,
    // 只允许选择图片文件。
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
    },

    fileNumLimit: 1,
    fileSizeLimit: 200 * 1024 * 1024,    // 200 M
    fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
});
uploader.on( 'fileQueued', function( file ) {
    $list.html('');
    $("#"+uploader_fileName).remove();
    var $li = $(
            '<div id="' + file.id + '" class="item" style="float: left;margin-right: 10px;">' +
                '<input id="'+file.id+'_url" type="hidden" name="'+uploader_fileName+'" value="">'+
                '<div class="pic-box"><img title="'+file.name+'"></div>'+
                '<p class="state">等待上传...</p>'+
            '</div>'
        ),
        $img = $li.find('img');
    	$list.append( $li );

    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );
    }, 100, 100 );
});
// 文件上传过程中创建进度条实时显示。
uploader.on( 'uploadProgress', function( file, percentage ) {
    var $li = $( '#'+file.id ),
        $percent = $li.find('.progress-box .sr-only');

    // 避免重复创建
    if ( !$percent.length ) {
        $percent = $('<div class="progress-box"><span class="progress-bar radius"><span class="sr-only" style="width:0%"></span></span></div>').appendTo( $li ).find('.sr-only');
    }
    $li.find(".state").text("上传中");
    $percent.css( 'width', percentage * 100 + '%' );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
uploader.on( 'uploadSuccess', function( file, results ) {
    console.log("图片上传返回信息:"+results);
    if (results.rtnCode=="0000000"){
        $( '#'+file.id ).addClass('upload-state-success').find(".state").text("已上传");
        $('#'+file.id+"_url").val(results.bizData.imgUrl);
        $("#"+uploader_fileName).val(results.bizData.imgUrl);
    
        //uploaderSuccess(results);
    }else{
        $( '#'+file.id ).addClass('upload-state-error').find(".state").text("上传出错");
        layer.msg(results.msg,{icon: 5,time:2000});
    }
});

// 文件上传失败，显示上传出错。
uploader.on( 'uploadError', function( file ) {
    $( '#'+file.id ).addClass('upload-state-error').find(".state").text("上传出错");
});

// 完成上传完了，成功或者失败，先删除进度条。
uploader.on( 'uploadComplete', function( file ) {
    $( '#'+file.id ).find('.progress-box').fadeOut();
});