package com.kemile.common.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * Created by Michael on 2015/10/15.
 * 操作系统相关的工具类
 */
public class OSUtils {

    /***
     * 获取当前IP地址
     * @return
     * @throws UnknownHostException
     */
    public static String getIpAddress() throws UnknownHostException {
        InetAddress address = InetAddress.getLocalHost();
        return address.getHostAddress();
    }

    /**
     * 获取当操作系统名称
     * @return
     */
    public static String getOSName(){
        return  System.getProperty("os.name")+" "+System.getProperty("os.version");
    }

    /**
     * 获取当前操作系统用户名称
     * @return
     */
    public static String getOSUserName(){
        return System.getProperty("user.name");
    }
    /**
     * CPU个数
     * @return
     */
    public static int CPUNumber(){
    	return Runtime.getRuntime().availableProcessors();
    } 
    /**
     * 虚拟机内存总量
     * @return
     */
    public static long VmmToteMemory(){
    	long tm = Runtime.getRuntime().totalMemory();
    	return (tm/1024)/1024;
    }
    
    /**
     * 虚拟机空闲内存量
     * @return
     */
    public static long VmmFreeMemory(){
    	long tm = Runtime.getRuntime().freeMemory();
    	return (tm/1024)/1024;
    }
    /**
     * 虚拟机使用最大内存量
     * @return
     */
    public static long VmmMaxMemory(){
    	long tm = Runtime.getRuntime().maxMemory();
    	return (tm/1024)/1024;
    }
    
    /**
     * 是否是windows系统
     * @return
     */
    public static boolean isWindows(){
        String os = getOSName();
        if(os!=null && os.startsWith("Windows"))return true;
        return false;
    }
    
    public static String getMACAddress(){
        String address = "";
        String os = System.getProperty("os.name");
//        String osUser=System.getProperty("user.name");
//        String osEncoding = System.getProperty("file.encoding");
        if (os != null && os.startsWith("Windows")) {
            try {
                String command = "cmd.exe /c ipconfig /all";
                Process p = Runtime.getRuntime().exec(command);
                BufferedReader br =new BufferedReader(new InputStreamReader(p.getInputStream()));
                String line;
                while ((line = br.readLine()) != null) {
                    if (line.indexOf("Physical Address") > 0) {
                        int index = line.indexOf(":");
                        index += 2;
                        address = line.substring(index);
                        break;
                    }
                }
                br.close();
                return address.trim();
            }
            catch (Exception e) {
            }
        }
        return address;
    }

    /**
     * 获取客户端IP地址
     * @param request
     * @return
     */
    public static String getRemoteHost(javax.servlet.http.HttpServletRequest request){
        String ip = request.getHeader("x-forwarded-for");
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
            ip = request.getHeader("Proxy-Client-IP");
        }
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
            ip = request.getRemoteAddr();
        }
        return ip.equals("0:0:0:0:0:0:0:1")?"127.0.0.1":ip;
    }
}
