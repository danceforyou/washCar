/**
 * Created by Administrator on 2016/7/30 0030.
 */

var i=1;
$(document).ready(function(){
    getDcData(1);
})

//页面退出页数还原
function dcUnload(){
    i=0;
}

//获取订餐数据1
function getDcData(page){
    weui.Loading.show();
    var url="/cyDishorder/cyOrderList/"+page;
    var data={};
    var success=function(data){
        weui.Loading.hide();
        if(data.rtnCode=="0000000"){
            var rows=data.bizData.rows;
            if(rows==null || rows.length<1){
                $("#loadMore").hide();
            }
            if(rows!=null){
                var html="";
                for(var i=0;i<rows.length;i++){
                    var dcRows=rows[i];
                    /**/
                    var payType=dcRows.payType;
                    var type=dcRows.type;
                    var payTypeStr="";
                    if(payType=="1"){
                        payTypeStr="客房挂账";
                    }else  if(payType=="2"){
                        payTypeStr="现金支付";
                    }else{
                        payTypeStr="其他";
                    }
                    var typeStr ;
                    if(type=="1"){
                        typeStr="餐厅订单";
                    }
                    if(type=="2"){
                        typeStr="客房送餐";
                    }
                    /*    if(type=="3"){
                     type="套餐";
                     }*////
                    if(type==2) {
                        html+="<div class='fangxinginfoview martop10'>"
                                //+"<h4><img src='images/fang_ico_09.jpg' alt=''/>订单类型："+typeStr+"<span class='c_red fr'>"+typeStr+"</span></h4>"
                            +"<h4><img src='images/fang_ico_09.jpg' alt=''/>订单类型："+typeStr+"<span class='c_red fr'>"+typeStr+"</span></h4>"
                            +"<a class='dingdan'>"
                            +"<div class='img'></div>"
                            +"<div class='info'>"
                            +"<div>订餐人："+dcRows.orderpeopler+"</div>"
                                //+"<div>用餐人数："+dcRows.peoplenumber+"</div>"
                            +"<div>房间号："+dcRows.room+"</div>"
                            +"<div>用餐时间："+dcRows.useDate +"</div>"
                            +"<div>联系电话："+dcRows.peplPhone+"</div>"
                            +"<span class='num c_9'>共<i class='c_2'>"+dcRows.number+"</i>件商品</span>"
                            +"</div>"
                            +"</a>";
                        html += "<div class='qufukuan'>"
                            + "<big class='f_size16 lineheight'>"
                            + "总价" + "<i class='c_red'>" + "￥" + dcRows.total + "</i> "
                            + " </big>";
                        if(payType!=1 && payType!=2){
                            html +="<div class='aui-btn qufukuanbtn fr'><a onclick='goPay("+dcRows.id+","+dcRows.total+")'>确认</a></div><div class='fr'>&nbsp;&nbsp;</div>  ";

                        }
                        var orderId = dcRows.id;
                        var json ={"name":encodeURI(encodeURI(dcRows.orderpeopler)),"room":dcRows.room,"time":dcRows.createDate,"phone":dcRows.peplPhone,"price":dcRows.total}
                        html +="<div class='aui-btn qufukuanbtn fr'><a href='cyKFsongcanDingdanDetail.html?json="+  JSON.stringify(json)+"&orderId="+orderId+" '>详情</a></div>  ";
                        html += "</div>"
                            +"</div>";
                    }else {
                        if (dcRows.orderStatus != 0){//只显示已经支付的订单

                            html+="<div class='fangxinginfoview martop10'>"
                                +"<h4><img src='images/fang_ico_09.jpg' alt=''/>订单类型："+typeStr+"<span class='c_red fr'>"+typeStr+"</span></h4>"
                                +"<a class='dingdan'>"
                                +"<div class='img'></div>"
                                +"<div class='info'>"
                                +"<div>订餐人："+dcRows.orderpeopler+"</div>"
                                +"<div>用餐人数："+dcRows.peoplenumber+"</div>"
                                    //+"<div>房间号："+dcRows.room+"</div>"
                                +"<div>用餐时间："+dcRows.useDate+"</div>"
                                +"<div>联系电话："+dcRows.peplPhone+"</div>"
                                +"<div>"+dcRows.remarks+"</div>"
                                +"<span class='num c_9'>共<i class='c_2'>"+dcRows.number+"</i>个订单</span>"
                                +"</div>"
                                +"</a>";
                            html += "<div class='qufukuan'>"
                            var orderId = dcRows.id;
                            var json ={
                                "useDate":dcRows.useDate,
                                "peoplenumber":dcRows.peoplenumber,
                                "orderpeopler":encodeURI(encodeURI(dcRows.orderpeopler)),
                                "number":dcRows.number,
                                "remarks":encodeURI(encodeURI(dcRows.remarks)),
                                "peplPhone": dcRows.peplPhone,
                                "orderNum":dcRows.orderNum,
                                "total":dcRows.total,
                                "dishesMoney":dcRows.dishesMoney,
                                "serviceMoney":dcRows.serviceMoney,
                                "serviceRatio":dcRows.serviceRatio,
                                "earnestMoney":dcRows.earnestMoney,
                                "earnestRatio":dcRows.earnestRatio,
                                "payMoney":dcRows.payMoney,
                                "residueMoney":dcRows.residueMoney,
                                "peoplePhone":dcRows.peoplePhone,
                                "createDate":dcRows.createDate,
                                "menId":dcRows.menId,
                                "payType":dcRows.payType,
                                "orderStatus":dcRows.orderStatus,
                                "dishJson":dcRows.dishJson
                            }
                            //根据订单状态不同显示不同的操作项
                            if (dcRows.orderStatus == 1){
                                html +="<div class='aui-btn qufukuanbtn fr'><a onclick=\"cancel("+orderId+",'"+dcRows.createDate+"','"+dcRows.createDate+"')\">取消订单</a></div><div class='fr'>&nbsp;&nbsp;</div>  ";
                            }else if (dcRows.orderStatus == 0){
                                html +="<div class='aui-btn qufukuanbtn fr'><a>去支付</a></div><div class='fr'>&nbsp;&nbsp;</div> ";
                            }else if (dcRows.orderStatus == 2){
                                html +="<div class='c_red fr'>已申请取消</div><div class='fr'>&nbsp;&nbsp;</div>";
                            }else if (dcRows.orderStatus == 3){
                                html +="<div class='c_red fr'>已取消</div><div class='fr'>&nbsp;&nbsp;</div>";
                            }else if (dcRows.orderStatus == 4){
                                html +="<div class='c_red fr'>正在授理</div><div class='fr'>&nbsp;&nbsp;</div>";
                            }else if (dcRows.orderStatus == 5){
                                html +="<div class='c_red fr'>退款完成</div><div class='fr'>&nbsp;&nbsp;</div>";
                            }else if (dcRows.orderStatus == 6){
                                html +="<div class='c_red fr'>取消失败</div><div class='fr'>&nbsp;&nbsp;</div>";
                            }
                            html +="<div class='aui-btn qufukuanbtn fr'><a href='CyDetailsInfo.html?json="+  JSON.stringify(json)+"&orderId="+orderId+" '>详情</a></div>  ";

                            html += "</div>"
                                +"</div>"
                        }
                    }
                    /*  html+="<div class='fangxinginfoview martop10'>"
                     +"<h4><img src='images/fang_ico_09.jpg' alt=''/>订单类型："+typeStr+"<span class='c_red fr'>"+typeStr+"</span></h4>"
                     +"<a class='dingdan'>"
                     +"<div class='img'></div>"
                     +"<div class='info'>"
                     +"<div>订餐人："+dcRows.orderpeopler+"</div>"
                     +"<div>用餐人数："+dcRows.peoplenumber+"</div>"
                     +"<span class='num c_9'>共<i class='c_2'>"+dcRows.number+"</i>件商品</span>"
                     +"</div>"
                     +"</a>";
                     if(type==2 &&(payType!=1 && payType!=2)) {
                     html += "<div class='qufukuan'>"
                     + "<big class='f_size16 lineheight'>" + "总价" + "<i class='c_red'>" + "￥" + dcRows.total + "</i></big>";
                     }
                     if(type==2 &&(payType!=1 && payType!=2)){
                     html +="<div class='aui-btn qufukuanbtn fr'><a onclick='goPay("+dcRows.id+")'>确认</a></div>";
                     }

                     html += "</div>"
                     +"</div>"*/
                }
                $("#dingcanList").append(html);
            }
        }
    };
    var error=function(){
        weui.Loading.hide();
        $("#dingcanList").html("<div style='margin-top: 20px;text-align: center;'>暂无数据</div>");
        $("#loadMore").hide();
    };
    ajaxPostFun(url,data,success,error,"我的订房订餐");
}

