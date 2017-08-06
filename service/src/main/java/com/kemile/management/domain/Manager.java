package com.kemile.management.domain;

import com.kemile.common.domain.CreateBaseDomain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Manager extends CreateBaseDomain<Integer> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String account;
	private String password;
	private String name;
	private String adress;
	private String phone;
	private Integer type;	//商户类型：0-管理员；1-服务人员
	private Integer status;

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAdress() {
		return adress;
	}

	public void setAdress(String adress) {
		this.adress = adress;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public Integer getStatus() {
		return status;
	}

	@Override
	public void setStatus(Integer status) {
		this.status = status;
	}
}
