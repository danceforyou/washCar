package com.kemile.common.restful;

import java.io.Serializable;

import com.kemile.common.restful.exception.BizException;


public class ResponseT<T> implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5369667759174813049L;
	
	private String rtnCode;
    private String msg;
    private String developMsg;
    private String uri;
    private long ts;
    private T bizData;
    
    public ResponseT() {
        this.ts = System.currentTimeMillis();
    }
    public ResponseT(RtnCodeEnum rtnCode) {
        this.ts = System.currentTimeMillis();
        this.rtnCode = rtnCode.getValue();
    }
    public ResponseT(BizException bizException) {
        this(bizException, false);
    }
    public ResponseT(BizException bizException, boolean isDebug) {
        this.ts = System.currentTimeMillis();
        this.rtnCode = bizException.getErrorCode();
        this.msg = bizException.getMsg();
        if(isDebug) {
            this.developMsg = bizException.getDevelopMsg();
        }
        this.uri = bizException.getUri();
    }
    
    public String getRtnCode() {
        return this.rtnCode;
    }

    public void setRtnCode(String rtnCode) {
        this.rtnCode = rtnCode;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getUri() {
        return this.uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public T getBizData() {
        return this.bizData;
    }

    public void setBizData(T bizData) {
        this.bizData = bizData;
    }

    public String getDevelopMsg() {
        return this.developMsg;
    }

    /** @deprecated */
    public void setDevelopMsg(String developMsg) {
        this.developMsg = developMsg;
    }

    /** @deprecated */
    public void setTs(long ts) {
        this.ts = ts;
    }

    public long getTs() {
        return this.ts;
    }
}
