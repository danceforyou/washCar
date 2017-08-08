package com.kemile.user.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.common.service.IPageService;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/7 0007.
 */
public interface UserService<D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>,IPageService<D, T> {

    public List<Map<String,Object>> userList(Map<String, Object> map);

    public int userTotal(Map<String, Object> map);

}
