/**
 * Created by Administrator on 2016/7/31 0031.
 */

$(function () {
    currentPage = 1;
    var url = "/protocolCar/protocolCarList/1";
    var success=function(data){
        $("#loadMores").show();
        showHtml(data.bizData.rows);
        weui.Loading.hide();
    };
    weui.Loading.show();
    var memid;
    if(!empty(MemberInfo)){
        memid=MemberInfo.id;
    }else{
        memid=null;
    }
   var errorFun=function(data){
       $("#loadMores").hide();
   }
    ajaxPostFun(url,{memId:memid},success, errorFun,"取得礼宾车辆信息");
});

//拼接HTML
function showHtml(dataList)
{
    for(var i=0; i<dataList.length; i++) {
        var html = '<a class="dingdan" href="lbShenqing.html?id=' + dataList[i].id + '&name=' + encodeURI(encodeURI(dataList[i].name))  + '">' +
            '<dt><img src="' +  dataList[i].picture + '"/></dt>' +
            '<dd>' +
            '<span><big>' + dataList[i].name + '</big></span>' +
            '<span>' + dataList[i].descripts +'</span>' +
            '<span class="c_price">' + dataList[i].price  +'元/日均</span>' +
            '<dd>' +
            '<a>';
        $("#carList").append(html);
    }
}

//加载更多
function loadMore()
{
    currentPage = currentPage + 1;
    var url = "/protocolCar/protocolCarList/" + currentPage;
    var success=function(data){
        if(data.bizData.rows.length == 0)
        {
            $("#loadMores").hide();
            weui.alert("没有更多车辆");
            weui.Loading.hide();
            $('.loadmore').hide();
        }
        else
        {
            showHtml(data.bizData.rows);
            weui.Loading.hide();
        }
    };
    weui.Loading.show();
    ajaxPostFun(url,null,success, null,"加载更多车辆");
}
