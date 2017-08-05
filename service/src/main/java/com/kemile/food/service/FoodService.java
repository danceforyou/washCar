package com.kemile.food.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.common.service.IPageService;

import java.util.List;
import java.util.Map;

/**
 * Created by sb on 2017/5/22.
 */
public interface FoodService<D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>,IPageService<D, T> {

    public List<Map<String,Object>> foodList(Map<String, Object> map);

    public int foodTotal(Map<String, Object> map);

}