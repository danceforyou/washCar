/**
 * Created by Administrator on 2016/6/26.
 */
var  arrDate ;
var  depDate;
var  number ;
var  roomcode  = "";
var  roomname = "";
var  roomPic = "";
var  roomDes="";
var timeduan="";

$(function () {
    $("#arrDate").val(getDateStr(0))
    $("#depDate").val(getDateStr(1))

    arrDate = $("#arrDate").val();
    depDate = $("#depDate").val();

    $("#btnSearch").click(function () {
        localStorage.removeItem('x');//清除存储离开日期
         weui.Loading.show();
        //检查表单
        if($("#frmSearch input[name='arrDate']").val()==''){
            layer.msg("请填写入住日期")
            return false;
        }
        if($("#frmSearch input[name='depDate']").val()==''){
            layer.msg("请填写离开日期")
            return false;
        }
        arrDate = $("#arrDate").val();
        depDate = $("#depDate").val();
        //  var formDataArray = {'arrDate':arrDate, 'depDate':depDate, 'phone':MemberInfo.phone}
        var url=server+"/dingfang/queryRooms";
         var success=function(json){
             weui.Loading.hide();
          if (json.bizData.rooms){
                $(".fangxing ul").html("");
                var rows=json.bizData.rooms;
                for (var i=0;i<rows.length;i++){
                    console.log(rows[i]);
                    var hotelRoomVOf=rows[i];
                    //如果房间数量小于等于0，则不显示
                    if(hotelRoomVOf.roomAvl>0){
                        //获取当前查询的时间段
                        timeduan = $("#arrDate").val()+","+$("#depDate").val();
                        // roomPic = hotelRoomVOf.roomPic;
                        roomDes=hotelRoomVOf.roomDes;
                        var html = " <a>"+
                            "<li class='aui-list-view-cell aui-img roomli' style='background: #eee' roomname='"+hotelRoomVOf.roomName+"' roomcode='"+hotelRoomVOf.roomCode+"'>"+
                            "<price class='aui-pull-right'><i>¥</i>"+hotelRoomVOf.price_min+ "<span style='font-size: 0.5em;'>起</span>" +" <em class='emClick'></em></price>"+
                            "<img class='aui-img-object aui-pull-left' src='"+hotelRoomVOf.roomPic+"'>"+
                            "<div class='aui-img-body' id='' name='"+hotelRoomVOf.price_min+"'>"+
                            "<span class='title'>"+hotelRoomVOf.roomName+"</span>"+
                            "<p class='aui-ellipsis-1'><span> </span><span> </span><span> </span></p>"+
                            "</div>"+
                            "</li>"+
                            "<ol class='aui-list-view priceList oldisplay ' data='"+hotelRoomVOf.roomAvl+"' name='"+hotelRoomVOf.roomPic+"' id='"+hotelRoomVOf.roomCode+"'></ol>" +
                            "</a>";
                        $(".fangxing ul").append(html);
                        bindEm();
                    }
                }
            }else{
                weui.alert(json.bizData.msg);
            }

        };
        var errorFun = function(data){

        };
        //ajaxPostFun(url,{ arrDate:arrDate,depDate:depDate,memtyp:"3",icpwd:'1234567',cardTyp:MemberInfo.cardTyp,icnum:MemberInfo.icnum,phone:MemberInfo.phone},success,null,"房间查询");
        ajaxPostFun(url,{ arrDate:arrDate,depDate:depDate,icnum:SmitMemberInfo.icnum,carTyp:SmitMemberInfo.carTyp},success,null,"房间查询");
    });

});

     //房间详情跳转
function bindEm(){
    $(".emClick").css("background-image","url(images/dingfang.png)")
    $(".emClick").css("background-size","cover")


    $(".roomli").unbind("click");
    $(".roomli").bind("click",function () {
      roomcode = $(this).attr("roomcode");
      roomname = $(this).attr("roomname");
       if($("#"+roomcode).is(":hidden")){
           var price_min = $(this).find("div").attr("name");
           var roomAvl = $(this).parent().find("ol").attr("data");
 　　  　 queryPriceInfo(roomcode,roomname,price_min,roomAvl);

        }
        $("#"+roomcode).toggle(200);
    })

}
     //订房直通车详情页面
