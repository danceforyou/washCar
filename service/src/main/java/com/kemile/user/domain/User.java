package com.kemile.user.domain;

import com.kemile.common.domain.CreateBaseDomain;

/**
 * Created by Administrator on 2017/8/7 0007.
 */
public class User extends CreateBaseDomain<Integer> {

    private static final long serialVersionUID = 1L;    //主键

    private String phone;   //手机号码
    private String email;   //邮箱
    private String account; //账号
    private String name;    //姓名
    private String nickname;    //昵称
    private Integer sex;    //性别：1-男；2-女
    private Long birth; //生日
    private String password;    //密码
    private Integer headpic;    //头像外键
    private Integer status;     //状态：0-正常；1-停用
    private Long regtime;       //注册时间（时间戳）
    private String province;    //省
    private String city;        //市
    private String openid;      //用户在微信商户appid下的唯一标识

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public Long getBirth() {
        return birth;
    }

    public void setBirth(Long birth) {
        this.birth = birth;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getHeadpic() {
        return headpic;
    }

    public void setHeadpic(Integer headpic) {
        this.headpic = headpic;
    }

    @Override
    public Integer getStatus() {
        return status;
    }

    @Override
    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getRegtime() {
        return regtime;
    }

    public void setRegtime(Long regtime) {
        this.regtime = regtime;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }
}
