package com.kemile.management.service.impl;

import com.kemile.management.dao.ManagesDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.management.domain.Manages;
import com.kemile.management.service.ManagesService;

@SuppressWarnings("unchecked")
@Service("ManagesService")
public class ManagesServiceImpl extends AbstractPageService<IBaseDAO<Manages>, Manages> implements ManagesService<IBaseDAO<Manages>, Manages>{
    
	@Autowired
	private ManagesDAO managesDAO;
	
    public IBaseDAO<Manages> getDao() {
        return managesDAO;
    }

    public int periodOfTime(String startDate, String endDate){
        return managesDAO.periodOfTime(startDate, endDate);
    }

    public Manages findOne0(String property, String value){
        return managesDAO.findOne0(property,value);
    }

}
