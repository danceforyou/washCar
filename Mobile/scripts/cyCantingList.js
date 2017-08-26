/**
 * Created by Administrator on 2016/7/31.
 */

//获得餐厅列表
$(function () {
    getRestaurantList();
});
function catinDetail(value){
    var url="/System/CyRestaurant/FindById/"+value;
    var successFun=function (data) {

        bizData=data.bizData;
        $("#img_id").attr("src",bizData.picture);
        $("#d_des").html(bizData.descripts);
        $("#d_openDate").html(bizData.openDate+"-"+bizData.endDate);
        $("#d_provideService").html(bizData.provideService);

        //跳转连接
        $("#ctlink").attr("href","cyCantingInfo.html?rid="+bizData.id);
        if ($(this).hasClass("hover")) {
            $(this).attr("class", "");
        } else {
            $(this).attr("class", "hover");
            $(this).siblings().attr("class", "");
        }
    }
    ajaxGetFun(url,null,successFun,null,"获取餐厅详细信息")
}
function getRestaurantList() {
    var url = "/System/CyRestaurant/FindByHotel";
    var successFun = function(data){
        console.log(data);
        bizData=data.bizData;
        //遍历餐厅列表
        for(var i=0;i<bizData.length;i++){
            var str='';
           if(bizData[i].cyResType=='1'){
               var id=bizData[i].id;
               str +='<li onclick="catinDetail('+id+')">';
               str +='<span class="img"><img src="'+bizData[i].picture+'" alt="zhsnadkhjidsang"/></span>';
               str +='<span class="txt">'+bizData[i].name+'</span>';
               str +='</li>';
               $("#cantins").append(str);
           }
        }

        $("#img_id").attr("src",bizData[0].picture);
        $("#d_des").html(bizData[0].descripts);
        $("#d_openDate").html(bizData[0].openDate+"-"+bizData[0].endDate);
        $("#d_provideService").html(bizData[0].provideService);

        //跳转连接
        $("#ctlink").attr("href","cyCantingInfo.html?rid="+bizData[0].id);
        if ($(this).hasClass("hover")) {
            $(this).attr("class", "");
        } else {
            $(this).attr("class", "hover");
            $(this).siblings().attr("class", "");
        }

    };

    ajaxPostFun(url,{"hotelCode":"capital"}, successFun, null,"获取餐厅信息");
    
}
/*function getRestaurant(id) {
    var url = "/cyRestaurant/restaurantList/"+id;
    var successFun = function(data){
        console.log(data);
    };
    var errorFun = function(data){
        console.log(data)
        weui.alert(""+data.msg,"", function () {
         window.location.href = "login.html";
         });
    };
    ajaxPostFun(url,{}, successFun, errorFun,"获取餐厅信息");
}*/
/**
 * Simple Map
 *
 *
 * var m = new Map();
 * m.put('key','value');
 * ...
 * var s = "";
 * m.each(function(key,value,index){
 *      s += index+":"+ key+"="+value+"\n";
 * });
 * alert(s);
 *
 * @author dewitt
 * @date 2008-05-24
 */
