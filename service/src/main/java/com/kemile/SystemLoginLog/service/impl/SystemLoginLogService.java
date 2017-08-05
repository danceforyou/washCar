package com.kemile.SystemLoginLog.service.impl;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.SystemLoginLog.dao.SystemLoginLogDAO;
import com.kemile.SystemLoginLog.domain.SystemLoginLogEntity;
import com.kemile.SystemLoginLog.service.ISystemLoginLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 类名称：SystemLoginLogService
 * 创建人：假面
 * 创建时间：2016年09月13日
 * 版本号：1.0v
 */
@Service("systemLoginLogService")
public class SystemLoginLogService  extends AbstractPageService<IBaseDAO<SystemLoginLogEntity>, SystemLoginLogEntity> implements ISystemLoginLogService<IBaseDAO<SystemLoginLogEntity>, SystemLoginLogEntity> {

    @Autowired
    private SystemLoginLogDAO systemLoginLogDAO;

    @Override
    public IBaseDAO<SystemLoginLogEntity> getDao() {
        return systemLoginLogDAO;
    }

    //登录日志插入
    public boolean insertLog(SystemLoginLogEntity entity){
		int i=systemLoginLogDAO.insert(entity);
		return i==1 ? true : false;
	}
}
