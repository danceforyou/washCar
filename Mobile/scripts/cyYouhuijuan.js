/**
 * Created by Administrator on 2016/8/8 0008.
 */
$(function () {
    youhuijuan("订房券");
});

function youhuijuan(type){
    //alert(type);
    console.log("yonghuxinxi",MemberInfo);
    var url="/memCoupons/myCouponsType";
    var data={"memberid":MemberInfo.id,"type":type};
    var successFun=function (data){
        console.log(data.bizData);
        // var html="";
        // for(var i=0;i<data.bizData.length;i++){
        //     html+="<dl><dt>"+type+"<span><small>￥</small><i>"+
        //         data.bizData[i].name+"</i></span></dt><dd>"+data.bizData[i].descript+"<span>"+
        //     "有效期:"+data.bizData[i].endDate+"</span></dd></dl>";
        // }
        //$("#youhuijuance").append(html);

        var dataList=data.bizData;
        for (var i = 0; i < dataList.length; i++) {
            var myCoustatus=dataList[i].myCoustatus;
            var startHtml = "";
            if (myCoustatus != "2" && myCoustatus != "3") {
                startHtml = '<dl onclick="selectyouhujuan('+dataList[i].id+','+dataList[i].nameprice+','+dataList[i].coupNum+')">';

            var html = startHtml +
                '<dt>' +
                dataList[i].name +
                '<span><small>￥</small><i>' +
                dataList[i].nameprice +
                '</i></span>' +
                '</dt>' +
                '<dd>' +
                '<span>' +
                dataList[i].descript +
                '</span>' +
                '<span>有效期:' +
                dataList[i].openDate + '至' +
                dataList[i].endDate +
                '</span>' +
                '<span>优惠券号:<i>'+dataList[i].coupNum+'</i></span>'+
                '</dd>' +
                '</dl>';
            $("#youhuijuance").append(html);
            }
        }

    };
    ajaxPostFun(url,data, successFun, null,"获取优惠券信息");
}


//选择优惠券跳转下单页面
function selectyouhujuan(youhuijuanid,youhuiprice,coupNum){
    //获得url的信息
    var canshu =window.location.href;
    canshu = canshu.split("?")[1];
    canshu+="&youhuijuanid="+youhuijuanid+"&youhuiprice="+youhuiprice+"&coupNum="+coupNum;
    var url="dfZhitongche.html?"+canshu;
    url=decodeURI(url);
    window.location.href="dfZhitongche.html?"+canshu;
}


