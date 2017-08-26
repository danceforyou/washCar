/**
 * Created by Administrator on 2016/7/30 0030.
 */


//拼接HTML
function showHtml(dataList)
{
    for(var i=0; i<dataList.length; i++) {
        var html = '<dl class="dingdan">' +
            //'<dt><img src="' + imgUrl +  dataList[i].picture + '"/></dt>' +
            '<dd>' +
            '<span class="aui-iconfont ar">' + dataList[i].name +'</span>' +
            '</dd> ' +
            '<div class="jiajian ar">' +
            '<span class="num" id="' + dataList[i].id +  '" name="' + dataList[i].name + '">'+"x "+dataList[i].count+'</span>'+
            '</div>' +
            '</dl>';
        $("#datalist").append(html);
    }
}

$(document).ready(function(){

    var index = localStorage.getItem("fwIndex");
    var data = localStorage.getItem(index);
    var jsn = JSON.parse(data);

    showHtml(jsn);
    /*
    var id=localStorage.getItem("fwId");
    var url="/myorder/cyDishOrderDetailsList";
    var data={orderid:id};
    var success=function(data){
        if(data.rtnCode=="0000000"){
            showHtml(data.bizData);
        }
    };
    var error=function(){
        weui.alert("数据不正确");
    };
    ajaxPostFun(url,data,success,error,"客房用品订单详细信息");
    */
})
