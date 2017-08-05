    //选项卡封装
    function b_tab(clk,obj,cls){    	
        //clk 点击对象
        //cls 给当前的添加类名
        //obj 对象显示
		obj.css("display","none");
		obj.eq(0).css("display","block");
	    clk.eq(0).addClass(cls);
	    clk.click(function(){
	        var a_index = clk.index(this);
	        obj.each(function(i){
	            if(i==a_index ){
	                obj.eq(i).css("display","block");
	                clk.eq(a_index).addClass(cls).siblings().removeClass(cls);
	            }
	            else{
	                obj.eq(i).css("display","none");
	                clk.eq(a_index).addClass(cls).siblings().removeClass(cls);
	            }
	        })
	    })	

    }

    /*弹框*/    
    function popushow(popuobj,canshu1,canshu2){     
        if(popuobj==".yidongdao"){
            var fid="";
            var fname="";
            if(canshu1==1){
                //列表
                var array=getCheckedBox(1);
                if(!array){
                    return;
                }
                var checkedList=array[1];
                //if(checkedList.length>1){
                //    layer.msg("请选择一个文件夹或文件", {icon: 5, time: 1000});
                //    return false;
                //}
                for(var i=0;i<checkedList.length;i++){
                    if(i==checkedList.length-1){
                        fid+=$(checkedList[i]).val();
                    }else{
                        fid+=$(checkedList[i]).val()+",";
                    }

                }

               // fid=$(checkedList[0]).val();
               // fname=$(checkedList[0]).attr("fname");
            }else{
                // 网格
                var array=getCheckedBox(2);
                var checkedList=array[1];
                for(var i=0;i<checkedList.length;i++){

                    if(i==checkedList.length-1){
                        fid+=$(checkedList[i]).attr("fid");
                    }else{
                        fid+=$(checkedList[i]).attr("fid")+",";
                    }
                }
                //fid=$(checkedList[0]).attr("fid");
                //fname=$(checkedList[0]).attr("fname");
            }
          if(popuobj==".yidongdao"){
                $("#moveFid").val(fid);
                loadDirTreeData();
            }
        }else if(popuobj==".xiugaimingzi"){

            var fid="";
            var fname="";
            if(canshu1==1){
                //列表
                var array=getCheckedBox(1);
                if(!array){
                    return;
                }
                var checkedList=array[1];
                if(checkedList.length>1){
                    layer.msg("请选择一个文件夹或文件", {icon: 5, time: 1000});
                    return false;
                }
                fid=$(checkedList[0]).val();
                fname=$(checkedList[0]).attr("fname");
            }else{
                // 网格
                var array=getCheckedBox(2);
                var checkedList=array[1];
                if(checkedList.length>1){
                    layer.msg("请选择一个文件夹或文件", {icon: 5, time: 1000});
                    return false;
                }
                fid=$(checkedList[0]).attr("fid");
                fname=$(checkedList[0]).attr("fname");

            }
            //获得重命名的格式（因为如果是文件夹的话就没有‘.’）
            var filetype=$(checkedList[0]).attr("suffix");
                $("#newFileId").val(fid);
            if(filetype=="adir"){
                //如果是文件夹重命名
                $("#newFileName").val(fname);//去掉文件的后缀
                $("#filehouzhui").val("");
            }else{
                //如果不是文件夹重命名
                $("#newFileName").val(fname.substring(0,fname.indexOf('.')));//去掉文件的后缀
                $("#filehouzhui").val(fname.substring(fname.indexOf('.'),fname.length));
            }



        }


        $(popuobj).fadeIn(100);
        $(".popu_close,.blackbg,.popuclose_btn").bind("click",function(){
             $(popuobj).fadeOut(100);
        })  
        /*位置控制*/
        $(popuobj).find(".popu").css({left:($(window).width()-$(popuobj).find(".popu").width())/2+"px",top:($(window).height()-$(popuobj).find(".popu").height())/2+"px"});   
        $(window).resize(function(){  
        $(popuobj).find(".popu").css({left:($(window).width()-$(popuobj).find(".popu").width())/2+"px",top:($(window).height()-$(popuobj).find(".popu").height())/2+"px"});   
        })       
    }  

    /*宽度自适应 */  
    function winWidth(){
        if($(window).width()>1200){$("#width1200").attr({href:"css/width1200.css"});}else{$("#width1200").attr({href:"css/width1000.css"});}
        if($(window).width()>1200){$("#user_width1200").attr({href:"css/width1200.css"});}else{$("#user_width1200").attr({href:"css/width1000.css"});}
    }
    winWidth();
    $(window).resize(function(){winWidth();});

