package com.kemile.dish.service.impl;

import com.kemile.dish.dao.DishDAO;
import com.kemile.dish.domain.Dish;
import com.kemile.dish.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;

import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
@Service("DishService")
public class DishServiceImpl extends AbstractPageService<IBaseDAO<Dish>, Dish> implements DishService<IBaseDAO<Dish>, Dish> {

    @Autowired
    private DishDAO dishDAO;

    public IBaseDAO<Dish> getDao() {
        return dishDAO;
    }


    /**
     * 查询用户列表
     */
    public List<Map<String, Object>> dishList(Map<String, Object> map) {
        return dishDAO.dishList(map);
    }

    /**
     * 查询用户数量
     */
    public int dishTotal(Map<String, Object> map) {
        return dishDAO.dishTotal(map);
    }

}
