/**
 * Created by Administrator on 2016/8/31 0031.
 */
//页面初始化
$(function () {
    currentPage = 1;
    var url = "/membCoupons/MyCouponsList/1";
    var data = {};
    var success = function (data) {
        if(data.bizData.rows.length == 0)
        {
            layer.msg("没有周边信息");
            weui.Loading.hide();
        }
        else
        {
            showHtml(data.bizData.rows);
            weui.Loading.hide();
        }
    };
    var errorFun = function(data){
        weui.Loading.hide();
        layer.msg("没有查询到周边信息");
    };
    weui.Loading.show();
    ajaxPostFun(url, data, success, errorFun, "查询周边信息");
});

// 拼接页面字符串
function showHtml(dataList)
{
    for(var i=0; i<dataList.length; i++) {
        var html = '<a href="javascript:showRoundDetail(' + dataList[i].id +')">'
            + '<img src="'+dataList[i].picture+'">'
            + '<span class="bg">'
            +'</span>'
            + '<span class="txt">'+dataList[i].name +'</span>'
            + '</a>';
        $(".zblist").append(html);
    }
}


//加载更多
function loadMore()
{
    currentPage = currentPage + 1;
    var url = "/Address/MyAddressList/" + currentPage;
    var success=function(data){
        if(data.bizData.rows.length == 0)
        {
            layer.msg("没有更多周边信息");
            weui.Loading.hide();
        }
        else
        {
            showHtml(data.bizData.rows);
            weui.Loading.hide();
        }
    };
    weui.Loading.show()
    ajaxPostFun(url,null,success, null,"取得周边信息详细");
}

function showRoundDetail(id)
{
    window.location.href = "jdInfo.html?id=" + id;
}