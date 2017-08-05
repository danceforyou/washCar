package com.kemile.management.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.kemile.SystemLoginLog.domain.SystemLoginLogEntity;
import com.kemile.SystemLoginLog.service.impl.SystemLoginLogService;
import com.kemile.common.utils.DateUtil;
import com.kemile.common.utils.Global;
import com.kemile.common.utils.OSUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.kemile.common.domain.view.BizData4Page;
import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.common.utils.SqlOrderEnum;
import com.kemile.management.domain.Manages;
import com.kemile.management.service.impl.ManagesServiceImpl;

@Controller
@RequestMapping(value = "/Manage/")
public class ManageController {

	@Autowired
	private ManagesServiceImpl managesService;

//	@Autowired
//	private LogServiceImpl logService;

	@Autowired
	private SystemLoginLogService systemLoginLogService;
	@Autowired
	HttpSession  session;

	/**
	 * 登录后台管理系统
	 * 
	 * @param account
	 *            账户
	 * @param password
	 *            密码
	 * @param vCode
	 *            验证码
	 * @param request
	 * @return 用户信息
	 */
	@ResponseBody
	@RequestMapping(value = "Login", method = RequestMethod.POST)
	public Manages login(
			@RequestParam(value = "account", required = true) String account,
			@RequestParam(value = "password", required = true) String password,
			@RequestParam(value = "vCode", required = true) String vCode,
			HttpServletRequest request) {

		// 获取验证码
		String rand = (String) request.getSession().getAttribute("rand");

		return userAndPasswordIsCorrect(rand, vCode, account, password,request);

	}

	private Manages userAndPasswordIsCorrect(String rand, String vCode,
			String account, String password, HttpServletRequest request) {
		SystemLoginLogEntity log = new SystemLoginLogEntity();
		log.setType("登录");
		log.setName(account);
		log.setIp(OSUtils.getRemoteHost(request));

		// 对比验证码是否相等
		if (rand.toLowerCase().equals(vCode.toLowerCase())) {
			Manages manages = new Manages();
			manages.setAccount(account);
			manages.setPassword(password);
			// 查询管理员信息
			manages = managesService.selectOne(null,manages);
			if (manages != null) {
				// 将管理员信息存入session中
				session.setAttribute(Global.QR_MANAGER, manages);
				log.setData("登录成功");
//				logService.insert(log); // 日志
				return manages;
			} else {
				log.setData("账户名密码错误");
//				logService.insert(log); // 日志
				throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),
						"账户或密码错误，请重新输入！");
			}
		} else {
			log.setData("验证码错误");
//			logService.insert(log); // 日志
			throw new BizException(BizExceptionEnum.NOTVALIDATION.getCode(),
					BizExceptionEnum.NOTVALIDATION.getDesc());
		}
	}

	/**
	 * 退出后台，清空session中的登录信息
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "Exit")
	public String exit() {
		session.removeAttribute(Global.QR_MANAGER);
		session.removeAttribute("PagePower");
		return "../admin/login.html";
	}

	/**
	 * 获取session中保存的管理员登陆信息
	 * @return
     */
	@ResponseBody
	@RequestMapping(value = "ManagesInfo")
	public Manages getManagesInfo() {
		return (Manages) session.getAttribute(Global.QR_MANAGER);
	}

	/**
	 * 查询管理员列表
	 * @param conditions
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "ManagerList/{page}")
	public BizData4Page<Map<String, Object>> managerList(@PathVariable int page,
														 @RequestParam Map<String, Object> conditions) {

		BizData4Page<Map<String, Object>> bizData4Page = new BizData4Page<Map<String, Object>>();
		bizData4Page.setConditions(conditions);
		bizData4Page.setPage(page);
		managesService.queryPageByDataPerm(bizData4Page, "id", SqlOrderEnum.ASC);
		if (bizData4Page.getRecords() == 0) {
			throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),
					BizExceptionEnum.NOTEXISTS.getDesc());
		} else {
			return bizData4Page;
		}
	}

	/**
	 * 修改管理员信息
	 * @param manages
     * @return
     */
	@ResponseBody
	@RequestMapping(value = "SaveManageInfo")
	public boolean saveManageInfo(Manages manages) {
		try {
			if (manages.getId() == null) {
				manages.setAccount("LL" + DateUtil.getDateNow("yyyyMMddHHmm"));
				int i = managesService.insert(manages);
			} else {
				int i = managesService.update(manages);
			}
			return true;
		} catch (Exception e) {
//			e.printStackTrace();
			throw new BizException(BizExceptionEnum.UPDATEERROR.getCode(),
					BizExceptionEnum.UPDATEERROR.getDesc());
		}
	}

	/**
	 * 根据管理员ID查询信息
	 * @param id
	 * @return
     */
	@ResponseBody
	@RequestMapping(value = "ManagesInfoByID/{id}")
	public Manages managesInfoByID(@PathVariable String id) {
		Manages manages = managesService.findOne("id", id);
		if (manages == null) {
			throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),
					BizExceptionEnum.NOTEXISTS.getDesc());
		} else {
			return manages;
		}
	}

	/**
	 * 删除管理员
	 * @param ids
	 * @return
     */
	@ResponseBody
	@RequestMapping(value = "DeletManagesByID")
	public String deletManagesByID(@RequestParam(value = "ids") String ids) {
		List<String> list = Arrays.asList(ids.split(","));
		int i = managesService.deleteByIds(list);
		return "" + i;
	}

}
