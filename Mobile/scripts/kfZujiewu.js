/**
 * Created by Administrator on 2016/7/31 0031.
 */
var i=1;
var page=1;
$(document).ready(function(){
    getZjwuData(page);
})

function getZjwuData(page){
    var url="/System/Roomlending/FindAll";
    var data={};
    var success=function(data){

        if(data.rtnCode=="0000000"){
            var dataList=data.bizData;
            if(dataList!=null){
                /*var zjStr="";
                for(var i=0;i<dataList.length;i++){
                    var zjRows=rows[i];
                    zjStr+="<dl class='dingdan'>"
                        +"<dt><img src="+zjRows.picture+" /></dt>"
                        +"<dd>"
                        +" <span>"+zjRows.name+"</span>"+"<span>"+zjRows.price+"元/件</span>"
                        +"</dd>"
                        +"<div class='jiajian ar'>"
                        +"<span class='aui-iconfont aui-icon-move icons' onclick='sub("+i+")'></span>"
                        +"<span class=‘num’ id='“ + zjRows.id +  " 'name= '" + zjRows.name +"'>0</span>"
                        +"<span class='aui-iconfont aui-icon-add icons' onclick='add("+i+")'></span>"
                        +"</div>"
                        +"</dl>"
                }*/
                for(var i=0; i<dataList.length; i++) {
                    var html = '<dl class="dingdan">' +
                        //'<dt><img src="' + imgUrl +  dataList[i].picture + '"/></dt>' +
                        '<dd>' +
                        '<span class="aui-iconfont">' + dataList[i].name +'</span>' +
                        '<span class="aui-iconfont">' + dataList[i].price +'元/件</span>' +
                        '</dd> ' +
                        '<div class="jiajian ar zujie">' +
                        '<span class="aui-iconfont aui-icon-move icons" onclick="sub(' + dataList[i].id + ');"></span>' +
                        '<span class="num" id="' + dataList[i].id +  '" name="' + dataList[i].name + '" price="' + dataList[i].price + '">0</span>' +
                        '<span class="aui-iconfont aui-icon-add icons" onclick="add(' + dataList[i].id  + ');">' +
                        '</div>' +
                        '</dl>';
                    $("#zjwList").append(html);
                }
               // $("#zjwList").append(zjStr);
            }
        }
    };
    var error=function(){
        weui.alert("数据不正确");
    };
    ajaxPostFun(url,data,success,error,"客房租借物");
}

//数量递减
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
//页面退出后执行
function  unLoadWin(){
    i=0;
}

//确定租借
$("#subqueding").click(function(){
    kefangzujiewu();
})

function kefangzujiewu(){
    var room=RoomInfo.room;
    var password=RoomInfo.password;
    var url = "/guestChekInfo/findByRoomAndPass";

    var success=function(data){
        var hoteCode=RoomInfo.hotelCode;
        var room=RoomInfo.room;
        var accnt=RoomInfo.accnt;
        var dtime=new Date();
        var nowtime= dtime.toLocaleString();
        var serviceData = [];
        $(".num").each(function()
        {
            if($(this).html()>0)
            {
                var obj = {"name" : $(this).attr("name"), "count": $(this).html(), "id" : $(this).attr("id"),"price": $(this).attr("price")};
                serviceData.push(obj);
            }
        });
        var memid;
        if(!empty(MemberInfo)){
            memid=MemberInfo.id;
        }else{
            memid=0;
        }
        if(serviceData.length > 0) {
            var url = "/ServiceStyle/sendService";
            var data = {
                hotelCode: hoteCode,
                room: room,
                accnt: accnt,
                scode: "372",
                stitle: "租借物",
                stime: nowtime,
                "remark": JSON.stringify(serviceData),
                memId: memid
            };
            var success = function (data) {
                if (data.rtnCode == "0000000") {
                    weui.alert("您的服务请求已发送成功，稍后服务人员会联系您！", "", function () {
                        window.location.href = "kfFuwu.html";
                    })
                }

            };
            ajaxPostFun(url, data, success, "", "客房租借物");
        }else{
            weui.alert("请选择租借物品");

        }
    }

    var error=function (){
        window.location.href="index.html";
    }

    ajaxPostFun(url,{hotelCode:"capital",room:room,password:password},success, error,"验证码是否失效");
}
//function loadMore(){
//    page = page + 1;
//    var url="/roomlending/roomlendingList/"+page;
//    var success=function(data){
//        if(data.bizData.rows.length == 0)
//        {
//            weui.alert("没有更多租借物");
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