function queryPriceInfo(roomCode,roomname,price_min,roomAvl){
    weui.Loading.show();
    //roomname=encodeURI(roomname);
   // roomname=encodeURI(roomname);
    var userinfo = JSON.parse(appStorage.getItem('MemberInfo'));
     //var data={arrDate:arrDate,depDate:depDate,number:number,roomCode:roomCode,memtyp:'0',icnum:userinfo.icnum,icpwd:userinfo.pwd} ;
    var data={arrDate:arrDate,depDate:depDate,'icnum':SmitMemberInfo.icnum,roomCode:roomCode,carTyp:SmitMemberInfo.carTyp} ;

    var url=server+"/dingfang/queryPriceInfo";
    var success=function(json){
        weui.Loading.hide();
        if (!empty(json.bizData)){
            var rows=json.bizData.priceInfo;
             // var rows=json.bizData;
            var html = "";
             for (var i=0;i<rows.length;i++){
                console.log(rows[i]);
                 var hotelRoomVO = rows[i];
                // var hotelRoomVO = json.bizData;

                var priceName = hotelRoomVO.priceName;
                 //priceName=encodeURI(priceName);
                 //priceName=encodeURI(priceName);
                 //roomDes=encodeURI(roomDes);
                 //roomDes=encodeURI(roomDes);
                 var href ='dfZhitongche.html?priceCode='+hotelRoomVO.priceCode+  '&priceName='+priceName+ '&roomCode='+roomCode+"&arrDate="+arrDate+"&depDate="+depDate+"&roomAvl="+roomAvl+"&priceDetail="+hotelRoomVO.priceDetail+"&breakfastCount="+hotelRoomVO.breakfastCount+"&roomName="+ roomname+"&roomPic="+$("#"+roomcode).attr('name') +"&roomDes="+roomDes;
                 href=encodeURI(href);
                 var selectRoom = {priceCode:hotelRoomVO.priceCode,roomCode:roomCode};
                 if(hotelRoomVO.payFlg==2||hotelRoomVO.payFlg==3){
                     //说明需要授权
                     html +=
                         "<a href='javascript:weui.alert("+'"会员等级不够，请继续努力哦！"'+")'>"+
                         " <li class='aui-list-view-cell aui-img' style='background: #f5f5f5'>"
                     //判断是几天的房间，如果是1天则显示该天的房价，如果是多天，就显示最低价钱
                     if(hotelRoomVO.priceDetail.split(",").length>1){
                         //说明是多个房间价格，则显示最低价钱
                         html +="<price class='aui-pull-right'><span style='font-size: 10px;'>均价</span><i>¥</i>"+hotelRoomVO.avgAmt+ "<span style='font-size: 0.5em;margin-right: 30px;'></span></price>"
                     }else{
                         //说明是一个房间价格，则显示该价格
                         html +="<price class='aui-pull-right'><i>¥</i>"+hotelRoomVO.priceDetail+"</price>"
                     }
                     html +="<div class='aui-img-body'>"+
                         " <span class='title'>"+hotelRoomVO.priceName+"</span><b> </b>"+
                         "<p class='aui-ellipsis-1'><span> </span><span> </span><span> </span></p>"+
                         "</div>"+
                         "</li>"+
                         "</a>"
                     if(hotelRoomVO.priceDetail.split(",").length>1){
                         html +="<span class='xiangqing' onclick=xiangqing('"+timeduan+"','"+hotelRoomVO.priceDetail+"')>明细</span>"
                     }
                 }else{
                     //无需授权
                     html +=
                         "<a href='"+href+"'>"+
                         " <li class='aui-list-view-cell aui-img' style='background: #f5f5f5'>"
                     //判断是几天的房间，如果是1天则显示该天的房价，如果是多天，就显示最低价钱
                     if(hotelRoomVO.priceDetail.split(",").length>1){
                         //说明是多个房间价格，则显示最低价钱
                         html +="<price class='aui-pull-right'><span style='font-size: 10px;'>均价</span><i>¥</i>"+hotelRoomVO.avgAmt+ "<span style='font-size: 0.5em;margin-right: 30px;'></span></price>"
                     }else{
                         //说明是一个房间价格，则显示该价格
                         html +="<price class='aui-pull-right'><i>¥</i>"+hotelRoomVO.priceDetail+"</price>"
                     }
                     html += "<div class='aui-img-body'>"+
                         " <span class='title'>"+hotelRoomVO.priceName+"</span><b> </b>"+
                         "<p class='aui-ellipsis-1'><span> </span><span> </span><span> </span></p>"+
                         "</div>"+
                         "</li>"+
                         "</a>"
                     if(hotelRoomVO.priceDetail.split(",").length>1){
                         html +="<span class='xiangqing' onclick=xiangqing('"+timeduan+"','"+hotelRoomVO.priceDetail+"')>明细</span>"
                     }
                 }
             }
            //显示房间详情之前查询该用户上一级别的房间
            //循环结束后判断是否需要查询上一级别的房间信息
            var kajibie = SmitMemberInfo.carTyp;
            if (kajibie==3){
                //3是宝石卡，则这里需要查询银卡
                upjibieroom("2",roomCode,html);
            }else if (kajibie==2){
                //2时银卡，则这里需要查询金卡
                upjibieroom("1",roomCode,html);
            }else if (kajibie==1){
                //1是金卡，则这里需要查询白金卡
                upjibieroom("4",roomCode,html);
            }else{
                $("#"+roomCode).html(html);
                bindEm();
            }
        }
    };
    ajaxGetFun(url,data,success,function () {
        weui.Loading.hide();
    },"查询房间价格");
}


