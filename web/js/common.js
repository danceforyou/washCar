var basePath = "http://localhost:8080/";
var imageShowPath = "http://101.200.120.239/group1/";
var TOKEN = "TOKEN";
var bbsUrl = "http://123.57.31.180:8081/";
/**
 * 获取 cookie
 * @param c_name
 * @returns {string}
 */
function getCookie(c_name){
	if (document.cookie.length>0){　　//先查询cookie是否为空，为空就return ""
		c_start=document.cookie.indexOf(c_name + "=")　　//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
		if (c_start!=-1){
			c_start=c_start + c_name.length+1　　//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
			c_end=document.cookie.indexOf(";",c_start)　　//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))　　//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
		}
	}
	return ""
}
/**
 * 设置 cookie
 * 使用方法：setCookie('username','Darren',30)
 * @param c_name
 * @param value
 * @param expiredays
 */
function setCookie(c_name, value, expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

//格式化文件大小
function getFormetFileSize(size) {
	var fileSizeString = "";
	if(empty(size)){
		fileSizeString = '0B';
		return fileSizeString;
	}
	var intsize = parseInt(size);
	if (intsize < 1024) {
		fileSizeString = intsize.toFixed(2) + "B";
	} else if (intsize < 1048576) {
		fileSizeString = ( intsize / 1024).toFixed(2) + "K";
	} else if (intsize < 1073741824) {
		fileSizeString = ( intsize / 1048576).toFixed(2) + "M";
	} else {
		fileSizeString = ( intsize / 1073741824).toFixed(2) + "G";
	}
	return fileSizeString;
}

function treeFormat(nodes){
		var treeArrs = new Array();
		for(var i=0;i<nodes.length;i++){
			var item = nodes[i];
		    for(j=0;j<nodes.length;j++){
			var item2 = nodes[j];
				if(j==i){
					treeArrs.push(item);
					break;
				}
				if(item.pId== 0 || item.pId==item2.id ){//根节点
					treeArrs.push(item);
					break;
				}
			}
			
		}
		return treeArrs;
	}

//判断浏览器类型
function myBrowser(){
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		var isOpera = userAgent.indexOf("Opera") > -1;
		 if (isOpera) {
			 return "Opera"
		 }; //判断是否Opera浏览器
		if (userAgent.indexOf("Firefox") > -1) {
			 return "FF";
		 } //判断是否Firefox浏览器
		if (userAgent.indexOf("Chrome") > -1){
		   return "Chrome";
		  }
		 if (userAgent.indexOf("Safari") > -1) {
			 return "Safari";
		 } //判断是否Safari浏览器
		if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
			 return "IE";
		 }; //判断是否IE浏览器
	}


var timeLength = function(param) {
	param += "";
	return param.length === 2 ? param : "0" + param;
};

//创建连接
function createLink(key,datalist){
        var link = "";
        var length = datalist.length;
        for(var i=0;i<length;i++){
            if(i == length - 1){
                link += key+"="+datalist[i];
            }else{
                link += key+"="+datalist[i]+"&";
            }
        }
        return link;
    }

var timeDay = {
	"0" : "星期天",
	"1" : "星期一",
	"2" : "星期二",
	"3" : "星期三",
	"4" : "星期四",
	"5" : "星期五",
	"6" : "星期六"
};

// 将时间戳改成年月日时分秒·
var timeFormat = function(ms, showDay) {

	if (typeof ms == 'string') {
		ms = parseInt(ms);
	}
	var timeLocal = new Date(ms);
	var year = timeLocal.getYear() + 1900;
	var month = timeLength(timeLocal.getMonth() + 1);
	var day = timeLength(timeLocal.getDate());
	var hour = timeLength(timeLocal.getHours());
	var minutes = timeLength(timeLocal.getMinutes());
	var second = timeLength(timeLocal.getSeconds());
	//var weekDay = timeDay[timeLocal.getDay()];
	if (showDay == null) {
		var timeNew = year + "-" + month + "-" + day;
	} else if (!showDay) {
		var timeNew = year + "-" + month + "-" + day + " " + hour + ":"
				+ minutes + ":" + second;
	} else {
		var timeNew = year + "-" + month + "-" + day + " " + hour + ":"
			+ minutes + ":" + second;
		//var timeNew = year + "-" + month + "-" + day + " " + hour + ":"
		//		+ minutes + ":" + second + " " + weekDay;
	}
	return timeNew;
};

