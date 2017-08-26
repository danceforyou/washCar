/**
 * Created by Administrator on 2016/7/14 0014.
 */
var clock = '';
var nums = 60;
var btn;
function sendCodes(thisBtn) {
    btn = thisBtn;
    var phone = $("#phoneId").val();
    var re = /^1\d{10}$/
    if (!re.test(phone)) {
        weui.alert("手机号码不正确，请重新输入");
        return false;
    }
    var url = "/Member/getVerifyCode";
    var success = function (data) {
        weui.alert("验证码已发送至您的手机请注意查收");

    }
    var data = {phone: phone};
    ajaxGetFun(url, data, success, null, "发送验证码");
    btn.value = nums + '秒后可重新获取';
    clock = setInterval(doLoop, 1000); //一秒执行一次

}
function doLoop() {
    nums--;
    if (nums > 0) {
        btn.value = nums + '秒后可重新获取';
    } else {
        clearInterval(clock); //清除js定时器
        btn.disabled = false;
        btn.value = '点击发送验证码';
        nums = 60; //重置时间
    }
}
//$(function () {
    $("#updatePass").click(function () {
        //检查表单
        var phone=$("#phoneId").val();
        console.log(phone);
        var verifyCode=$("#verifyCodeId").val();
        var newpwd=$("#passwordId").val();
        if($("#phoneId").val()==''){
            weui.alert("手机号码不能为空");
            return false;
        }
        if($("#verifyCodeId").val()==''){
            weui.alert("验证码不能为空");
            return false;
        }
        if($("#passwordId").val()==''){
            weui.alert("密码不能为空");
            return false;
        }
        console.log("修改密码=====");
        var url="/Member/updatePassword";
        var data={"phone":phone,"verifyCode":verifyCode,"password":newpwd};
        var success=function(bizData){
            weui.alert("密码修改成功");
            window.location.href="index.html?gologin=1";
        }
        ajaxPostFun(url, data, success, null, "修改密码");
    });

//});