package com.kemile.common.restful.exception;

public enum BizExceptionEnum {
    LOGIN_PASSERR("0001234","用户名或密码错误"),
    ILLEGALIP("0000005","非法的访问IP地址"),
	REQUIRED("0008888", "不能为空"),
    LENGTH("0007777", "长度必须为："),
    MAXLENGTH("0009999", "不能超过长度："),
    EXISTS("0005555", "所填写信息不唯一"),
    NOTEXISTS("0004444", "非法操作或不存在"),
    AUTHFAILURE("0006666", "授权登陆失效,请重新登陆!"),
    ADDERROR("0003333", "新增失败"),
    UPDATEERROR("0002222", "修改失败"),
    DELERROR("0001111", "删除失败"),
    DENY("0001112", "没有相应的操作权限"),
    AUTHERROR("0001113", "登录验权失败"),
	NOTVALIDATION("0001114", "验证码不正确"),
	IMAGESUPLOAD("0500001","文件上传发生异常"),
	PATHISNOTNULL("0500002","上传路径不能为空"),
	IMAGESIZEISILLEGAL("0500003","图片尺寸不合法，请重新上传！"),
	IMAGEFORMATISNOTVALID("0500004","图片格式不合法，请重新上传！"),
	ISNOTEMPTY("0500005","文件不存在！"),
	UIDERROR("0300001","用户ID不能为空"),
	DATAERROR("0300028","内容不能为空"),
	MESSIDERROR("0300030","意见ID不能为空"),
    LOGIDERROR("0300031","日志ID不能为空"),
    PASSWORDERROR("0300032","两次密码不一致"),
    VRCODEERROR("0300033","验证码错误"),
    DISKUNENOUGH("0300034","网盘容量不足"),
    ACCOUNTBLOCK("0300035","账户已被停用");
    private String code;
    private String desc;

    private BizExceptionEnum(String code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDesc() {
        return this.desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
