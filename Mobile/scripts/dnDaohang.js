/**
 * Created by Administrator on 2016/7/31 0031.
 */

$(document).ready(function(){

    ajaxGetFun("/MobileZbInfo/queryZbInfo/1",{remrak:"daohang"},function (res) {
        var bizData = res.bizData;
        renderInfo(bizData);
    }, function (err) {
        (err.msg);
    }, "查询店内导航信息");
})

function renderInfo(res) {
    var str = "";
    var rows = res.rows;
    for(var i=0;i < rows.length;i++) {

        str += '<p>'+rows[i].name+'</p>'
            +'<p onclick=doopUp("'+rows[i].picture+'")><img src="' + rows[i].picture + '" /></p>';

    }

    $("#dnScreen").append(str);
}

//点击图片放大
function doopUp(obj){
    if(true){
        $('#dnImg').attr("src",obj);
        $("#nddaohangpopu").show();
        $('#dnImg').smartZoom({'containerClass':'zoomableContainer'});
        function zoomButtonClickHandler(e){
            var scaleToAdd = 0.8;
            if(e.target.id == 'zoomOutButton')
                scaleToAdd = -scaleToAdd;
            $('#dnImg').smartZoom('zoom', scaleToAdd);
        }

       /* function moveButtonClickHandler(e){
            var pixelsToMoveOnX = 0;
            var pixelsToMoveOnY = 0;

            switch(e.target.id){
                case "leftPositionMap":
                    pixelsToMoveOnX = 50;
                    break;
                case "rightPositionMap":
                    pixelsToMoveOnX = -50;
                    break;
                case "topPositionMap":
                    pixelsToMoveOnY = 50;
                    break;
                case "bottomPositionMap":
                    pixelsToMoveOnY = -50;
                    break;
            }
            $('#dnImg').smartZoom('pan', pixelsToMoveOnX, pixelsToMoveOnY);
        }*/
    }
}

//图片还原
$("#nddaohangpopu").click(function(){
    $("#nddaohangpopu").hide();
})