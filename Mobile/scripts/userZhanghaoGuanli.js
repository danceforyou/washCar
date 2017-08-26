/**
 * Created by Administrator on 2016/7/17.
 */
var touxiang = Request['touxiang'];
//alert(touxiang);
$(function () {
    $("#zhanghaoinfo input[name='id']").val(MemberInfo.id);

    $("#zhanghaoinfo input[name='name']").val(MemberInfo.name);

    $("#zhanghaoinfo input[name='touxiang']").val(touxiang);
    if(!empty(touxiang)){
        $("#imgtouxiang").attr("src",touxiang);
    }else{
        if(MemberInfo.photo!=""&&MemberInfo.photo!=null){
            $("#zhanghaoinfo input[name='touxiang']").val(MemberInfo.photo);
            $("#imgtouxiang").attr("src",MemberInfo.photo);
        }
    }
    //取得性别
    if(MemberInfo.sex){
        var sexVal = MemberInfo.sex;

        if($("#sex").get(0).options[0].value == sexVal){
            $("#sex").get(0).options[0].selected = true;
        }else{
            $("#sex").get(0).options[1].selected = true;
        }
    }
    $("#zhanghaoinfo input[name='phone']").val(MemberInfo.phone);
    $("#zhanghaoinfo input[name='birthday']").val(MemberInfo.birthday);


    //省市区
    //初始化省市区下拉框
    initComplexArea('seachprov', 'seachcity', 'seachdistrict', area_array, sub_array, '0', '0', '0');
    if(MemberInfo.nation) //选中用户已设置数据
    {
        var area = MemberInfo.nation.split(",");
        if (area[0]) {
            setValueOfArea("seachprov", area[0]);
            changeComplexProvince($("#seachprov option:selected").val(), sub_array, 'seachcity', 'seachdistrict');
            if (area[1]) {
                setValueOfArea("seachcity", area[1]);
                if (area[2]) {
                    if(area[2] == "请选择")
                    {
                        $("#seachdistrict_div").hide()
                    }
                    else
                    {
                        changeCity($("#seachcity option:selected").val(),'seachdistrict','seachdistrict');
                        setValueOfArea("seachdistrict", area[2]);
                    }
                }
                if(MemberInfo.address) {
                    $("#address").val(MemberInfo.address);
                }
            }
        }
    }

    //取得证件类型
    if(MemberInfo.crtftyp){
        var type = MemberInfo.crtftyp;
        $("#crtftyp").val(type);
        $("#crtfnum").val(MemberInfo.crtfnum);
    }
    //取得电子邮箱
    $("#email").val(MemberInfo.email);

    $("#saveZh").click(function () {
        var name = $("#zhanghaoinfo input[name='name']").val();
        var sex =  $("#sex option:selected").val();
        var birthday = $("#zhanghaoinfo input[name='birthday']").val();
        var nation  = $("#seachprov option:selected").text() + "," + $("#seachcity option:selected").text() + ","
                     + $("#seachdistrict option:selected").text();
        var address = $("#address").val();
        var crtftyp = $("#crtftyp option:selected").val();
        var crtfnum = $("#crtfnum").val();
        var phone = $("#phone").val();
        var email = $("#email").val();

        //校验姓名
        if(!name)
        {
            layer.msg("请输入姓名");
            return false;
        }

        ////校验出生日期
        //if(!birthday)
        //{
        //    layer.msg("请输入出生日期");
        //    return false;
        //}

        //校验省市区，都不能为空
        //var selectProv = $("#seachprov option:selected").val();
        //if( selectProv==11 || selectProv==12 || selectProv==31 || selectProv==50 || selectProv==71 || selectProv==81 || selectProv==82)
        //{
        //    if($("#seachcity option:selected").val()==0 || $("#address").val()=="")
        //    {
        //        layer.msg("请输入完整地址");
        //        return false;
        //    }
        //}
        //else if($("#seachprov option:selected").val()==0 || $("#seachcity option:selected").val()==0 || $("#seachdistrict option:selected").val()==0 || $("#address").val()=="")
        //{
        //    layer.msg("请输入完整地址");
        //    return false;
        //}

        //校验证件号码
        var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if(crtftyp=="身份证" && crtfnum){
             if(!isIDCard1.test(crtfnum)){
                 layer.msg("请输入正确证件号码");
                return false;
            }
        }
        else
        {
            if(!crtfnum)
            {
                layer.msg("请输入证件号码");
                return false;            }
        }

        ////校验邮箱格式
        //if(!email)
        //{
        //    layer.msg("请输入邮箱");
        //    return false;
        //}

        var obj={"id":$('#id').val(),"icnum":SmitMemberInfo.icnum,"name":name,"phone":phone,"email":email,"nation":nation,"address":address,"crtftyp":crtftyp,"crtfnum":crtfnum,photo:touxiang,"birthday":birthday,"sex":sex};
        var url = '/Member/SaveMemberInfo';
        var successFun = function (data) {
            appStorage.setItem("MemberInfo",JSON.stringify(data.bizData));
            weui.Loading.hide();
            layer.msg("会员信息保存成功!",{icon: 6,time:1000});
        };
        var errorFun = function(data){
            weui.Loading.hide();
            layer.msg(data.msg,{icon: 5,time:1000});
        };
        weui.Loading.show('处理中');
        ajaxPostFun(url, obj, successFun, errorFun, "保存会员信息");
    });
});

//省市区选择相关
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

function safeExit(){
    var url = "/Member/SafeExit";
    var successFun = function (data) {
        appStorage.removeItem("MemberInfo");
        appStorage.removeItem("RoomInfo");
        window.location.href="index.html";
    };
    ajaxPostFun(url, null, successFun, null, "安全退出");
}

/////////////////////////////////以下代码未使用///////////////////////////
//得到地区码，后期如果将省市区存本地数据库，可以只存储地区码，会用到下面的函数
function getAreaID(){
    var area = 0;
    if($("#seachdistrict").val() != "0"){
        area = $("#seachdistrict").val();
    }else if ($("#seachcity").val() != "0"){
        area = $("#seachcity").val();
    }else{
        area = $("#seachprov").val();
    }
    return area;
}

function showAreaID() {
    //地区码
    var areaID = getAreaID();
    //地区名
    var areaName = getAreaNamebyID(areaID) ;
    alert("您选择的地区码：" + areaID + "      地区名：" + areaName);
}

//根据地区码查询地区名
function getAreaNamebyID(areaID){
    var areaName = "";
    if(areaID.length == 2){
        areaName = area_array[areaID];
    }else if(areaID.length == 4){
        var index1 = areaID.substring(0, 2);
        areaName = area_array[index1] + " " + sub_array[index1][areaID];
    }else if(areaID.length == 6){
        var index1 = areaID.substring(0, 2);
        var index2 = areaID.substring(0, 4);
        areaName = area_array[index1] + " " + sub_array[index1][index2] + " " + sub_arr[index2][areaID];
    }
    return areaName;
}
//取链接后面的?号传值
function getRequest() {
    var url = decodeURI(location.search); //获取url中"?"符后的字串
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
function touxiangUpload(){
    if(navigator.userAgent.match(/OS 9_[1-9] /i)   || navigator.userAgent.match(/OS 9_[1-9]_[0-9] /i) || navigator.userAgent.match(/OS [8-9]_[0-9] /i)  || navigator.userAgent.match(/OS [8-9]_[0-9]_[0-9] /i)){
//                //9.1以上
        weui.alert("ios9以上版本不支持上传图像");
    }else{
        window.location.href="touxiangupload.html";
    }
}