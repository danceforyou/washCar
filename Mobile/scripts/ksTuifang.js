/**
 * Created by Administrator on 2016/7/31 0031.
 */
var Billdata;
var memid;
var phone;
$(document).ready(function(){
    if(!empty(MemberInfo)){//已经登录
        memid=MemberInfo.id;
        phone=MemberInfo.phone;
    }else{
        memid=0;
        phone="";
    }
    var total = "";
    var balance = '';
    if(empty(SmitMemberInfo)){
        total = "0.00";
        balance = '0.00'
    }else{
        total = SmitMemberInfo.total;
        balance = SmitMemberInfo.balance;
    }
    $("#fh").html("<span>房号：</span>"+RoomInfo.room);
    $("#zh").html("<span>手机号：</span>"+phone);
    $("#xfje").html("<span id='total'>消费金额：</span>"+"￥"+total);
    $("#ye").html("<span id='balance'>余额：</span>"+"￥"+balance);
    returnBill(RoomInfo.hotelCode,RoomInfo.room);
    initFaPiaoInfo();
});
function returnBill(hotelCode, room){
    var url = "/returnBill/findByroomBill";
    //alert(RoomInfo.accnt);

    var data={hotelCode:hotelCode,room:room,accnt:RoomInfo.accnt};
    var successFun = function(data){
        var html = "";
        var bizData = data.bizData;
        Billdata=bizData;
        console.log(data);
        if(bizData!=null&&bizData.length>0){
            weui.Loading.hide();
            var items=bizData[0].items;
            var items = eval("(" + items + ")");
            var kfsc="";
            if(bizData[0].total!=null){
                $("#xfje").html("<span id='total'>消费金额：</span>￥"+bizData[0].total);
            }
            if(bizData[0].balance!=null){
                $("#ye").html("<span id='balance'>余额：</span>￥"+bizData[0].balance);
            }
            if(items.length>0){
                for(var i=0;i<items.length;i++){
                    kfsc +="<li class='aui-border-b'><span class='leftOne'>"+
                        items[i].item+"</span><em class='c_5 marginCent'>￥"+
                        items[i].amount +"</em>"+"<em class='c_5 marginCent marginLeft '>"+
                        items[i].time  +"</em>"+
                        "</li>";
                }
            }
            $("#xiaofei").append(kfsc);
        }else {
            returnBill(RoomInfo.hotelCode,RoomInfo.room);
        }
    };
    weui.Loading.show();
    ajaxPostFun(url,data,successFun,null,"刷新请求账单");
}

$("#zdqr").click(function(){
    if(Billdata.length>0){
        submitdkstuifang();
    }else{
        weui.alert("账单正在核对中，请稍后");
    }
});

function submitdkstuifang(){
    var dtime=new Date();
    var nowtime= dtime.toLocaleString();
    var url="/ServiceStyle/sendService";
    var str = $("#taitou").text() + "," + $("#mingxi").text() + "," + $("#fangshi").text() + "," + $("#address").text();
    var data={hotelCode:RoomInfo.hotelCode,room:RoomInfo.room,accnt:RoomInfo.accnt,scode:"384",stitle:"确认快速退房",stime:nowtime,remark:str,memId:memid};
    var success=function(data){
        if(data.rtnCode=="0000000"){
            appStorage.removeItem("taitou");
            appStorage.removeItem("mingxi");
            appStorage.removeItem("fangshi");
            appStorage.removeItem("address");
            weui.alert("快速退房申请成功，请将房卡归还至前台","温馨提示",function(){
                window.location.href="index.html";
            })
        }
    };
    ajaxPostFun(url,data,success,null,"确认快速退房");

}

function initFaPiaoInfo()
{
    if(appStorage.getItem("fangshi") != "undifiened" && appStorage.getItem("fangshi"))
    {
        $("#taitou").text("发票抬头：" + appStorage.getItem("taitou"));
        $("#mingxi").text("发票明细：" + appStorage.getItem("mingxi"));
        $("#fangshi").text("拿取方式：" + appStorage.getItem("fangshi"));
        $("#address").text("邮寄地址：" + appStorage.getItem("address"));
        $("#fapiaoxinxi").show();
    }
}