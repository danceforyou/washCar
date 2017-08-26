/**
 * Created by Administrator on 2016/7/29 0029.
 */
var total;
$(document).ready(function(){
    if(empty(SmitMemberInfo)){
        weui.alert("不是该酒店会员，请到个人中心完善账号信息","",function(){
            window.location.href="userZhanghaoGuanli.html";
        });
    }
    weui.Loading.show();
    var memtype=SmitMemberInfo.memtyp;
    var icunm=SmitMemberInfo.icnum;
    var url="/myorder/queryOrder";
    var data= {icnum:icunm,bgDate:"2000-01-01",edDate:"2020-01-01",memtyp:memtype,bookstus:""};
    var success=function(data){
        weui.Loading.hide();
        if(data.rtnCode=="0000000"){
            var dfOrders=data.bizData.orders;
            if(dfOrders!=null){
                var dfStr="";
                for(var i=0;i<dfOrders.length;i++){
                    var dfOrder=dfOrders[i];
                    var orderDetailList=dfOrder.orderDetailList;
                    pricedetail=orderDetailList[0].priceDetail;
                    roomNums=orderDetailList[0].roomNums;
                    var result=pricedetail.split(",");
                    var total=FloatAdd(result,roomNums);
                    var status=dfOrder.staus;
                    var notice=dfOrder.notice;

                    console.log("22222222");
                    console.log(notice);
                    var statuStr="";
                    var str1="";
                    switch(status){
                        case "0":
                            statuStr="待生成";
                            str1='<div class="textReight"><button  onclick="verficy(this)">取消订单</button></button></div>';
                            break;
                        case "1":
                            statuStr="待确认";
                            str1='<div class="textReight"v><button onclick="verficy(this)">取消订单</button></button></div>';
                            break;
                        case "2":
                            statuStr="已确认";
                            str1='<div class="textReight"><button onclick="verficy(this)">取消订单</button></button></div>';
                            break;
                        case "3":
                            statuStr="已拒绝";
                            break;
                        case "4":
                            statuStr="取消";
                            break;
                        case "5":
                            statuStr="处理失败";
                            break;
                        case "6":
                            statuStr="未支付";
                            str1='<div class="textReight"><button onclick="verficy(this)">取消订单</button></button></div>';
                            break;
                        default:
                            break;
                    }
                    var j=0;
                    if(status=="6"){
                        dfStr+="<div class='fangxinginfoview martop10' onclick='getBookroomDetail(\""+status+"\",\""+statuStr+"\",\""+dfOrder.pay_amt+"\",\""+dfOrder.orderNo+"\",\""+dfOrder.arrDate+"\",\""+dfOrder.depDate+"\",\""+dfOrder.guestPhone+"\",\""+dfOrder.guestMail+"\",\""+dfOrder.fast_arr_tm+"\",\""+dfOrder.last_arr_tm+"\",\""+dfOrder.bookDt+"\",\""+dfOrder.orderDetailList[j].roomName+"\",\""+dfOrder.orderDetailList[j].priceName+"\",\""+dfOrder.orderDetailList[j].roomNums+"\",\""+dfOrder.orderDetailList[j].guestNums+"\",\""+dfOrder.orderDetailList[j].breakfast+"\",\""+notice+"\")'>"
                            +"<h4><img src='images/fang_ico_09.jpg' alt=''/>酒店订单号 ："+dfOrder.orderNo+"<span class='c_red fr'>"+statuStr+"</span></h4>"
                            +"<a class='dingdan'>"
                            +"<div class='info infoFw'>"
                            +"<div class='dfDingdan'>"
                            +"订房人员：<em>"+dfOrder.guestName+"</em><i>"+"入住日期："+"<b>"+dfOrder.arrDate+"</b></i>"
                            +"</div>"
                            +"</div>"
                            +"</a>"
                            +"<div class='qufukuan'>"
                            +"<big class='f_size16 lineheight'>"+"总房价"+"<i class='c_red'>"+"￥"+total+"</i></big>"
                            +"<big class='f_size16 lineheight'>"+" "+"应付款"+"<i class='c_red'>"+"￥"+dfOrder.pay_amt+"</i></big>"
                            +"</div>"
                            +"</div>"
                            +str1;
                    }else{

                        dfStr+="<div class='fangxinginfoview martop10' onclick='getBookroomDetail(\""+status+"\",\""+statuStr+"\",\""+dfOrder.pay_amt+"\",\""+dfOrder.orderNo+"\",\""+dfOrder.arrDate+"\",\""+dfOrder.depDate+"\",\""+dfOrder.guestPhone+"\",\""+dfOrder.guestMail+"\",\""+dfOrder.fast_arr_tm+"\",\""+dfOrder.last_arr_tm+"\",\""+dfOrder.bookDt+"\",\""+dfOrder.orderDetailList[j].roomName+"\",\""+dfOrder.orderDetailList[j].priceName+"\",\""+dfOrder.orderDetailList[j].roomNums+"\",\""+dfOrder.orderDetailList[j].guestNums+"\",\""+dfOrder.orderDetailList[j].breakfast+"\",\""+dfOrder.notice+"\")'>"
                            +"<h4><img src='images/fang_ico_09.jpg' alt=''/>酒店订单号 ："+dfOrder.orderNo+"<span class='c_red fr'>"+statuStr+"</span></h4>"
                            +"<a class='dingdan'>"
                            +"<div class='info infoFw'>"
                            +"<div class='dfDingdan'>"
                            +"订房人员：<em>"+dfOrder.guestName+"</em><i>"+"入住日期："+"<b>"+dfOrder.arrDate+"</b></i>"
                            +"</div>"
                            +"</div>"
                            +"</a>"
                            +"<div class='qufukuan'>"
                            +"<big class='f_size16 lineheight'>"+"总房价"+"<i class='c_red'>"+"￥"+total+"</i></big>"
                            +"<big class='f_size16 lineheight'>"+" "+"已付款"+"<i class='c_red'>"+"￥"+dfOrder.pay_amt+"</i></big>"
                            +"</div>"
                            +"</div>"
                            +str1;
                    }
                }
                $("#dfdingdanList").append(dfStr);
            }
        }
    };
    var error=function(){
        weui.alert("数据不正确");
        weui.Loading.hide();
    };
    ajaxPostFun(url,data,success,error,"我的订房订单");

    queryExceptionOrders();
});

