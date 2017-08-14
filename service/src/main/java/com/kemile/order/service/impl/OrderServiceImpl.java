package com.kemile.order.service.impl;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.order.dao.OrderDAO;
import com.kemile.order.domain.Order;
import com.kemile.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/9 0009.
 */
@SuppressWarnings("unchecked")
@Service("OrderService")
public class OrderServiceImpl extends AbstractPageService<IBaseDAO<Order>, Order> implements OrderService<IBaseDAO<Order>, Order> {

@Autowired
private OrderDAO orderDAO;

public IBaseDAO<Order> getDao() {
        return orderDAO;
        }


/**
 * 查询用户列表
 */
public List<Map<String, Object>> orderList(Map<String, Object> map) {
        return orderDAO.orderList(map);
        }

/**
 * 查询用户数量
 */
public int orderTotal(Map<String, Object> map) {
        return orderDAO.orderTotal(map);
        }

        }

