package com.kemile.common.utils;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Random;

import com.kemile.common.domain.view.BizData4Page;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;

//
//
//import org.dom4j.Document;
//import org.dom4j.DocumentException;
//import org.dom4j.DocumentHelper;
//import org.dom4j.Element;
import org.slf4j.*;

/**
 * 通过短信接口发送短信
 */
public class SmsUtil {
	private final static org.slf4j.Logger logger = LoggerFactory.getLogger(SmsUtil.class);
	public static void main(String[] args)throws Exception {
		//sendSms3("15029659077", "您的注册验证码:" + "8888" + ",10分钟内有效");
	}

	//短信商 一  http://www.dxton.com/ =====================================================================================
	/**
	 * 短信验证码
	 */
	public static String getSmsValidateCode() {
		Random random = new Random();
		//取 100000-999999随机数
		String code = Integer.valueOf(random.nextInt(800000) + 100000).toString();
		return code;
	}


	public static String sendSms3(String mobile,String smsContent) throws UnsupportedEncodingException {

		String account = "", password = "";
		try {
			account = PropertiesInfo.getInstance().getProperty("sendMSM.username");
			password = PropertiesInfo.getInstance().getProperty("sendMSM.password");
		}catch (Exception e) {
			System.out.println("读取短信接口账号密码失败");
		}

		String PostData = "";
		try {
			PostData = "CorpID="+account+"&Pwd="+password+"&Mobile="+mobile+"&Content="+URLEncoder.encode(smsContent.replaceAll("<br/>", " "), "GBK")+"&cell=";
		} catch (UnsupportedEncodingException e) {
			System.out.println("短信提交失败");
			logger.error("发送短信失败", e);
			throw e;
		}
		//给短信表插入数据

		//System.out.println(PostData);http://yzm.mb345.com/ws/BatchSend2.aspx?CorpID=*&Pwd=*&Mobile=*&Content=*&SendTime=*&cell=*
		String ret = SMS(PostData, "http://yzm.mb345.com/ws/BatchSend2.aspx");
		System.out.println(ret);
		return ret;
		/*
 	   100			发送成功
 	   101			验证失败
 	   102			手机号码格式不正确
 	   103			会员级别不够
 	   104			内容未审核
 	   105			内容过多
 	   106			账户余额不足
 	   107			Ip受限
 	   108			手机号码发送太频繁，请换号或隔天再发
 	   109			帐号被锁定
 	   110			发送通道不正确
 	   111			当前时间段禁止短信发送
 	   120			系统升级
		*/

	}

	
	 public static String SMS(String postData, String postUrl) {
	        try {
	            //发送POST请求
	            URL url = new URL(postUrl);
	            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	            conn.setRequestMethod("POST");
	            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	            conn.setRequestProperty("Connection", "Keep-Alive");
	            conn.setUseCaches(false);
	            conn.setDoOutput(true);

	            conn.setRequestProperty("Content-Length", "" + postData.length());
	            OutputStreamWriter out = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
	            out.write(postData);
	            out.flush();
	            out.close();

	            //获取响应状态
	            if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
	                System.out.println("connect failed!");
	                return "";
	            }
	            //获取响应内容体
	            String line, result = "";
	            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
	            while ((line = in.readLine()) != null) {
	                result += line + "\n";
	            }
	            in.close();
	            return result;
	        } catch (IOException e) {
	            e.printStackTrace(System.out);
	        }
	        return "";
	    }
	 //===================================================================================================================
	 


}

