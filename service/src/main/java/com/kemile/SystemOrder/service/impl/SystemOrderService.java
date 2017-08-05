package com.kemile.SystemOrder.service.impl;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.SystemOrder.dao.SystemOrderDAO;
import com.kemile.SystemOrder.domain.SystemOrderEntity;
import com.kemile.SystemOrder.service.ISystemOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

/**
 * 类名称：SystemOrderService
 * 创建人：假面
 * 创建时间：2016年09月06日
 * 版本号：1.0v
 */
@Service("systemOrderService")
public class SystemOrderService  extends AbstractPageService<IBaseDAO<SystemOrderEntity>, SystemOrderEntity> implements ISystemOrderService<IBaseDAO<SystemOrderEntity>, SystemOrderEntity> {

    @Autowired
    private SystemOrderDAO systemOrderDAO;

    @Override
    public IBaseDAO<SystemOrderEntity> getDao() {
        return systemOrderDAO;
    }

    @Override
    public List<Map<String,Object>> queryDetails(String orderid){
        return systemOrderDAO.queryDetails(orderid);
    }

    @Override
    public int updateByIds(Map<String,Object> map) {
        return systemOrderDAO.updateByIds(map);
    }
    //修改备注
    @Override
    public int updateRemark(Map<String,Object> map) {
        return systemOrderDAO.updateRemark(map);
    }

    //更新物流信息
    @Override
    public int updatePost(Map<String,Object> map) {
        return systemOrderDAO.updatePost(map);
    }
    //根据ID查询订单详情做判断，用于物流发货数目添加
    @Override
    public Map<String,Object> findOrderDetailsById(@RequestParam String postid){return systemOrderDAO.findOrderDetailsById(postid);}

}