// 将时间戳改成年月日时分秒·
var dates = function(format,ms) {
	if ( typeof ms == 'string') {
		ms = parseInt(ms);
	}
	var timeLocal = new Date(ms);
	var year = timeLocal.getFullYear();
	var month = timeLength(timeLocal.getMonth() + 1);
	var day = timeLength(timeLocal.getDate());
	var hour = timeLength(timeLocal.getHours());
	var minutes = timeLength(timeLocal.getMinutes());
	var second = timeLength(timeLocal.getSeconds());
	return format.replace("Y",year).replace("m",month).replace("d",day).replace("H",hour).replace("i",minutes).replace("s",second);
};

var omitFileName = function(name, end){
	if(name.length>end){
		name = name.substring(0,end)+"..."+name.substring(name.lastIndexOf('.'),name.length);
	}
	return name;
}


// 统一的post查询接口
var ajaxPostFun = function(url, data, successFun, errorFun, str) {
	var token = getCookie(TOKEN);
	if(empty(data)){
		data = {};
	}
	if(!empty(token)){
		data["Token"] = token;
	}
	if(url.indexOf(basePath) < 0){
		url = basePath+url;
	}
	$.ajax({
		url : url,
		type : "post",
		dataType : "json",
		xhrFields : {
			withCredentials : true
		},
		data : data || {},
		success : function(data) {
			if (data.rtnCode != "0000000") {
				if(data.rtnCode == "0006666"){//授权登陆失效,请重新登陆
					window.location.href="login.html";
				}else if (errorFun) {
					errorFun(data);
				}else{
					layer.msg(data.msg,{icon: 5,time:1000});
				}
			} else {
				console.log(str + "返回成功", data);
				successFun(data);
			}
		},
		error : function(data) {
			console.log(str + "返回失败", data);
			
			if (errorFun) {
				errorFun(data);
			}else{
				layer.msg(data.status+":"+data.statusText,{icon: 5,time:1000});
			}
		}
	})
};

// 统一的get查询接口
var ajaxGetFun = function(url, data, successFun, errorFun, str) {
	var token = getCookie(TOKEN);
	if(empty(data)){
		data = {};
	}
	if(!empty(token)){
		data["Token"] = token;
	}
	if(url.indexOf(basePath) < 0){
		url = basePath+url;
	}
	$.ajax({
		url : url,
		type : "get",
		dataType : "json",
		xhrFields : {
			withCredentials : true
		},
		data : data || {},
		success : function(data) {
			if (data.rtnCode != "0000000") {
				if(data.rtnCode == "0006666"){//授权登陆失效,请重新登陆
					window.location.href="login.html";
				}else if (errorFun) {
					errorFun(data);
				}else{
					layer.msg(data.msg,{icon: 5,time:1000});
				}
			} else {
				console.log(str + "返回成功", data);
				successFun(data);
			}
		},
		error : function(data) {
			console.log(str + "返回失败", data);
			if (errorFun) {
				errorFun(data);
			}else{
				layer.msg(data.status+":"+data.statusText,{icon: 5,time:1000});
			}
		}
	})
};

// 统一的get查询接口，不登录过滤
var ajaxGetesFun = function(url, data, successFun, errorFun, str) {
	var token = getCookie(TOKEN);
	if(empty(data)){
		data = {};
	}
	if(!empty(token)){
		data["Token"] = token;
	}
	$.ajax({
		url : basePath+url,
		type : "get",
		dataType : "json",
		xhrFields : {
			withCredentials : true
		},
		data : data || {},
		success : function(data) {
			if (data.rtnCode != "0000000") {
				if (errorFun) {
					errorFun(data);
				}else{
					layer.msg(data.msg,{icon: 5,time:1000});
				}
			} else {
				console.log(str + "返回成功", data);
				successFun(data);
			}
		},
		error : function(data) {
			console.log(str + "返回失败", data);
			if (errorFun) {
				errorFun(data);
			}else{
				layer.msg(data.status+":"+data.statusText,{icon: 5,time:1000});
			}
		}
	})
};

