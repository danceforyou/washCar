$(function () {
    $('#quxiao').click(function() {
        $('#dialog1').hide();
    });
    //页面初始化取得收货地址列表A
    getDeliveryAddr();
    currentPage = 1;
    deleteId = "";
    $("#deliveryaddrlist").html("");
});

//取得收货地址
function getDeliveryAddr()
{
    var url = "/Address/MyAddressList/1";
    var success=function(data){
        showHtml(data.bizData.rows);
        weui.Loading.hide();
    };
    weui.Loading.show();
    ajaxPostFun(url,null,success, null,"取得收货地址");
}

// 拼接页面字符串
function showHtml(dataList)
{
    for(var i=0; i<dataList.length; i++) {
        var countryStr =  "";
        if(dataList[i].country != "请选择")
        {
            countryStr = dataList[i].country;
        }

        var html = '<dl class="shuxinglist">' +
                        '<dd class="name">' +
                            '<b>' + dataList[i].linkman + '</b>' +
                            '<span class="fr">' +
                            '<i class="aui-iconfont aui-icon-deletefill">&nbsp;<span onclick="delAddressClick(' + dataList[i].id + ')">删除</span></i> &nbsp;&nbsp;&nbsp; ' +
                            '<i class="aui-iconfont aui-icon-edit">&nbsp;<span onclick="editAddress(' + dataList[i].id + ')">编辑</span></i>' +
                            '</span>' +
                        '</dd>' +
                        '<dd>' + dataList[i].linkphone + '</dd>' +
                        '<dd>' + dataList[i].province + dataList[i].city + countryStr + dataList[i].fullAddress + '</dd>' +
                    '</dl>';
        $("#deliveryaddrlist").append(html);
    }
}

//加载更多
function loadMore()
{
    currentPage = currentPage + 1;
    var url = "/Address/MyAddressList/" + currentPage;
    var success=function(data){
        if(data.bizData.rows.length == 0)
        {
            layer.msg("没有更多地址");
            weui.Loading.hide();
        }
        else
        {
            showHtml(data.bizData.rows);
            weui.Loading.hide();
        }
    };
    weui.Loading.show()
    ajaxPostFun(url,null,success, null,"取得收货地址");
}

//删除收货地址
function delAddressClick(id)
{
    deleteId = id;
    weui.confirm("你确定要删除吗？","温馨提示",function(b){
        if(b){
            deleteAddress(id);
        }
    });
}

function deleteAddress(id)
{
    weui.Loading.show();
    var url = "/Address/deleteAddress";
    var dataObj = {"id" : deleteId};
    var success=function(data){
        weui.Loading.hide();
        window.location.href = "grGuanlishouhuo.html";
    };
    ajaxPostFun(url, dataObj, success, null, "删除收货地址信息");
}
//修改收货地址
function editAddress(addressId)
{
    window.location.href = "bjshouhuoadress.html?" + "addressId=" + addressId;
}
