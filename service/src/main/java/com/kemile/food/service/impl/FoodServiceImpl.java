package com.kemile.food.service.impl;

import com.kemile.food.dao.FoodDAO;
import com.kemile.food.domain.Food;
import com.kemile.food.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;

import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
@Service("FoodsService")
public class FoodServiceImpl extends AbstractPageService<IBaseDAO<Food>, Food> implements FoodService<IBaseDAO<Food>, Food> {

    @Autowired
    private FoodDAO foodDAO;

    public IBaseDAO<Food> getDao() {
        return foodDAO;
    }


    /**
     * 查询用户列表
     */
    public List<Map<String, Object>> foodList(Map<String, Object> map) {
        return foodDAO.foodList(map);
    }

    /**
     * 查询用户数量
     */
    public int foodTotal(Map<String, Object> map) {
        return foodDAO.foodTotal(map);
    }

}
