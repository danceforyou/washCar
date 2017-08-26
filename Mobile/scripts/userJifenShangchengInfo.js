/**
 * Created by Administrator on 2016/7/30 0030.
 */

$(document).ready(function(){
    var proId=localStorage.getItem("proId");
    getProDetail(proId);
})

//获取积分商品详细信息
function getProDetail(id){
    var url="/goods/getGoodsDet/"+id;
    var data={};
    var success=function(data){
        var goods = data.bizData;
        var html ="<h3 class='ac'><b>"+goods.name+"</b></h3>"
                +"<p>"+goods.content+"</p>";
        $("#proDetail").append(html);
    };
    var error=function(data){

    };
    ajaxPostFun(url,data,success,error,"积分商品详细信息");
}