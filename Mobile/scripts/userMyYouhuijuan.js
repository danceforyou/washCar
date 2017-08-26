$(function () {
    //页面初始化取得未使用优惠券
    getCoupon(1);
    currentPage = 1;
    currentStatus = 1;
});

//取得优惠券一览
function getCoupon(myCoustatus) {
    $("#couponlist").html("");
    currentStatus = myCoustatus;
    currentPage = 1;
    if (myCoustatus == 1) {
        $("#unused").addClass("weui_bar_item_on");
        $("#used").removeClass("weui_bar_item_on");
        $("#expire").removeClass("weui_bar_item_on");
    }
    if (myCoustatus == 2) {
        $("#unused").removeClass("weui_bar_item_on");
        $("#used").addClass("weui_bar_item_on");
        $("#expire").removeClass("weui_bar_item_on");
    }
    if (myCoustatus == 3) {
        $("#unused").removeClass("weui_bar_item_on");
        $("#used").removeClass("weui_bar_item_on");
        $("#expire").addClass("weui_bar_item_on");
    }

    var url = "/memCoupons/memCouponsall/1";
    // 1:未使用，2:已使用，3已过期
    var data = {myCoustatus: myCoustatus};
    var success = function (data) {
        showHtml(data.bizData.rows, myCoustatus);
        weui.Loading.hide();
        if(data.bizData.rows.length<=data.bizData.pagesize){
            $('.loadmore').hide();
        }
    };
    var errorFun = function(data){
        weui.Loading.hide();
        layer.msg("没有查询到优惠券");
    };
    weui.Loading.show();
    ajaxPostFun(url,data, success, errorFun, "取得优惠券");
}
//dates("Y.m.d", dataList[i].openDate)时间转换
//html做成
function showHtml(dataList, couponStatus) {
    var startHtml = "";
    if (couponStatus == 2 || couponStatus == 3) {
        startHtml = '<dl class="guoqi">';
    }
    else {
        startHtml = '<dl>';
    }

    for (var i = 0; i < dataList.length; i++) {
        var html = startHtml +
            '<dt>' +
            dataList[i].typeName +
            '<span><small>￥</small><i>' +
            dataList[i].name +
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
        $("#couponlist").append(html);
    }
}

//加载更多优惠券
function loadMore() {
    currentPage = currentPage + 1;
    var url = "/memCoupons/memCouponsall/" + currentPage;
    // 1:未使用，2:已使用，3已过期currentPage
    var data = {myCoustatus: currentStatus};
    var success = function (data) {
        if (data.bizData.rows.length == 0) {
            currentPage--;
            weui.Loading.hide();
            weui.alert("没有更多优惠券");
        }
        else {
            showHtml(data.bizData.rows, data.bizData.records, status);
            weui.Loading.hide();
        }
    };
    var errorFun = function(data){
        currentPage--;
        weui.Loading.hide();
        weui.alert("没有更多优惠券");
    };
    weui.Loading.show()
    ajaxPostFun(url, data, success, null, "取得优惠券");
}
