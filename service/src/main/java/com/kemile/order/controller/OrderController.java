package com.kemile.order.controller;

import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.common.utils.DateUtil;
import com.kemile.common.utils.Global;
import com.kemile.management.domain.Manager;
import com.kemile.management.service.ManagerService;
import com.kemile.management.service.impl.ManagerServiceImpl;
import com.kemile.order.domain.Order;
import com.kemile.order.service.impl.OrderServiceImpl;
import com.kemile.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2017/8/9 0009.
 */

@Controller
@RequestMapping(value = "/Order/")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private ManagerServiceImpl managerService;

    @Autowired
    HttpSession session;

    /**
     * 用户列表
     * @param keyword   查询关键字
     * @param sort      排序字段
     * @param start     起始条数
     * @param order_status  订单状态（支付状态）
     * @param aduit_status  审核状态
     * @param limit
     * @return
     */
    @SuppressWarnings("serial")
    @ResponseBody
    @RequestMapping(value = "OrderList", method = RequestMethod.GET)
    public Map<String, Object> OrderList(
            @RequestParam(value = "keyword") final String keyword,
            @RequestParam(value = "order_status") final String order_status,
            @RequestParam(value = "aduit_status") final String aduit_status,
            @RequestParam(value = "sort") final String sort,
            @RequestParam(value = "start", required = true) final String start,
            @RequestParam(value = "limit", required = true) final String limit) {
        final Map<String, Object> condition = new HashMap<String, Object>() {
            {
                put("keyword", keyword.equals("") ? null : keyword);
                put("order_status", order_status.equals("-1") ? null : order_status);
                put("aduit_status", aduit_status.equals("-1") ? null : aduit_status);
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
            @RequestParam(value = "status") final int status,
            @RequestParam(value = "type") final int type){
        //final Manager manager = managerService.findOne("id", operatorId);
       final Manager manager = (Manager) session.getAttribute(Global.QR_MANAGER);
        final Map<String, Object> condition = new HashMap<String, Object>() {
            {
                put("id", id.equals("") ? null : Integer.parseInt(id));
                if (type == 0){//更还订单状态
                    put("order_status", status);
                }else if (type == 1){//更改审核状态
                    put("aduit_status", status);
                    put("check_man", manager.getId());
                    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
                    //System.out.println(df.format(new Date()));// new Date()为获取当前系统时间
                    put("check_time", df.format(new Date()));
                }else if (type == 2){//更改服务状态
                    put("service_status", status);
                    put("service_manager", manager.getId());
                }
            }
        };
        boolean result = orderService.updateStatus(condition);
        return result;
    }
}
