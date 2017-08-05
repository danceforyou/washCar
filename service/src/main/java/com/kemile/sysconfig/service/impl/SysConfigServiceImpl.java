package com.kemile.sysconfig.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.sysconfig.dao.SysConfigDAO;
import com.kemile.sysconfig.domain.SysConfig;
import com.kemile.sysconfig.service.SysConfigService;

@SuppressWarnings("unchecked")
@Service("SysConfigServiceImpl")
public class SysConfigServiceImpl extends AbstractPageService<IBaseDAO<SysConfig>, SysConfig> implements SysConfigService<IBaseDAO<SysConfig>, SysConfig> {

	@Autowired
	private SysConfigDAO sysConfigDAO;
	
    public IBaseDAO<SysConfig> getDao() {
        return sysConfigDAO;
    }
}
