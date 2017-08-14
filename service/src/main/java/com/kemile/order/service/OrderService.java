package com.kemile.order.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.common.service.IPageService;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/9 0009.
 */
public interface OrderService<D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>,IPageService<D, T> {

    public List<Map<String,Object>> orderList(Map<String, Object> map);

    public int orderTotal(Map<String, Object> map);
}
