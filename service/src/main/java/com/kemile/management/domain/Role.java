package com.kemile.management.domain;

import com.kemile.common.domain.BaseDomain;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by yongrong on 16/4/1.
 */
public class Role extends BaseDomain<Integer> {

    private String name;
    private int status;
    private String desc;
    private Set<Permission> permissionSet = new HashSet<Permission>();


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
    public String getDesc() {
        return desc;
    }
    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Set<Permission> getPermissionSet() {
        return permissionSet;
    }

    public void setPermissionSet(Set<Permission> permissionSet) {
        this.permissionSet = permissionSet;
    }
}
