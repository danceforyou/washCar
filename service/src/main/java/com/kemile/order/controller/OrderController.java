package com.kemile.order.controller;

import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.common.utils.DateUtil;
import com.kemile.order.domain.Order;
import com.kemile.order.service.impl.OrderServiceImpl;
import com.kemile.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/9 0009.
 */

@Controller
@RequestMapping(value = "/Order/")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderService;

    /**
     * 用户列表
     * @param keyword   查询关键字
     * @param sort      排序字段
     * @param start     起始条数
     * @param limit
     * @return
     */
    @SuppressWarnings("serial")
    @ResponseBody
    @RequestMapping(value = "OrderList", method = RequestMethod.GET)
    public Map<String, Object> OrderList(
            @RequestParam(value = "keyword") final String keyword,
            @RequestParam(value = "sort") final String sort,
            @RequestParam(value = "start", required = true) final String start,
            @RequestParam(value = "limit", required = true) final String limit) {
        final Map<String, Object> condition = new HashMap<String, Object>() {
            {
                put("keyword", keyword.equals("") ? null : keyword);
                put("sort", sort.equals("") ? "id" : sort);
                put("start", start);
                put("limit", limit);
            }
        };
        final List<Map<String, Object>> orderList = orderService.orderList(condition);
        return new HashMap<String, Object>() {
            {
                put("rows", orderList);
                put("results", orderService.orderTotal(condition));
            }
        };
    }

    /**
     * 修改管理员信息
     * @param order
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "SaveOrderInfo")
    public boolean SaveOrderInfo(Order order) {
        try {
            if (order.getId() == null) {
                int i = orderService.insert(order);
            } else {
                int i = orderService.update(order);
            }
            return true;
        } catch (Exception e) {
            throw new BizException(BizExceptionEnum.UPDATEERROR.getCode(),
                    BizExceptionEnum.UPDATEERROR.getDesc());
        }
    }

    /**
     * 根据管理员ID查询信息
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "OrderInfoByID/{id}")
    public Order OrderInfoByID(@PathVariable String id) {
        Order order = orderService.findOne("id", id);
        if (order == null) {
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),
                    BizExceptionEnum.NOTEXISTS.getDesc());
        } else {
            return order;
        }
    }

    /**
     * 删除管理员
     * @param ids
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "DeleteOrderByID")
    public String DeleteOrderByID(@RequestParam(value = "ids") String ids) {
        List<String> list = Arrays.asList(ids.split(","));
        int i = orderService.deleteByIds(list);
        return "" + i;
    }

    /**
     * 更新订单状态
     * @param
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "UpdateStatus")
    public boolean updateStatus(
            @RequestParam(value = "id") final String id,
            @RequestParam(value = "order_status") final String order_status,
            @RequestParam(value = "aduit_status") final String aduit_status,
            @RequestParam(value = "service_status") final String service_status){
        final Map<String, Object> condition = new HashMap<String, Object>() {
            {
                put("id", id.equals("") ? null : Integer.parseInt(id));
                put("order_status", order_status.equals("") ? null : Integer.parseInt(order_status));
                put("aduit_status", aduit_status.equals("") ? null : Integer.parseInt(aduit_status));
                put("service_status", service_status.equals("") ? null : Integer.parseInt(service_status));
            }
        };
        boolean result = orderService.updateStatus(condition);
        return result;
    }
}
