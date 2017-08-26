/**
 * Created by Administrator on 2016/7/18 0018.
 */
$(function () {
    initComplexArea("seachprov", "seachcity", "seachdistrict", area_array, sub_array, "0", "0", "0");
});

function submit()
{
    //校验姓名
    var name = $("#name").val();
    if(!name)
    {
        layer.msg("请输入姓名");
        return false;
    }
    //校验电话
    var phone = $("#phone").val();
    if(!phone)
    {
        layer.msg("请输入手机号码");
        return false;
    }
    //校验省市区
    var selectProv = $("#seachprov option:selected").val();
    var selectCity = $("#seachcity option:selected").val();
    var selectCountry = $("#seachdistrict option:selected").val();
    var fullAddress = $("#address").val();
    if( selectProv==11 || selectProv==12 || selectProv==31 || selectProv==50 || selectProv==71 || selectProv==81 || selectProv==82)
    {
        if(selectCity==0 || fullAddress=="")
        {
            layer.msg("请输入完整地址");
            return false;
        }
    }
    else if(selectProv==0 || selectCity==0 || selectCountry==0 || fullAddress=="")
    {
        layer.msg("请输入完整地址");
        return false;
    }

    //发送添加请求
    var url = "/Address/saveAddress";
    var dataObj = {"linkman" : name, "linkphone" : phone, "province" : $("#seachprov option:selected").text(), "city" : $("#seachcity option:selected").text(), "country" : $("#seachdistrict option:selected").text(), "fullAddress" : $("#address").val()};
    var success=function(data){
        var view = appStorage.getItem("view");
        if(view=="tfFapiaoDizhi.html"){
            window.location.href="tfFapiaoDizhi.html";
        }else {
            window.location.href = "grGuanlishouhuo.html";
        }
        weui.Loading.hide();
    };
    weui.Loading.show();
    if(!empty(MemberInfo)){
        ajaxPostFun(url, dataObj, success, null,"取得收货地址");
    }else{
        var addr=encodeURI($("#seachprov option:selected").text())+ encodeURI($("#seachcity option:selected").text())+encodeURI($("#seachdistrict option:selected").text())+encodeURI($("#address").val());
        addr=encodeURI(addr);
        name=encodeURI(encodeURI(name));
        var url="tfFapiaoDizhi.html?linkman="+name+"&linkphone="+phone+"&addr="+addr;
       //url=encodeURI(url);
        window.location.href=url;
    }
}