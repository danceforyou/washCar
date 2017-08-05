package com.kemile.database.service;

import java.util.List;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.database.domain.DataFile;

@SuppressWarnings("rawtypes")
public interface IDatabaseService<D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T> {

	public boolean bark(int mode);
	public boolean restore(String fileName);
	public List<DataFile> findList();
	public boolean removeOne(String fileName);
}
