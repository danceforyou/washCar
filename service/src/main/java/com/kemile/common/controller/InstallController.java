package com.kemile.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/Install/")
public class InstallController {
	
	@ResponseBody
	@RequestMapping(value="index", method=RequestMethod.GET)
	public String index(){
		String string = "fdgadsfdsfsdf";
		return string;
	}
}
