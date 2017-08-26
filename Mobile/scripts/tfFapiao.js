/**
 * Created by Administrator on 2016/9/3 0003.
 */
$(function () {
    initPage();
    initRadioStatus();
});

function initPage()
{
        if(appStorage.getItem("taitou") != "undefined" && appStorage.getItem("taitou"))
        {
            $("#taitou").val(appStorage.getItem("taitou"));
        }
        if(appStorage.getItem("mingxi") != "undefined" && appStorage.getItem("mingxi"))
        {
            $("#mingxi").val(appStorage.getItem("mingxi"));
        }
        if(appStorage.getItem("address") != "undefined" && appStorage.getItem("address"))
        {
            $("#address").text(appStorage.getItem("address"));
        }
}

//前台自取，不能选地址；邮寄可以选地址
function radioOnchange()
{
    if($("#ziqu")[0].checked)
    {
        $("#address").text("");
    }
    else
    {
        if(appStorage.getItem("address") != "undefined" && appStorage.getItem("address"))
        {
            $("#address").text(appStorage.getItem("address"));
        }
    }
}

function showAddress()
{
    if($("#ziqu")[0].checked)
    {
        window.location.href = "#";
    }
    else
    {
        appStorage.setItem("taitou", $("#taitou").val());
        appStorage.setItem("mingxi", $("#mingxi").val());
        appStorage.setItem("address", $("#address").text());
        window.location.href = "tfFapiaoDizhi.html";
    }
}

//如果初始化时有地址，那么选择快递邮寄radio
function initRadioStatus()
{
    if(appStorage.getItem("address") != "undefined" && appStorage.getItem("address"))
    {
        $("#youdi")[0].checked = true;
        radioOnchange();
    }
}

function save()
{
    appStorage.setItem("taitou", $("#taitou").val());
    appStorage.setItem("mingxi", $("#mingxi").val());
    appStorage.setItem("address", $("#address").text());
    if($("#ziqu")[0].checked)
    {
        appStorage.setItem("fangshi",$("#ziqu-span")[0].innerHTML);
    }
    else
    {
        appStorage.setItem("fangshi",$("#youdi-span")[0].innerHTML);
    }
    window.location.href = "ksTuifang.html";
}
