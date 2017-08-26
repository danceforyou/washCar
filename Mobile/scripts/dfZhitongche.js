/**
 * Created by Administrator on 2016/6/27.
 */
//登录信息校验
function gotoUrl(url){
    if (empty(MemberInfo)){
        $(".loginOut").show();
    }else{
        window.location.href =url;
    }
}

function gotoService(url){
    if (empty(RoomInfo)){
        window.location.href = "cyShenfenYanzheng.html?url="+url;
    }else{
        sfYz(RoomInfo.room,RoomInfo.password,url);
    }
}

function sfYz(f,y,u){
    console.log("房间验证码");
    weui.Loading.show();
    var url = "/guestChekInfo/findByRoomAndPass";
    var successFun = function (data) {
        var bizData = data.bizData;
        appStorage.setItem("RoomInfo",JSON.stringify(bizData));
        weui.Loading.hide();
        console.log(RoomInfo);
        if(bizData.type==1&&u=="ksTuifang.html"){
            var dtime=new Date();
            var nowtime= dtime.toLocaleString();
            var url="/ServiceStyle/sendService";
            var memid;
            if(MemberInfo!=null){
                memid=MemberInfo.id;
            }
            var data={hotelCode:bizData.hotelCode,room:bizData.room,accnt:bizData.accnt,scode:"285",stitle:"申请快速退房",stime:nowtime,remark:"",memId:memid};
            var success=function(data){
                if(data.rtnCode=="0000000"){
                    weui.alert("快速退房申请已发送至服务中心，请稍后查询查房后账单","",function(){
                        window.location.href="ksTuifang.html";
                    })
                }
            };
            ajaxPostFun(url,data,success,"","申请快速退房");
        }else{
            window.location.href = u;
        }
    };
    var errorFun = function(){
        weui.Loading.hide();
        appStorage.removeItem("RoomInfo");
        $('#fangjian i').get(0).style.display = "none";
        $('#fangjian i').get(1).style.display = "none";
        $('#yanzhanma i').get(0).style.display = "none";
        $('#yanzhanma i').get(1).style.display = "none";
        weui.alert("您填写的房号与验证码不匹配，请核实后再输入","身份验证失败");
    };
    ajaxPostFun(url, {hotelCode:"capital",room:f,password:y},successFun, errorFun,"房号验证");
}




