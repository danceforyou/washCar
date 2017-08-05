var outstr,count; 
var results,pageIndex=1,pageSize=10,
//初始化 
outstr = ""; 

function getTotalPage(num,pageSize){
	var a = num / pageSize;
	if(num % pageSize > 0){
		return parseInt(a)+1;
	}else{
		return a;
	}
}

function setpage(obj_id,total,cpage,pageSize) 
{
    if(total==0){
        document.getElementById(obj_id).innerHTML="";
        return;
    }
	var totalpage = getTotalPage(total,pageSize);
	var next = cpage + 1 >= totalpage ? totalpage : cpage + 1;
    if(totalpage<=10){        //总页数小于十页
        for (count=1;count<=totalpage;count++) 
        {    
        	if(count!=cpage) 
            { 
                outstr = outstr + "<li><a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a></li>";
            }else{ 
                outstr = outstr + "<li><a class='current' href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a></li>";
            } 
        } 
    } 
    if(totalpage>10){        //总页数大于十页 
        if(parseInt((cpage-1)/10) == 0) 
        {

            outstr = outstr + "<li><a href='javascript:void(0)' style='width: 40px' onclick='gotopage("+(parseInt((cpage-1)<=0 ? 1 :(cpage-1) ))+")'>上一页</a></li>";
            for (count=1;count<=10;count++) 
            {    if(count!=cpage) 
                { 
                    outstr = outstr + "<li><a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a></li>";
                }else{ 
                    outstr = outstr + "<li><a class='current' href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a></li>";
                } 
            } 
            outstr = outstr + "<li><a href='javascript:void(0)' style='width: 40px' onclick='gotopage("+next+")'> 下一页 </a></li>";
        } 
        else if(parseInt((cpage-1)/10) == parseInt(totalpage/10)) 
        {     
            outstr = outstr + "<li><a href='javascript:void(0)' style='width: 40px' onclick='gotopage("+(parseInt((cpage-1)/10)*10)+")'>上一页</a></li>";
            for (count=parseInt(totalpage/10)*10+1;count<=totalpage;count++) 
            {    if(count!=cpage) 
                { 
                    outstr = outstr + "<li><a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a></li>";
                }else{ 
                    outstr = outstr + "<li><a class='current' href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a></li>";
                } 
            } 
        } 
        else 
        {     
            outstr = outstr + "<li href='javascript:void(0)' style='width: 40px' onclick='gotopage("+(parseInt((cpage-1)/10)*10)+")'>上一页</li>";
            for (count=parseInt((cpage-1)/10)*10+1;count<=parseInt((cpage-1)/10)*10+10;count++)
            {         
                if(count!=cpage) 
                { 
                    outstr = outstr + "<li><a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a></li>";
                }else{ 
                    outstr = outstr + "<li><a class='current' href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a></li>";
                } 
            } 
            outstr = outstr + "<li><a href='javascript:void(0)' style='width: 40px' onclick='gotopage("+next+")'> 下一页 </a></li>";
        } 
    }
    var startli="";
    var endli="";
    if(cpage==1){
         startli="<li class='none'>";
    }else{
        startli="<li>";
    }
    if(cpage==totalpage || totalpage==0 ){
        endli="<li class='none'>";
    }else{
        endli="<li>";
    }
    var start=startli+"<a href='javascript:void(0)' style='width: 40px' onclick='gotopage(1)'>首页</a></li>";

    var end=endli+"<a href='javascript:void(0)' style='width: 40px' onclick='gotopage("+(totalpage<=0 ? 1 : totalpage)+")'>尾页</a></li>";
    document.getElementById(obj_id).innerHTML = "<div id='page'>" +start+ outstr +end+ "<\/div>";
    outstr = ""; 
} 
