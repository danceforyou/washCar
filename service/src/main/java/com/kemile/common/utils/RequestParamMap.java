package com.kemile.common.utils;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * 接受页面传入参数的辅助类
 * 
 * @author yongrong
 * 
 */
public class RequestParamMap {

	public static Map<String, Object> getRequestParamMap(HttpServletRequest request) {
		try {
			request.setCharacterEncoding("UTF-8");
			Enumeration<String> e = request.getParameterNames();
			Map<String, Object> map = new HashMap<String, Object>();
			Map<String, Object> oMap = new HashMap<String, Object>();
			while (e.hasMoreElements()) {
				String string = (String) e.nextElement();
				if (request.getParameter(string) != null && !request.getParameter(string).equals("")) {
					//schoolMattersType[color]
					String key = getKey(string);
					if(!key.equals("")){
						String[] arry = request.getParameterValues(string);
						if (arry.length>1) {
							oMap.put(string, arry);
						}else {
							oMap.put(key, request.getParameter(string));
						}
						map.put(string.replace("["+key+"]", ""), oMap);
					}else{
						String[] arry = request.getParameterValues(string);
						if (arry.length>1) {
							map.put(string, arry);
						}else {
							map.put(string, request.getParameter(string));
						}
					}
				}
			}
			return map;
		} catch (Exception e) {
			return new HashMap<String, Object>();
		}
	}
	/**
	 * 获取单键多值的请求参数
	 * @param request
	 * @return
	 */
	public static Map<String, String[]> getRequestParamsMap(HttpServletRequest request) {
		try {
			Enumeration<String> e = request.getParameterNames();
			Map<String,  String[]> map = new HashMap<String,  String[]>();
			while (e.hasMoreElements()) {
				String string = (String) e.nextElement();
				if (request.getParameter(string) != null && !request.getParameter(string).equals("")) {
					map.put(string, request.getParameterValues(string));
				}
			}
			return map;
		} catch (Exception e) {
			return null;
		}
	}
	
	/**
	 * 获取客户端ip
	 * 
	 * @param request
	 * @return
	 */
	public static String getRemortIP(HttpServletRequest request) {
		if (request.getHeader("x-forwarded-for") == null) {
			return request.getRemoteAddr();
		}
		return request.getHeader("x-forwarded-for");
	}
	
	private static String getKey(String Str){
		String subString = "";
		try {
			subString = Str.substring(Str.indexOf("[")+1, Str.indexOf("]"));
			return subString;
		} catch (Exception e) {
//			e.printStackTrace();
			return "";
		}
	}
	
	public static void main(String[] args) {
		String string = "schoolMattersType[color]";
		String key = "color";
		String subString = "";
		try {
			subString = string.replace("["+key+"]", "");
			System.out.println(subString);
		} catch (Exception e) {
//			e.printStackTrace();
			System.out.println("");
		}
	}
}
