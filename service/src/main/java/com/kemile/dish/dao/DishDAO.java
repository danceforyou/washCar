package com.kemile.dish.dao;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.dish.domain.Dish;

import java.util.List;
import java.util.Map;

public interface DishDAO extends IBaseDAO<Dish> {

    List<Map<String,Object>> dishList(Map<String, Object> map);
    int dishTotal(Map<String, Object> map);

}
