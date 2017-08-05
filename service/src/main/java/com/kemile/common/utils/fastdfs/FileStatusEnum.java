package com.kemile.common.utils.fastdfs;

/**
 * Created by yongrong on 16/3/26.
 */
public enum FileStatusEnum {

    NORMAL(1,"正常"),
    DELETED(2,"已删除");

    private int code;
    private String desc;

    private FileStatusEnum(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
