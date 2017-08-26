
$(function () {
    var rid=GetQueryString("rid");
    getRestaurant(rid);

    $("#jzbutton").click(function () {
          useTime=$("#time").val();
         peoplenumber= $("#peoplenumber").val();
         orderpeopler=$("#orderpeopler").val();
          peplPhone= $("#peplPhone").val();
        var ab = /^1[3|4|5|7|8]\d{9}$/; //手机号码验证
        if(useTime==""){
            weui.alert("时间不能为空");
            return false;
        }
        if(peoplenumber==""){
            weui.alert("用餐人数不能为空");
            return false;
        }
        if(orderpeopler==""){
            weui.alert("订餐人不能为空");
            return false;
        }
        if(peplPhone=="" || ab.test(peplPhone) == false){
            weui.alert("手机号码格式不正确");
            return false;
        }
        var location=$(".cantingname dd").text();
        var ctName=$(".cantingname dt b").text();
        var url=encodeURI("cyCantingDingdan.html?useTime="+useTime+"&peoplenumber="+peoplenumber+"&orderpeopler="+orderpeopler+"&peplPhone="+peplPhone+"&ctName="+ctName+"&location="+location);
        $("#jzbutton").attr("href",url);

    });

    $("#dcydbutton").click(function () {
        useTime=$("#time").val();
        peoplenumber= $("#peoplenumber").val();
        orderpeopler=$("#orderpeopler").val();
        peplPhone= $("#peplPhone").val();
        var ab = /^1[3|4|5|7|8]\d{9}$/; //手机号码验证
        rantId = rid;
        if(useTime==""){
            weui.alert("时间不能为空");
            return false;
        }
        if(peoplenumber==""){
            weui.alert("用餐人数不能为空");
            return false;
        }
        if(orderpeopler==""){
            weui.alert("订餐人不能为空");
            return false;
        }
        if(peplPhone=="" || ab.test(peplPhone) == false){
            weui.alert("手机号码格式不正确");
            return false;
        }
        var location=$(".cantingname dd").text();
        var ctName=$(".cantingname dt b").text();
        var url=encodeURI("cyDiancan.html?rantId="+rantId+"&useTime="+useTime+"&peoplenumber="+peoplenumber+"&orderpeopler="+orderpeopler+"&peplPhone="+peplPhone+"&ctName="+ctName+"&location="+location);
        $("#dcydbutton").attr("href",url);


    });


});
function getRestaurant(id) {
    var url = "/System/CyRestaurant/FindById/"+id;
    var successFun = function(data){
        console.log(data);
        var bizData = data.bizData;
        $("#cySrc").attr("src",bizData.picture);
        $(".cantingname dt b").text(bizData.name);
        $(".cantingname dd").text("位置:"+bizData.location);
        $("#rid").val(bizData.id);
        $("#ctname").val(bizData.name);
        $("#ctlocation").val(bizData.location);
    };
    ajaxPostFun(url,{}, successFun, null,"获取餐厅信息");
}
function MathRand()
{
    var Num="";
    for(var i=0;i<6;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
}