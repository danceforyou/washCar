/**
 * Created by Administrator on 2016/7/30 0030.
 */
var CyDishorderEArray=[];
$(function () {
    $("#disList").html("");
    var disListHtml="";
    var carMap=JSON.parse(appStorage.getItem("carItemDC"));
    var len = carMap.keys.length;
    var amount=0;
    for(var i=0;i<len;i++){
        var k = carMap.keys[i];
        var o=carMap.data[k];
        amount+=o.price;
        disListHtml+=" <li class=\"aui-border-b\">"+
       " <span class=\"name\"><img class=\"img\" src='images/cai.jpg'/>"+o.name+"</span>"+
           " <span class=\"num\">"+o.num+"</span>"+
           " <span class=\"price c_red\">"+o.price+"</span>"+
           " </li>";
    }
    $("#disList").html(disListHtml);
    $("#count").text(amount);
    var CyDishorderEntity={};
    $("#hyName").text("姓名:"+MemberInfo.name);
    $("#hyTel").text("电话:"+MemberInfo.phone);
    $("#hyRoom").text(SmitMemberInfo==null?"未知":SmitMemberInfo.room);
    console.log(carMap.data);
});

function reserveConfirm(formData) {
    var url = "/cyDishorder/cyOrderConfirm/";
    var successFun = function(data){
        console.log(data);
        weui.alert("订单已提交","系统提示",function () {
            window.location.href="cyYongcanFangshi.html";
        });

    };
    var errorFun = function(data){
        console.log(data)
        /* weui.alert("保存订单失败!","", function () {
         window.location.href = "login.html";
         });*/
    };
    ajaxPostFun(url,formData, successFun, errorFun,"保存订单信息");
}
