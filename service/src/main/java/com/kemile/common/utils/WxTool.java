package com.kemile.common.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import javax.servlet.http.HttpServletRequest;

/**
 * 微信支付用到的工具包
 */
public class WxTool {

    private String header;

    public static final String getRandomCode(int len){
        // 取随机产生的认证码(4位数字)
        String codeList = "1234567890";
        String sRand="";
        Random random = new Random();
        for (int i=0;i<len;i++){

            int a=random.nextInt(codeList.length()-1);
            String rand=codeList.substring(a,a+1);
            sRand+=rand;
        }
        return sRand;
    }



    /**
     * 获取客户端IP地址
     * @param request
     * @return
     */
    public static String getRemoteHost(HttpServletRequest request){
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



    /**
     * 获取日期
     * @param timeType 时间类型，譬如：Calendar.DAY_OF_YEAR
     * @param timenum  时间数字，譬如：-1 昨天，0 今天，1 明天
     * @param format_string 时间格式，譬如："yyyy-MM-dd HH:mm:ss"
     * @return 字符串
     */
    public static final String getDateFromNow(int timeType, int timenum, String format_string){
        if ((format_string == null)||(format_string.equals("")))
            format_string = "yyyy-MM-dd";
        Calendar cld = Calendar.getInstance();
        Date date = null;
        DateFormat df = new SimpleDateFormat(format_string);
        cld.set(timeType, cld.get(timeType) + timenum);
        date = cld.getTime();
        return df.format(date)+" 00:00:00";
    }


    /**
     * 微信支付的签名带key
     */

    public static String getSignUtil(Map<String, Object> map, String k){
        Collection<String> keys = map.keySet();
        List<String> list = new ArrayList<String>(keys);
        Collections.sort(list);
        String sign = "";
        for (String key : list) {
            if(map.get(key).equals("")||map.get(key)==null){
                continue;
            }

            if (sign.equals("")) {
                sign += key+"="+map.get(key);
            }else {
                sign += "&"+key+"="+map.get(key);
            }
        }
        if (k!=null) {
             return MD5.MD5Encode(sign+"&key="+k,"UTF8").toUpperCase();
        }else {
            return MD5.MD5Encode(sign,"UTF8").toUpperCase();
        }
        // return MD5.code(sign);
    }





//
//    /*
//     *校验签名是否一致
//     */
//    //压制警告，即去除警告 awtypes是说传参时也要传递带泛型的参数
//    @SuppressWarnings("rawtypes")
//    public static boolean verifyPaySign(SortedMap paras, String sign) throws UnsupportedEncodingException {
//        //获得生成的签名
//        String paySign = Tools.createSign(paras);
//        //return StringUtil.isNotEmpty(paySign) ? paySign.equalsIgnoreCase(sign) : false;
//        //判断前后签名是否一致
//
//
//
//        return true;
//    }
}