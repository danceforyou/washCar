<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="lib/Hui-iconfont/1.0.1/iconfont.css" />
<link rel="stylesheet" type="text/css" href="lib/icheck/icheck.css" />
<link rel="stylesheet" type="text/css" href="skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>${objectName}列表</title>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> ${objectName}管理 <span class="c-gray en">&gt;</span> ${objectName}列表 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
	<div class="text-c">
		日期范围：
		<input type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'logmax\')||\'%y-%M-%d\'}'})" id="logmin" class="input-text Wdate" style="width:160px;">
		-
		<input type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'logmin\')}',maxDate:'%y-%M-%d'})" id="logmax" class="input-text Wdate" style="width:160px;">
		<input type="text" name="Title" id="Title" placeholder=" 资讯名称" style="width:250px" class="input-text">
		<button id="search" class="btn btn-success" type="submit"><i class="Hui-iconfont">&#xe665;</i> 搜索</button>
	</div>
	<div class="cl pd-5 bg-1 bk-gray mt-20">
		<span class="l">
			<a href="javascript:;" onclick="datadel()" class="btn btn-danger radius">
				<i class="Hui-iconfont">&#xe6e2;</i> 批量删除
			</a>
			<a class="btn btn-primary radius" data-title="添加" _href="${objectName}-add.html" onclick="Hui_admin_tab(this)" href="javascript:;">
				<i class="Hui-iconfont">&#xe600;</i> 添加
			</a>
		</span>
	</div>
	<div class="mt-20">
		<table class="table table-border table-bordered table-bg table-hover table-sort">
			<thead>
				<tr class="text-c">
					<th width="25"><input type="checkbox" name="checkAll" value=""></th>
					<th>序号</th>
			<#assign index = 0>
			<#list entityList as entity>
				<#if entity.isShow?ends_with("Y")>
					<th>${entity.keyNote}</th>
					<#assign index = index+1>
				</#if>
			</#list>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr class="text-c">
					<td colspan="${index+3}">数据获取中....</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="lib/layer/2.1/layer.js"></script> 
<script type="text/javascript" src="lib/My97DatePicker/WdatePicker.js"></script> 
<script type="text/javascript" src="lib/datatables/1.10.0/jquery.dataTables.min.js"></script> 
<script type="text/javascript" src="js/H-ui.js"></script>
<script type="text/javascript" src="js/H-ui.admin.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript">
$('.table-sort').dataTable({
	"dom": '<"datatable-header"<"dataTables_filter">l><"datatable-scroll"t><"datatable-footer"ip>',
	"aaSorting": [[ 1, "asc" ]],//默认第几个排序
	"bStateSave": true,//状态保存
	"aoColumnDefs": [
		//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
		{"orderable":false,"aTargets":[0,${index+2}]}// 不参与排序的列
	],
	"columnDefs":[
		{
			//设置第一列不参与搜索
			"targets":[0,${index+2}],
			"serchable":false
		}
	],
	"bProcessing": true, //开启读取服务器数据时显示正在加载中……特别是大数据量的时候，开启此功能比较好
	"bServerSide": true,
	"sAjaxSource":"/${objectName}/QueryPage",
	"aoColumns": [ //这个属性下的设置会应用到所有列，按顺序没有是空
		//{"sDefaultContent": '', "sClass": "action"},//sClass 表示给本列加class
		{"sDefaultContent": ''},
		{"mData": 'id'},
<#list entityList as entity>
	<#if entity.isShow?ends_with("Y")>
		{"mData": '${entity.keyName}'},
	</#if>
</#list>
		{"sDefaultContent": ''} // sDefaultContent 如果这一列不需要填充数据用这个属性，值可以不写，起占位作用
	],
	"fnServerData":retrieveData,
	"fnRowCallback": fnRowCallback
});
//给搜索按钮绑定点击事件
$(document).on("click","#search",function(){
	//自己定义的搜索框，可以是时间控件，或者checkbox 等等
	var data = {title:$('#Title').val()};
	var logmin = $('#logmin').val();
	var logmax = $('#logmax').val();
	if(!empty(logmin) && !empty(logmax)){
		data.updateTime = get_unix_time(logmin)+","+get_unix_time(logmax);
	}
	//用空格隔开，达到多条件搜索的效果，相当于两个关键字
	$('.table-sort').DataTable().search( JSON.stringify(data) ).draw();
	//table.search(args1+" "+args2).draw(false);//保留分页，排序状态
});
// 当创建了行，但还未绘制到屏幕上的时候调用，通常用于改变行的
function fnRowCallback(nRow, aData, iDisplayIndex) {
	$(nRow).addClass('text-c');
	$('td:eq(0)', nRow).html("<input type='checkbox' value='"+aData.id+"' name='del'>");
	$('td:eq(1)', nRow).html(iDisplayIndex+1);
	/**
	$('td:eq(8)', nRow).addClass("td-status");
	if (aData.status == 'Drafts') {
		$('td:eq(8)', nRow).html("<span class='label label-success radius'>草稿</span>");
	} else if (aData.status == 'Released') {
		$('td:eq(8)', nRow).html("<span class='label label-success radius'>已发布</span>");
	} else if (aData.status == 'WaitingAudit') {
		$('td:eq(8)', nRow).html("<span class='label label-success radius'>等待审核</span>");
	} else {
		$('td:eq(8)', nRow).html("<span class='label label-success radius'>显示</span>");
	}**/
    var editHtml = "<a style='text-decoration:none' class='ml-5' onClick=${objectName?uncap_first}_edit('修改','${objectName}-add.html','"+aData.id+"') href='javascript:;' title='编辑'><i class='Hui-iconfont'>&#xe6df;</i></a>"
	var deleteHtml = "<a style='text-decoration:none' class='ml-5' onClick=${objectName?uncap_first}_del(this,'"+aData.id+"') href='javascript:;' title='删除'><i class='Hui-iconfont'>&#xe6e2;</i></a>";
    $('td:eq(${index+2})', nRow).html(editHtml+deleteHtml);
	return nRow;
}
function retrieveData( sSource, aoData, fnCallback ) {
	//将客户名称加入参数数组
	$.ajax( {
		type: "POST",
		contentType: "application/x-www-form-urlencoded",
		url: sSource,
		dataType: "json",
		data: aoData, //以json格式传递
		success: function(resp) {
			if (resp.rtnCode != "0000000"){
				console.log("返回失败", resp);
				layer.msg(resp.msg,{icon: 5,time:2000});
			}else {
				console.log("返回成功", resp);
				var bizData = resp.bizData;
				var data = {
					"sEcho":bizData.userdata.sEcho,
					"iTotalRecords":bizData.records,
					"iTotalDisplayRecords":bizData.records,
					"aaData":bizData.rows
				};
				fnCallback(data); //服务器端返回的对象的returnObject部分是要求的格式
			}
		},
		error : function(data) {
			console.log("返回失败", data);
			layer.msg(data.msg,{icon: 5,time:2000});
			$("table tbody").html('<tr class="text-c"><td colspan="10">'+data.msg+'...</td></tr>');
		}
	});
}

