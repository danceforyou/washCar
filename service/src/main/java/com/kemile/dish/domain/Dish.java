package com.kemile.dish.domain;

import com.kemile.common.domain.CreateBaseDomain;

/**
 * Created by sb on 2017/5/21.
 */
public class Dish extends CreateBaseDomain<Integer> {

    //类型编号
    private Integer id;
    //类型名称
    private String name;

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
}
