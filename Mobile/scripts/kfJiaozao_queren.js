var id;
var room=RoomInfo.room;
var accnt=RoomInfo.accnt;
var dtime=new Date();
var nowtime= dtime.toLocaleString();
var time;
$(function () {
    var url="/ServiceStyle/findJiaozao";
    //memid=MemberInfo.id;
    if(!empty(MemberInfo)){
        memid=MemberInfo.id;
    }else{
        memid=0;
    }
    var data={room:room,hotelCode:"capital"};
    var success=function(data){
        if(data.bizData.length>0){
            id=data.bizData[0].id;
            $("#time").val(data.bizData[0].remark);
            $("#time").attr("disabled","disabled");
            $("#jzbutton").text("取消");
        }
    }
    ajaxPostFun(url,data,success,null,"查询未完成叫早的任务");
})
$("#jiaozao").click(function(){
    kefangjiaozao();
})
//取消叫早服务
function quxiaoser(){
    var qxurl="/ServiceStyle/sendService";
    var memId;
    if(!empty(MemberInfo)){
        memId=MemberInfo.id;
    }else{
        memId=0;
    }
    var data={hotelCode:"capital",room:room,accnt:accnt,scode:"385",stitle:"取消叫早",stime:nowtime,remark:time,memId:memId};
    var success=function(data){
        if(data.rtnCode=="0000000"){
            weui.alert("取消叫早成功","",function(){
                window.location.href="kfFuwu.html";
            });
           // window.location.href="kfFuwu.html";
        }
    };
    ajaxPostFun(qxurl,data,success,"","客房叫早");
}
function kefangjiaozao(){
    var room=RoomInfo.room;
    var password=RoomInfo.password;
    var url = "/guestChekInfo/findByRoomAndPass";

    var success=function(data){
        time=$("#time").val();
        if(time==""){
            weui.alert("请选择时间");
            return false;
        }
        var hoteCode=RoomInfo.hotelCode;
        if($("#jzbutton").text()=="取消"){
            delUrl="/ServiceStyle/deleteServiceStyle";
            var data={id:id};
            var delSuccess=function(){
                quxiaoser();
            }
            ajaxGetFun(delUrl,data,delSuccess,"","取消叫早");
        }else{
            var url="/ServiceStyle/sendService";
            var memId;
            if(!empty(MemberInfo)){
                memId=MemberInfo.id;
            }else{
                memId=0;
            }
            var data={hotelCode:"capital",room:room,accnt:accnt,scode:"203",stitle:"叫早",stime:nowtime,remark:time,memId:memId};
            var success=function(data){
                if(data.rtnCode=="0000000"){
                    weui.alert("叫早已设置成功，稍后服务人员会联系您！","",function(){
                        window.location.href="kfFuwu.html";
                        $("#jzbutton").text("取消");
                    })
                }
            };
            ajaxPostFun(url,data,success,"","客房叫早");
        }
    }

    var error=function (){
        window.location.href="index.html";
    }

    ajaxPostFun(url,{hotelCode:"capital",room:room,password:password},success, error,"退房成功以后验证码失效");
}
