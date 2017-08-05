package com.kemile.management.service.impl;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.management.dao.PermissionRoleDAO;
import com.kemile.management.domain.PermissionRole;
import com.kemile.management.service.PermissionRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by yongrong on 16/4/6.
 */
@Service("PermissionRoleService")
public class PermissionRoleServiceImpl extends AbstractPageService<IBaseDAO<PermissionRole>, PermissionRole> implements PermissionRoleService<IBaseDAO<PermissionRole>, PermissionRole> {

    @Autowired
    private PermissionRoleDAO permissionRoleDAO;

    @Override
    public IBaseDAO<PermissionRole> getDao() {
        return permissionRoleDAO;
    }
}
