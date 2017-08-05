package com.kemile.common.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;

/**
 * Created by yongrong on 16/4/7.
 */
public class Ehcache {

    private static CacheManager cacheManager;


    public static Object getTeacherEhcache(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("teacherCache");
        // 获取缓存中的对象，注意添加到cache中对象要序列化 实现Serializable接口
        System.out.println(cache.get(key));
        Element element = cache.get(key);
        if (element!=null){
            return element.getObjectValue();
        }else {
            return null;
        }
    }

    public static void setTeacherEhcache(String key, Object value){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("teacherCache");
        // 添加数据到缓存中
        Element element = new Element(key, value);
        cache.put(element);
    }

    public static void teacherInvalidate(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("teacherCache");
        cache.remove(key);
    }

    public static Object getUserEhcache(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("userCache");
        // 获取缓存中的对象，注意添加到cache中对象要序列化 实现Serializable接口
        System.out.println(cache.get(key));
        Element element = cache.get(key);
        if (element!=null){
            return element.getObjectValue();
        }else {
            return null;
        }
    }

    public static void setUserEhcache(String key, Object value){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("userCache");
        // 添加数据到缓存中
        Element element = new Element(key, value);
        cache.put(element);
    }

    public static void userInvalidate(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("userCache");
        cache.remove(key);
    }


    public static Object getSchoolEhcache(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("schoolCache");
        // 获取缓存中的对象，注意添加到cache中对象要序列化 实现Serializable接口
        System.out.println(cache.get(key));
        Element element = cache.get(key);
        if (element!=null){
            return element.getObjectValue();
        }else {
            return null;
        }
    }

    public static void setSchoolEhcache(String key, Object value){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("schoolCache");
        // 添加数据到缓存中
        Element element = new Element(key, value);
        cache.put(element);
    }

    public static void schoolInvalidate(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("schoolCache");
        cache.remove(key);
    }

    public static Object getDuanxinEhcache(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("duanxin");
        // 获取缓存中的对象，注意添加到cache中对象要序列化 实现Serializable接口
        System.out.println(cache.get(key));
        Element element = cache.get(key);
        if (element!=null){
            return element.getObjectValue();
        }else {
            return null;
        }
    }

    public static void setDuanxinEhcache(String key, Object value){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("duanxin");
        // 添加数据到缓存中
        Element element = new Element(key, value);
        cache.put(element);
    }

    public static void duanxinInvalidate(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("duanxin");
        cache.remove(key);
    }

    // 删除缓存
//        cache.remove("key");
//        cache.removeAll();

    // 获取缓存管理器中的缓存配置名称
//        for (String cacheName : cacheManager.getCacheNames()) {
//            System.out.println(cacheName);
//        }
    // 获取所有的缓存对象
//        for (Object key : cache.getKeys()) {
//            System.out.println(key);
//        }

    // 得到缓存中的对象数
//        cache.getSize();
    // 得到缓存对象占用内存的大小
//        cache.getMemoryStoreSize();
//         得到缓存读取的命中次数
//        cache.getStatistics().getCacheHits();
    // 得到缓存读取的错失次数
//        cache.getStatistics().getCacheMisses();
    //代理商相关
    public static Object getAgencyEhcache(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("agencyCache");
        // 获取缓存中的对象，注意添加到cache中对象要序列化 实现Serializable接口
        System.out.println(cache.get(key));
        Element element = cache.get(key);
        if (element!=null){
            return element.getObjectValue();
        }else {
            return null;
        }
    }

    public static void setAgencyEhcache(String key, Object value){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("agencyCache");
        // 添加数据到缓存中
        Element element = new Element(key, value);
        cache.put(element);
    }

    public static void agencyInvalidate(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("agencyCache");
        cache.remove(key);
    }

    public static Object getVCodeCacheEhcache(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("vCodeCache");
        // 获取缓存中的对象，注意添加到cache中对象要序列化 实现Serializable接口
        System.out.println(cache.get(key));
        Element element = cache.get(key);
        if (element!=null){
            return element.getObjectValue();
        }else {
            return null;
        }
    }

    public static void setVCodeCacheEhcache(String key, Object value){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("vCodeCache");
        // 添加数据到缓存中
        Element element = new Element(key, value);
        cache.put(element);
    }

    public static void vCodeCacheInvalidate(String key){
        cacheManager = (CacheManager)SpringContextUtil.getBean("ehCacheManager");
        // 获取ehcache配置文件中的一个cache
        Cache cache = cacheManager.getCache("vCodeCache");
        cache.remove(key);
    }
}
