var page=1;
//dates('Y-m-d',bizData[i].endDate)时间转换
$(function () {
    function couponList(){
        weui.Loading.show();
        var url = "/Coupons/CouponsList";
        var successFun = function(data){
            var html = "";
            var bizData = data.bizData;
            for (var i in bizData){
                //if(bizData[i].type==1){
                //    bizData[i].type
                //}
                html +=
                    "<dl>" +
                        "<dt>"+bizData[i].type+"<span><small>￥</small><i>"+bizData[i].name+"</i></span></dt>" +
                        "<dd>"+bizData[i].descript+"<span>有效期:"+bizData[i].openDate+"至"+bizData[i].endDate+"</span></dd>" +
                        "<p>"+bizData[i].score+"积分"+"<a href='javascript:jfduihuan("+bizData[i].id+","+bizData[i].score+");'"+"class='fr' id='jfduihuan'>兑换</a></p>" +
                    "</dl>";
            }
            html += '<div class="clearfix"></div>';
            $('#youhuijuanlist').html(html);
            weui.Loading.hide();
        };
        var errorFun = function(data){
            weui.Loading.hide();
            weui.alert("没有数据");
        };
        ajaxPostFun(url, {}, successFun, errorFun, "获取优惠券列表");
    }
    couponList();

})
function jfduihuan(id,jf){
    weui.Loading.show();
    //console.log("sssssssssss");
    //console.log(SmitMemberInfo);
    var score=SmitMemberInfo.score;//个人积分
    if (score<jf){
        weui.Loading.hide();
        weui.alert("您当前积分余额不足,无法兑换!");
    }else{
        window.location.href ="grJifenduihuan.html?id="+id;
    }
}