var Request = new Object();
Request = getRequest();
var arrDate = Request['arrDate'];
var depDate = Request['depDate'];
var priceCode = Request['priceCode'];
var roomCode = Request['roomCode'];
var priceDetail = Request['priceDetail'];
var breakfast = Request['breakfastCount'];
var priceName = Request['priceName'];
var priceName = decodeURI(Request['priceName']);
var roomName = decodeURI(Request['roomName']);
var youhuijuanid = Request['youhuijuanid'];
var youhuiprice = Request['youhuiprice'];
var roomDes = Request['roomDes'];
var roomAvl = Request['roomAvl'];
var coupNum = Request['coupNum'];
console.log("dddddddddddddddddddd===========");
console.log(coupNum);
//var roomDes=decodeURI(Request['roomDes']);
//var roomDes=decodeURI(Request['roomDes']);
var orderprice;
var totalPrice;
var payFlg=2;
var payTyp;
var payAmt;
var jisuanjiage;
console.log(Request);
var vCode = "";
$(function () {
    function verificationCode() {
        var url = "/SysConfig/getVerificationCode";
        var successFun = function (data) {
            var codeBase64 = data.bizData.imageCode;
            vCode = data.bizData.vCode;
            $('#auth').attr('src', codeBase64);
        }
        ajaxPostFun(url, {}, successFun, null, "获取验证码");
    }

    verificationCode();
    $('#auth').click(function () {
        verificationCode();
    });

    if (Request['roomPic']) {
        $("#jiaodianimg").attr("src",Request['roomPic']);
    }


    if (Request['arrDate']) {
        $("#arrDate").html(Request['arrDate']);
    }

    if (Request['depDate']) {
        $("#depDate").html(Request['depDate']);
    }

    if (Request['roomName']) {
        $("#roomName").html(decodeURI(Request['roomName']));
    }
    if (Request['number']) {
        $("#guestNums").val(Request['number']);
    }
    if (Request['priceCode']) {
        $("#priceCode").attr("value", Request['priceCode']);

    }
    if (Request['priceDetail']) {
        $("#priceDetail").attr("value", Request['priceDetail']);
    }
    if (Request['number']) {
        $("#roomNums").attr("value", Request['number']);
    }

    if (Request['roomCode']) {
        $("#roomCode").attr("value", Request['roomCode'])
    }
    if (Request['priceDetail']) {
        $("#hoomPrice").html("￥" + Request['priceDetail'])
    }
    if (Request['zuichitime']) {
        $("#last_arr_tm").attr("value",Request['zuichitime'])
    }
    if (Request['fangkename']) {
        //$("#guestName").attr("value",decodeURI(decodeURI(Request['fangkename'])))
        $("#guestName").attr("value",Request['fangkename'])
    }
    if (Request['roomNums']) {
        $("#roomNums").attr("value",Request['roomNums'])
    }
    if (Request['guestNums']) {
        $("#guestNums").attr("value",Request['guestNums'])
    }
    if (Request['guestPhone']) {
        $("#guestPhone").attr("value",Request['guestPhone'])
    }
    if (Request['guestMail']) {
        $("#guestMail").attr("value",Request['guestMail'])
    }
    if (Request['remarkinfo']) {
        //$("#notice").attr("value",decodeURI(decodeURI(Request['remarkinfo'])))
        $("#notice").attr("value",Request['remarkinfo'])
    }
    if (Request['tuijianhao']) {
        $("#tjh").attr("value",Request['tuijianhao'])
    }

    if (Request['youhuiprice']) {
        $("#shiyongyouhuiquan").html("已优惠"+Request['youhuiprice']+"元");
    }

    if(empty($('#guestPhone').val())){
        $('#guestPhone').val(MemberInfo.phone);
    }
    if(empty($('#guestMail').val())){
        $('#guestMail').val(MemberInfo.email);
    }
    if(Request['roomDes']){
        $("#homedes").html(roomDes);
    }

    queryPriceInfo(roomCode, priceCode,$("#roomNums").val(),Request['youhuiprice']);
    var sign=0;
    $("#btnSumbit").click(function () {
        if(orderprice==0.00){
            weui.alert("价钱为0.00时不可支付");
            return;
        }
         //youhuijuanid = Request['youhuijuanid'];
         //youhuiprice = Request['youhuiprice'];
        if (!checkData()) {
            return false;
        }
        var url = "/dingfang/saveOrder";
        var arrDate = $("#arrDate").html();
        var depDate = $("#depDate").html();
        var fast_arr_tm = $("#fast_arr_tm").val();

        var last_arr_tm = $("#last_arr_tm").val();
        var fast_arr_tm= shijian(last_arr_tm,2);
        console.log(fast_arr_tm);
        var roomNums = $("#roomNums").val();
        var guestNums = $("#guestNums").val();
        var guestName = $("#guestName").val();
        var guestPhone = $("#guestPhone").val();
        var guestMail = $("#guestMail").val();
        var notice = $("#notice").val()+",";
        //if(!empty(notice)&&notice!="undefined"){
        //    notice = $("#notice").val()+",";
        //}
        if(!empty($("#tjh").val())){
            notice+="【推荐号】:"+$("#tjh").val()+",";
        }
        if(empty(youhuiprice)){
            youhuiprice = 0;
        }
        if(empty(coupNum)||coupNum==undefined){
            coupNum="无"
        }
        //alert(coupNum);
        //alert(coupNum);
        if(payFlg==0){
            notice+="【优惠券面额】:"+youhuiprice+"元,"+"【优惠券流水号】:"+coupNum+","+"【应付价格】:"+jisuanjiage+"元,";
        }
        if(payFlg==1){
            notice+="【优惠券面额】:"+youhuiprice+"元,"+"【优惠券流水号】:"+coupNum+","+"【实付价格】:"+jisuanjiage+"元,";
        }
         youhuijuanid=youhuijuanid;
         youhuiprice=youhuiprice;
        //if(notice==""){
        //    notice="无";
        //}
        var fyzm = $("#fyzm").val();
        var fjshuliang = $("#roomNums").val();

        //jisuanjiage=getSumPrice(priceDetail,fjshuliang,youhuiprice);
        //+","+youhuiprice+","+getSumPrice(priceDetail,fjshuliang,youhuiprice)
        var orderDetails = {
            'roomCode': roomCode,
            'roomName': roomName,
            'priceCode': priceCode,
            'priceName': priceName,
            'priceDetail': priceDetail,
            'roomNums': roomNums,
            'guestNums': guestNums,
            'breakfast': breakfast
        };
        var data = {
            memtyp: SmitMemberInfo.memtyp,
            icnum: SmitMemberInfo.icnum,
            cardTyp: SmitMemberInfo.cardTyp,
            guestName: guestName,
            guestPhone: guestPhone,
            guestMail: guestMail,
            notice:notice,
            arrDate: arrDate,
            depDate: depDate,
            fast_arr_tm: fast_arr_tm,
            last_arr_tm: last_arr_tm,
            fyzm: fyzm,
            totalPrice:totalPrice,
            discountid:youhuijuanid,
            discountMoney:youhuiprice,
            roomname:roomName,
            payFlg:payFlg,
            payTyp:payTyp,
            payAmt:payAmt,
            orderDetails:[orderDetails]
        };


        var successFun = function (data) {
            var bizData = data.bizData;
            if(payFlg==0){
                weui.alert("预订成功！您的订单号是:"+bizData.orderNum, "预订成功", function(){
                    window.location.href ="userDingdan.html";
                });
            }else if(payFlg==1){
                window.location.href = "dfLijiZhifu.html?orderNum="+bizData.orderNum+"&orderprice="+orderprice;
            }else{
                weui.alert("此房间不能预订！","", function(){
                    window.location.href ="dfZhitongcheInfo.html";
                });
            }
        };
        var errorFun = function(data){
            if(data.msg=='价钱小于或等于0'){
                weui.alert(data.msg);
            }else{
                weui.alert("您的订单号:"+data.msg, "预订失败");
            }
        };
        if(sign==0){
            sign=1;
            ajaxPostFun(url, {jsonStr:JSON.stringify(data)}, successFun, errorFun, "房间预定");
        }else{
            weui.alert("您已提交过此订单，不能重复提交");
        }


    });

});

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
/*
 *函数功能：从href获得参数
 *sHref:   http://www.artfh.com/arg.htm?arg1=d&arg2=re
 *sArgName:arg1, arg2
 *return:    the value of arg. d, re
 */
