var uploader = new plupload.Uploader({ //实例化一个plupload上传对象
    browse_button : 'browse',
    runtimes : 'html5,flash,silverlight,gears,browserplus',
    url : basePath+'MyFile/cloudDiscFileUpload',
    flash_swf_url : 'lib/plupload/Moxie.swf',
    silverlight_xap_url : 'lib/plupload/Moxie.xap',
    unique_names : true,
    chunk_size : '200kb',
    multipart_params : {
        'Token' : getCookie(TOKEN)
    },
    filters: {
        max_file_size : '500mb', //最大只能上传100kb的文件
        prevent_duplicates : true //不允许队列中存在重复文件
    }
});
uploader.init(); //初始化

uploader.bind('UploadComplete',function(uploader,files){
    //上传进度框下去
    $("#jindudaxiaohua").click();
    alert(files.length+"个文件已经全部上传！");
    window.location.reload();
});


//绑定文件添加进队列事件
uploader.bind('FilesAdded',function(uploader,files){
    //获得当前登陆用户的剩余存储空间
    //读取我的网盘信息

    var zong=$("#usesizeAndTotalSize").html();
    zong =zong.replace(/[\/]/, ",");
    var usersize = zong.split(',')[0];
    var totalsize = zong.split(',')[1];
    var zongdaxiao = 0;
    for(i=0;i<files.length;i++){
        zongdaxiao+=files[i].size;
    }

    totalsize=zhuanhuan(totalsize);
    usersize=zhuanhuan(usersize);
    if((totalsize-usersize-zongdaxiao)<0){
        //说明内存不够停止
        layer.msg("空间内存不足,请清理回收站!",{icon: 6,time:1500});
       return;

    }






    //触发上传框的+号的点击事件 打开上传框
    $("#jindudaxiaohua").click();
    for(var i = 0, len = files.length; i<len; i++){
        var file_name = files[i].name; //文件名
        var file_type = file_name.substring(file_name.indexOf('.'),file_name.length);
        var file_size = getFormetFileSize(files[i].origSize);
        //构造html来更新UI
        var html = '<dl id="file-' + files[i].id +'">' +
            '<span class="jinduxianshi" style="width:1%;"></span>' +
            '<dd title="'+file_name+'" class="dd1"><i class="'+shezhishangchuanivon(file_type)+'"></i>'+omitFileName(file_name,13)+'</dd>' +
            '<dd class="dd2">'+file_size+'</dd>' +
            '<dd class="dd3">我的文件</dd>' +
            '<dd class="dd4">等待中...</dd>' +
            '<dd class="dd5"><a href="javascript:;" onclick="deleteFile(this)" fileid="'+ files[i].id +'">×</a></dd></dl>'
        $(html).appendTo('#file-list');
        $(".jindupopu").css({height:"auto"});
    }

});

//空间大小统一转换为B
function zhuanhuan(fil){
if(fil.endsWith("B")){
    fil=fil.substring(0,fil.length-1);
return fil;
}else if(fil.endsWith("K")){
    fil=fil.substring(0,fil.length-1);
    fil=fil*1024;
    return fil;
}else if(fil.endsWith("M")){
    fil=fil.substring(0,fil.length-1);
    fil=fil*1024*1024;
    return fil;
}
else if(fil.endsWith("G")){
    fil=fil.substring(0,fil.length-1);
    fil=fil*1024*1024*1024;
    return fil;
}



}



function shezhishangchuanivon(file_type){
    //small_ico lb_rar
    if(image_arrs.indexOf(file_type) >= 0){//图片

        //return imageShowPath+value.path;
        return "small_ico lb_tupian";
    }
    if(video_arrs.indexOf(file_type) >= 0){//视频
        return "small_ico lb_shipin";
    }
    if(file_type == "adir"){//文件夹
        return "small_ico lb_wenjian";
    }
    if(file_type == ".txt"){//文件夹
        return "small_ico lb_txt";
    }
    if(file_type==".doc"||file_type==".docx"){
        return "small_ico lb_word";
    }
    if(file_type==".ppt"||file_type==".pptx"){
        return "small_ico lb_ppt";
    }
    if(file_type==".xls"||file_type==".xlsx"){
        return "small_ico lb_excel";
    }
    if(file_type==".pdf"){
        return "small_ico lb_pdf";
    }
    return "small_ico lb_qita";
    //if(icon_support.indexOf(file_type) >= 0){//其他类型
    //    return "images/ico/"+file_type.substr(1,file_type.length)+".png";
    //}
    //return "images/ico/wenjian.png";

}

