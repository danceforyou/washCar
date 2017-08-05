package com.kemile.management.dao;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.management.domain.Role;
import org.apache.ibatis.annotations.Param;

public interface RoleDAO extends IBaseDAO<Role> {

    int roleManagesCount(@Param("value") Object var2);
}
