package com.kemile.management.service.impl;

import com.kemile.management.dao.ManagerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.management.domain.Manager;
import com.kemile.management.service.ManagerService;

import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
@Service("ManagesService")
public class ManagerServiceImpl extends AbstractPageService<IBaseDAO<Manager>, Manager> implements ManagerService<IBaseDAO<Manager>, Manager> {
    
	@Autowired
	private ManagerDAO managerDAO;
	
    public IBaseDAO<Manager> getDao() {
        return managerDAO;
    }

    public int periodOfTime(String startDate, String endDate){
        return managerDAO.periodOfTime(startDate, endDate);
    }

    public Manager findOne0(String property, String value){
        return managerDAO.findOne0(property,value);
    }

    /**
     * 查询用户列表
     */
    public List<Map<String, Object>> managerList(Map<String, Object> map) {
        return managerDAO.managerList(map);
    }

    /**
     * 查询用户数量
     */
    public int managerTotal(Map<String, Object> map) {
        return managerDAO.managerTotal(map);
    }

}