//绑定文件上传进度事件
uploader.bind('UploadProgress',function(uploader,file){
    $('#file-'+file.id+' .jinduxianshi').css('width',file.percent + '%');//控制进度条
});

//当上传队列中某一个文件开始上传后触发
uploader.bind('UploadFile',function(uploader,file){
    showUploadStatus(file);
});

var ids = '';
//上传按钮
$('#upload-btn').click(function(){

    var keshi = document.getElementsByName("keshi");
    for(var j=0;j<keshi.length;j++){
        if (keshi[j].checked) {
            //obj[j].checked = false;
            if(ids==''){
                ids = keshi[j].value;
            }else{
                ids += ','+keshi[j].value;
            }
        }
    }
    if (empty(ids)){
        layer.msg("课堂专题不能为空!",{icon:5,time:2000});
    }else {
        $('.shangchuanwenjian').fadeOut(100);
        uploader.start(); //开始上传
    }

});


//当队列中的某一个文件上传完成后触发
uploader.bind('FileUploaded',function(uploader,file,responseObject){
    if (responseObject.status==200){
        var json = JSON.parse(responseObject.response);
        console.log("文件上传后返回信息",json);
        if (json.rtnCode != "0000000"){
            layer.msg(json.msg,{icon: 5,time:1500});
            var successFun = function(data){
                $('#file-'+file.id+' .dd4').html("<span style='color: #e45f41'>上传失败</span>");
            }
            ajaxPostFun(basePath+'MyFile/deleteFile/'+json.bizData.id,{"Token":getCookie(TOKEN)},successFun, null, '删除保存上传的文件');
        }else{
            var data= {
                "keyword":document.getElementById("key").value,
                "name":file.name,
                "ids":ids,
                "fileid":json.bizData.id,
                "Token":getCookie(TOKEN),
                "myFileId":returnlastFileId()
            };
            var successFun = function(data){
                layer.msg("上传成功!",{icon: 6,time:1500});
                $('#file-'+file.id+' .dd4').html("上传成功");
                $('#file-'+file.id+' .dd5').attr("bizData",json.bizData.id);
                //关闭上传进度框，模拟执行jindudaxiaohua的点击事件
                //$("#jindudaxiaohua").trigger("click");


            }
            var errorFun = function(data){
                layer.msg("上传失败!",{icon: 5,time:1500});
                var successFun = function(data){
                    $('#file-'+file.id+' .dd4').html("<span style='color: #e45f41'>上传失败</span>");
                }
                ajaxPostFun(basePath+'MyFile/deleteFile/'+json.bizData.id,{"Token":getCookie(TOKEN)},successFun, null, '删除保存上传的文件');
            }
            ajaxPostFun(basePath+'MyFile/saveFileInfo',data,successFun,errorFun,'保存上传的文件到老师网盘中');
        }
    }else{
        layer.msg(data.status+":"+data.statusText,{icon: 5,time:2000});
    }
});



//当队列中的某一个文件上传完成后触发
uploader.bind('Error',function(uploader,errObject){
    showUploadStatus(errObject.file);
});

//绑定文件移除事件
uploader.bind('FilesRemoved',function(uploader,files){
    for(var i = 0; i<files.length; i++){
        var bizData = $('#file-'+ files[i].id+' .dd5').attr("bizData");
        if(bizData){
            var successFun = function(data){
                $("#file-"+ files[0].id).remove();
            }
            ajaxPostFun(basePath+'MyFile/deleteFile/'+bizData,{"Token":getCookie(TOKEN)},successFun, null, '删除保存上传的文件');
        }else {
            $("#file-"+ files[i].id).remove();
        }
    }
});

function deleteFile(obj){
    var id = obj.getAttribute("fileid");
    uploader.removeFile(uploader.getFile(id));
}

function showUploadStatus(file){
    switch(file.status) {
        case uploader.QUEUED:
            $('#file-'+file.id+' .dd4').html("排队中...");
            break;
        case uploader.UPLOADING:
            $('#file-'+file.id+' .dd4').html("上传中...");
            break;
        case uploader.FAILED:
            $('#file-'+file.id+' .dd4').html("上传失败");
            break;
        case uploader.DONE:
            $('#file-'+file.id+' .dd4').html("上传成功");
            break;
    }
}

$("#shangchuanwenjian").bind("click",function(){
    var files = uploader.files;
    for (var i in files){
        uploader.removeFile(files[i]);
        alert(i);
    }
})


