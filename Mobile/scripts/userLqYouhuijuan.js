/**
 * Created by yongrong on 16/7/30.
 */
$(function () {
    LCouponsList();
});

function LCouponsList(){
    weui.Loading.show();
    var url = "/Coupons/LCouponsList/"+MemberInfo.id;
    var successFun = function(data){
        var html = '';
        var bizData = data.bizData;
        for (var i in bizData){
            html += '<dl><dt>';
            html += bizData[i].type;//;
            html += '<span><small>￥</small><i>'+bizData[i].name+'</i></span>';
            html += '</dt><dd>'+bizData[i].descript;
            html += '<span>有效期:'+bizData[i].openDate+"至"+bizData[i].endDate+'</span>';
            html += '</dd>';
            html += '<p><a href="javascript:lq('+bizData[i].id+');" class="fr">领取</a></p></dl>';
        }
        html += '<div class="clearfix"></div>';
        weui.Loading.hide();
        $('.useryouhuijuanlist').html(html);
    };
    var errorFun = function(data){
        weui.Loading.hide();
        layer.msg("没有可领取的优惠券");
    };
    ajaxPostFun(url, {}, successFun, errorFun, "获取可以领取的优惠券列表");
}

function lq(id){
    var url = "/Coupons/lqCoupons";
    var successFun = function(data){
        if(data.bizData==1){
            layer.msg("恭喜你,获的此优惠券",{icon: 6,time:1000});
        }else {
            layer.msg("网络异常,请检查网络连接稍等再试!");
        }
    };
    var errorFun = function(data){
        layer.msg("您已经领取过此优惠券了",{icon: 5,time:1000});
    };
    ajaxPostFun(url, {id:id}, successFun, errorFun, "领取优惠券");
};
