/**
 * Created by Administrator on 2016/7/30 0030.
 */

$(document).ready(function(){

    var index = localStorage.getItem("fwIndex");
    var data = localStorage.getItem(index);
    var jsn = JSON.parse(data);
    $("#cartype").html("车型:&nbsp;&nbsp;&nbsp;&nbsp;"+jsn.name);
    $("#number").html("人数:&nbsp;&nbsp;&nbsp;&nbsp;"+jsn.number);
    $("#date").html("时间:&nbsp;&nbsp;&nbsp;&nbsp;"+jsn.time);
    $("#place").html("地点:&nbsp;&nbsp;&nbsp;&nbsp;"+jsn.place);

    /*
    var id=localStorage.getItem("fwId");
    var url="/myorder/cyDishOrderDetailsList";
    var data={orderid:id};
    var success=function(data){
        if(data.rtnCode=="0000000"){
            $("#cartype").val("");
            $("#number").val("");
            $("#date").val("");
            $("#place").val("");
        }
    };
    var error=function(){
        weui.alert("数据不正确");
    };
    ajaxPostFun(url,data,success,error,"租车订单详细信息");
    */
})

