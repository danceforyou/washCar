package com.kemile.common.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.UnknownHostException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kemile.common.utils.Global;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.kemile.common.utils.OSUtils;
import com.kemile.management.domain.Manages;

@Controller
@RequestMapping(value="/admin/")
public class AdminInterceptController {
	
	private static Manages manages = null;

	@Autowired
	HttpSession session;

	@RequestMapping(value="{url}.html")
	public ModelAndView interceptIllegalOperation(@PathVariable(value = "url") String url,
												  HttpServletResponse response) throws IOException{
		manages = (Manages) session.getAttribute(Global.QR_MANAGER);
		if(manages==null && !url.equals("login")){
			PrintWriter out = response.getWriter();
			String js = "<script language=JavaScript>";
			js += "parent.parent.location.href='login.html';";
			js += "</script>";
			out.print(js);
			out.flush();
			out.close();
			//return new ModelAndView("login");
		}
		return new ModelAndView(url);
	}
	
	@ResponseBody
	@RequestMapping(value="ServerInfo")
	public Map<String, Object> serverInfo(HttpServletRequest request){
		Map<String, Object> ServerInfo = new HashMap<String, Object>();
		//服务器域名
		ServerInfo.put("BasePath", request.getScheme() + "://" + request.getServerName());
		// 服务器端口 
		ServerInfo.put("ServerPort", request.getServerPort());
		try {
			//本文件所在文件夹 
			ServerInfo.put("ServerIP", OSUtils.getIpAddress());
		} catch (UnknownHostException e) {
			e.printStackTrace();
			ServerInfo.put("ServerIP", "未识别到IP地址");
		}
		//本文件所在文件夹 
		ServerInfo.put("ProjectPath", request.getSession().getServletContext().getRealPath("/"));
		//服务器操作系统
		ServerInfo.put("OSName", OSUtils.getOSName());
		//当前操作系统用户名称
		ServerInfo.put("OSUserName", OSUtils.getOSUserName());
		ServerInfo.put("SessionID", request.getRequestedSessionId());
		ServerInfo.put("CPUNumber", OSUtils.CPUNumber());
		ServerInfo.put("VmmToteMemory", OSUtils.VmmToteMemory());
		ServerInfo.put("VmmFreeMemory", OSUtils.VmmFreeMemory());
		ServerInfo.put("VmmMaxMemory", OSUtils.VmmMaxMemory());
		
		return ServerInfo;
	}
}
