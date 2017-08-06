package com.kemile.management.dao;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.management.domain.Manager;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ManagerDAO extends IBaseDAO<Manager> {

    int periodOfTime(@Param("startDate") String startDate, @Param("endDate") String endDate);

    Manager findOne0(@Param("property") String var1, @Param("value") Object var2);

    List<Map<String,Object>> managerList(Map<String, Object> map);
    int managerTotal(Map<String, Object> map);
}
