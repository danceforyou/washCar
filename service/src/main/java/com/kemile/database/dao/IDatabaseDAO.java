package com.kemile.database.dao;

import java.util.List;
import java.util.Map;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.database.domain.DataFile;

public interface IDatabaseDAO extends IBaseDAO<DataFile> {

	Map<String,Object> select(String sql);
	List<Map<String,Object>> selectAsList(String sql);
}
