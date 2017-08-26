/**
 * Created by Administrator on 2016/7/29 0029.
 */
var i=1;
$(document).ready(function(){
    getDfData(1);
})

//加载更多
$("#loadMore").click(function(){
    i++;
   // alert(i);
    getDfData(i);
})

//页面退出时使页数还原
function dfFwUnWin(){
    i=0;
}
//获取订房服务数据
 function getDfData(page){
     weui.Loading.show();
     var url="/myorder/serviceStyleList/"+page;
     var data={};
     var success=function(data){
         weui.Loading.hide();
         var rows=data.bizData.rows;
         var html="";
        if(data.rtnCode=="0000000"){
            if(rows!=null){
                for (var i=0;i<rows.length;i++){
                    var dfFw=rows[i];
                    var fwStr="";
                    var code=dfFw.scode;
                    switch(code){
                        case "157":
                            fwStr="洗衣服务";
                            break;
                        case "203":
                            fwStr="叫早服务";
                            break;
                        case "142":
                            fwStr="客房清扫服务";
                            break;
                        case "372":
                            fwStr="租借物服务";
                            break;
                        case "375":
                            fwStr="客房用品服务";
                            break;
                        case "380":
                            fwStr="行李服务";
                            break;
                        case "379":
                            fwStr="出租车服务";
                            break;
                        case "382":
                            fwStr="租车服务";
                            break;
                        case "109":
                            fwStr="快速退房服务";
                            break;
                        case "266":
                            fwStr="客房送餐服务";
                            break;
                        case "281":
                            fwStr="票务预定服务";
                            break;
                        case "381":
                            fwStr="客房延住服务";
                            break;
                        case "285":
                            fwStr="快速退房服务";
                            break;
                        case "384":
                            fwStr="快速退房服务";
                            break;
                        case "383":
                            fwStr="餐厅预定";
                            break;
                        default:
                            break;
                    }

                    if(code == "372" || code == "375" || code == "382"){
                        localStorage.setItem(""+code+""+dfFw.id,dfFw.remark);
                        html+="<div class='fangxinginfoview martop10'>"
                            +"<h4><img src='images/fang_ico_09.jpg' alt='' />"+fwStr+"</h4>"
                            +"<a class='dingdan'>"
                            +"<div class='info infoFw'>"
                            +"<div class='dfDingdan'>"+dfFw.stitle+"<i>"+"申请时间：<b>"+dfFw.stime+"</b></i></div>"
                            +"</div>"
                            +"</a>"
                            +"<div class='aui-btn qufukuan fr'><a onclick='goDetail("+dfFw.id+","+code+")'>详情</a></div>"
                            +"</div>"
                    }else{
                        html+="<div class='fangxinginfoview martop10'>"
                            +"<h4><img src='images/fang_ico_09.jpg' alt='' />"+fwStr+"</h4>"
                            +"<a class='dingdan'>"
                            +"<div class='info infoFw'>"
                            +"<div class='dfDingdan'>"+dfFw.stitle+"<i>"+"申请时间：<b>"+dfFw.stime+"</b></i></div>"
                            +"</div>"
                            +"</a>"
                            +"</div>"
                    }

                }
                $("#dfFuwuList").append(html);
            }
        }
     };
     var error=function(){
         weui.alert("数据不正确");
         weui.Loading.hide();
     };
     ajaxGetFun(url,data,success,error,"订房服务");
 }

//跳转详情页面
function goDetail(id,scode){

    localStorage.setItem("fwIndex",""+scode+""+id);
    switch(scode+""){
        case "372":
          //  alert("yyyy372");
            window.location.href="./userFuwuRentalSuppliesDetail.html";
            break;
        case "375":
           // alert("yyy375");
            window.location.href="./userFuwuRoomSuppliesDetail.html";
            break;
        case "382":
          //  alert("yyy382");
            window.location.href="./userFuwuCarRentalDetail.html";
            break;
        default:
            //alert("yyydefault");
            break;
    }



}