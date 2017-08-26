/**
 * Created by Administrator on 2016/7/30 0030.
 */
var Request = new Object();
Request = getRequest();
$(function () {
    console.log(Request);
    if (Request['ctName']) {
        $("#hyName").html("餐厅名称:"+Request['ctName']);
    }
    if (Request['location']) {
        $("#hyTel").html("餐厅位置:"+Request['location']);
    }
    if (Request['useTime']) {
        $("#useTime").html(Request['useTime']);
    }
    if (Request['peoplenumber']) {
        $("#peoplenumber").html(Request['peoplenumber']);
    }
    if (Request['orderpeopler']) {
        $("#orderpeopler").html(Request["orderpeopler"]);
    }
    if (Request['peplPhone']) {
        $("#peplPhone").html(Request["peplPhone"]);
    }

    $("#submitdd").click(function () {
        useTime=$("#useTime").html();
        peoplenumber= $("#peoplenumber").html();
        orderpeopler=$("#orderpeopler").html();
        peplPhone= $("#peplPhone").html();
        if(useTime==""){
            weui.alert("时间不能为空");
            return false;
        }
        if(peoplenumber==""){
            weui.alert("用餐人数不能为空");
            return false;
        }
        if(orderpeopler==""){
            weui.alert("订餐人不能为空");
            return false;
        }
        if(peplPhone==""){
            weui.alert("电话号码不能为空");
            return false;
        }
        var url="/cyDishorder/cyOrderConfirm";
        var data={
            "useTime":$("#useTime").html(),
            "peoplenumber": $("#peoplenumber").html(),
            "orderpeopler":$("#orderpeopler").html(),
            "peplPhone": $("#peplPhone").html(),
            "restaurant": $("#hyName").html()+","+$("#hyTel").html(),
        }
        var successfull= function (bizdata) {
                if(bizdata.rtnCode == "0000000"){
                    sendService();
                }
        }
        ajaxPostFun(url, data, successfull,null, "保存餐厅预定订单");
    });



});
function sendService(){
    var serviceData=[];
    var dtime=new Date();
    var nowtime= dtime.toLocaleString();
    serviceData.push({
        "useTime":$("#useTime").html(),
        "peoplenumber": $("#peoplenumber").html(),
        "orderpeopler":$("#orderpeopler").html(),
        "peplPhone": $("#peplPhone").html(),
        "restaurant": $("#hyName").html(),
    }) ;
    var url = "/ServiceStyle/sendService";
    var data = {
        hotelCode: "capital",
        //  room: room,
        //  accnt: accnt,
        scode: "383",
        stitle: "餐厅预定",
        stime: nowtime,
        "remark": JSON.stringify(serviceData),
        memId: MemberInfo.id
    };
    var success = function (data) {
        if (data.rtnCode == "0000000") {
            weui.alert("您的餐厅预定请求已发送成功，稍后服务人员会联系您！", "", function () {
                window.location.href = "cyYongcanFangshi.html";
            })
        }

    };
    ajaxPostFun(url, data, success,null, "餐厅预定");
}

function getRequest() {
    var url = decodeURI(location.search); //获取url中"?"符后的字串
    console.log("yuding");
    console.log(url);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


//餐饮支付
function cyZhifu(){
    window.localStorage.href="cyLijiZhifu.html";
}
function reserveConfirm(formData) {
    var url = "/cyDishorder/cyOrderConfirm/";
    var successFun = function(data){
        weui.alert("订单已提交","系统提示",function () {
            window.location.href="cyYongcanFangshi.html";
        });

    };
    var errorFun = function(data){
        /* weui.alert("保存订单失败!","", function () {
         window.location.href = "login.html";
         });*/
    };
    ajaxPostFun(url,formData, successFun, errorFun,"保存订单信息");
}
