/**
 * Created by Administrator on 2016/7/18 0018.
 */

$(function () {
    queryOrder();
});



function queryOrder(){
    var userinfo = JSON.parse(appStorage.getItem('usertoken'));

    var vo={ bgDate:"2000-01-01",edDate:"2020-12-31",memtyp:"3",icnum:MemberInfo.icnum} ;

    $.ajax({
        async:false,
        url: server+"/smit/queryOrder",
        type: "GET",
        data:vo,
        timeout: 5000,
        beforeSend: function(){
            //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
        },
        success: function (json) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
            var rows=json.bizData.bizData.data;

            for (var i=0;i<rows.length;i++){
                var order=rows[i];
                var html="";
                html += "<div class='fangxinginfoview martop10'>";
                html += "<h4><img src='images/fang_ico_09.jpg' alt='' />房间预订<span class='c_red fr'>";
               var status ="";
                //订单状态 0-已生成，1-待确认，2-已确认，3-已拒绝，4-取消，5-处理失败《Int》

                switch(order.staus)
                {
                    case '0':
                        status="已生成";
                        break;
                    case '1':
                        status="待确认";
                        break;
                    case '2':
                        status="已确认";
                        break;
                    case '3':
                        status="已拒绝";
                        break;
                    case '4':
                        status="取消";
                        break;
                    case '5':
                        status="处理失败";
                        break;
                }

                html +=status;
                    html += " </span></h4><a class='dingdan' href='grDingdaninfo.html'>";
                html += " <div class='img'><img src='images/fang.jpg' /></div>";
                html += "  <div class='info'>";
                html += order.orderDetailList[0].roomName;
                html += " <span class='num c_9'>共<i class='c_2'>"+order.orderDetailList[0].roomNums+"</i>件房</span>";
                html += "   </div>  </a> <div class='qufukuan'>";
                html += " <big class='f_size16 lineheight'>实付款<i class='c_red'>￥"+order.orderDetailList[0].priceDetail+"</i></big>";
                html += "  <div class='aui-btn qufukuanbtn fr'><a href='cyLijiZhifu.html'>查看订单</a></div>  </div></div>";
                $("#room").append(html);
            }
            $("#room").append(
            '<div class="dingdanmore">'+
              '<div class="aui-border loadmore"><a href="#"><i class="aui-iconfont"></i>加载更多Load More</a></div>'+
            '</div>'
            )
        },
        complete: function(XMLHttpRequest, textStatus){

        },
        error: function(xhr){
            //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
            //请求出错处理
            layer.msg("请求出错(请检查相关度网络状况.)");
        }
    });
}