var yzm = "";
function getRandomCode(){
    var url = "/Manage/VerificationCode";
    var successFun = function (data) {
        $(".yzm img").attr("src",data.bizData.imageCode);
        yzm = data.bizData.vCode;
    };
    var errorFun = function(data){

    };
    ajaxPostFun(url, {}, successFun, errorFun, "获取验证码");
}
$(function () {
    $('.dqjifen').text(SmitMemberInfo.score)
})
var score = 0;
function getCouponsInfo(){
    var id = $.getUrlParam("id");
    var url = "/Coupons/getCouponsInfo";
    var successFun = function (data) {
        score = parseInt(data.bizData.score);
    };
    var errorFun = function(data){

    };
    ajaxPostFun(url, {'id':id}, successFun, errorFun, "查询优惠券信息");
}
getCouponsInfo();
getRandomCode();

function duihuan(){
    weui.Loading.show();
    var jf = parseInt($('.dqjifen').text());
    var yanzhengma = $('#yanzhengma').val();
    if (jf>=score){
        if (yanzhengma.toLowerCase()==yzm.toLowerCase()){
            queren($.getUrlParam("id"));
        }else{
            weui.Loading.hide();
            weui.alert("验证码不正确,请重新输入!");
            $('#yanzhengma').val('');
        }
    }else{
        weui.Loading.hide();
        weui.alert("您当前积分余额不足,无法兑换!");
    }
}

function queren(id){
    var url = "/Coupons/exchangeCoupons";
    var successFun = function (data) {
        weui.Loading.hide();
        if(data.bizData){
            weui.alert("优惠券兑换成功,请确认查看!","兑换成功", function(){
                window.location.href = "userMyYouhuijuan.html";
            });
        }else{
            weui.alert("优惠券兑换失败!",{icon: 5,time:1000});
        }
    };
    var errorFun = function(data){
        weui.Loading.hide();
        layer.msg("优惠券兑换失败!",{icon: 5,time:1000});
    };
    ajaxPostFun(url, {'id':id,'icnum':SmitMemberInfo.icnum,'phone':MemberInfo.phone}, successFun, errorFun, "立即兑换验证码");
}