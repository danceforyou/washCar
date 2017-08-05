package com.kemile.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexUtil {

	/**
	 * 是否是url
	 * 
	 * @param str
	 * @return
	 */
	public final static boolean isUrl(String str) {
		return match(str, "^http://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$");
	}

	/**
	 * 匹配密码，以字母开头，长度在8-20之间，只能包含字符、数字和下划线。
	 * 
	 * @param str
	 * @return
	 */
	public final static boolean ispassword(String str) {
		return match(str, "^[0-9A-Za-z]\\w{7,20}$");
	}

	/**
	 * 验证字符，只能包含中文、英文、数字、下划线等字符。
	 * 
	 * @param str
	 * @return
	 */
	public final static boolean stringCheck(String str) {
		return match(str, "^[a-zA-Z0-9\u4e00-\u9fa5-_]+$");
	}

	/**
	 * 判断是否为合法字符(a-zA-Z0-9-_)
	 * 
	 * @param text
	 * @return
	 */
	public final static boolean isRightfulString(String text) {
		return match(text, "^[BabyService-Za-z0-9_-]+$");
	}

	/**
	 * 匹配Email地址
	 * 
	 * @param email
	 * @return
	 */
	public final static boolean isEmail(String email) {
		return match(email,
				"^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
	}

	/**
	 * 邮政编码验证
	 * 
	 * @param text
	 * @return
	 */
	public final static boolean isZipCode(String text) {
		return match(text, "^[0-9]{6}$");
	}

	/**
	 * 联系电话(手机/电话皆可)验证
	 * 
	 * @param text
	 * @return
	 */
	public final static boolean isTel(String text) {
		return isMobile(text) || isPhone(text) ? true : false;
	}

	/**
	 * 手机号码验证
	 * 
	 * @param text
	 * @return
	 */
	public final static boolean isMobile(String text) {
		if (text.length() != 11)
			return false;
		return match(text,
				"^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\\d{8})$");
	}

	/**
	 * 电话验证
	 * 
	 * @param text
	 * @return
	 */
	public final static boolean isPhone(String text) {
		return match(text, "^(\\d{3,4}-?)?\\d{7,9}$");
	}

	/**
	 * 身份证号码验证
	 * 
	 * @param text
	 * @return
	 */
	public final static boolean isIdCardNo(String text) {
		return match(text, "^(\\d{6})()?(\\d{4})(\\d{2})(\\d{2})(\\d{3})(\\w)$");
	}

	/**
	 * 是否月
	 * 
	 * @param month
	 * @return
	 */
	public final static boolean isMonth(String month) {
		return match(month, "^(0?[1-9]|1[0-2])$");
	}

	/**
	 * 是否日
	 * 
	 * @param month
	 * @return
	 */
	public final static boolean isDay(String month) {
		return match(month, "^((0?[1-9])|((1|2)[0-9])|30|31)$");
	}

	/**
	 * 匹配非负整数（正整数+0）
	 * 
	 * @param str
	 * @return
	 */
	public final static boolean isInteger(String str) {
		return match(str, "^[+]?\\d+$");
	}

	/**
	 * 匹配HTML标记
	 * 
	 * @param str
	 * @return
	 */
	public final static boolean isHtml(String str) {
		return match(str, "/< (.*)>.*|< (.*) />/");
	}

	/**
	 * 匹配正浮点数
	 * 
	 * @param str
	 * @return
	 */
	public final static boolean isFloat(String str) {
		return match(str, "^[-\\+]?\\d+(\\.\\d+)?$");
	}

	/**
	 * 是否是数值
	 * 
	 * @param str
	 * @return
	 */
	public final static boolean isNumeric(String str) {
		return isFloat(str) || isInteger(str) ? true : false;
	}

	/**
	 * 是否是数字
	 * 
	 * @param str
	 * @return
	 */
	public final static boolean isDigits(String str) {
		return match(str, "^[0-9]*$");
	}

	/**
	 * 是否汉字
	 * 
	 * @param text
	 * @return
	 */
	public final static boolean isChinese(String text) {
		return match(text, "^[\u0391-\uFFE5]+$");
	}

	/**
	 * 是否包含中英文特殊字符，除英文"-_"字符外
	 * 
	 * @param text
	 * @return
	 */
	public static boolean isContainsSpecialChar(String text) {
		if (text == null || text == "") {
			return false;
		}
		String[] chars = { "[", "`", "~", "!", "@", "#", "$", "%", "^", "&",
				"*", "(", ")", "+", "=", "|", "{", "}", "'", ":", ";", "'",
				",", "[", "]", ".", "<", ">", "/", "?", "~", "！", "@", "#",
				"￥", "%", "…", "&", "*", "（", "）", "—", "+", "|", "{", "}",
				"【", "】", "‘", "；", "：", "”", "“", "’", "。", "，", "、", "？", "]" };
		for (String ch : chars) {
			if (text.contains(ch))
				return true;
		}
		return false;
	}

	/**
	 * 过滤中英文特殊字符
	 * 
	 * @param text
	 * @return
	 */
	public static String stringFilter(String text) {
		String regExpr = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
		Pattern p = Pattern.compile(regExpr);
		Matcher m = p.matcher(text);
		return m.replaceAll("").trim();
	}

	/**
	 * 过滤html代码
	 * 
	 * @param inputString
	 *            含html标签的字符串
	 * @return
	 */
	public static String htmlFilter(String inputString) {
		String htmlStr = inputString; // 含html标签的字符串
		String textStr = "";
		Pattern p_script;
		Matcher m_script;
		Pattern p_style;
		Matcher m_style;
		Pattern p_html;
		Matcher m_html;
		Pattern p_ba;
		Matcher m_ba;

		try {
			String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>"; // 定义script的正则表达式{或<script[^>]*?>[\\s\\S]*?<\\/script>
			String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; // 定义style的正则表达式{或<style[^>]*?>[\\s\\S]*?<\\/style>
			String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式
			String patternStr = "\\s+";

			p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
			m_script = p_script.matcher(htmlStr);
			htmlStr = m_script.replaceAll(""); // 过滤script标签

			p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
			m_style = p_style.matcher(htmlStr);
			htmlStr = m_style.replaceAll(""); // 过滤style标签

			p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
			m_html = p_html.matcher(htmlStr);
			htmlStr = m_html.replaceAll(""); // 过滤html标签

			p_ba = Pattern.compile(patternStr, Pattern.CASE_INSENSITIVE);
			m_ba = p_ba.matcher(htmlStr);
			htmlStr = m_ba.replaceAll(""); // 过滤空格

			textStr = htmlStr;

		} catch (Exception e) {
			System.err.println("Html2Text: " + e.getMessage());
		}
		return textStr;// 返回文本字符串
	}

	// 正则表达式匹配
	private final static boolean match(String text, String reg) {
		if (text == null || text == "" || reg == null || reg == "") {
			return false;
		}
		return Pattern.compile(reg).matcher(text).matches();
	}

}
