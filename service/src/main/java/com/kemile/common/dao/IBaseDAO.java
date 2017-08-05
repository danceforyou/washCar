//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.kemile.common.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;

import com.kemile.common.domain.BaseDomain;

@SuppressWarnings("rawtypes")
public interface IBaseDAO<T extends BaseDomain> {
    int insert(T var1);

    int update(T var1);

    int updateMap(@Param("map") Map<String, Object> var1);

    int updateByCondition(@Param("update") Map<String, Object> var1, @Param("condition") Map<String, Object> var2);

    int insertMap(@Param("map") Map<String, Object> var1);

    int updateNull(T var1);

    int deleteById(Object var1);

    int deleteByIds(@Param("collection") List var1);

    int deleteByCondition(@Param("condition") Map<String, Object> var1);

    int deleteByProperty(@Param("property") String var1, @Param("value") Object var2);

    T fetch(Object var1);

    T findOne(@Param("property") String var1, @Param("value") Object var2, @Param("orderBy") String var3, @Param("sortBy") String var4);

    List<T> findList(@Param("property") String var1, @Param("value") Object var2, @Param("orderBy") String var3, @Param("sortBy") String var4);

    List<T> findAll(@Param("orderBy") String var1, @Param("sortBy") String var2);

    List<T> queryPage(@Param("condition") Map<String, Object> var1, @Param("offset") int var2, @Param("rows") int var3, @Param("orderBy") String var4, @Param("sortBy") String var5);

    List<T> queryPage(@Param("condition") Map<String, Object> var1, @Param("offset") int var2, @Param("rows") int var3, @Param("orderBy") String var4, @Param("sortBy") String var5, @Param("selector") Map<String, Object> var6);

    List<T> like(@Param("condition") Map<String, Object> var1, @Param("orderBy") String var2, @Param("sortBy") String var3);

    List<T> like(@Param("condition") Map<String, Object> var1, @Param("orderBy") String var2, @Param("sortBy") String var3, @Param("selector") Map<String, Object> var4);

    List<T> queryList(@Param("condition") Map<String, Object> var1, @Param("orderBy") String var2, @Param("sortBy") String var3);

    List<T> queryList(@Param("condition") Map<String, Object> var1, @Param("orderBy") String var2, @Param("sortBy") String var3, @Param("selector") Map<String, Object> var4);

    T queryOne(@Param("condition") Map<String, Object> var1, @Param("orderBy") String var2, @Param("sortBy") String var3);

    T queryOne(@Param("condition") Map<String, Object> var1, @Param("orderBy") String var2, @Param("sortBy") String var3, @Param("selector") Map<String, Object> var4);

    int count(@Param("condition") Map<String, Object> var1);

    Object selectMaxId();

    T updateOrSave(@Param("condition") T var1, @Param("condition") Long var2);

    T selectOne(@Param("condition") String var1, @Param("condition") Object var2);

    List<T> selectList(@Param("condition") String var1, @Param("condition") Object var2);

    Class<T> getEntityClass();


}
