/**
 * Created by Administrator on 2016/6/24.
 */

$(function () {
    $("#btnLogin").click(function () {
        var phone=$("#phone").val();
        var password=$("#password").val();
        if(phone==''){
            layer.msg("请填写会员号");
            return false;
        }
        if(password==''){
            layer.msg("请填写密码");
            return false;
        }
       // alert(phone+"  "+password);
        var url="/Member/Login";
        var data = {phone:phone,password: password};
        var success=function(data){
            console.log("登录信息");
            console.log(data);
            appStorage.setItem("MemberInfo", JSON.stringify(data.bizData));
            window.location.href="index.html";

        };
        var errorFun = function(data){
            weui.Loading.hide();
            layer.msg(data.msg,{icon: 5,time:1000});
        };
        weui.Loading.show();
        ajaxPostFun(url,data,success, errorFun,"登录信息");

    });
    $("#btnreg").click(function () {
        $("#btnLogin").toggleClass("blackbgbtn");
        $("#btnreg").addClass("blackbgbtn");
    });
});
if(!empty(MemberInfo)){
    var cardTyp = "";
    if (MemberInfo.cardTyp=="APP"){
        cardTyp = "网站会员";
    }
    var html = '<a href="userCenter.html" class="touxiangimg"><img src="images/touxiang.png" width="100%"></a>' +
        '<span>'+MemberInfo.name+'</span><span>'+cardTyp+'</span>';
    $('#ydl').html(html);
    $('#wdl').css('display','none');
    $('#ydl').css('display','block');
}

//注册成功后，跳转至登陆页面，自动登陆
if($.getUrlParam("phone") && $.getUrlParam("password"))
{
    var phone = $.getUrlParam("phone");
    //password为MD5加密后的内容
    var password = $.getUrlParam("password");

    var url="/Member/Login";
    var data = {phone:phone,password: password};
    var success=function(data){
        appStorage.setItem("MemberInfo", JSON.stringify(data.bizData));
        window.location.href="index.html";
    };
    var errorFun = function(data){
        weui.Loading.hide();
        layer.msg("请正确填写手机号和密码");
        layer.msg(data.msg,{icon: 5,time:1000});
    };
    weui.Loading.show();
    ajaxPostFun(url,data,success, errorFun,"注册成功后自动登陆");
}