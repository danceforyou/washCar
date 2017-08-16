package com.kemile.order.dao;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.order.domain.Order;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/9 0009.
 */
public interface OrderDAO extends IBaseDAO<Order> {

    List<Map<String,Object>> orderList(Map<String, Object> map);

    int orderTotal(Map<String, Object> map);

    boolean updateStatus(Map<String, Object> map);
}
