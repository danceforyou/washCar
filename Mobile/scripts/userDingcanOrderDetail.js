/**
 * Created by Administrator on 2016/7/30 0030.
 */

$(document).ready(function(){
    var id=localStorage.getItem("dcId");
    var url="/myorder/cyDishOrderDetailsList";
    var data={orderid:id};
    var success=function(data){
        if(data.rtnCode=="0000000"){
            var rows=data.bizData.rows;
            if(rows!=null){
                var html="";
                var amount=0;
                for(var i=0;i<rows.length;i++){
                    var cyRows=rows[i];
                    $("#hyName").html("姓名："+MemberInfo.name);
                    $("#hyTel").html("电话："+MemberInfo.phone);
                    $("#hyRoom").html();

                    html+="<li class='aui-border-b'>"
                            +"<span class='name'><img class='img' src="+cyRows.picture+">"+cyRows.name+"</span>"
                            +"<span class='num'>x"+cyRows.number+"</span>"
                            +"<span class='price c_red'>￥"+cyRows.number*cyRows.price+"</span>"
                        +"</li>"
                    amount+=parseFloat(cyRows.number)*parseFloat(cyRows.price);

                }
                $("#disList").append(html);
                $("#count").html(amount);
                $("#amount").html("￥"+amount);

            }
        }
    };
    var error=function(){
        weui.alert("数据不正确");
    };
    ajaxGetFun(url,data,success,error,"订餐订单详细信息");
})


//餐饮支付
function cyZhifu(){
    window.localStorage.href="cyLijiZhifu.html";
}
