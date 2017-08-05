package com.kemile.controller.system;

import com.alibaba.fastjson.JSON;
import com.kemile.${objectName}.domain.${objectName}Entity;
import com.kemile.${objectName}.service.I${objectName}Service;
import com.kemile.common.domain.view.BizData4Page;
import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.common.utils.Logger;
import com.kemile.common.utils.SqlOrderEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 类名称：${objectName}Controller
 * 创建人：假面
 * 创建时间：${nowDate?string("yyyy年MM月dd日")}
 * 版本号：1.0v
 */
@Controller
@RequestMapping(value="/System/${objectName}")
public class ${objectName}Controller {

    Logger logger = Logger.getLogger(${objectName}Controller.class);

    @Autowired
    private I${objectName}Service ${objectName?uncap_first}Service;

    /**
    * 分页查询
    * @param conditions
    * @return BizData4Page
    */
    @ResponseBody
    @RequestMapping(value="/QueryPage")
    public BizData4Page queryPage(@RequestParam Map<String, Object> conditions){
        logger.debug("查询条件=====>"+conditions);
        BizData4Page<${objectName}Entity> bizData4Page = new BizData4Page<${objectName}Entity>();
        bizData4Page.setPagesize(Integer.parseInt(String.valueOf(conditions.get("iDisplayLength"))));
        int iDisplayStart = Integer.parseInt((String) conditions.get("iDisplayStart"));
        bizData4Page.setPage(iDisplayStart/bizData4Page.getPagesize()+1);

        Map<String, Object> userdata = null;
        try {
            userdata = JSON.parseObject((String) conditions.get("sSearch"), HashMap.class);
        }catch (Exception e){
            userdata = new HashMap<>();
        }
        bizData4Page.setConditions(userdata);
        String mDataProp = "mDataProp_"+conditions.get("iSortCol_0");
        mDataProp = conditions.get(mDataProp).toString().replace("Str","");
        if(conditions.get("sSortDir_0").equals("asc")){
            ${objectName?uncap_first}Service.queryPageByDataPerm(bizData4Page, mDataProp, SqlOrderEnum.ASC);
        }else {
            ${objectName?uncap_first}Service.queryPageByDataPerm(bizData4Page, mDataProp, SqlOrderEnum.DESC);
        }
        userdata.put("sEcho", conditions.get("sEcho"));
        bizData4Page.setUserdata(userdata);
        return bizData4Page;
    }

    /**
     * 根据实体ID查询
     * @param id
     * @return ${objectName}Entity
     */
    @ResponseBody
    @RequestMapping(value="/FindById/{id}")
    public ${objectName}Entity findById(@PathVariable String id){
        ${objectName}Entity entity = (${objectName}Entity) ${objectName?uncap_first}Service.findOne("id", id);
        logger.debug("查询结果=====>"+entity);
        if (entity!=null){
            return entity;
        }else {
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(), BizExceptionEnum.NOTEXISTS.getDesc());
        }
    }

    /**
     * 查询所有
     * @return List<${objectName}Entity>
     */
    @ResponseBody
    @RequestMapping(value="/FindAll")
    public List<${objectName}Entity> findAll(){
        List<${objectName}Entity> entityList = ${objectName?uncap_first}Service.findAll();
        logger.debug("查询结果集=====>"+entityList);
        if (entityList!=null && entityList.size()>0){
            return entityList;
        }else {
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(), BizExceptionEnum.NOTEXISTS.getDesc());
        }
    }

    /**
     * 物理删除文档
     * @param id
     * @return true,false
     */
    @ResponseBody
    @RequestMapping(value="/Remove")
    public boolean remove(@RequestParam String id){
        logger.debug("传入参数=====>"+id);
        try {
            ${objectName?uncap_first}Service.deleteById(id);
            return true;
        }catch (Exception e){
            //e.printStackTrace();
            throw new BizException(BizExceptionEnum.DELERROR.getCode(),BizExceptionEnum.DELERROR.getDesc());
        }
    }

    /**
    * 物理删除文档
    * @param ids
    * @return true,false
    */
    @ResponseBody
    @RequestMapping(value="/Removes")
    public int removes(String ids){
        logger.debug("传入参数=====>ids="+ids);
        try {
            List<String> list = Arrays.asList(ids.split(","));
            return ${objectName?uncap_first}Service.deleteByIds(list);
        }catch (Exception e){
            //e.printStackTrace();
            throw new BizException(BizExceptionEnum.DELERROR.getCode(),BizExceptionEnum.DELERROR.getDesc());
        }
    }

    /**
     * 添加文档
     * @param entity
     * @return ${objectName}Entity
     */
    @ResponseBody
    @RequestMapping(value="/Add")
    public ${objectName}Entity add(${objectName}Entity entity){
        logger.debug("传入参数=====>"+entity);
        try {
            ${objectName?uncap_first}Service.insert(entity);
            return entity;
        }catch (Exception e){
            //e.printStackTrace();
            throw new BizException(BizExceptionEnum.ADDERROR.getCode(),BizExceptionEnum.ADDERROR.getDesc());
        }
    }

    /**
     * 添加或者修改文档
     * @param entity
     * @return ${objectName}Entity
     */
    @ResponseBody
    @RequestMapping(value="/SaveOrUpdate")
    public ${objectName}Entity saveOrUpdate(${objectName}Entity entity){
        logger.debug("传入参数=====>"+entity);
        try {
            ${objectName?uncap_first}Service.updateOrSave(entity, entity.getId());
            return entity;
        }catch (Exception e){
            //e.printStackTrace();
            throw new BizException(BizExceptionEnum.UPDATEERROR.getCode(),BizExceptionEnum.UPDATEERROR.getDesc());
        }
    }

}