function ${objectName?uncap_first}_show(title,url,id,w,h){
    layer_show(title,url+"?id="+id,w,h);
}

/*资讯-添加*/
function ${objectName?uncap_first}_add(title,url,w,h){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*资讯-编辑*/
function ${objectName?uncap_first}_edit(title,url,id,w,h){
	var index = layer.open({
		type: 2,
		title: title,
		content: url+"?id="+id
	});
	layer.full(index);
}
/*资讯-删除*/
function ${objectName?uncap_first}_del(obj,id){
	layer.confirm('确认要删除吗？',function(index){
		var url = "/${objectName}/Remove";
		var data = {id:id};
		var successFun = function (data) {
			if(data.bizData){
				$(obj).parents("tr").remove();
				layer.msg('已删除!',{icon: 6,time:2000});
			}else{
				layer.msg('删除失败!',{icon: 5,time:2000});
			}
		}
		ajaxPostFun(url, data, successFun, null, "通过ID删除信息");
	});
}

function deleteInfoByID(param, successFun){
	var url = "/${objectName}/Removes";
	ajaxPostFun(url, param, successFun, null, "通过ID批量删除信息");
}

/*资讯-审核*/
function ${objectName?uncap_first}_shenhe(obj,id){
	layer.confirm('审核文章？', {
		btn: ['通过','不通过','取消'],
		shade: false,
		closeBtn: 0
	},
	function(){
		$(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="article_start(this,id)" href="javascript:;" title="申请上线">申请上线</a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
		$(obj).remove();
		layer.msg('已发布', {icon:6,time:1000});
	},
	function(){
		$(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="article_shenqing(this,id)" href="javascript:;" title="申请上线">申请上线</a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-danger radius">未通过</span>');
		$(obj).remove();
    	layer.msg('未通过', {icon:5,time:1000});
	});
}
/*资讯-下架*/
function ${objectName?uncap_first}_stop(obj,id){
	layer.confirm('确认要下架吗？',function(index){
		$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="article_start(this,id)" href="javascript:;" title="发布"><i class="Hui-iconfont">&#xe603;</i></a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已下架</span>');
		$(obj).remove();
		layer.msg('已下架!',{icon: 5,time:1000});
	});
}

/*资讯-发布*/
function ${objectName?uncap_first}_start(obj,id){
	layer.confirm('确认要发布吗？',function(index){
		$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="article_stop(this,id)" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
		$(obj).remove();
		layer.msg('已发布!',{icon: 6,time:1000});
	});
}
/*资讯-申请上线*/
function ${objectName?uncap_first}_shenqing(obj,id){
	$(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">待审核</span>');
	$(obj).parents("tr").find(".td-manage").html("");
	layer.msg('已提交申请，耐心等待审核!', {icon: 1,time:2000});
}

</script> 
</body>
</html>