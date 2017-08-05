package com.kemile.dish.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;


import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.common.utils.SqlOrderEnum;
import com.kemile.dish.domain.Dish;
import com.kemile.dish.service.impl.DishServiceImpl;
import com.kemile.management.domain.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import com.kemile.common.utils.RegexUtil;


@Controller
@RequestMapping(value = "/Dish")
public class DishController {

    @Autowired
    private DishServiceImpl dishService;



    /**
     * 类型列表
     *
     * @param keyword
     *            查询关键字
     * @param sort
     *            排序字段
     * @param start
     *            起始条数
     * @param limit
     * @return
     */
    @SuppressWarnings("serial")
    @ResponseBody
    @RequestMapping(value = "/DishList", method = RequestMethod.GET)
    public Map<String, Object> DishList(
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
        final List<Map<String, Object>> dishList = dishService.dishList(condition);
        return new HashMap<String, Object>() {
            {
                put("rows", dishList);
                put("results", dishService.dishTotal(condition));
            }
        };
    }


    /**
     * 查询类型列表---添加食品信息是需要用到
     * @return
     */
    @ResponseBody
    @RequestMapping(value="/DishList1", method=RequestMethod.POST)
    public List<Dish> DishList1(){
        List<Dish> list = dishService.findList("'0'","0","id", SqlOrderEnum.ASC);
        if (list!=null && !list.isEmpty()){
            return list;
        }else {
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(), BizExceptionEnum.NOTEXISTS.getDesc());
        }
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

        Dish dish = (Dish) dishService.findOne(id, null);
        if (dish == null) {// 用户不存在
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),
                    BizExceptionEnum.NOTEXISTS.getDesc());
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("dishinfo", dish);
        return map;
    }


    /**
     * 修改类型信息
     *
     * @param id
     *            用户id
     * @param name
     *            用户真实姓名
     * @return
     */
    @SuppressWarnings("serial")
    @ResponseBody
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public boolean dishSave(
            @RequestParam(value = "id", required = true) final Integer id,
            @RequestParam(value = "name", required = true) final String name) {
        if (!RegexUtil.isChinese(name)) {// 真实姓名必须是汉字
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),
                    BizExceptionEnum.NOTEXISTS.getDesc());
        }
        int b = dishService.update(new Dish() {
            {
                setId(id);
                setName(name);
            }
        });
        return b > 0 ? true : false;
    }


    /**
     * 修改用户信息
     */
    @ResponseBody
    @RequestMapping(value = "/saveInfo", method = RequestMethod.POST)
    public boolean saveUserInfo(
            HttpServletRequest req,
            final Dish dish	){
        if (!RegexUtil.isChinese(dish.getName())) {// 真实姓名必须是汉字
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),
                    BizExceptionEnum.NOTEXISTS.getDesc());
        }
        try {
            int i = dishService.insert(dish);
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
    @RequestMapping(value = "/DeletDishByID")
    public String DeletDishByID(@RequestParam(value = "ids") String ids) {
        List<String> list = Arrays.asList(ids.split(","));
        int i = dishService.deleteByIds(list);
        return "" + i;
    }




}
