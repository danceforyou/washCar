package com.kemile.user.service.impl;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.user.dao.UserDAO;
import com.kemile.user.domain.User;
import com.kemile.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/7 0007.
 */

@SuppressWarnings("unchecked")
@Service("UserService")
public class UserServiceImpl extends AbstractPageService<IBaseDAO<User>, User> implements UserService<IBaseDAO<User>, User> {

    @Autowired
    private UserDAO userDAO;

    public IBaseDAO<User> getDao() {
        return userDAO;
    }

    /**
     * 查询用户列表
     */
    public List<Map<String, Object>> userList(Map<String, Object> map) {
        return userDAO.userList(map);
    }

    /**
     * 查询用户数量
     */
    public int userTotal(Map<String, Object> map) {
        return userDAO.userTotal(map);
    }

}
