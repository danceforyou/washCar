//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.kemile.common.service.impl;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.domain.CreateBaseDomain;
import com.kemile.common.service.IBaseService;
import com.kemile.common.service.IDaoAware;
import com.kemile.common.utils.SqlOrderEnum;
import java.util.List;
import java.util.Map;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.util.StringUtils;

@SuppressWarnings("rawtypes")
@CacheConfig(
    cacheNames = {"allunused"}
)
public abstract class AbstractBaseService<D extends IBaseDAO, T extends BaseDomain> implements IBaseService<D, T>, IDaoAware<D, T> {
    
	public AbstractBaseService() {
    }

	@SuppressWarnings("unchecked")
	public final int add(T entity) {
        this.enhanceNewCreateBaseDomain(entity);
        return this.getDao().insert(entity);
    }

    @CacheEvict(
        key = "#entity.id"
    )
    @SuppressWarnings("unchecked")
    public final int edit(T entity) {
        this.enhanceCreateBaseDomain(entity);
        return this.getDao().update(entity);
    }

    @CacheEvict(
        key = "#id"
    )
    public final int delete(Object id) {
        return this.getDao().deleteById(id);
    }

    public final int deleteByIds(List list) {
        return this.getDao().deleteByIds(list);
    }

    @Cacheable(
        key = "#id"
    )
    @SuppressWarnings("unchecked")
    public final T view(Object id) {
        return (T) this.getDao().fetch(id);
    }
    
    @SuppressWarnings("unchecked")
    public final int insert(T entity) {
        this.enhanceNewCreateBaseDomain(entity);
        return this.getDao().insert(entity);
    }

    @CacheEvict(
        key = "#entity.id"
    )
    @SuppressWarnings("unchecked")
    public final int update(T entity) {
        this.enhanceCreateBaseDomain(entity);
        return this.getDao().update(entity);
    }


    @CacheEvict(
        key = "#entity.id"
    )
    @SuppressWarnings("unchecked")
    public final int updateNull(T entity) {
        this.enhanceCreateBaseDomain(entity);
        return this.getDao().updateNull(entity);
    }

    @CacheEvict(
        key = "#entity.id"
    )
    public final int deleteById(Object id) {
        return this.getDao().deleteById(id);
    }

    @CacheEvict(
        allEntries = true
    )
    public final int deleteByProperty(String property, Object value) {
        return this.getDao().deleteByProperty(property, value);
    }

    @Cacheable(
        key = "#id"
    )
    @SuppressWarnings("unchecked")
    public final T fetch(Object id) {
        return (T) this.getDao().fetch(id);
    }

    @SuppressWarnings("unchecked")
    @Cacheable
    public final T findOne(String property, Object value) {
        return (T) this.getDao().findOne(property, value, (String)null, (String)null);
    }

    @SuppressWarnings("unchecked")
    @Cacheable
    public final List findList(String property, Object value) {
        return this.getDao().findList(property, value, (String)null, (String)null);
    }

    @SuppressWarnings("unchecked")
    @Cacheable
    public final List findList(String property, Object value, String orderBy, SqlOrderEnum sqlOrderEnum) {
        return this.getDao().findList(property, value, orderBy, sqlOrderEnum.getAction());
    }

    @SuppressWarnings("unchecked")
    public final List findAll() {
        return this.getDao().findAll((String)null, (String)null);
    }

    @SuppressWarnings("unchecked")
    public final List findAll(String orderBy, SqlOrderEnum sqlOrderEnum) {
        return this.getDao().findAll(orderBy, sqlOrderEnum.getAction());
    }

    @SuppressWarnings("unchecked")
    @Cacheable
    public final List like(Map<String, Object> condition) {
        return this.getDao().like(condition, (String)null, (String)null);
    }

    @SuppressWarnings("unchecked")
    @Cacheable
    public final List like(Map<String, Object> condition, String orderBy, SqlOrderEnum sqlOrderEnum) {
        return this.getDao().like(condition, orderBy, sqlOrderEnum.getAction());
    }

    public final Object selectMaxId() {
        return this.getDao().selectMaxId();
    }

    @CacheEvict(
        key = "#id"
    )
    @SuppressWarnings("unchecked")
    public final void updateOrSave(T entity, Object id) {
        if(id != null && !StringUtils.isEmpty(id)) {
            this.enhanceCreateBaseDomain(entity);
            entity.setId(id);
            this.getDao().update(entity);
        } else {
            this.enhanceNewCreateBaseDomain(entity);
            this.getDao().insert(entity);
        }

    }

    @SuppressWarnings("unchecked")
    public final T selectOne(String mapperId, Object obj) {
        return (T) this.getDao().selectOne(mapperId, obj);
    }

    @SuppressWarnings("unchecked")
    public final List selectList(String mapperId, Object obj) {
        return this.getDao().selectList(mapperId, obj);
    }

