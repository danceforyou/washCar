/**
 * Created by Administrator on 2016/7/18 0018.
 */
$(function () {
    id =  $.getUrlParam("addressId")
    initComplexArea('seachprov', 'seachcity', 'seachdistrict', area_array, sub_array, '0', '0', '0');
    //根据id取地址详细信息
    getAddrInfoById(id);
})

function getAddrInfoById(id)
{
    var url = "/Address/getMyAddress";
    var dataObj = {"id" : id};
    var success=function(data){
        initPage(data.bizData.rows[0]);
        weui.Loading.hide();
    };
    weui.Loading.show();
    ajaxPostFun(url, dataObj, success, null, "根据id取得收货地址详细信息");
}

//初始化页面信息
function initPage(data)
{
    if(data.linkman)
    {
        $("#name").val(data.linkman);
    }
    if(data.linkphone)
    {
        $("#phone").val(data.linkphone);
    }

    if (data.province) {
        setValueOfArea("seachprov", data.province);
        changeComplexProvince($("#seachprov option:selected").val(), sub_array, 'seachcity', 'seachdistrict')
        //$("#seachprov").trigger("onChange");
        if (data.city) {
            setValueOfArea("seachcity", data.city);
            if (data.country) {
                if(data.country == "请选择")
                {
                    $("#seachdistrict_div").hide();
                }
                else
                {
                    changeCity($("#seachcity option:selected").val(),'seachdistrict','seachdistrict');
                    setValueOfArea("seachdistrict", data.country);
                }
            }
            if(data.fullAddress) {
                $("#address").val(data.fullAddress);
            }
        }
    }
}

//根据用户设置显示选中的省市区
function setValueOfArea(selectId, selectValue)
{
    var count = $("#"+selectId).get(0).options.length;
    for(var i=0; i<count; i++){
        if($("#"+selectId).get(0).options[i].text == selectValue)
        {
            $("#"+selectId).get(0).options[i].selected = true;
            break;
        }
    }
}

//保存变更信息
function saveEdit()
{
    var name = $("#name").val();
    var phone = $("#phone").val();
    var selectProv = $("#seachprov option:selected").text()
    var selectCity = $("#seachcity option:selected").text()
    var selectCountry = $("#seachdistrict option:selected").text()
    var fullAddress = $("#address").val()

    var url = "/Address/updateAddress";
    var dataObj = {"id" : id, "linkman" : name, "phone" : phone, "province" : selectProv, "city" : selectCity, "country" :selectCountry, "fullAddress" : fullAddress};
    var success=function(data){
        window.location.href = "grGuanlishouhuo.html";
        weui.Loading.hide();
    };
    weui.Loading.show();
    ajaxPostFun(url, dataObj, success, null, "保存变更后的收货地址信息");
}