function datadel(){
	var ids = '';
	var obj = document.getElementsByName('del');
	var c_obj = new Array();
	for(var j=0;j<obj.length;j++){
		if (obj[j].checked) {
			//obj[j].checked = false;
			c_obj.push(obj[j]);
			if(ids==''){
				ids = obj[j].value;
			}else{
				ids += ','+obj[j].value;
			}
		}
	}
	layer.confirm('确认要删除吗？',function(index){
		//此处请求后台程序，下方是成功后的前台处理……
		deletManagesByID({'ids':ids}, function(data){
			for(var i=0;i<c_obj.length;i++){
				$(c_obj[i]).parents("tr").remove();
			}
			layer.msg('已删除'+data.bizData+'条数据!',{icon:1,time:1000});
		});
	});
}

/*弹出层*/
/*
 参数解释：
 title	标题
 url		请求的url
 id		需要操作的数据id
 w		弹出层宽度（缺省调默认值）
 h		弹出层高度（缺省调默认值）
 */
function layer_show(title,url,w,h){
	if (title == null || title == '') {
		title=false;
	};
	if (url == null || url == '') {
		url="404.html";
	};
	if (w == null || w == '') {
		w=800;
	};
	if (h == null || h == '') {
		h=($(window).height() - 50);
	};
	layer.open({
		type: 2,
		area: [w+'px', h +'px'],
		fix: false, //不固定
		maxmin: true,
		shade:0.4,
		title: title,
		content: url
	});
}
/*关闭弹出框口*/
function layer_close(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}

/*
 * ajaxSubmit方法第一个参数，是要提交的form， 第二个参数是ajax调用成功后的处理函数。
 * 将form的action传递给ajax的url，form的method传递给ajax的type， 再将格式化后的表单内容传递给data。
 * getFormJson方法将form的元素转化为json格式键值对。
 * 形如：{name:'aaa',password:'tttt'}，注意将同名的放在一个数组里。
 */

// 将form转为AJAX提交
function ajaxSubmit(frm, fn) {
	var dataPara = getFormJson(frm);
	$.ajax({
		url : frm.action,
		type : frm.method,
		data : dataPara,
		dataType : "json",
		async: false,
		success : fn
	});
}

