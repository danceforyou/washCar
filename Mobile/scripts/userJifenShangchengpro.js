/**
 * Created by Administrator on 2016/7/12 0012.
 */

var i=1;
$(document).ready(function(){
    getDate(1);
})
//加载更多事件
$("#loadmore").click(function(){
    i++;
    getDate(i);
})
//页面关闭后执行
function  unLoadWin(){
    i=0;
}

//后台服务获取数据
function getDate(page){
    weui.Loading.show();
    var url="/goods/GoodsList/"+page;
    var data = {};
    var success=function(data){
        weui.Loading.hide();
        if(data.rtnCode=="0000000"){
          // alert(JSON.stringify(data));
          //  alert(data.bizData.rows.length);
            var rows=data.bizData.rows;
            var html="";
            for (var i=0;i<rows.length;i++){
                var hotelRbizDataoomVO=rows[i];
                //alert(hotelRbizDataoomVO.id);
                 html+="<a onclick='getJfProDetail("+hotelRbizDataoomVO.id+")'  class='dingdanFwOut'>"
                     +"<dl class='dingdan dingdanFw'>"
                     +"<dt><img src='"+hotelRbizDataoomVO.picture+"'/></dt>"
                         +"<dd>"
                            +"<span>"+hotelRbizDataoomVO.name+"</span>"
                            +"<span>价格:"+hotelRbizDataoomVO.price+"</span>"
                            +"<span>所需积分:"+hotelRbizDataoomVO.score+"</span>"
                         +"</dd>"
                     +"</dl>"
                     +"</a>"
            }
            $("#jifenList").append(html);
        }else{
            layer.msg("查看兑换商品失败");
        }
    };
    var error=function(){
        //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
        //请求出错处理
        weui.Loading.hide();
        layer.msg("请求出错(请检查相关度网络状况.)");
        //weui.alert("请求出错(请检查相关度网络状况.)");
    };
    weui.Loading.show();
    ajaxPostFun(url,data,success, error,"积分商品");
}

//根据商品ID获取商品详细页面
    function getJfProDetail(id){
        localStorage.setItem("proId",id);
        window.location.href="userJifenShangchengInfo.html";
    }
