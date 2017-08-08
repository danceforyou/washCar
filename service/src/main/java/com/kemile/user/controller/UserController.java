package com.kemile.user.controller;

import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.common.utils.DateUtil;
import com.kemile.user.domain.User;
import com.kemile.user.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/7 0007.
 */

@Controller
@RequestMapping(value = "/User/")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    /**
     * 用户列表
     * @param keyword   查询关键字
     * @param sort      排序字段
     * @param start     起始条数
     * @param limit
     * @return
     */
    @SuppressWarnings("serial")
    @ResponseBody
    @RequestMapping(value = "UserList", method = RequestMethod.GET)
    public Map<String, Object> UserList(
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
        final List<Map<String, Object>> userList = userService.userList(condition);
        return new HashMap<String, Object>() {
            {
                put("rows", userList);
                put("results", userService.userTotal(condition));
            }
        };
    }

    /**
     * 修改管理员信息
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "SaveUserInfo")
    public boolean SaveUserInfo(User user) {
        try {
            if (user.getId() == null) {
                user.setAccount("MM" + DateUtil.getDateNow("yyyyMMddHHmm"));
                int i = userService.insert(user);
            } else {
                int i = userService.update(user);
            }
            return true;
        } catch (Exception e) {
            throw new BizException(BizExceptionEnum.UPDATEERROR.getCode(),
                    BizExceptionEnum.UPDATEERROR.getDesc());
        }
    }

    /**
     * 根据管理员ID查询信息
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "UserInfoByID/{id}")
    public User UserInfoByID(@PathVariable String id) {
        User user = userService.findOne("id", id);
        if (user == null) {
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(),
                    BizExceptionEnum.NOTEXISTS.getDesc());
        } else {
            return user;
        }
    }

    /**
     * 删除管理员
     * @param ids
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "DeleteUserByID")
    public String DeleteUserByID(@RequestParam(value = "ids") String ids) {
        List<String> list = Arrays.asList(ids.split(","));
        int i = userService.deleteByIds(list);
        return "" + i;
    }

}
