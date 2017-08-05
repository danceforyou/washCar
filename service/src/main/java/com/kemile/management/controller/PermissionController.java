package com.kemile.management.controller;

import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.management.domain.Permission;
import com.kemile.management.domain.Role;
import com.kemile.management.service.PermissionRoleService;
import com.kemile.management.service.PermissionService;
import com.kemile.management.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yongrong on 16/4/5.
 */
@Controller
@RequestMapping(value="/Manage/")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private PermissionRoleService permissionRoleService;

    @Autowired
    private RoleService roleService;


    /**
     * 通过角色ID获取所有权限并标记已获取的权限(适用于角色管理中添加权限)
     * @param role_id
     * @return
     */
    @ResponseBody
    @RequestMapping("selectPermissionAll/{role_id}")
    public Map<String, Object> selectPermissionAll(@PathVariable String role_id){
        Role role = (Role) roleService.findOne("id", role_id);
        if (role !=null){
            List<Permission> permissionList = permissionService.selectList(null,role_id);
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("managesRole", role);
            map.put("permissionList", permissionList);
            return map;
        }else {
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),BizExceptionEnum.NOTEXISTS.getDesc());
        }
    }

    /**
     * 通过角色ID获取相应的权限(适用于管理员登陆后,侧边栏显示接口)
     * @param role_id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "ManagesPermission/{role_id}")
    public List<Permission> managesPermission(@PathVariable String role_id){
        List<Permission> list =  permissionService.findList("role_id",role_id);
        if (list!=null){
            return list;
        }else {
            throw new BizException(BizExceptionEnum.AUTHERROR.getCode(),BizExceptionEnum.AUTHERROR.getDesc());
        }
    }

    /**
     * 获取所有权限列表(适用于权限管理页面展示接口)
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "permissionList")
    public List<Permission> permissionList(){
        List<Permission> list =  permissionService.findAll();
        if (list!=null){
            return list;
        }else {
            throw new BizException(BizExceptionEnum.AUTHERROR.getCode(),BizExceptionEnum.AUTHERROR.getDesc());
        }
    }

    @ResponseBody
    @RequestMapping(value = "getPermissionById/{id}")
    public Permission getPermissionById(@PathVariable String id,
                                        @RequestParam(value = "pid", required = false) String pid){
        if (pid.equals("")){
            return (Permission) permissionService.getPermissionById(null,null,id);
        }else {
            return (Permission) permissionService.getPermissionById("pid",pid,id);
        }
    }

    @ResponseBody
    @RequestMapping(value = "ParentPermissionList")
    public List<Permission> ParentPermissionList(){
        return permissionService.parentPermissionList();
    }

    /**
     * 修改权限信息
     * @param permission
     * @return
     */
    @ResponseBody
    @RequestMapping("savePermission")
    public String savePermission(Permission permission){
        try {
            permissionService.updateOrSave(permission, permission.getId());
            return "OK";
        }catch (Exception e){
//            e.printStackTrace();
            throw new BizException(BizExceptionEnum.UPDATEERROR.getCode(), BizExceptionEnum.UPDATEERROR.getDesc());
        }
    }

    /**
     * 批量删除权限
     * @param ids
     * @return
     */
    @ResponseBody
    @RequestMapping("deletePermissions")
    public int deletePermissions(@RequestParam(value = "ids")String ids){
        List<String> list = Arrays.asList(ids.split(","));
        int j = 0;
        int i = permissionService.deleteByIds(list);
        if (i!=0){
            j = permissionRoleService.deleteByIds(list);
        }
        if (j==i){
            return j;
        }else {
            return i;
        }
    }
}
