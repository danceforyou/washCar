
//会员卡信息
$(function () {
    var id =  $.getUrlParam("id");
    getRoundInfoDetailById(id);
});

function getRoundInfoDetailById(id)
{
    var url = "/System/MemDiscount/FindById/"+id;
    var dataObj = {"id" : id};
    var success=function(res){
        var bizData = res.bizData;
        initPage(bizData);
        layer.close(index);
    };
    var index = layer.load(0, {shade: false});
    ajaxPostFun(url, dataObj, success, null, "根据id获取会员卡详细信息");
}

//初始化页面信息
function initPage(data)
{
    if(!empty(data))
    {
       //renderContent(data);
        $(".arcview").html(data.content);
    }else{
        $(".arcview").html("暂无数据");
    }
}
//展示卡的信息
function renderContent(data){

    pictruename=data.picture.split("/");

    //$("#picture").attr("src","images/zhoubian/"+pictruename[2]);
   // $("#picture1").attr("src","images/zhoubian/"+pictruename[2]);
}