//加载更多
$("#loadMore").click(function(){
    i++;
    getDcData(i);
})

//取消订单      baihao
function cancel(orderId,createDate){
    var date = new Date();//获取当前时间
    var yy = date.getFullYear();
    var mm = date.getMonth()+1;
    var dd = date.getDate();
    var HH = date.getHours();
    var MM = date.getMinutes();
    var SS = date.getSeconds();
    var end_str = (yy+"-"+mm+"-"+dd+" "+HH+":"+MM+":"+SS).replace(/-/g,"/");
    var end_date = new Date(end_str);
    var sta_str = (createDate).replace(/-/g,"/");
    var sta_date = new Date(sta_str);
    var num = (end_date-sta_date)/(1000*60);//求出两个时间的时间差，这个是分钟
    var min = parseInt(Math.ceil(num));//转化为整分钟（小于零的话就不用转了）
    if(min<=30){
        //alert(orderId);
        var url="/cyDishorder/updateCyOrderStatus";
        var data={"orderId":orderId,"orderStatus":"2"};
        var success=function(data){
            if(data.rtnCode=="0000000"){
                weui.alert("取消订单成功");
                setTimeout("setReload()", 1000*2);
            }
        };
        ajaxPostFun(url,data,success,"","取消订单");
    }else{
        weui.alert("订单已超过30分钟，无法取消");
    }
}
function setReload(){
    window.location.reload();
}
//去支付
function goPay(id,price){
    localStorage.setItem("dcId",id);
    window.location.href="./cyLijiZhifu.html?orderId="+id+"&price="+price;
}