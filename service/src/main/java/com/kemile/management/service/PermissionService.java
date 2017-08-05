package com.kemile.management.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.common.service.IPageService;

import java.util.List;

/**
 * Created by yongrong on 16/4/5.
 */
public interface PermissionService<D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>,IPageService<D, T> {

    public T getPermissionById(String property, String value, String id);

    public List<T> parentPermissionList();
}
