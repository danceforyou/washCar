/**密码由4-8位字母加数字组成
 * Created by Administrator on 2016/6/24.
 */
var clock = '';
var nums = 60;
var btn;
function sendCode(thisBtn) {
    btn = thisBtn;
    var phone = $("#tel").val();
    var re = /^1[3|4|5|7|8]\d{9}$/;
    if (!re.test(phone)) {
        weui.alert("手机号码不正确，请重新输入");
        return false;
    }
    var url = "/Member/getVerifyCode";
    var success = function (data) {
     //   weui.alert("验证码已发送至您的手机请注意查收");

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

$(function () {
    $("#btnRegister").click(function () {
        var phone = $("#frmRegister input[name='phone']").val();
        var password = $("#frmRegister input[name='password']").val();
        //检查表单
        if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
            layer.msg("请输入正确的手机号码!", {time: 1000});
            return false;
        }
        if ($("#frmRegister input[name='name']").val() == '') {
            layer.msg("请输入姓名!", {time: 1000});
            return false;
        }
        if (!(/^[0-9a-zA-Z]{4,8}$/.test(password))) {
            layer.msg("密码由4-8位字母加数字组成!", {time: 1000});
            return false;
        }
        if ($("#frmRegister input[name='verifyCode']").val() == '') {
            layer.msg("验证码不能为空!", {time: 1000});
            return false;
        }

        if (!$("input[name='regxy']").prop('checked')) {
            layer.msg("必须同意注册协议", {time: 1000});
            return false;
        }
        var obj = {
            phone: phone,
            name: $("#frmRegister input[name='name']").val(),
            verifyCode: $("#frmRegister input[name='verifyCode']").val(),
            password: password
        };
        var url = "/Member/mobileRegister";
        $(".regOut").hide();
        var success = function (data) {
            appStorage.setItem("MemberInfo", JSON.stringify(data.bizData));
            $("#isVisible").css("display", "inline");
            weui.alert("注册成功","通知", function(){
                window.location.href = "index.html";
            });
        };
        var errorFun = function (data) {
            weui.alert(data.msg);
        };
        ajaxPostFun(url, obj, success, errorFun, "快速注册");
    })
})
