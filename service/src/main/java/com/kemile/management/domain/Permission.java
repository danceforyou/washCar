package com.kemile.management.domain;

import com.kemile.common.domain.BaseDomain;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by yongrong on 16/4/1.
 */
public class Permission extends BaseDomain<Long> {

    private String pid;
    private String name;
    private String url;
    private String iconfont;
    private int status = 0;
    private int role_id = 0;
    private Set<ChildPermission> permissionSet = new HashSet<ChildPermission>();

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIconfont() {
        return iconfont;
    }

    public void setIconfont(String iconfont) {
        this.iconfont = iconfont;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Set<ChildPermission> getPermissionSet() {
        return permissionSet;
    }

    public void setPermissionSet(Set<ChildPermission> permissionSet) {
        this.permissionSet = permissionSet;
    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }
}