//查询上一级别的房间类型
function upjibieroom(kaleixing,roomCode,html){
    var url=server+"/dingfang/queryRoomsUP";
    var data={arrDate:arrDate,depDate:depDate,cardTyp:kaleixing,roomCode:roomCode} ;
    var success=function(json){
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        //判断rows是否存在房间信息
        var rows=json.bizData.priceInfo;
        if(!empty(rows)){
            for (var i=0;i<rows.length;i++){
                //拼接html
                html +=
                    "<a href='javascript:weui.alert("+'"会员等级不够，请继续努力哦！"'+")'>"+
                    " <li class='aui-list-view-cell aui-img' style='background: #dedede'>"
                //判断是几天的房间，如果是1天则显示该天的房价，如果是多天，就显示最低价钱
                if(rows[i].priceDetail.split(",").length>1){
                    //说明是多个房间价格，则显示最低价钱
                    html +="<price class='aui-pull-right'><span style='font-size: 10px;'>均价</span><i>¥</i>"+rows[i].avgAmt+"<span style='font-size: 0.5em;margin-right: 30px;'></span></price>"
                }else{
                    //说明是一个房间价格，则显示该价格
                    html +="<price class='aui-pull-right'><i>¥</i>"+rows[i].priceDetail+"</price>"
                }
                html+="<div class='aui-img-body'>"+
                    " <span class='title'>"+rows[i].priceName+"</span><b> </b>"+
                    "<p class='aui-ellipsis-1'><span> </span><span> </span><span> </span></p>"+
                    "</div>"+
                    "</li>"+
                    "</a>";
                if(rows[i].priceDetail.split(",").length>1){
                    html +="<span class='xiangqing' onclick=xiangqing('"+timeduan+"','"+rows[i].priceDetail+"')>明细</span>"
                }

            }
        }

        $("#"+roomCode).html(html);
        bindEm();
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    };
    var errorFun = function(data){

    };
    ajaxPostFun(url,data,success,null,"上一级别房间查询");
}






function xiangqing(timeduan,prices) {
    layer.open({
        type: 2,
        title: '房间价钱详情',
        shadeClose: true,
        shade: 0.8,
        area: ['300px', '300px'],
        content: 'dfZhitongcheInfoLayer.html?timeduan='+timeduan+"&prices="+prices
    });

}








function getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    if(m<10){
        m="0"+m;
    }
    if(d<10){
        d="0"+d;
    }
    return y+"-"+m+"-"+d;
}
