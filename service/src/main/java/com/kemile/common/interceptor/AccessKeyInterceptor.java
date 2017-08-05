package com.kemile.common.interceptor;

import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.common.utils.Ehcache;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by yongrong on 16/3/17.
 */
public class AccessKeyInterceptor extends HandlerInterceptorAdapter {

    private String accessKeyParameterName="accessKey";
    private List<String> defaultAccessAllowedFrom = null;
    private List<String> noDefaultAccessAllowedUrl = null;
    //请求处理之前调用  
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //得到当前路径
        String URI = request.getRequestURI();
        if(URI.endsWith(".html")){
            return true;
        }

        String Origin = request.getHeader("Origin");
        if (Origin==null){
            return true;
        }
        for(String s : defaultAccessAllowedFrom) {
            if(Origin.contains(s)){
                response.setHeader("Access-Control-Allow-Credentials", "true");
                response.setHeader("Access-Control-Allow-Origin", s);
                response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
                break;
            }
        }

        if (noDefaultAccessAllowedUrl!=null){
            for(String s : noDefaultAccessAllowedUrl) {
            //    if(s.contentEquals(URI)){
                // URI = http://www.degeng.com//ordermanage/addorder
                // s = /ordermanage/addorder#user
                if(URI.contains(s.split("#")[0])){
                    if (s.contains("#user")){
                        Object userObject = Ehcache.getUserEhcache(request.getParameter("Token"));
                        if (userObject==null){
                            throw new BizException(BizExceptionEnum.AUTHFAILURE.getCode(),BizExceptionEnum.AUTHFAILURE.getDesc());
                        }
                    }
                    if (s.contains("#teacher")){
                        Object teacherObject = Ehcache.getTeacherEhcache(request.getParameter("Token"));
                        if (teacherObject==null){
                            throw new BizException(BizExceptionEnum.AUTHFAILURE.getCode(),BizExceptionEnum.AUTHFAILURE.getDesc());
                        }
                    }
                }
            }
        }
        return true;
    }

    public List<String> getDefaultAccessAllowedFrom() {
        return defaultAccessAllowedFrom;
    }

    public void setDefaultAccessAllowedFrom(List<String> defaultAccessAllowedFrom) {
        this.defaultAccessAllowedFrom = defaultAccessAllowedFrom;
    }

    public String getAccessKeyParameterName() {
        return accessKeyParameterName;
    }

    public void setAccessKeyParameterName(String accessKeyParameterName) {
        this.accessKeyParameterName = accessKeyParameterName;
    }

    public List<String> getNoDefaultAccessAllowedUrl() {
        return noDefaultAccessAllowedUrl;
    }

    public void setNoDefaultAccessAllowedUrl(List<String> noDefaultAccessAllowedUrl) {
        this.noDefaultAccessAllowedUrl = noDefaultAccessAllowedUrl;
    }
}
