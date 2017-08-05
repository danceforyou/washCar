var image_arrs = [".png",".jpg",".gif",".jpeg",".bmp"];//图片
var document_arrs = [".txt",".doc",".docx",".ppt",".pdf",".rar",".zip",".xls",".xlsx"];//文档
var music_arrs = [".mp3"];//音乐文件
var video_arrs = [".avi",".rmvb",".mp4",".3gp",".wma",".wmv"];//视频文件
var all_arrs = image_arrs.concat(image_arrs,document_arrs,music_arrs,video_arrs);//全部

//后台图片库支持文件格式，除以下文件格式外，其他格式均显示默认图片
var icon_support = [".txt",".doc",".docx",".ppt",".pdf",".rar",".zip",".xls",".xlsx",".mp3",".torrent"];
//可在线预览的文件类型
var canlook_arrs = [".txt",".doc",".docx",".ppt",".pdf",".xls",".xlsx",".png",".jpg",".gif",".jpeg",".bmp",".swf"];

//判断是否是图片
function is_image($prefix){
    return image_arrs.indexOf($prefix) == -1 ? false : true;
}

//图片未找到
function image_notfound(obj){
    $(obj).removeAttr("onerror");
    $(obj).attr("src","images/notfound.jpg");
}
