package com.kemile.management.dao;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.management.domain.Permission;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by yongrong on 16/4/5.
 */
public interface PermissionDAO extends IBaseDAO<Permission> {

    Permission getPermissionById(@Param("property") String property, @Param("value") String value, @Param("id") String id);

    List<Permission> parentPermissionList();
}
