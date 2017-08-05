<!--_meta 作为公共模版分离出去-->
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<LINK rel="Bookmark" href="/favicon.ico" >
<LINK rel="Shortcut Icon" href="/favicon.ico" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="lib/Hui-iconfont/1.0.1/iconfont.css" />
<link rel="stylesheet" type="text/css" href="lib/icheck/icheck.css" />
<link rel="stylesheet" type="text/css" href="lib/webuploader/0.1.5/webuploader.css"/>
<link rel="stylesheet" type="text/css" href="skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->

<title>新增${objectName} - ${objectName}管理</title>
</head>
<body>
<article class="page-container">
	<form class="form form-horizontal" id="form-article-add" action="/${objectName}/SaveOrUpdate" method="post">
		<input type="hidden" id="id" name="id" value="" />
		<input type="hidden" id="status" name="status" value="WaitingAudit" />
<#list entityList as entity>
	<#if entity.readonly?ends_with("Y")>
		<#if entity.keyType?ends_with("String")>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>${entity.keyNote}：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<input type="text" class="input-text" value="${entity.defaultVal}" placeholder="" id="${entity.keyName}" name="${entity.keyName}">
			</div>
		</div>
		</#if>
		<#if entity.keyType?ends_with("Simditor")>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2">${entity.keyNote}：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<textarea id="${entity.keyName}" name="${entity.keyName}" style="width:100%;height:400px;"></textarea>
			</div>
		</div>
		</#if>
		<#if entity.keyType?ends_with("Integer")>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>${entity.keyNote}：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<input type="text" class="input-text" value="${entity.defaultVal}" placeholder="" id="${entity.keyName}" name="${entity.keyName}">
			</div>
		</div>
		</#if>
		<#if entity.keyType?ends_with("java.util.Date")>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2">${entity.keyNote}：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<input name="${entity.keyName}" type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'%y-%M-%d\'}'})" id="${entity.keyName}" class="input-text Wdate">
			</div>
		</div>
		</#if>
		<#if entity.keyType?ends_with("java.io.File")>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2">${entity.keyNote}：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<div class="uploader-thum-container">
					<div id="fileList" class="uploader-list"></div>
					<div id="filePicker">选择图片</div>
				</div>
			</div>
		</div>
		</#if>
		<#if entity.keyType?ends_with("Select")>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>${entity.keyNote}：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<span class="select-box">
					<select id="${entity.keyName}" name="${entity.keyName}" class="select">
						<option value="0">全部</option>
					</select>
				</span>
			</div>
		</div>
		</#if>
		<#if entity.keyType?ends_with("textarea")>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2">${entity.keyNote}：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<textarea id="${entity.keyName}" name="${entity.keyName}" class="textarea"  placeholder="说点什么...最少输入10个字符" datatype="*10-100" dragonfly="true" nullmsg="备注不能为空！" onKeyUp="textarealength(this,200)"></textarea>
				<p class="textarea-numberbar"><em class="textarea-length">0</em>/200</p>
			</div>
		</div>
		</#if>
	</#if>
</#list>
		<div class="row cl">
			<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-2">
				<button class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存并提交审核</button>
				<button onClick="article_save();" class="btn btn-secondary radius" type="button"><i class="Hui-iconfont">&#xe632;</i> 保存草稿</button>
				<button onClick="removeIframe();" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
			</div>
		</div>
	</form>
</article>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="lib/layer/2.1/layer.js"></script> 
<script type="text/javascript" src="lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="lib/jquery.validation/1.14.0/jquery.validate.min.js"></script> 
<script type="text/javascript" src="lib/jquery.validation/1.14.0/validate-methods.js"></script> 
<script type="text/javascript" src="lib/jquery.validation/1.14.0/messages_zh.min.js"></script> 
<script type="text/javascript" src="js/H-ui.js"></script>
<script type="text/javascript" src="js/H-ui.admin.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<!--/_footer /作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<#list entityList as entity>
	<#if entity.keyType?ends_with("java.util.Date")>
<script type="text/javascript" src="lib/My97DatePicker/WdatePicker.js"></script>
	</#if>
	<#if entity.keyType?ends_with("java.io.File")>
<script type="text/javascript" src="lib/webuploader/0.1.5/webuploader.min.js"></script>
<script type="text/javascript" src="js/uploader.js"></script>
<script>
    function uploaderSuccess(results){
        $('#${entity.keyName}').val(results.bizData);
    }
