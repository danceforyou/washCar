package com.kemile.food.controller;

import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.food.domain.Food;
import com.kemile.food.service.impl.FoodServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sb on 2017/5/22.
 */

@Controller
@RequestMapping(value = "/Food")
public class FoodController {

    @Autowired
    private FoodServiceImpl foodService;



    /**
     * @param keyword
     *            查询关键字
     * @param sort
     *            排序字段
     * @param start
     *            起始条数
     * @param limit
     */
    @SuppressWarnings("serial")
    @ResponseBody
    @RequestMapping(value = "/FoodList", method = RequestMethod.GET)
    public Map<String, Object> FoodList(
            @RequestParam(value = "keyword") final String keyword,
            @RequestParam(value = "sort") final String sort,
            @RequestParam(value = "start", required = true) final String start,
            @RequestParam(value = "limit", required = true) final String limit) {
        final Map<String, Object> condition = new HashMap<String, Object>() {
            {
                put("keyword", keyword.equals("") ? null : keyword);
                put("sort", sort.equals("") ? "id" : sort);
                put("start", start);
                put("limit", limit);
            }
        };
        final List<Map<String, Object>> foodList = foodService.foodList(condition);
        return new HashMap<String, Object>() {
            {
                put("rows", foodList);
                put("results", foodService.foodTotal(condition));
            }
        };
    }


    /**
     * 类型信息
     *
     * 查看类型详细信息
     */
    @ResponseBody
    @RequestMapping(value = "/findOne", method = RequestMethod.GET)
    public Map<String, Object> findOne(
            @RequestParam(value = "id", required = true) String id,
            HttpServletRequest req) {

        Food food = (Food) foodService.findOne(id, null);
        if (food == null) {// 食品不存在
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),
                    BizExceptionEnum.NOTEXISTS.getDesc());
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("foodinfo", food);
        return map;
    }

    /**
     * 根据管理员ID查询信息
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/FoodInfoByID/{id}")
    public Food FoodInfoByID(@PathVariable String id) {
        Food food = foodService.findOne("id", id);
        if (food == null) {
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),
                    BizExceptionEnum.NOTEXISTS.getDesc());
        } else {
            return food;
        }
    }

    /**
     * 修改管理员信息
     * @param food
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/SaveFoodInfo")
    public boolean SaveFoodInfo(Food food) {
        try {
            if (food.getId() == null) {
                int i = foodService.insert(food);
            } else {
                int i = foodService.update(food);
            }
            return true;
        } catch (Exception e) {
            throw new BizException(BizExceptionEnum.UPDATEERROR.getCode(),
                    BizExceptionEnum.UPDATEERROR.getDesc());
        }
    }


    /**
     * 删除管理员
     * @param ids
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/DeleteFoodsByID")
    public String DeleteFoodsByID(@RequestParam(value = "ids") String ids) {
        List<String> list = Arrays.asList(ids.split(","));
        int i = foodService.deleteByIds(list);
        return "" + i;
    }

}
