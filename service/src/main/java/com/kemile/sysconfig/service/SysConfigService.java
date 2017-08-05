package com.kemile.sysconfig.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;

@SuppressWarnings("rawtypes")
public interface SysConfigService<D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>{

}