function GetArgsFromHref(sHref, sArgName) {
    var args = sHref.split("?");
    var retval = "";

    if (args[0] == sHref) /*参数为空*/
    {
        return retval;
        /*无需做任何处理*/
    }
    var str = args[1];
    args = str.split("&");
    for (var i = 0; i < args.length; i++) {
        str = args[i];
        var arg = str.split("=");
        if (arg.length <= 1) continue;
        if (arg[0] == sArgName) retval = arg[1];
    }
    return retval;
}
function queryPriceInfo(roomCode, priceCode) {
    var url = "/dingfang/queryPriceInfo";
    var success = function (json) {
        var fjshuliang = $("#roomNums").val();
        var rows = json.bizData.priceInfo;
        for (var i = 0; i < rows.length; i++) {
            var hotelRoomVO = rows[i];
            console.log(hotelRoomVO);
            if (priceCode == hotelRoomVO.priceCode) {
                payTyp=hotelRoomVO.payTyp;
                payAmt=hotelRoomVO.payAmt;
                jisuanjiage=getSumPrice(priceDetail,fjshuliang,youhuiprice);
                $("#priceCode").attr("value", hotelRoomVO.priceCode);
                $("#roomCode").attr("value", hotelRoomVO.roomCode);
                $("#priceDetail").attr("value", hotelRoomVO.priceDetail);
                $("#priceName").attr("value", hotelRoomVO.priceName);
                $("#breakfast").attr("value", hotelRoomVO.breakfast);
                var timeduan= $("#arrDate").html()+","+$("#depDate").html();
                if(hotelRoomVO.priceDetail.split(",").length>1){
                    var html="<span style='font-size: 10px;'>均价</span>￥" +
                        hotelRoomVO.avgAmt+
                        "<span class='infoxiangqing' onclick=xiangqing('"+timeduan+"','"+hotelRoomVO.priceDetail+"')>明细</span>"

                    $("#hoomPrice").html(html);
                }else{
                    $("#hoomPrice").text("￥" + hotelRoomVO.priceDetail);
                }

                $("#hoomPrice2").text("实付:￥" + getSumPrice(hotelRoomVO.priceDetail,fjshuliang,youhuiprice));
                //if(hotelRoomVO.detail==""){
                //    $("#homedes").html("无");
                //
                //}else{
                //    $("#homedes").html(hotelRoomVO.detail);
                //}

                totalPrice = getSumPricenoyouhuiquan(hotelRoomVO.priceDetail,fjshuliang);
                if(hotelRoomVO.payFlg==""){
                    payFlg=0;
                }else {
                    payFlg=hotelRoomVO.payFlg;
                }
                //判断是否隐藏选择优惠券功能
                if (payFlg==0){
                    $("#youhuiquandiv").hide();
                }

            }
        }
    }
    var data = {
        arrDate: $("#arrDate").html(),
        depDate: $("#depDate").html(),
        roomCode: roomCode,
        icnum: SmitMemberInfo.icnum,
        carTyp: SmitMemberInfo.carTyp
    };
    ajaxGetFun(url, data, success, null, "查询房间价格");

}

