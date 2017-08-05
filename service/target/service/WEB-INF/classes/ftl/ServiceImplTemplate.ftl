package com.kemile.service.system.impl;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.service.impl.AbstractPageService;
import com.kemile.${objectName}.dao.${objectName}DAO;
import com.kemile.${objectName}.domain.${objectName}Entity;
import com.kemile.${objectName}.service.I${objectName}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 类名称：${objectName}Service
 * 创建人：假面
 * 创建时间：${nowDate?string("yyyy年MM月dd日")}
 * 版本号：1.0v
 */
@Service("${objectName?uncap_first}Service")
public class ${objectName}Service  extends AbstractPageService<IBaseDAO<${objectName}Entity>, ${objectName}Entity> implements I${objectName}Service<IBaseDAO<${objectName}Entity>, ${objectName}Entity> {

    @Autowired
    private ${objectName}DAO ${objectName?uncap_first}DAO;

    @Override
    public IBaseDAO<${objectName}Entity> getDao() {
        return ${objectName?uncap_first}DAO;
    }
}
