package com.kemile.SystemOrder.dao;

import com.kemile.SystemOrder.domain.SystemOrderEntity;
import com.kemile.common.dao.IBaseDAO;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

/**
 * 类名称：SystemOrderDAO
 * 创建人：假面
 * 创建时间：2016年09月06日
 * 版本号：1.0v
 */
public interface SystemOrderDAO extends IBaseDAO<SystemOrderEntity> {
    List<Map<String,Object>> queryDetails(String orderid);
    int updateByIds(Map<String,Object> map);
    int updateRemark(Map<String,Object> map);//更新某个值
    int updatePost(Map<String,Object> map);//更新物流信息
    Map<String,Object> findOrderDetailsById(@RequestParam String postid);

}
