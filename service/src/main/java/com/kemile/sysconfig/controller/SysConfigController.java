package com.kemile.sysconfig.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.sysconfig.domain.SysConfig;
import com.kemile.sysconfig.service.impl.SysConfigServiceImpl;

@Controller
@RequestMapping(value="/SysConfig/")
public class SysConfigController {
	
	@Autowired
	private SysConfigServiceImpl sysConfigService;

	@Autowired
	private HttpSession session;

	@ResponseBody
	@RequestMapping(value="getSysConfiInfo")
	public SysConfig sysConfigInfo(){
		SysConfig sysConfig = (SysConfig) session.getAttribute("sysConfig");
		if(sysConfig==null){
			sysConfig = sysConfigService.findOne("id", "1");
			session.setAttribute("sysConfig", sysConfig);
			session.setMaxInactiveInterval(60*30);
		}
		if(sysConfig==null){
			throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(), BizExceptionEnum.NOTEXISTS.getDesc());
		}else {
			return sysConfig;
		}
	}
	
	@ResponseBody
	@RequestMapping(value="AddSysConfiInfo", method=RequestMethod.POST)
	public boolean addSysConfigInfo(SysConfig sysConfig){
		try {
			sysConfigService.updateOrSave(sysConfig, "1");
			session.removeAttribute("sysConfig");
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			throw new BizException(BizExceptionEnum.UPDATEERROR.getCode(), BizExceptionEnum.UPDATEERROR.getDesc());
		}
		
	}
}
