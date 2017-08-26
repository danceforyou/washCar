
var Request = new Object();
Request = getRequest();
var gologin = Request['gologin'];


function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
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

//获取轮播图片
function getSlideImg(){
    var url = "/System/IndexPic/FindAll";
    var dataObj = {};
    var success=function(res){
        var pictures=res.bizData;
        if(pictures.length>0){
            var str="";
            for (var i=0;i<pictures.length;i++){
               var picture = pictures[i].picture;
                if(empty(pictures[i].remark)){
                    str+="<li>"
                        +"<a href='#'><img src='"+picture+"' alt=''></a>"
                        +"</li>"
                }else {
                    str+="<li>"
                        +"<a href='"+pictures[i].remark+"'><img src='"+picture+"' alt=''></a>"
                        +"</li>"
                }

            }
            $("#slider").append(str);

            slideshow();
        }
    };

    ajaxPostFun(url, dataObj, success, null, "获取首页轮播图片");
}

function slideshow(){
    try {
        $("#slider").responsiveSlides({
            auto: true,
            nav: false,
            speed: 500,
            timeout: 4000,
            pager: true,
            pauseControls: true,
            namespace: "callbacks"
        });
    }catch (e){
        console.log("此页面没有轮播图,所以报错不要理会....")
    }
}

$(document).ready(function(){
    if(empty(MemberInfo)){
      /*  $(".loginOut").show();*/
       /* $("#isVisible").css("display","none");*/
    }

    getSlideImg();
})
//登录信息校验
function gotoUrl(url){
    if (empty(MemberInfo)){
        $(".loginOut").show();
    }else{
        window.location.href =url;
    }
}
//从首页index页面跳转到其他页面时的判断
function gotoService(url){
    if (empty(RoomInfo)){
        window.location.href = "cyShenfenYanzheng.html?url="+url;
    }else{
        sfYz(RoomInfo.room,RoomInfo.password,url);
    }
}

$("#btnreg").click(function () {
    $(".loginOut").hide();
    $(".regOut").show();
});

$("#exited").click(function () {
    $(".loginOut").show();
    $(".regOut").hide();
});
//身份验证
function sfYz(f,y,u){
    weui.Loading.show();
    var url = "/guestChekInfo/findByRoomAndPass";
    var successFun = function (data) {
        var bizData = data.bizData;
            appStorage.setItem("RoomInfo",JSON.stringify(bizData));
            weui.Loading.hide();
            console.log(RoomInfo);
            //alert(u);
        //alert(bizData.type);

            if(bizData.type==1&&u=="ksTuifang.html"){//1表示有快速退房权限，0没有
                //获取当前时间
                var nowtime=new Date();
                var hh=nowtime.getHours();

                //退房时间为6:00-12:00
                if(hh<6||hh>12){
                    weui.alert("快速退房时间为6:00-12:00,请到前台办理退房手续");
                }else{
                    //weui.alert("办理退房手续");

                    //确认退房
                    layer.confirm('您确定要快速退房吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){                            //点击确定执行第一个方法
                        layer.closeAll();
                        var dtime=new Date();
                        var nowtime= dtime.toLocaleString();
                        var url="/ServiceStyle/sendService";
                        var memid;
                        if(MemberInfo!=null){
                            memid=MemberInfo.id;
                        }
                        var data={hotelCode:bizData.hotelCode,room:bizData.room,accnt:bizData.accnt,scode:"285",
                            stitle:"申请快速退房",stime:nowtime,remark:"",memId:memid};
                        var success=function(data){
                            var dtime=new Date();
                            var nowtime= dtime.toLocaleString();
                            var url="/ServiceStyle/sendService";
                            var memid;
                            if(MemberInfo!=null){
                                memid=MemberInfo.id;
                            }
                            var data={hotelCode:bizData.hotelCode,room:bizData.room,accnt:bizData.accnt,scode:"000",
                                stitle:"请求账单",stime:nowtime,remark:"",memId:memid};
                            var success=function(data){
                                window.location.href="ksTuifang.html";
                            };
                            var errorFun = function(data){
                                weui.Loading.hide();
                            }
                            ajaxPostFun(url,data,success, errorFun,"申请账单");
                        };
                        var errorFun = function(data){
                            weui.Loading.hide();
                        }
                        ajaxPostFun(url,data,success, errorFun,"申请退房");
                    }, function(){                              //点击确定执行第二个方法
                        layer.closeAll();
                    });
                }
            }else{
                if(u=="ksTuifang.html"){
                    weui.alert("此房间不支持快速退房，请到前台办理退房手续");
                }
                else {
                //window.location.href = "cyShenfenYanzheng.html?url="+u;
                window.location.href=u;
                }
            }
    };
    var errorFun = function(data){
        weui.Loading.hide();
        appStorage.removeItem("RoomInfo");
        //$('#fangjian i').get(0).style.display = "none";
        //$('#fangjian i').get(1).style.display = "none";
        //$('#yanzhanma i').get(0).style.display = "none";
        //$('#yanzhanma i').get(1).style.display = "none";
        weui.alert("您填写的房号与验证码不匹配，请核实后再输入","身份验证失败",function(){
            window.location.href = "cyShenfenYanzheng.html?url="+u;
        });
    };
    ajaxPostFun(url, {hotelCode:"capital",room:f,password:y},successFun, errorFun,"房号验证");
}