</script>
	</#if>
	<#if entity.keyType?ends_with("Simditor")>
<link rel="stylesheet" type="text/css" href="lib/simditor-1.0.5/styles/font-awesome.css" />
<link rel="stylesheet" type="text/css" href="lib/simditor-1.0.5/styles/simditor.css" />
<script type="text/javascript" src="lib/simditor-1.0.5/scripts/js/simditor-all.js"></script>
<script type="text/javascript">
	function InitializeEditor(){
		var editor = new Simditor({
			textarea: $('#${entity.keyName}'),
			defaultImage: 'lib/simditor-1.0.5/images/image.png',
			upload:{
				url: '/FileUpload/ManifestUpload',
				params: null,
				fileKey: 'file',
				connectionCount: 3,
				leaveConfirm: '上传过程中,你确定要离开此页吗?'
			},
			pasteImage:true
		});
	}
	setTimeout("InitializeEditor()",1000);
</script>
	</#if>
</#list>

<script type="text/javascript">
	/**
	 * 多选按钮的时候用到次方法
	$(function(){
		$('.skin-minimal input').iCheck({
			checkboxClass: 'icheckbox-blue',
			radioClass: 'iradio-blue',
			increaseArea: '20%'
		});
	});
	**/
</script>
<script>
	var id = $.getUrlParam("id");
	if (!empty(id)){
		InitializeData(id);
	}
	function InitializeData(_id){
		var url = "/${objectName}/FindById/"+_id;
		var data = null;
		var successFun = function(data){
			var bizData = data.bizData;
			$("#id").val(bizData.id);
	<#list entityList as entity>
		<#if entity.readonly?ends_with("Y")>
			<#if entity.keyType?ends_with("java.io.File")>
            uploader_fileName = "${entity.keyName}";
			var html = '<div class="item" style="float: left;margin-right: 10px;margin-bottom: 10px;">' +
					'<input type="hidden" name="${entity.keyName}" value="'+bizData.${entity.keyName}+'">'+
					'<div class="pic-box"><img style="width:100px;height:100px;" src="'+bizData.${entity.keyName}+'"></div>'+
					'</div>';
            $("#${entity.keyName}").html(html);
			</#if>
			<#if entity.keyType?ends_with("textarea")>
            $("#${entity.keyName}").html(bizData.${entity.keyName});
			</#if>
			<#if entity.keyType?ends_with("String")>
            $("#${entity.keyName}").val(bizData.${entity.keyName});
			</#if>
			<#if entity.keyType?ends_with("Simditor")>
            $("#${entity.keyName}").val(bizData.${entity.keyName});
			</#if>
			<#if entity.keyType?ends_with("Integer")>
            $("#${entity.keyName}").val(bizData.${entity.keyName});
			</#if>
			<#if entity.keyType?ends_with("java.util.Date")>
            $("#${entity.keyName}").val(bizData.${entity.keyName});
			</#if>
			<#if entity.keyType?ends_with("Select")>
            $("#${entity.keyName}").val(bizData.${entity.keyName});
			</#if>
			<#if entity.keyType?ends_with("textarea")>
            $("#${entity.keyName}").html(bizData.${entity.keyName});
			</#if>
		</#if>
	</#list>
/**
			if(!empty(bizData.allowreply)){
				$('.skin-minimal input').iCheck('check');
			}
 **/
		}
		ajaxPostFun(url, data, successFun, null, "通过ID获取详情信息");
	}

	$(document).ready(function(){
		$('#form-article-add').bind('submit', function(){
			$('#status').val("WaitingAudit");
			ajaxSubmit(this, function(data){
				console.log("返回", data);
				if(data.rtnCode=="0000000"){
					$('#id').val(data.bizData.id);
					layer.msg("保存并发布成功!",{icon: 6,time:2000});
				}else{
					layer.msg(data.msg,{icon: 5,time:2000});
				}
			});
			return false;
		});
	});
	function article_save(){
		$('#status').val("Drafts");
		var frm = $('#form-article-add')[0];
		ajaxSubmit(frm, function(data){
			console.log("返回", data);
			if(data.rtnCode=="0000000"){
				$('#id').val(data.bizData.id);
				layer.msg("保存草稿成功!",{icon: 6,time:2000});
			}else{
				layer.msg(data.msg,{icon: 5,time:2000});
			}
		})
	}
</script>

<!--/请在上方写此页面业务相关的脚本-->
</body>
</html>