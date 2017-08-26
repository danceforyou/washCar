/**
 * CyDetailsInfo.js
 * Created by 白昊 on 2016-11-18.
 */
var orderId = $.getUrlParam("orderId");
$(function(){

    //alert(theRequest);

    //alert(orderId);
    var dingdanJson = JSON.parse($.getUrlParam("json"));
    var remarks = decodeURI(dingdanJson.remarks);
    var rantInfo = remarks.split(",");
    var rantName = rantInfo[0].substring(5);
    var rantLocation
    if(rantInfo.length > 1){
        rantLocation = rantInfo[1].substring(3);
    }else {
        rantLocation = "暂无信息";
    }
    //alert(remarks);
    //alert(dingdanJson.useDate);
    $("#rantName").html(rantName);
    $("#rantLocating").html(rantLocation);
    $("#useTime").html(dingdanJson.useDate);
    $("#peopleNumber").html(dingdanJson.peoplenumber);
    $("#orderPeople").html(decodeURI(dingdanJson.orderpeopler));
    $("#peplPhone").html(dingdanJson.peplPhone);
    $("#dishesMoney").html("￥"+dingdanJson.dishesMoney);
    $("#serviceMoney").html("￥"+dingdanJson.serviceMoney);
    $("#total").html("￥"+dingdanJson.total+"<small>"+"(含"+dingdanJson.serviceRatio+"%服务费)"+"</small>");
    $("#serviceRatio").html(dingdanJson.serviceRatio);
    $("#payMoney").html("￥"+dingdanJson.payMoney);
    $("#residueMoney").html("￥"+dingdanJson.residueMoney);
    findDish();
});
function findDish(){
    var dishurl="/cyDishorder/findByOrderDishdetail";//查询下单菜品地址
    var datadish={orderid:orderId};
    var succdish=function(data){
        showHtml(data.bizData);
    };
    ajaxPostFun(dishurl,datadish,succdish,"","点餐菜品查询");
}

//拼接HTML
function showHtml(dataList){
    console.log("餐厅订单详情");
    console.log(dataList);
    for(var i=0; i<dataList.length; i++) {
        if(dataList[i].dishStatus=="0"||dataList[i].dishStatus==null){
            var html = '<dl class="dingdan">' +
                '<dt><img src="' + dataList[i].picture + '"/></dt>' +
                '<dd>' +
                '<span class="aui-iconfont ar">' + dataList[i].name +'</span>' +
                '<span class="aui-iconfont ar">' + dataList[i].price +'元</span>' +
                '</dd> ' +
                '<div class="jiajian ar">' +
                '<span class="num">'+dataList[i].number+'份</span>'+
                '<img src="images/imgxiajia.png" class="imgOne"></div>'
            '</dl>';
        }else{
            var html = '<dl class="dingdan">' +
                '<dt><img src="' + dataList[i].picture + '"/></dt>' +
                '<dd>' +
                '<span class="aui-iconfont ar">' + dataList[i].name +'</span>' +
                '<span class="aui-iconfont ar">' + dataList[i].price +'元</span>' +
                '</dd> ' +
                '<div class="jiajian ar">' +
                '<span class="num">'+dataList[i].number+'份</span>'+
                '</div>'
            '</dl>';
        }

        $("#datalist").append(html);
    }
}





