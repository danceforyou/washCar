package com.kemile.SystemLoginLog.domain;

import com.kemile.common.domain.BaseDomain;

/**
 * 类名称：SystemLoginLogEntity
 * 创建人：假面
 * 创建时间：2016年09月13日
 * 版本号：1.0v
 */
public class SystemLoginLogEntity extends BaseDomain<String> {

    private String type;//类型

    private java.util.Date time;//登录时间

    private String data;//内容

    private String ip;//ip

    private String name;//用户名


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public java.util.Date getTime() {
        return time;
    }

    public void setTime(java.util.Date time) {
        this.time = time;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}