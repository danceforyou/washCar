package com.kemile.management.service.impl;

import com.kemile.management.domain.Role;
import com.kemile.management.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.management.dao.RoleDAO;

@SuppressWarnings("unchecked")
@Service("RoleService")
public class RoleServiceImpl extends AbstractPageService<IBaseDAO<Role>, Role> implements RoleService<IBaseDAO<Role>, Role> {
    
	@Autowired
	private RoleDAO roleDAO;
	
    public IBaseDAO<Role> getDao() {
        return roleDAO;
    }

	public int roleManagesCount(String value){
		return roleDAO.roleManagesCount(value);
	}
}
