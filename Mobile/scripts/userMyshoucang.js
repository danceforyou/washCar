/**
 * Created by Administrator on 2016/8/1 0001....
 */

//var currentPage = 1;
//$(function () {
//    var url = "/myCollection/myCollectionList/1";
//    var success=function(data){
//        userMyshoucang(data.bizData.rows);
//        weui.Loading.hide();
//    };
//    weui.Loading.show();
//    ajaxPostFun(url,{},success, null,"取得收藏信息");
//})

//function userMyshoucang(bizData) {
//    var  html="";
//   console.log(bizData);
//        for(var i=0;i<bizData.length;i++){
//           html+="<li class='aui-list-view-cell aui-img aui-counter-list'>"+
//              "<img class='aui-img-object aui-pull-left' src="+
//                "images/cai.jpg"+">"+
//                "<div class='aui-img-body'>"+
//               bizData[i].name+"<div class='aui-counter-box'>"+
//                "<div class='aui-pull-left aui-text-danger'>"+"¥"+
//               bizData[i].price+"元"+"</div></div></div></li>"
//
//        }
//    $("#shoucangs").append(html);


    var pageIndexOrder = 1;//页码
    var pageIndexOrderLoading = true;//是否可以加载下一页

    $(document).ready(function(){
        loadData();
    });
    var results = 0;//数据总数
    var currentpage = 1;//当前页码

    function getTotalPage(num,pageSize){
        var a = num / pageSize;
        if(num % pageSize > 0){
            return parseInt(a)+1;
        }else{
            return a;
        }
    }
    //周边信息
    function loadData(){
        if (pageIndexOrderLoading == false) {
            return false;
        }
        ajaxGetFun("/myCollection/myCollectionList/" + pageIndexOrder,{Token:TOKEN},function (res) {
            var bizData = res.bizData;
            var num= bizData.records;
            var pageSize= bizData.pagesize;
            var totalPage=getTotalPage(num,pageSize);
            if(num<0){
             weui.alert("无收藏记录");
            }
            renderInfo(bizData);
            if(pageIndexOrder>=totalPage || bizData.rows.length==0 ){
                $("#loadData").css("display","none");
            }
            if (bizData.rows.length > 0) {
                pageIndexOrder++;
            } else {
                pageIndexOrderLoading = false;
            }
        }, function (err) {
            $("#shoucangs").append("<div style='text-align: center'>暂无数据</div>");
            (err.msg);
        }, "取得收藏信息");
    }

    function renderInfo(res) {
        var html = "";
        var rows = res.rows;
        for(var i=0;i < rows.length;i++) {
            html+="<li class='aui-list-view-cell aui-img aui-counter-list'>"+
                "<img class='aui-img-object aui-pull-left' src="+imgUrl+ rows[i].picture +">"+
                "<div class='aui-img-body'>"+
                rows[i].name+"<div class='aui-counter-box'>"+
                "<div class='aui-pull-left aui-text-danger'>"+"¥"+
                rows[i].price+"元"+"</div></div></div></li>"
        }
        $("#shoucangs").append(html);
    }