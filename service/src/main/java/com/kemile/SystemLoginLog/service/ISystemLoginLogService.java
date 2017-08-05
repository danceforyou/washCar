package com.kemile.SystemLoginLog.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.common.service.IPageService;

/**
 * 类名称：ISystemLoginLogService
 * 创建人：假面
 * 创建时间：2016年09月13日
 * 版本号：1.0v
 */
public interface ISystemLoginLogService <D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>,IPageService<D, T> {

}