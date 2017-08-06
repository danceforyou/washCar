package com.kemile.management.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.common.service.IPageService;

import java.util.List;
import java.util.Map;

@SuppressWarnings("rawtypes")
public interface ManagerService<D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>,IPageService<D, T>{

    int periodOfTime(String startDate, String endDate);

    public List<Map<String,Object>> managerList(Map<String, Object> map);

    public int managerTotal(Map<String, Object> map);
}
