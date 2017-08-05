package com.kemile.management.controller;

import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.management.domain.PermissionRole;
import com.kemile.management.service.PermissionRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yongrong on 16/4/6.
 */
@Controller
@RequestMapping(value="/Manage/")
public class PermissionRoleController {

    @Autowired
    private PermissionRoleService permissionRoleService;

    @ResponseBody
    @RequestMapping(value="savePermissionRole/{role_id}", method= RequestMethod.POST)
    public String savePermission_role(@PathVariable String role_id, PermissionRole permissionRole){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("role_id", role_id);
        map.put("permission_id", permissionRole.getPermission_id());
        int number = permissionRoleService.count(map);
        if (number == 0){
            permissionRole.setRole_id(role_id);
            int i = permissionRoleService.insert(permissionRole);
            if (i==1){
                return "添加成功!";
            }else {
                throw new BizException(BizExceptionEnum.ADDERROR.getCode(),BizExceptionEnum.ADDERROR.getDesc());
            }
        }else {
            return "添加成功!";
        }
    }

    @ResponseBody
    @RequestMapping(value="deletePermissionRole/{role_id}", method= RequestMethod.POST)
    public String deletePermission_role(@PathVariable String role_id, String permission_id){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("roleID", role_id);
        map.put("permission_id", permission_id);
        int i = permissionRoleService.deleteByCondition(map);
        if (i==1){
            return "取消成功!";
        }else {
            throw new BizException(BizExceptionEnum.DELERROR.getCode(),BizExceptionEnum.DELERROR.getDesc());
        }
    }
}
