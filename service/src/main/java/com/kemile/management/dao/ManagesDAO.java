package com.kemile.management.dao;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.management.domain.Manages;
import org.apache.ibatis.annotations.Param;

public interface ManagesDAO extends IBaseDAO<Manages> {

    int periodOfTime(@Param("startDate") String startDate, @Param("endDate") String endDate);

    Manages findOne0(@Param("property") String var1, @Param("value") Object var2);
}
