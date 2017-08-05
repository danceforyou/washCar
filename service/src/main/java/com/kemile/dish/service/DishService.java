package com.kemile.dish.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.common.service.IPageService;

import java.util.List;
import java.util.Map;

@SuppressWarnings("rawtypes")
public interface DishService<D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>,IPageService<D, T>{

    public List<Map<String,Object>> dishList(Map<String, Object> map);

    public int dishTotal(Map<String, Object> map);

}
