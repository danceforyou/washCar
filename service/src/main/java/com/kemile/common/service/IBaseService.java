//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.kemile.common.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.utils.SqlOrderEnum;
import java.util.List;
import java.util.Map;

@SuppressWarnings("rawtypes")
public interface IBaseService<D extends IBaseDAO, T extends BaseDomain> {
	D getDao();

	int add(T var1);

	int edit(T var1);

	int delete(Object var1);

	T view(Object var1);

	List<T> listByPage(Map<String, Object> var1, int var2, int var3);

	List<T> listByPage(Map<String, Object> var1, int var2, int var3,
					   String var4, SqlOrderEnum var5);

	int insert(T var1);

	int update(T var1);

	int insertMap(Map<String, Object> var1);

	int updateMap(Map<String, Object> var1);

	int updateNull(T var1);

	int deleteById(Object var1);

	int deleteByIds(List var1);

	int deleteByCondition(Map<String, Object> var1);

	int deleteByProperty(String var1, Object var2);

	T fetch(Object var1);

	T findOne(String var1, Object var2);

	List<T> findList(String var1, Object var2);

	List<T> findList(String var1, Object var2, String var3, SqlOrderEnum var4);

	List<T> findAll();

	List<T> findAll(String var1, SqlOrderEnum var2);

	List<T> queryPage(Map<String, Object> var1, int var2, int var3);

	List<T> queryPage(Map<String, Object> var1, int var2, int var3,
					  String var4, SqlOrderEnum var5);

	List<T> queryPage(Map<String, Object> var1, int var2, int var3,
					  String var4, SqlOrderEnum var5, Map<String, Object> var6);

	List<T> like(Map<String, Object> var1);

	List<T> like(Map<String, Object> var1, String var2, SqlOrderEnum var3);

	List<T> like(Map<String, Object> var1, String var2, SqlOrderEnum var3,
				 Map<String, Object> var4);

	List<T> queryList(Map<String, Object> var1, String var2, String var3);

	List<T> queryList(Map<String, Object> var1, String var2, String var3,
					  Map<String, Object> var4);

	T queryOne(Map<String, Object> var1);

	T queryOne(Map<String, Object> var1, String var2, SqlOrderEnum var3);

	T queryOne(Map<String, Object> var1, String var2, SqlOrderEnum var3,
			   Map<String, Object> var4);

	int count(Map<String, Object> var1);

	Object selectMaxId();

	void updateOrSave(T var1, Object var2);

	T selectOne(String var1, Object var2);

	List<T> selectList(String var1, Object var2);
}