// 将form中的值转换为键值对。
function getFormJson(frm) {
	var o = {};
	var a = $(frm).serializeArray();
	$.each(a, function() {
		if (this.name == "password") {
			this.value = $.md5(this.value)
		}
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

// js中String添加replaceAll 方法
String.prototype.replaceAll = function(a, b) {
	console.log("this=", this);
	var reg = new RegExp(a, "g");
	return this.replace(reg, b);
};

/**
 * 获取页面传递get参数
 * @param LocString url路径
 * @param str 查找字符串
 * @returns
 */
function getQueryStr(LocString,str) {
	var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
	if (tmp = rs) {
		return tmp[2];
	}
	return '';
} 

(function($){
	$.getUrlParam = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) return unescape(r[2]); return null;
	};
})(jQuery);

/**
 * 判断变量是否空值undefined, null, '', false, 0, [], {} 均返回true，否则返回false
 * @param v
 * @returns {Boolean}
 */
function empty(v){
	switch (typeof v){
		case 'undefined' : return true;
		case 'string' : if(v.length == 0) return true; break;
		case 'boolean' : if(!v) return true; break;
		case 'number' : if(0 === v) return true; break;
		case 'object' :
			if(null === v) return true;
			if(undefined !== v.length && v.length==0) return true;
			for(var k in v){return false;} return true;
			break;
	}
	return false;
}

//绘制模板方法
var drawTemplate = function (DomId, successCallBack) {
	var Dom = $("div[id=" + DomId + "]");
	console.log(Dom);
	if (!Dom) {
		alert("Dom不存在");
	}
	else {
		$.ajax({
			url: $(Dom).attr("include"),
			success: function (res) {
				if (!$(Dom).attr("data")) {
					var text = _.template(res);
				} else {
					var text = _.template(res)($_scope[$(Dom).attr("data")]);
					//_.template("Using 'with': <%= data.answer %>", {variable: 'data'})({answer: 'no'});
				}
				$(Dom).html(text);
				//console.log($('#selectClass'));
				//console.log(successCallBack);
				if (successCallBack) {
					successCallBack();
				}
			},
			error: function (res) {
				console.log(DomId + "模板绘制失败");
			}
		})
	}
};
/**
 *  加载头部导航
 */
drawTemplate("header");
drawTemplate("header-nav");
drawTemplate("foot");



/**
 * jQuery MD5 hash algorithm function
 * 
 * <code>
 * 		Calculate the md5 hash of a String 
 * 		String $.md5 ( String str )
 * 	</code>
 * 
 * Calculates the MD5 hash of str using the Â» RSA Data Security, Inc. MD5
 * Message-Digest Algorithm, and returns that hash. MD5 (Message-Digest
 * algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash
 * value. MD5 has been employed in a wide variety of security applications, and
 * is also commonly used to check the integrity of data. The generated hash is
 * also non-reversable. Data cannot be retrieved from the message digest, the
 * digest uniquely identifies the data. MD5 was developed by Professor Ronald L.
 * Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster
 * implementation than SHA-1. This script is used to process a variable length
 * message into a fixed-length output of 128 bits using the MD5 algorithm. It is
 * fully compatible with UTF-8 encoding. It is very useful when u want to
 * transfer encrypted passwords over the internet. If you plan using UTF-8
 * encoding in your project don't forget to set the page encoding to UTF-8
 * (Content-Type meta tag). This function orginally get from the WebToolkit and
 * rewrite for using as the jQuery plugin.
 * 
 * Example Code <code>
 * 			$.md5("I'm Persian."); 
 * 		</code> Result <code>
 * 			"b8c901d0f02223f9761016cfff9d68df"
 * 		</code>
 * 
 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
 * @link http://www.semnanweb.com/jquery-plugin/md5.html
 * @see http://www.webtoolkit.info/
 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
 * @param {jQuery}
 *            {md5:function(string))
 * @return string
 */

(function($) {

	var rotateLeft = function(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}

	var addUnsigned = function(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if (lX4 & lY4)
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		if (lX4 | lY4) {
			if (lResult & 0x40000000)
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			else
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}

	var F = function(x, y, z) {
		return (x & y) | ((~x) & z);
	}

	var G = function(x, y, z) {
		return (x & z) | (y & (~z));
	}

	var H = function(x, y, z) {
		return (x ^ y ^ z);
	}

	var I = function(x, y, z) {
		return (y ^ (x | (~z)));
	}

	var FF = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};

	var GG = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};

	var HH = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};

	var II = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};

	var convertToWordArray = function(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWordsTempOne = lMessageLength + 8;
		var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
		var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string
					.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount]
				| (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};

	var wordToHex = function(lValue) {
		var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValueTemp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue
					+ WordToHexValueTemp.substr(WordToHexValueTemp.length - 2,
							2);
		}
		return WordToHexValue;
	};

	var uTF8Encode = function(string) {
		string = string.replace(/\x0d\x0a/g, "\x0a");
		var output = "";
		for ( var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				output += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				output += String.fromCharCode((c >> 6) | 192);
				output += String.fromCharCode((c & 63) | 128);
			} else {
				output += String.fromCharCode((c >> 12) | 224);
				output += String.fromCharCode(((c >> 6) & 63) | 128);
				output += String.fromCharCode((c & 63) | 128);
			}
		}
		return output;
	};

	$.extend({
		md5 : function(string) {
			var x = Array();
			var k, AA, BB, CC, DD, a, b, c, d;
			var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
			var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
			var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
			var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
			string = uTF8Encode(string);
			x = convertToWordArray(string);
			a = 0x67452301;
			b = 0xEFCDAB89;
			c = 0x98BADCFE;
			d = 0x10325476;
			for (k = 0; k < x.length; k += 16) {
				AA = a;
				BB = b;
				CC = c;
				DD = d;
				a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
				d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
				c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
				b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
				a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
				d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
				c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
				b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
				a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
				d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
				c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
				b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
				a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
				d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
				c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
				b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
				a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
				d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
				c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
				b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
				a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
				d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
				c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
				b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
				a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
				d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
				c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
				b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
				a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
				d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
				c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
				b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
				a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
				d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
				c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
				b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
				a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
				d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
				c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
				b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
				a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
				d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
				c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
				b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
				a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
				d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
				c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
				b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
				a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
				d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
				c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
				b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
				a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
				d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
				c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
				b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
				a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
				d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
				c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
				b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
				a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
				d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
				c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
				b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
				a = addUnsigned(a, AA);
				b = addUnsigned(b, BB);
				c = addUnsigned(c, CC);
				d = addUnsigned(d, DD);
			}
			var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c)
					+ wordToHex(d);
			return tempValue.toLowerCase();
		}
	});
})(jQuery);