//计算不加优惠券的价钱
function getSumPricenoyouhuiquan(priceDet,fjshuliang) {
    var arr = priceDet.split(",");
    var sum = 0;

    for (var i = 0; i < arr.length; i++) {
        if(payTyp==1){
            sum += parseFloat(parseFloat(arr[i]).toFixed(2)*fjshuliang);
        }else{
            sum += parseFloat(parseFloat(arr[i]).toFixed(2)*fjshuliang*parseFloat(payAmt));
        }
    }
    return Math.round(sum);
}

//动态显示价格
$('#roomNums').bind('change', function() {
    //获得房间数量
    var fjshuliang = $("#roomNums").val();
    if(!empty(fjshuliang)){
        queryPriceInfo(roomCode, priceCode,fjshuliang);
    }
});




function isdatetime(mystring) {
    var reg = /^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/;
    var str = mystring;
    if (str == "") {
        return false;
    }
    if (!reg.test(str) || RegExp.$2 <= 12 && RegExp.$3 <= 31) {
        return false;
    }
    return true;
}

function istime(mystring) {
    var reg = /^([01]\d|2[01234]):([0-5]\d|60)$/;
    var str = mystring;
    if (str == "") {
        return false;
    }
    if (!reg.test(str)) {
        return false;
    }
    return true;
}
function isphone(mystring) {
    var reg = /^[1][358][0-9]{9}$/;
    var str = mystring;
    if (str == "") {
        return false;
    }
    if (!reg.test(str)) {
        return false;
    }
    return true;
}

function isemail(mystring) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    var str = mystring;
    if (str == "") {
        return false;
    }
    if (!reg.test(str)) {
        return false;
    }
    return true;
}

function isnum(mystring) {
    var reg = /^[0-9]*[1-9][0-9]*$/;
    var str = mystring;
    if (str == "") {
        return false;
    }
    if (!reg.test(str)) {
        return false;
    }
    return true;
}
function checkData() {
    var flag = true;

    if (!isdatetime($("#arrDate").html())) {
        weui.alert("入住时间不能为空");
        return false;
    }
    if (!isdatetime($("#depDate").html())) {
        weui.alert("离店时间不能为空");
        return false;
    }
    if (!istime($("#last_arr_tm").val())) {
        weui.alert($("#last_arr_tm").attr("placeholder"));
        return false;
    }

    // var fast_arr_tmf = $("#fast_arr_tm").val();
    //var last_arr_tmf = $("#last_arr_tm").val();

    /* if (fast_arr_tmf >= last_arr_tmf) {

     weui.alert("最迟到店时间不能晚于最早到店时间!");
     return false;
     }*/


    if (empty($("#guestName").val())) {
        weui.alert($("#guestName").attr("placeholder"));
        return false;
    }
    if (!isemail($("#guestMail").val())) {
        weui.alert($("#guestMail").attr("placeholder"));
        return false;
    }
    if (!isnum($("#guestNums").val())&&$("#guestNums").val()<3) {
        weui.alert("每个房间最多只能入住两人");
        return false;
    }
    if (!isnum($("#roomNums").val())&&$("#roomNums").val()<6) {
        weui.alert("最多只能订5间房");
        return false;
    }
    if (!isphone($("#guestPhone").val())) {
        weui.alert($("#guestPhone").attr("placeholder"));
        return false;
    }
    var fyzm = $("#fyzm").val();
    console.log(vCode);
    console.log(fyzm);
    fyzm = fyzm.toUpperCase();
    if(fyzm!=vCode){
        weui.alert("验证码输入有误");
        return false;
    }

    return flag;
}

