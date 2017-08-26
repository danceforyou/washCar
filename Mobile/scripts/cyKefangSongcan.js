/**
 * Created by Administrator on 2016/7/31.
 */
$(function () {
    getCuisine();
});
var page = 1;
var id ;
function init(ids) {
    id = ids;
    page = 1;
    $("#dishname"+id).addClass("hover");
    $("#dishname"+id).siblings().removeClass("hover");
    var url = "/System/CyDishEntity/findBycusIds/" + ids;
    var successFun = function (data) {
        var datas = data.bizData;
        var htmldish = "";
        for (var i = 0; i < datas.length; i++) {
            //  id=datas[i].id;
            var id = datas[i].id;
            var name = datas[i].name;
            var picture = datas[i].picture;
            var price = datas[i].price;
            var my_collection_id = datas[i].my_collection_id;
            var sub = "sub(\'"+id+"\',\'"+name+"\',\'"+picture+"\',\'"+price+"\')"
            var add = "add(\'"+id+"\',\'"+name+"\',\'"+picture+"\',\'"+price+"\')"

            htmldish += "<li class='aui-list-view-cell aui-img aui-counter-list'>"
                + "<img class='aui-img-object aui-pull-left' src="+ datas[i].picture + ">"
                + "<div class='aui-img-body'>" + datas[i].name
                + "<div class='aui-counter-box'>"
                + "<div class='aui-pull-left aui-text-danger'>¥" + datas[i].price + "</div>"
                + "<div class='aui-counter aui-pull-right cyshoucang' cname='"+name+"' cid='"+id+"' cpicture='"+picture+"' cprice='"+price+"'>";
            if(my_collection_id){
                htmldish += "<i class='aui-iconfont aui-icon-favorfill' mcId='"+my_collection_id+"'></i><em>取消</em>";
            }else{
                htmldish += "<i class='aui-iconfont aui-icon-favor'></i><em>收藏 </em>";
            }

            
            htmldish  += "</div></div>"
                + "<div class='aui-counter-box numbox fl'>"
                + "<div class='aui-counter aui-pull-right'>"
                + "<div class='aui-counter-minus' cname='"+name+"' cid='"+id+"' cpicture='"+picture+"' cprice='"+price+"' onclick='sub(this)'></div>"
                +"<span class='aui-counter-input num"+datas[i].id+"'>0</span>"
                + "<div class='aui-counter-plus'  cname='"+name+"' cid='"+id+"' cpicture='"+picture+"' cprice='"+price+"' onclick='add(this)'></div>"
                + "</div></div></div></li>";
        }
        $("#caipin").empty();
        $("#caipin").append(htmldish);
        initCaiDanCount();
        page += 1;
        bindCyshoucang();
    };
    ajaxPostFun(url, {"hotelCode": "capital", "page": page}, successFun, null, "获取菜品信息");
}
    function addMore() {
        //  alert(ids);
        $("#ids").addClass("hover");
        $("#ids").siblings().removeClass("hover");
        var url = "/System/CyDishEntity/findBycusIds/" + ids;
        var successFun = function (data) {
            var datas = data.bizData;
            var htmldish = "";
            for (var i = 0; i < datas.length; i++) {
                //  id=datas[i].id;
                htmldish += "<li class='aui-list-view-cell aui-img aui-counter-list'>"
                    + "<img class='aui-img-object aui-pull-left' src=" + datas[i].picture + ">"
                    + "<div class='aui-img-body'>" + datas[i].name
                    + "<div class='aui-counter-box'>"
                    + "<div class='aui-pull-left aui-text-danger'>¥" + datas[i].price + "</div>"
                    + "<div class='aui-counter aui-pull-right cyshoucang'>"
                    + "<i class='aui-iconfont aui-icon-favor'></i><em>收藏</em>"
                    + "</div></div>"
                    + "<div class='aui-counter-box numbox fl'>"
                    + "<div class='aui-counter aui-pull-right'>"
                    + "<div class='aui-counter-minus' onclick='sub("+datas[i].id+");'></div>"
                    +"<span class='aui-counter-input num"+datas[i].id+"'>0</span>"
                    + "<div class='aui-counter-plus' onclick='add("+datas[i].id+");'></div>"
                    + "</div></div></div></li>";
            }
            $("#caipin").append(htmldish);
            bindCyshoucang();
        }

        ajaxPostFun(url, {"hotelCode": "capital", "page": page}, successFun, null, "获取菜品信息");

}
//var id;
    function getCuisine() {
        var url = "/System/CyCuisine/FindByHotel";
        var successFun = function (data) {
            var datas = data.bizData;
            var html = ""
            for (var i = 0; i < datas.length; i++) {

                // alert(ids);\"initOrderStatus('"+A+"','"+B+"')\"1  '\"'+datas[i].id+'name\"'
                html += "<li class='aui-list-view-cell' id='dishname"+datas[i].id+"' onclick=\"init('" + datas[i].id + "')\" >" + datas[i].name + "</li>";
            }
            ids = datas[0].id;
            $(".caileixing").append(html);
            init(ids);
        };
        ajaxPostFun(url, {"rantId": "212"}, successFun, null, "获取餐厅信息");
    }