    @SuppressWarnings("unchecked")
    public final int count(Map condition) {
        return this.getDao().count(condition);
    }

    @SuppressWarnings("unchecked")
    public final T queryOne(Map condition) {
        return (T) this.getDao().queryOne(condition, (String)null, (String)null);
    }

    @SuppressWarnings("unchecked")
    public final T queryOne(Map condition, String orderBy, SqlOrderEnum sqlOrderEnum) {
        return (T) this.getDao().queryOne(condition, orderBy, sqlOrderEnum.getAction());
    }

    @SuppressWarnings("unchecked")
    public final List queryList(Map condition, String orderBy, String sortBy) {
        return this.getDao().queryList(condition, orderBy, sortBy);
    }

    @SuppressWarnings("unchecked")
    public final List queryPage(Map condition, int offset, int rows) {
        return this.getDao().queryPage(condition, offset, rows, (String)null, (String)null);
    }

    @SuppressWarnings("unchecked")
    public List<T> queryPage(Map<String, Object> condition, int offset, int rows, String orderBy, SqlOrderEnum sqlOrderEnum) {
        return this.getDao().queryPage(condition, offset, rows, orderBy, sqlOrderEnum.getAction());
    }

    @CacheEvict(
        allEntries = true
    )
    @SuppressWarnings("unchecked")
    public final int deleteByCondition(Map condition) {
        return this.getDao().deleteByCondition(condition);
    }

    @CacheEvict(
        allEntries = true
    )
    @SuppressWarnings("unchecked")
    public final int updateMap(Map entityMap) {
        this.enhanceCreateBaseDomain(entityMap);
        return this.getDao().updateMap(entityMap);
    }

    @SuppressWarnings("unchecked")
    public final int insertMap(Map entityMap) {
        this.enhanceNewCreateBaseDomain(entityMap);
        return this.getDao().insertMap(entityMap);
    }

    @SuppressWarnings("unchecked")
    public final List listByPage(Map condition, int offset, int rows) {
        return this.getDao().queryPage(condition, offset, rows, (String)null, (String)null);
    }

    @SuppressWarnings("unchecked")
    public final List listByPage(Map condition, int offset, int rows, String orderBy, SqlOrderEnum sqlOrderEnum) {
        return this.getDao().queryPage(condition, offset, rows, orderBy, sqlOrderEnum.getAction());
    }

    private final T enhanceCreateBaseDomain(T entity) {
        if(entity instanceof CreateBaseDomain) {
            ((CreateBaseDomain)entity).setLastModDate(Long.valueOf(System.currentTimeMillis()));
        }

        return entity;
    }

    private final T enhanceNewCreateBaseDomain(T entity) {
        if(entity instanceof CreateBaseDomain) {
            if(((CreateBaseDomain)entity).getCreatorDate() == null) {
                ((CreateBaseDomain)entity).setCreatorDate(Long.valueOf(System.currentTimeMillis()));
            }

            if(((CreateBaseDomain)entity).getStatus() == null) {
                ((CreateBaseDomain)entity).setStatus(Integer.valueOf(0));
            }

            if(((CreateBaseDomain)entity).getLastModDate() == null) {
                ((CreateBaseDomain)entity).setLastModDate(Long.valueOf(0L));
            }
//
//            if(((CreateBaseDomain)entity).getCreator() == null) {
//                ((CreateBaseDomain)entity).setCreator(Long.valueOf(0L));
//            }
//
//            if(((CreateBaseDomain)entity).getLastModfier() == null) {
//                ((CreateBaseDomain)entity).setLastModfier(Long.valueOf(0L));
//            }
        }

        return entity;
    }

    @SuppressWarnings("unchecked")
    private final Map enhanceCreateBaseDomain(Map entityMap) {
        entityMap.put("lastModDate", Long.valueOf(System.currentTimeMillis()));
        return entityMap;
    }

    @SuppressWarnings("unchecked")
    private final Map enhanceNewCreateBaseDomain(Map entityMap) {
        entityMap.put("createDate", Long.valueOf(System.currentTimeMillis()));
        return entityMap;
    }

    public List<T> queryPage(Map<String, Object> condition, int offset, int rows, String orderBy, SqlOrderEnum sqlOrderEnum, Map<String, Object> selectorpage) {
        return null;
    }

    public List<T> like(Map<String, Object> condition, String orderBy, SqlOrderEnum sqlOrderEnum, Map<String, Object> selector) {
        return null;
    }

    public List<T> queryList(Map<String, Object> condition, String orderBy, String sortBy, Map<String, Object> selector) {
        return null;
    }

    public T queryOne(Map<String, Object> condition, String orderBy, SqlOrderEnum sqlOrderEnum, Map<String, Object> selector) {
        return null;
    }
}
