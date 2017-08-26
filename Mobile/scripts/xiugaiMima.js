/**
 * Created by Administrator on 2016/7/18 0018.
 */
$(function () {
    $("#submit").click(function () {
        // console.log($("#frmRegister input[name='phone']").val());
        //检查表单
        var phone = $("#phoneId").val();
        var verifyCode = $("#verifyCodeId").val();
        var newpwd = $("#passwordId").val();

        if (!phone) {
            weui.alert("手机号码不能为空");
            return false;
        }
        if (!verifyCode) {
            weui.alert("验证码不能为空");
            return false;
        }
        if (!newpwd) {
            weui.alert("新密码不能为空");
            return false;
        }
        if(newpwd.length<4 || newpwd.length>8){
            weui.alert("密码为4-8位数字");
            return false;
        }

        var data = {"phone": phone, "verifyCode": verifyCode, "password": newpwd};

        var url = "/Member/updatePassword";

        var success = function (data) {
            if (data.bizData==1){
                appStorage.removeItem("MemberInfo");
                weui.alert("密码修改成功,请重新登录!","", function(){
                    window.location.href = "index.html?gologin=1";
                });
            }else {
                weui.alert("修改密码失败");
            }
        };
        ajaxGetFun(url, data, success, null, "modifyPassword");
    });
});

var clock = '';
var nums = 60;
var btn;
function sendCodes(thisBtn) {
    btn = thisBtn;
    var phone = $("#phoneId").val();
    if (!phone) {
        weui.alert("请输入手机号码");
        return false;
    }
    if (phone == null && phone == "") {//这里验证的应该是手机号码的格式
        weui.alert("手机号码格式不正确")
        return false;
    }
    btn.disabled = true; //将按钮置为不可点击
    var url = "/Member/getVerifyCode";
    var data = {"phone": phone};
    var success = function (json) {
        var bizData = json.bizData;
        if (bizData == 1) {
            weui.alert("验证码已发送至您的手机请注意查收");
        } else {
            weui.alert(bizData.msg);
        }
    }
    var faild = function (err) {
        clearTimeBtn();
        weui.alert("发送失败，请重新发送");
    }

    ajaxGetFun(url, data, success, faild, "getPhoneCode");
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
function clearTimeBtn() {
    clearTimeBtn(clock);
    btn.disabled = false;
    btn.value = '点击发送验证码';
    nums = 60; //重置时间
}