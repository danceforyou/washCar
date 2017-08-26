/**
 * Created by Administrator on 2016/7/31.
 */
var m = new Map();
$(function () {
    cySetmealList();
});

function cySetmealList() {
    var url = "/cySetmeal/cySetmealList";
    var successFun = function(data){
        console.log(data);
        var bizData=data.bizData;
        $(".taocanlist").html();
        var cantingscrHtml="";
        for (var i=0;i<bizData.length;i++){
            m.put(bizData[i].id,bizData[i]);
            cantingscrHtml+="<a href='cyTaocanInfo.html?sid='"+bizData[i].id+">"+
                "<img src='images/taocan.jpg'>"+
                " <div class='taocanname'>"+bizData[i].name+"</div>"+
                "</a>";
        }
        $(".taocanlist").html(cantingscrHtml);

    };
    /*var errorFun = function(data){
     console.log(data)
     weui.alert("登录已失效,请重新登录!","", function () {
     window.location.href = "login.html";
     });
     };*/
    ajaxPostFun(url,{}, successFun, null,"获取餐厅信息");

}