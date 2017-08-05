package com.kemile.common.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * 获取spring中bean的辅助工具类
 * @author yongrong
 *
 */
public class SpringContextUtil implements ApplicationContextAware {
	
	private static ApplicationContext applicationContext;
	 
    public static Object getBean(String beanName) {
        return applicationContext.getBean(beanName);
    }
 
    public static <T> T getBean(String beanName, Class<T> clazz) {
        return clazz.cast(getBean(beanName));
    }
 
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException{
    	SpringContextUtil.applicationContext = applicationContext;
    }
}
/*
 * private static ApplicationContext applicationContext; // Spring应用上下文环境

	public void setApplicationContext(ApplicationContext arg0)
			throws BeansException {
		SpringContextUtil.applicationContext = arg0;
	}
	public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }
 
    public static Object getBean(String name) throws BeansException {
        return applicationContext.getBean(name);
    }
 
    public static Object getBean(String name, Class<?> requiredType)
            throws BeansException {
        return applicationContext.getBean(name, requiredType);
    }
 
    public static boolean containsBean(String name) {
        return applicationContext.containsBean(name);
    }
 
    public static boolean isSingleton(String name) throws NoSuchBeanDefinitionException {
        return applicationContext.isSingleton(name);
    }
 
    public static Class<?> getType(String name)    throws NoSuchBeanDefinitionException {
        return applicationContext.getType(name);
    }
 
    public static String[] getAliases(String name) throws NoSuchBeanDefinitionException {
        return applicationContext.getAliases(name);
    }
 * 
 * 
 * 
 * 
 */
