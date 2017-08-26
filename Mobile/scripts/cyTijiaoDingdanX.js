/**
 * Created by baihao on 2016/11/10 0030.
 */
var cyJsonStr;

$(function () {
    var json = JSON.parse($.getUrlParam("json"));
    cyJsonStr = $.getUrlParam("json");

    $("#submitdd").click(function () {
        useTime=$("#useTime").html();
        peoplenumber= $("#peoplenumber").html();
        orderpeopler=$("#orderpeopler").html();
        peplPhone= $("#peplPhone").html();
        total = $("#count").html();
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
        //var url="/cyDishorder/saveCyDcOrders";
        var dishJson = [];
        dishJson.push( {                    //dishJson 服务请求用到的信息
            "useTime":$("#useTime").html(), //用餐时间
            "peoplenumber": $("#peoplenumber").html(),  //就餐人数
            "orderpeopler":$("#orderpeopler").html(),   //预定人
            "peplPhone": $("#peplPhone").html(),    //电话号码
            "restaurant": $("#hyName").html(),  //餐厅
            "canpin": $("#canpin").html(), //餐品信息字符串
        });
        var data={
            "hotelCode":"captial",
            "json":cyJsonStr,
            "useTime":$("#useTime").html(), //用餐时间
            "peoplenumber": $("#peoplenumber").html(),  //就餐人数
            "orderpeopler":$("#orderpeopler").html(),   //预定人
            "peplPhone": $("#peplPhone").html(),    //电话号码
            "restaurant": $("#hyName").html()+","+$("#hyTel").html(),  //餐厅
            "total":$("#count").html(),    //总金额
            "dishesMoney":$("#cptotal").html().substring(1),  //菜品总金额
            "serviceMoney":$("#fuwufei").html().substring(1),  //服务费
            "serviceRatio":$("#fwRatio").html(),  //服务费比例
            "earnestMoney":$("#earnestMoney").html(),  //预定费
            "earnestRatio":$("#earnestRatio").html(),  //预定费比例
            "payMoney":$("#ydmoney").html().substring(1),  //支付金额
            "residueMoney":$("#dfmoney").html().substring(1),  //待付金额
            "dishJson": JSON.stringify(dishJson),
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        //alert(data.earnestRatio);
        //var successfull= function (datas) {
        //    var bizData=datas.bizData;
        //    var orderNum = bizData.orderNum;
        //    var paymoney = $("#ydmoney").text().substring(1);
        //    if(datas.rtnCode == "0000000"){
        //        window.location = "cyLijiZhifuX.html?orderprice="+paymoney+"&orderNum="+orderNum;
        //    }
        //}
        //ajaxPostFun(url, data, successfull,null, "保存餐厅预定订单");
        var paymoney = $("#ydmoney").text().substring(1);
        window.location = "cyLijiZhifuX.html?orderprice="+paymoney;
    });
});
