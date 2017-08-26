/**
 * Created by Administrator on 2016/7/30 0030.
 */

$(document).ready(function(){
    //获得订单详细信息
    var orderSta=localStorage.getItem("state");
    var orderprice=localStorage.getItem("pay_amt");
    var orderNum=localStorage.getItem("orderNo");
    var notice2=localStorage.getItem("notice2");
    var array= new Array(); //定义一数组
    array=notice2.split(","); //字符分割
    var usernotice=array[0];
    console.log("备注信息：============================");
    console.log(notice2);
    if(orderSta=="6"){
        var payhtml="<a href='javascript:zhifu(\""+orderNum+"\",\""+orderprice+"\")' class='aui-btn aui-btn-primary quzhifubtn'>去支付</a>"
        $("#dingdanpay").append(payhtml);
    }
     $("#orderState").html(localStorage.getItem("stateStr"));
    $("#arrData").html(localStorage.getItem("arrDate"));
    $("#levData").html(localStorage.getItem("depDate"));
    //$("#orderPeo").html(roomOrder.guestName);
    $("#orderTel").html(localStorage.getItem("guestPhone"));
    $("#orderEmail").html(localStorage.getItem("guestMail"));
    $("#zuizao").html(localStorage.getItem("fast_arr_tm"));
    $("#zuiwan").html(localStorage.getItem("last_arr_tm"));
    $("#roomName").html(localStorage.getItem("roomName"));
    $("#priceName").html(localStorage.getItem("priceName"));
    $("#roomNums").html(localStorage.getItem("roomNums"));
    $("#guestNums").html(localStorage.getItem("guestNums"));
    $("#breakFast").html(localStorage.getItem("breakfast"));
    $("#notice").html(usernotice);

    // $("#orderCoder").html("订单号："+orderNo);

    $("#bookData").html("下单时间："+localStorage.getItem("bookDt"));
})
function zhifu(orderNum,orderprice){
    //alert("ddddddddd");
    //alert(orderNum);
    //alert(orderprice);
    window.location.href="dfLijiZhifu.html?orderNum="+orderNum+"&orderprice="+orderprice;
}