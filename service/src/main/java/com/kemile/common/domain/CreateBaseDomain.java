//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.kemile.common.domain;

import java.util.Date;

@SuppressWarnings("serial")
public class CreateBaseDomain<T> extends BaseDomain<T> {
	
    private String creator;
    private Long creatorDate;
    private String lastModfier;
    private Long lastModDate = Long.valueOf(System.currentTimeMillis());
    private Integer status;

    public CreateBaseDomain() {
    }

    public String getCreator() {
        return this.creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public java.sql.Date getCreatorDate() {
//        return this.creatorDate;
    	Date date = this.creatorDate == null?new Date():(this.creatorDate.longValue() > 0L?new Date(this.creatorDate.longValue()):null);
        return new java.sql.Date(date.getTime());
    }

    public void setCreatorDate(Long creatorDate) {
        this.creatorDate = creatorDate;
    }

    public String getLastModfier() {
        return this.lastModfier;
    }

    public void setLastModfier(String lastModfier) {
        this.lastModfier = lastModfier;
    }

    public java.sql.Date getLastModDate() {
//        return this.lastModDate;
    	Date date = this.lastModDate == null?new Date():(this.lastModDate.longValue() > 0L?new Date(this.lastModDate.longValue()):null);
    	return new java.sql.Date(date.getTime());
    }

    public void setLastModDate(Long lastModDate) {
        this.lastModDate = lastModDate;
    }

    public Integer getStatus() {
        return this.status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateDateAsDate() {
        return this.creatorDate == null?new Date():(this.creatorDate.longValue() > 0L?new Date(this.creatorDate.longValue()):null);
    }

    public Date getLastModDateAsDate() {
        return this.lastModDate == null?new Date():(this.lastModDate.longValue() > 0L?new Date(this.lastModDate.longValue()):null);
    }
}
