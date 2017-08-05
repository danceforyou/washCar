package com.kemile.food.dao;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.food.domain.Food;

import java.util.List;
import java.util.Map;

public interface FoodDAO extends IBaseDAO<Food> {

    List<Map<String,Object>> foodList(Map<String, Object> map);
    int foodTotal(Map<String, Object> map);

}
