/**
 * Created by 熊猫 on 2016/9/04.
 *
 * 表单验证
 */
//验证手机号码格式
function verifyphone(){
    var ab = /^1[3|4|5|7|8]\d{9}$/;
    var phone=$("#phone").val();
    if (ab.test(phone) == false) {
        layer.msg('手机号码格式不正确', {icon: 5});
    }
}
//验证密码格式(只能输入数字和字母)
function verifypassword(){
    var abc = /^[A-Za-z0-9]{4,8}$/;
    var password=$("#password").val();
    if (abc.test(password) == false) {
        layer.msg('密码格式不正确', {icon: 5});
    }
}
//确认两次密码输入一致
function configPassword(){
    text = document.getElementById("confirmPasswd_input").value;
    var check = document.getElementById("confirmPasswdCheck_label");
    if (text != document.getElementById("passwd_rigester_input").value) {
        check.style.color = "red";
        check.innerText = "两次密码输入不一致!";
    }
    else {
        check.style.color = "yellow";
        check.innerText = "密码确认正确!";
    }
}