function getSumPrice(priceDet,fjshuliang,youhuipri) {

    var arr = priceDet.split(",");
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        if(payTyp==1){
            sum += parseFloat(parseFloat(arr[i]).toFixed(2)*fjshuliang);
        }else{
            sum += parseFloat(parseFloat(arr[i]).toFixed(2)*fjshuliang*parseFloat(payAmt));
        }
    }
    sum=Math.round(sum);
    var summmm = sum;
    if(!empty(youhuipri)){
        if(youhuipri>sum){
            weui.alert("此房不能使用优惠券");
            $("#shiyongyouhuiquan").html("去使用优惠券");
            youhuijuanid=null;
            youhuiprice=0;
        }else{
            sum =sum-youhuipri;
        }
    }
    //if(sum.toFixed(2)<0){
    //    sum=summmm;
    //
    //}
    orderprice=Math.round(sum);
    return Math.round(sum);
    //orderprice=sum.toFixed(2);
    //return sum.toFixed(2);
}
function shijian(demo,num){
    var index = demo.indexOf(":");
    var time = demo.substr(0,index);
    var minute=demo.substr(index + 1,demo.length);
    time = time-num;
    console.log(time);
    if(time<10){
        time = "0"+ time;
    }
    var result =time +":"+ minute;
    return result;
}

//弹框显示房间每个日期的详情
function xiangqing(timeduan,prices) {
    layer.open({
        type: 2,
        title: '房间价钱详情',
        shadeClose: true,
        shade: 0.8,
        area: ['300px', '300px'],
        content: 'dfZhitongcheInfoLayer.html?timeduan='+timeduan+"&prices="+prices
    });

}

//判断选择的房间数量是否大于现有的房间数量
$('#roomNums').change(function(){
    roomAvl=5;
    //获得选择的房间数量
   var selnum = $('#roomNums').val();
    if(selnum>roomAvl){
       layer.msg("没有那么多房间");
       $('#roomNums_dummy').val(roomAvl);
   }
});



//去选择优惠券
function quxuanzeyouhuijuan(youhuijuantype){
    var href  =window.location.href;
    href = href.split("?")[1];

    //获得用户已经输入的信息
    //获得最迟到店时间
    var zuichitime = $("#last_arr_tm").val();
    if (!empty(zuichitime)){
        href+="&zuichitime="+zuichitime
    }
    //获得访客姓名
    var fangkename = $("#guestName").val();
    if (!empty(fangkename)){
        //href+="&fangkename="+encodeURI(encodeURI(fangkename));
        href+="&fangkename="+fangkename;
    }
    //获得房间数量
    var roomNums = $("#roomNums").val();
    if (!empty(roomNums)){
        href+="&roomNums="+roomNums;
    }
    //获得入住人数
    var guestNums = $("#guestNums").val();
    if (!empty(guestNums)){
        href+="&guestNums="+guestNums;
    }
    //获得手机号码
    var guestPhone = $("#guestPhone").val();
    if (!empty(guestPhone)){
        href+="&guestPhone="+guestPhone;
    }
    //获得邮箱
    var guestMail = $("#guestMail").val();
    if (!empty(guestMail)){
        href+="&guestMail="+guestMail;
    }
    //获得备注
    var remarkinfo = $("#notice").val();
    if (!empty(remarkinfo)){
        //href+="&remarkinfo="+encodeURI(encodeURI(remarkinfo));
        href+="&remarkinfo="+remarkinfo;
    }
    //获得推荐hao
    var tuijianhao = $("#tjh").val();
    if (!empty(tuijianhao)){
        href+="&tuijianhao="+tuijianhao;
    }
    window.location.href="cyYouhuijuan.html?"+href;

}