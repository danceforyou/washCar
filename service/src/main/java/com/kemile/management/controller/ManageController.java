package com.kemile.management.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.kemile.SystemLoginLog.domain.SystemLoginLogEntity;
import com.kemile.SystemLoginLog.service.impl.SystemLoginLogService;
import com.kemile.common.utils.DateUtil;
import com.kemile.common.utils.Global;
import com.kemile.common.utils.OSUtils;
import com.kemile.management.service.impl.ManagerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.kemile.common.domain.view.BizData4Page;
import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.common.utils.SqlOrderEnum;
import com.kemile.management.domain.Manager;

@Controller
@RequestMapping(value = "/Manage/")
public class ManageController {

	@Autowired
	private ManagerServiceImpl managerService;

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
	public Manager login(
			@RequestParam(value = "account", required = true) String account,
			@RequestParam(value = "password", required = true) String password,
			@RequestParam(value = "vCode", required = true) String vCode,
			HttpServletRequest request) {

		// 获取验证码
		String rand = (String) request.getSession().getAttribute("rand");

		return userAndPasswordIsCorrect(rand, vCode, account, password,request);

	}

	private Manager userAndPasswordIsCorrect(String rand, String vCode,
											 String account, String password, HttpServletRequest request) {
		SystemLoginLogEntity log = new SystemLoginLogEntity();
		log.setType("登录");
		log.setName(account);
		log.setIp(OSUtils.getRemoteHost(request));

		// 对比验证码是否相等
		if (rand.toLowerCase().equals(vCode.toLowerCase())) {
			Manager manages = new Manager();
			manages.setAccount(account);
			manages.setPassword(password);
			// 查询管理员信息
			manages = managerService.selectOne(null,manages);
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
	public Manager getManagesInfo() {
		return (Manager) session.getAttribute(Global.QR_MANAGER);
	}

	/**
	 * 查询管理员列表(暂未用)
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
		managerService.queryPageByDataPerm(bizData4Page, "id", SqlOrderEnum.ASC);
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
	public boolean saveManageInfo(Manager manages) {
		try {
			if (manages.getId() == null) {
				manages.setAccount("LL" + DateUtil.getDateNow("yyyyMMddHHmm"));
				int i = managerService.insert(manages);
			} else {
				int i = managerService.update(manages);
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
	public Manager managesInfoByID(@PathVariable String id) {
		Manager manages = managerService.findOne("id", id);
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
		int i = managerService.deleteByIds(list);
		return "" + i;
	}

	/**
	 * 员工列表
	 *
	 * @param keyword
	 *            查询关键字
	 * @param sort
	 *            排序字段
	 * @param start
	 *            起始条数
	 * @param limit
	 * @return
	 */
	@SuppressWarnings("serial")
	@ResponseBody
	@RequestMapping(value = "/ManagerList", method = RequestMethod.GET)
	public Map<String, Object> ManagerList(
			@RequestParam(value = "keyword") final String keyword,
			@RequestParam(value = "sort") final String sort,
			@RequestParam(value = "start", required = true) final String start,
			@RequestParam(value = "limit", required = true) final String limit) {
		final Map<String, Object> condition = new HashMap<String, Object>() {
			{
				put("keyword", keyword.equals("") ? null : keyword);
				put("sort", sort.equals("") ? "id" : sort);
				put("start", start);
				put("limit", limit);
			}
		};
		final List<Map<String, Object>> managerList = managerService.managerList(condition);
		return new HashMap<String, Object>() {
			{
				put("rows", managerList);
				put("results", managerService.managerTotal(condition));
			}
		};
	}
}