function queryExceptionOrders(){
    var url = "/MobileOrder/queryExceptionOrders";
    var success = function(data){
        var EOrders=data.bizData;
        var html = "";
        for (var index in EOrders){
            var exceptionInfo = EOrders[index].exception_remark;
            exceptionInfo = exceptionInfo.split("YR");
            var price;
            if (empty(EOrders[index].discountMoney)){
                price = EOrders[index].price*100;
            }else{
                price = EOrders[index].price*100 - EOrders[index].discountMoney*100;
            }
            html += '<div class="fangxinginfoview martop10">';
            html += '<h4><img src="images/fang_ico_09.jpg" alt="">'+exceptionInfo[0]+'<span class="c_red fr">预订异常</span></h4>';
            html += '<a class="dingdan">';
            html += '<div class="info infoFw">';
            html += '<div class="dfDingdan">核实电话：<em>40091999887</em>';
            html += '<i>'+exceptionInfo[1]+'</i>';
            html += '</div>';
            html += '</div>';
            html += '</a>';
            html += '<div class="qufukuan">';
            html += '<big class="f_size16 lineheight">实付款<i class="c_red">￥'+price/100+'</i></big>';
            html += '<div class="aui-btn qufukuanbtn fr"><a href="tel:40091999887">拨打电话</a></div>';
            html += '</div>';
            html += '</div>';
        }
        $('#exceptionInfo').html(html);
    };
    var error = function(data){
        var html = '<div class="dingdan" style="margin-left: auto;margin-right: auto;padding: 1.5em 0 1.5em;">没有异常订单信息</div>';
        $('#exceptionInfo').html(html);
    };
    ajaxPostFun(url,{icnum:SmitMemberInfo.icnum},success,error,"获取我的异常订单");
}



//跳转至详细页面
function getBookroomDetail(state,stateStr,pay_amt,orderNo,arrDate,depDate,guestPhone,guestMail,fast_arr_tm,last_arr_tm,bookDt,roomName,priceName,roomNums,guestNums,breakfast,notice){
    localStorage.setItem("state",state);
    localStorage.setItem("stateStr",stateStr);
    localStorage.setItem("pay_amt",pay_amt);
    localStorage.setItem("orderNo",orderNo);
    localStorage.setItem("arrDate",arrDate);
    localStorage.setItem("depDate",depDate);
    localStorage.setItem("guestPhone",guestPhone);
    localStorage.setItem("guestMail",guestMail);
    localStorage.setItem("fast_arr_tm",fast_arr_tm);
    localStorage.setItem("last_arr_tm",last_arr_tm);
    localStorage.setItem("bookDt",bookDt);
    localStorage.setItem("roomName",roomName);
    localStorage.setItem("priceName",priceName);
    localStorage.setItem("roomNums",roomNums);
    localStorage.setItem("guestNums",guestNums);
    localStorage.setItem("breakfast",breakfast);
    localStorage.setItem("notice2",notice);

    window.location.href="grDingdanzhifuDingfang.html";
}


//浮点数加法运算
function FloatAdd(result,roomNums){
    var pricedetail;
    var price;
    var roomNum;
    var m;
    var sum=0;
    for(var i=0;i<result.length;i++){
        if(result[i]!="undefined"){
            sum+= parseFloat(parseFloat(result[i]).toFixed(2)*roomNums);
        }
    }
    return Math.round(sum);
}

function verficy(obj){
        weui.alert("取消订单请与酒店联系","温馨提示",
            function(){
            document.getElementById("phon").click();
        });

}

