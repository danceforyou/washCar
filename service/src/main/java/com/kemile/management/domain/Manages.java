package com.kemile.management.domain;

import com.kemile.common.domain.CreateBaseDomain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Manages extends CreateBaseDomain<Integer> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String account;
	private String password;
	private String name;
	private String adress;
	private String phone;
	private Integer status;

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
