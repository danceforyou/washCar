/**
 * Created by Administrator on 2016/7/12 0012..
 */
$(document).ready(function(){
    weui.Loading.show();
    $("#jifen").html(SmitMemberInfo.score);
    var url="/MyScore/getIcApplyPoint";
    var data={icnum:SmitMemberInfo.icnum};
    var success=function(obj){
        weui.Loading.hide();
        var rows=obj.bizData.apply;
        if(rows.length>0){

            for (var i=0;i<rows.length;i++){

                var hotelRoomVO=rows[i];
                var desc=hotelRoomVO.applydrpt;
                var result=desc.split(",");
                desc=result[1];

                var html="<li><span><big>"+hotelRoomVO.score+"</big></span><p>"+desc+"</p><p>"+hotelRoomVO.applyDate
                    +"</p></li>";

                $("#jifenJilu").prepend(html);
            }
        }else{
            $("#jifenJilu").html( "<div  style='color: #fffdef;text-align: center'>暂无数据</div>");
        }
    };
    var errorFun = function (data) {
        weui.Loading.hide();
        if(empty(MemberInfo)){
            //weui.confirm("您还不是酒店会员,是否完善信息注册为会员?","注册酒店会员",function(b){
            //    if(b){
            //        window.location.href = "userZhanghaoGuanli.html";
            //    }
            //});
        }else{
            $("#jifenJilu").html( "<div  style='color: #fffdef;text-align: center'>暂无数据</div>");
            layer.msg(data.msg);
        }
    };
    ajaxGetFun(url,data,success,errorFun,"查看我的历史积分兑换记录");
})
$(function () {
    $("#jifen").html(SmitMemberInfo.score);
});