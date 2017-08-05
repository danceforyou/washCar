package com.kemile.service.system;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.common.service.IPageService;

/**
 * 类名称：I${objectName}Service
 * 创建人：假面
 * 创建时间：${nowDate?string("yyyy年MM月dd日")}
 * 版本号：1.0v
 */
public interface I${objectName}Service <D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>,IPageService<D, T> {

}