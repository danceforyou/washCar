package com.kemile.food.domain;

import com.kemile.common.domain.CreateBaseDomain;

/**
 * Created by sb on 2017/5/22.
 */
public class Food extends CreateBaseDomain<Integer> {

    //编号
    private Integer id;
    //名称
    private String name;
    //类型编号
    private Integer dishId;
    //类型名称
    private String dishName;
    //价格
    private Double price;

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDishId() {
        return dishId;
    }

    public void setDishId(Integer dishId) {
        this.dishId = dishId;
    }

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
