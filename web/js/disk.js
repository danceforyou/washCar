var image_arrs = [".png",".jpg",".gif",".jpeg",".bmp"];//图片
var document_arrs = [".txt",".doc",".docx",".ppt",".pptx",".pdf",".rar",".zip",".xls",".xlsx"];//文档
var music_arrs = [".mp3"];//音乐文件
var video_arrs = [".avi",".rmvb",".mp4",".3gp",".wma",".wmv"];//视频文件
var all_arrs = image_arrs.concat(image_arrs,document_arrs,music_arrs,video_arrs);//全部

//图片库支持文件格式，除以下文件格式外，其他格式均显示默认图片
var icon_support = [".pdf",".pptx",".ppt",".rar",".txt",".doc",".docx",".xls",".xlsx",".zip"];
//可在线预览的文件类型
var canlook_arrs = [".txt",".doc",".docx",".ppt",".pptx",".pdf",".xls",".xlsx",".swf"];

//判断是否是图片
function is_image($prefix){
    return image_arrs.indexOf($prefix) == -1 ? false : true;
}

//图片未找到
function image_notfound(obj){
    $(obj).removeAttr("onerror");
    $(obj).attr("src","images/notfound.jpg");
}

//打开文件
function openFile(type,id,kechengid){

    //获取课程当前频道
    var tit=$("#detail_name").html();

	if(canlook_arrs.indexOf(type) >= 0){//文件类型支持在线预览
		return "wenjianDakai.html?id="+id+"&tit="+tit+"&kechengid="+kechengid;
	}else{
		return "wenjianShow.html?id="+id+"&tit="+tit+"&kechengid="+kechengid;
	}
}

//判断文件类型列表
    function ifFileTypeLb(type){
        var str="";
        if(type==".txt"){
            str='<i class="small_ico lb_txt"></i>';
        }else if(type==".pdf"){
            str='<i class="small_ico lb_pdf"></i>';
        }else if(type==".doc" || type==".docx"){
            str='<i class="small_ico lb_word"></i>';
        }else if(type==".xls" || type==".xlsx"){
            str='<i class="small_ico lb_excel"></i>';
        }else if(type==".ppt" || type==".pptx"){
            str='<i class="small_ico lb_ppt"></i>';
        }else if(type==".rar" || type==".zip"){
            str='<i class="small_ico lb_rar"></i>';
        }else if(type==".mp3"){
            str='<i class="small_ico lb_music"></i>';
        }else if(type==".png" || type==".jpg"|| type==".gif"|| type==".jpeg"|| type==".bmp"){
            str='<i class="small_ico lb_tupian"></i>';
        }else if(type==".avi" || type==".rmvb" || type==".mp4" || type==".3gp" || type==".wma" || type==".wmv"){
            str='<i class="small_ico lb_shipin"></i>';
        }else if(type=="adir"){
            str='<i class="small_ico lb_wenjian"></i>';
        }else{
            //未知
            str='<i class="small_ico lb_qita"></i>';
        }
        return str;

    }
    //判断文件类型网格
    function ifFileTypeWG(type){
        var str="";
        if(type==".txt"){
            str='<dt class="lx_txt"></dt>';
        }else if(type==".pdf"){
            str='<dt class="lx_pdf"></dt>';
        }else if(type==".doc" || type==".docx"){
            str='<dt class="lx_word"></dt>';
        }else if(type==".xls" || type==".xlsx"){
            str='<dt class="lx_excel"></dt>';
        }else if(type==".ppt" || type==".pptx"){
            str='<dt class="lx_ppt"></dt>';
        }else if(type==".rar" || type==".zip"){
            str='<dt class="lx_rar"></dt>';
        }else if(type==".mp3"){
            str='<dt class="lx_music"></dt>';
        }else if(type==".png" || type==".jpg"|| type==".gif"|| type==".jpeg"|| type==".bmp"){
            str='<dt class="lx_tupian"></dt>';
        }else if(type==".avi" || type==".rmvb" || type==".mp4" || type==".3gp" || type==".wma" || type==".wmv"){
            str='<dt class="lx_shipin"></dt>';
        }else if(type=="adir"){
            str='<dt class="lx_wenjian"></dt>';
        }else{
           str='<dt class="lx_qita"></dt>';
        }
        return str;
    }
//加载专题详情数据
function channel(){
    ajaxGetesFun("CourseProject/findInfo/"+id, null, function(res){
        var channelname=res.bizData;
        //store_detail = res.bizData;
        render_channel(channelname);
    },null, "加载专题详情数据");
}
function render_channel(data){
    $("#channel").html(data.name.substr(0,25));
}