package com.kemile.management.service.impl;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.management.dao.PermissionDAO;
import com.kemile.management.domain.Permission;
import com.kemile.management.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by yongrong on 16/4/5.
 */
@Service("PermissionService")
public class PermissionServiceImpl extends AbstractPageService<IBaseDAO<Permission>, Permission> implements PermissionService<IBaseDAO<Permission>, Permission> {

    @Autowired
    private PermissionDAO permissionDAO;

    @Override
    public IBaseDAO<Permission> getDao() {
        return permissionDAO;
    }

    public Permission getPermissionById(String property, String value, String id){
        return permissionDAO.getPermissionById(property, value, id);
    }

    public List<Permission> parentPermissionList(){
        return permissionDAO.parentPermissionList();
    }
}
