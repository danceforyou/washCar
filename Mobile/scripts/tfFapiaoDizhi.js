var linkman =decodeURI(decodeURI(Request['linkman']));
var linkphone = Request['linkphone'];
var addrs = decodeURI(decodeURI(Request['addr']));

$(function () {
    $('#quxiao').click(function() {
        $('#dialog1').hide();
    });
    //页面初始化取得收货地址列表A
    currentPage = 1;
    deleteId = "";
    if(!empty(MemberInfo)){
        getDeliveryAddr();
    }else{
        getRequest();
        initRadioStatus();
         linkman =decodeURI(decodeURI(Request['linkman']));
         linkphone = Request['linkphone'];
         addrs = decodeURI(decodeURI(Request['addr']));
        console.log(linkman);
        console.log(linkphone);
        console.log(addrs);
        if(linkman==undefined||linkphone==undefined||addrs==undefined){
            $(".shdizhilist").append("");
        }else{
            linshihtml="<dl class='shuxinglist'>"+
                "<dt class='dtDz'>"+
                    //"<input name='demo' type='radio'>"+
                "<input class='aui-radio' name='demo' type='radio'>"+
                "</dt>"+
                "<dd class='name' id='linkman'>"+linkman+
                "</dd>"+
                "<dd id='linkphone'>"+linkphone+"</dd>"+
                "<dd id='addrs'>" +addrs+"</dd>"+
                "</dl>";
        }
        $("#addre").html(linshihtml);
    }

    //$(".shdizhilist").html("");
});
var  linshihtml="";
//取得收货地址
function getDeliveryAddr()
{
    var url = "/Address/MyAddressList/1";
    var success=function(data){
        if(data.bizData.rows.length>0)
        {
            showHtml(data.bizData.rows);
            initRadioStatus();
        }
        if(data.bizData.rows.length<10){
            $("#addr").hide();
        }
        weui.Loading.hide();
    };
    weui.Loading.show();
    ajaxPostFun(url,null,success, null,"取得收货地址");

}

// 拼接页面字符串
function showHtml(dataList)
{
    for(var i=0; i<dataList.length; i++) {
        var countryStr =  "";
        if(dataList[i].country != "请选择")
        {
            countryStr = dataList[i].country;
        }

        var html = '<dl class="shuxinglist">' +
                    '<dt class="dtDz">'+
                    '<input class="aui-radio" name="demo" type="radio" value="' + dataList[i].id + '">'+
                     '</dt>'+
                    '<dd class="name" id="'+dataList[i].id+'linkman">'+
                    dataList[i].linkman+
                    '</dd>'+
                    '<dd id="' +dataList[i].id + 'linkphone">'+dataList[i].linkphone+'</dd>'+
                    '<dd id="' +dataList[i].id + '">' + dataList[i].province + dataList[i].city + countryStr + dataList[i].fullAddress + '</dd>' +
                    '</dl>';
        //console.log(html);
        $(".shdizhilist").append(html);
    }
}
//$(".quzhifubtn").click(function(){
//
//});

//加载更多
//function loadMore()
//{
//    currentPage = currentPage + 1;
//    var url = "/Address/MyAddressList/" + currentPage;
//    var success=function(data){
//        if(data.bizData.rows.length == 0)
//        {
//            initRadioStatus();
//            layer.msg("没有更多地址");
//            weui.Loading.hide();
//        }
//        else
//        {
//            showHtml(data.bizData.rows);
//            weui.Loading.hide();
//            initRadioStatus();
//        }
//    };
//    weui.Loading.show();
//    ajaxPostFun(url,null,success, null,"加载更多收货地址");
//}

function save()
{
    var address = "";
    if(!empty(MemberInfo)){
        $(".aui-radio").each(function(){
            if(this.checked)
            {
                address="联系人："+$("#" +this.value+"linkman")[0].innerHTML;
                address+="，联系电话："+$("#" +this.value+"linkphone")[0].innerHTML;
                address+=",地址："+$("#" +this.value)[0].innerHTML;
            }
        });
    }else{
        $(".aui-radio").each(function(){
            if(this.checked)
            {
                address = "联系人："+$("#linkman")[0].innerHTML;
                address +="，联系电话："+ $("#linkphone")[0].innerHTML;
                address+= "，地址："+$("#addrs")[0].innerHTML;
            }
        });
    }
    appStorage.setItem("address", address);
    window.location.href = "tfFapiao.html";
}

function saveView(){
    appStorage.setItem("view","tfFapiaoDizhi.html");
    window.location.href = "tfxjshouhuoadress.html";
}
//如果初始化时有地址，那么该地址前radio是选中状态
function initRadioStatus()
{
    var address = appStorage.getItem("address");
    $(".aui-radio").each(function(){
        if($("#" +this.value)[0].innerHTML == address)
        {
            this.checked = true;
        }
    });
}
function getRequest() {
    //var url = decodeURI(location.search); //获取url中"?"符后的字串
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
