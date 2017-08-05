package com.kemile.common.controller;

import com.kemile.common.utils.Ehcache;
import com.kemile.common.utils.SmsUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.cache.Cache;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;

@Controller
@RequestMapping(value="/msm")
public class SendMSMController {
	private final static org.slf4j.Logger logger = LoggerFactory.getLogger(SmsUtil.class);
	/**
	 * 发送短信
	 */
	@ResponseBody
	@RequestMapping(value = "/sendsms" )
	public String sendSms(String mobile, HttpSession session) {
		//判断电话格式是否正确
		if (StringUtils.isBlank(mobile)) {
			return "电话号码不能为空!";
		}
		if (mobile.length() != 11) {
			return "电话号码必须为11位!";
		}

		String smsCode = SmsUtil.getSmsValidateCode();
		//将短信验证码存入Ehcache
		Ehcache.setDuanxinEhcache(mobile,smsCode);
	/*	您的手机号：【变量】，注册验证码：【变量】，请不要把验证码泄露给其他人。如非本人操作，可不用理会！
您的验证码为XX，有效时间XX分钟。
		您的手机号：【变量】，找回密码验证码：【变量】，请不要把验证码泄露给其他人。如非本人操作，可不用理会！

		您的手机号：【变量】，修改手机号码验证码：【变量】，请不要把验证码泄露给其他人。如非本人操作，可不用理会！*/
		//以上3种短信模板不用单独提交审核 直接可以用  字一个都不能错
		try {
			//发送短信
			String r = SmsUtil.sendSms3(mobile, "您此次的验证码为"+smsCode+"，有效时间10分钟，请您尽快填写，切勿告诉他人");
			logger.debug(r);
		} catch (UnsupportedEncodingException e) {
			logger.error("", e);
		}

		return "success";
	}

}
