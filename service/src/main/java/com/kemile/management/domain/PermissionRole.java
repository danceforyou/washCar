package com.kemile.management.domain;

import com.kemile.common.domain.BaseDomain;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by yongrong on 16/4/1.
 */
public class PermissionRole extends BaseDomain<Long> {


    private String name;
    private String role_id;
    private String permission_id;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole_id() {
        return role_id;
    }

    public void setRole_id(String role_id) {
        this.role_id = role_id;
    }

    public String getPermission_id() {
        return permission_id;
    }

    public void setPermission_id(String permission_id) {
        this.permission_id = permission_id;
    }
}
