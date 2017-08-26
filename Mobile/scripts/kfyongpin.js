/**
 * Created by Administrator on 2016/7/30 0030.
 */
$(function () {
    currentPage = 1;
    var url = "/System/GuestRoom/FindAll";
    var success=function(data){
        showHtml(data.bizData);
        weui.Loading.hide();
    };
    weui.Loading.show();
    var memid;
    if(!empty(MemberInfo)){
        memid=MemberInfo.id;
    }else{
        memid=null;
    }
    ajaxPostFun(url,{memId:memid},success, null,"取得客房用品");
});

//拼接HTML
function showHtml(dataList)
{
    for(var i=0; i<dataList.length; i++) {
        var html = '<dl class="dingdan">' +
          //  '<dt><img src="' + imgUrl +  dataList[i].picture + '"/></dt>' +
            '<dd>' +
            '<span class="aui-iconfont">' + dataList[i].name +'</span>' +
            '</dd>' +
            '<div class="jiajian ar yongpin">' +
            '<span class="aui-iconfont aui-icon-move icons" onclick="sub(' + dataList[i].id + ');"></span>' +
            '<span class="num" id="' + dataList[i].id +  '" name="' + dataList[i].name + '">0</span>' +
            '<span class="aui-iconfont aui-icon-add icons" onclick="add(' + dataList[i].id  + ');">' +
            '</div>' +
            '</dl>';
        $("#datalist").append(html);
    }
}
//数量递减
function sub(id){
    $("#"+id).html(parseInt($("#"+id).html())-1);
    if($("#"+id).html()<1){
        $("#"+id).html(0);
    }
}
//数量递增
function add(id){
    $("#"+id).html(parseInt($("#"+id).html())+1);
}

//function loadMore()
//{
//    currentPage = currentPage + 1;
//    var url = "/GuestRoom/guestRoomList/" + currentPage;
//    var success=function(data){
//        if(data.bizData.rows.length == 0)
//        {
//            weui.alert("没有更多客房用品");
//            weui.Loading.hide();
//        }
//        else
//        {
//            showHtml(data.bizData.rows);
//            weui.Loading.hide();
//        }
//    };
//    weui.Loading.show();
//    ajaxPostFun(url,null,success, null,"加载更多客房用品");
//}

//保存
function save()
{
   kefangyongpin();
}

function kefangyongpin(){
    var room=RoomInfo.room;
    var password=RoomInfo.password;
    var url = "/guestChekInfo/findByRoomAndPass";

    var success=function(data){
        var serviceData = [];
        $(".num").each(function()
        {
            if($(this).html()>0)
            {
                var obj = {"name" : $(this).attr("name"), "count": $(this).html(), "id" : $(this).attr("id")};
                serviceData.push(obj);
            }
        });
        var memid;
        if(!empty(MemberInfo)){
            memid=MemberInfo.id;
        }else{
            memid=0;
        }

        if(serviceData.length > 0)
        {
            var url = "/ServiceStyle/sendService";
            var jsonData = {"memId":memid,"room":RoomInfo.room, "accnt":RoomInfo.accnt, "hotelCode":RoomInfo.hotelCode, "scode":"375", "stitle":"客房用品", "remark":JSON.stringify(serviceData) };
            var success=function(data){
                weui.Loading.hide();
                weui.alert("您的服务请求已发送成功，稍后服务人员会联系您！","",function(){
                    window.location.href="kfFuwu.html";
                })
            };
            weui.Loading.show();
            ajaxPostFun(url,jsonData,success, null,"提交客房用品");
        }
        else
        {
            // layer.msg("请选择客房用品");
            weui.alert("请选择客房用品")
        }
    }

    var error=function (){
        window.location.href="index.html";
    }

    ajaxPostFun(url,{hotelCode:"capital",room:room,password:password},success, error,"验证码是否失效");
}
