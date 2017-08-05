package com.kemile.sysconfig.domain;

import com.kemile.common.domain.BaseDomain;

public class SysConfig extends BaseDomain<Long> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String objectname;
	private String copyright;
	private String icp;
	private String statisticalcode;
	private String ipwhitelist;
	private String maxloginnumber;
	private String uploadpath;
	private String snsuid;
	private String snskey;
	private double minwithdraw;
	
	public String getUploadpath() {
		if(uploadpath==null || uploadpath.equals("")){
			uploadpath = "uploadfile";
		}
		return uploadpath;
	}
	public void setUploadpath(String uploadpath) {
		this.uploadpath = uploadpath;
	}
	public String getObjectname() {
		return objectname;
	}
	public void setObjectname(String objectname) {
		this.objectname = objectname;
	}
	public String getCopyright() {
		return copyright;
	}
	public void setCopyright(String copyright) {
		this.copyright = copyright;
	}
	public String getIcp() {
		return icp;
	}
	public void setIcp(String icp) {
		this.icp = icp;
	}
	public String getStatisticalcode() {
		return statisticalcode;
	}
	public void setStatisticalcode(String statisticalcode) {
		this.statisticalcode = statisticalcode;
	}
	public String getIpwhitelist() {
		return ipwhitelist;
	}
	public void setIpwhitelist(String ipwhitelist) {
		this.ipwhitelist = ipwhitelist;
	}
	public String getMaxloginnumber() {
		return maxloginnumber;
	}
	public void setMaxloginnumber(String maxloginnumber) {
		this.maxloginnumber = maxloginnumber;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getSnsuid() {
		return snsuid;
	}
	public void setSnsuid(String snsuid) {
		this.snsuid = snsuid;
	}
	public String getSnskey() {
		return snskey;
	}
	public void setSnskey(String snskey) {
		this.snskey = snskey;
	}
	public double getMinwithdraw() {
		return minwithdraw;
	}
	public void setMinwithdraw(double minwithdraw) {
		this.minwithdraw = minwithdraw;
	}
	
}
