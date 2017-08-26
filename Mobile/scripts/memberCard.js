/**
 * Created by hff on 2016/9/3.
 * 会员卡
 */
var pageIndexCard = 1;//我的订单页码
var pageIndexCardLoading = true;//是否可以加载下一页订单

var results = 0;//数据总数
var currentpage = 1;//当前页码
$(document).ready(function(){
    loadData();
});
function getTotalPage(num,pageSize){
    var a = num / pageSize;
    if(num % pageSize > 0){
        return parseInt(a)+1;
    }else{
        return a;
    }
}
//会员卡
function loadData(){
   /* $("#loadData").css("display","none");*/
    if (pageIndexCardLoading == false) {
        return false;
    }
    ajaxGetFun("/Card/cardList/" + pageIndexCard,null, function (res) {
        var bizData = res.bizData;
        renderCard(bizData);
        var num= bizData.records;
        var pageSize= bizData.pagesize;
        var totalPage=getTotalPage(num,pageSize);
     /*   $("#details").css("display","block");*/
        if(pageIndexCard>=totalPage || bizData.rows.length==0 ){
            $("#loadData").css("display","none");
        }
        if (bizData.rows.length > 0) {
            pageIndexCard++;
        } else {
            pageIndexCardLoading = false;
        }
    }, function (err) {
        (err.msg);
    }, "查询会员卡");
}
function showRoundDetail(cardid)
{
    window.location.href= "sdJiabinhuiInfo.html?id=" + cardid;
   /* switch(cardid){
        case 17:
            window.location.href = "sdJiabinhuiInfobaoshika.html?id=" + cardid;
            break;
        case 22:
            window.location.href= "sdJiabinhuiInfoyinka.html?id=" + cardid;
            break;
        case 23:
            window.location.href= "sdJiabinhuiInfo.html?id=" + cardid;
            break;
        case 24:
            window.location.href= "sdJiabinhuiInfobaijinka.html?id=" + cardid;
            break;
    }*/

}

function renderCard(res) {

    var rows = res.rows;
    for(var i=0;i<rows.length;i++) {
        var str = "";
        str +="<a href='javascript:showRoundDetail("+rows[i].id+")'>"
            + '<img src='+rows[i].picture+'>'
            + '<span class="bg"></span>'
            + '<span class="txt"><i>'+ rows[i].name + '</i></span>'
            + '</a>';
        $(".zblist").append(str);
    }

}

