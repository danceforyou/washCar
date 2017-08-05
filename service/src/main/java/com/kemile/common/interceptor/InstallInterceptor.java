package com.kemile.common.interceptor;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class InstallInterceptor extends HandlerInterceptorAdapter { // 继承HandlerInterceptorAdapter类
	
	private static final Logger log = LoggerFactory.getLogger(InstallInterceptor.class);
	
	/**
	 * 重写 preHandle()方法，在业务处理器处理请求之前对该请求进行拦截处理
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, 
			HttpServletResponse response, Object handler) throws Exception {  
		//得到当前路径
        String URI = request.getRequestURI();
        if(URI.endsWith(".html")){
			return true;
		}
		if(URI.endsWith("Install/index")){
			return true;
		}
		File file = new File(request.getContextPath()+"/WebRoot/setup/db/db.sql");
		if(file.exists()){
			return true;
		}else {
			response.sendRedirect(request.getContextPath()+"/Install/step1.html");
			return false;
		}
    }
	/** 
     * 在业务处理器处理请求执行完成后,生成视图之前执行的动作    
     * 可在modelAndView中加入数据，比如当前时间 
     */  
    @Override
    public void postHandle(HttpServletRequest request,    
            HttpServletResponse response, Object handler,    
            ModelAndView modelAndView) throws Exception {     
        log.info("==============执行顺序: 2、postHandle================");
        if(modelAndView != null){  //加入当前时间
            modelAndView.addObject("var", "测试postHandle");    
        }    
    }
    
    /**  
     * 在DispatcherServlet完全处理完请求后被调用,可用于清理资源等   
     * 当有拦截器抛出异常时,会从当前拦截器往回执行所有的拦截器的afterCompletion()  
     */    
    @Override
    public void afterCompletion(HttpServletRequest request,    
            HttpServletResponse response, Object handler, Exception ex)    
            throws Exception {    
        log.info("==============执行顺序: 3、afterCompletion================");    
    }
}
