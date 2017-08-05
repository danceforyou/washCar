package com.kemile.management.controller;

import java.util.List;
import java.util.Map;

import com.kemile.management.domain.Role;
import com.kemile.management.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.kemile.common.domain.view.BizData4Page;
import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.common.utils.SqlOrderEnum;

@Controller
@RequestMapping(value="/Manage/")
public class RoleController {

	@Autowired
	private RoleService roleService;
	
	/**
	 * 查询管理员角色列表
	 * @param conditions
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="ManagesRoleList/{page}")
	public BizData4Page<Map<String, Object>> managesRoleList(@PathVariable int page,
															 @RequestParam Map<String, Object> conditions){
		BizData4Page<Map<String, Object>> bizData4Page = new BizData4Page<Map<String,Object>>();
		bizData4Page.setConditions(conditions);
		bizData4Page.setPage(page);
		roleService.queryPageByDataPerm(bizData4Page, "id", SqlOrderEnum.ASC);
		return bizData4Page;
	}

	/**
	 * 查询角色列表---添加管理员信息是需要用到
	 * @return
     */
	@ResponseBody
	@RequestMapping(value="RoleList", method=RequestMethod.POST)
	public List<Role> RoleList(){
		List<Role> list = roleService.findList("'0'","0","id",SqlOrderEnum.ASC);
		if (list!=null && !list.isEmpty()){
			return list;
		}else {
			throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(), BizExceptionEnum.NOTEXISTS.getDesc());
		}
	}

	/**
	 * 保存角色信息
	 * @param managesRole
	 * @return
     */
	@ResponseBody
	@RequestMapping(value="SaveRoleInfo", method=RequestMethod.POST)
	public String saveRoleInfo(Role managesRole){
		if (managesRole.getId()==0){
			roleService.updateOrSave(managesRole,null);
		}else {
			roleService.updateOrSave(managesRole,managesRole.getId());
		}
		return "修改完成!";
	}

	@ResponseBody
	@RequestMapping(value="deleteRole/{id}", method=RequestMethod.POST)
	public int deleteRole(@PathVariable String id){
		int i = roleService.roleManagesCount(id);
		if (i==0){
			return roleService.deleteById(id);
		}else {
			throw new BizException(BizExceptionEnum.DELERROR.getCode(), BizExceptionEnum.DELERROR.getDesc());
		}
	}
	
}
