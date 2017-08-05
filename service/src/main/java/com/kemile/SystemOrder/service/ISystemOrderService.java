package com.kemile.SystemOrder.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.common.service.IPageService;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 类名称：ISystemOrderService
 * 创建人：假面
 * 创建时间：2016年09月06日
 * 版本号：1.0v
 */
public interface ISystemOrderService <D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>,IPageService<D, T> {
    List<Map<String,Object>> queryDetails(String orderid);
    int updateByIds(Map<String,Object> map);
    int updateRemark(Map<String,Object> map);
    int updatePost(Map<String,Object> map);
    Map<String,Object> findOrderDetailsById(@RequestParam String postid);
}