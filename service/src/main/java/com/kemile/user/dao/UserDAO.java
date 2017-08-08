package com.kemile.user.dao;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.management.domain.Manager;
import com.kemile.user.domain.User;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/7 0007.
 */
public interface UserDAO extends IBaseDAO<User> {

    List<Map<String,Object>> userList(Map<String, Object> map);
    int userTotal(Map<String, Object> map);
}
