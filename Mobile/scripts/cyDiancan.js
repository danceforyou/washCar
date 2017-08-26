/**
 * Created by Administrator on 2016/7/31.
 */
var Request = new Object();
Request = getRequest();
var page = 1;
var id ;
var rantId;
function getval(){
    console.log(Request);
    if (Request['ctName']) {
        //$("#hyName").html("餐厅名称:"+Request['ctName']);
        var hyName = Request['ctName'];
    }
    if (Request['location']) {
        //$("#hyTel").html("餐厅位置:"+Request['location']);
        var hyTel = Request['location'];
    }
    if (Request['useTime']) {
        //$("#useTime").html(Request['useTime']);
        var useTime = Request['useTime'];
    }
    if (Request['peoplenumber']) {
        //$("#peoplenumber").html(Request['peoplenumber']);
        var peoplenumber = Request['peoplenumber'];
    }
    if (Request['orderpeopler']) {
        //$("#orderpeopler").html(Request["orderpeopler"]);
        var orderpeopler = Request['orderpeopler'];
    }
    if (Request['peplPhone']) {
        //$("#peplPhone").html(Request["peplPhone"]);
        var peplPhone = Request['peplPhone'];
    }
    if (Request['rantId']){
        rantId = Request['rantId'].toString();
    }
    var data = {
        rantId:rantId,
        hyName:hyName,
        hyTel:hyTel,
        useTime:useTime,
        peoplenumber:peoplenumber,
        orderpeopler:orderpeopler,
        peplPhone:peplPhone,
    }
    //alert(JSON.stringify(data));
    localStorage.setItem("rantInfo",JSON.stringify(data));

}

$(function () {

    getCuisine();
});





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
        //initCaiDanCount();
        page += 1;
        bindCyshoucang();
    };
    ajaxPostFun(url, {"rantId": "201", "page": page}, successFun, null, "获取菜品信息");
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

    ajaxPostFun(url, {"rantId": rantId, "page": page}, successFun, null, "获取菜品信息");

}
//var id;
function getCuisine() {
    getval();
    var url = "/System/CyCuisine/FindByHotelid";
    var successFun = function (data) {
        if (data.rtnCode == "0000000") {
            var datas = data.bizData;
            var html = ""
            for (var i = 0; i < datas.length; i++) {

                // alert(ids);\"initOrderStatus('"+A+"','"+B+"')\"1  '\"'+datas[i].id+'name\"'
                html += "<li class='aui-list-view-cell' id='dishname"+datas[i].id+"' onclick=\"init('" + datas[i].id + "')\" >" + datas[i].name + "</li>";
            }
            ids = datas[0].id;
            $(".caileixing").append(html);
            init(ids);
        } else {
            layer.msg("该餐厅没有菜系/菜品信息", {icon: 5, time: 2000});
        }

    };
    var errorFun = function(data){
        layer.msg("该餐厅没有菜系/菜品信息", {icon: 5, time: 2000});
    }
    ajaxPostFun(url, {"rantId": rantId}, successFun, errorFun, "获取餐厅信息");
}

function getRequest() {
    var url = decodeURI(location.search); //获取url中"?"符后的字串
    console.log("yuding");
    console.log(url);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
