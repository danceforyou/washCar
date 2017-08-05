package com.kemile.SystemLoginLog.controller;

import com.alibaba.fastjson.JSON;
import com.kemile.SystemLoginLog.domain.SystemLoginLogEntity;
import com.kemile.SystemLoginLog.service.ISystemLoginLogService;
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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 类名称：SystemLoginLogController
 * 创建人：假面
 * 创建时间：2016年09月13日
 * 版本号：1.0v
 */
@Controller
@RequestMapping(value="/SystemLoginLog")
public class SystemLoginLogController {

    Logger logger = Logger.getLogger(SystemLoginLogController.class);

    @Autowired
    private ISystemLoginLogService systemLoginLogService;

    /**
    * 分页查询
    * @param conditions
    * @return BizData4Page
    */
    @ResponseBody
    @RequestMapping(value="/QueryPage")
    public BizData4Page queryPage(@RequestParam Map<String, Object> conditions)throws ParseException {
        logger.debug("查询条件=====>"+conditions);
        BizData4Page<SystemLoginLogEntity> bizData4Page = new BizData4Page<SystemLoginLogEntity>();
        bizData4Page.setPagesize(Integer.parseInt(String.valueOf(conditions.get("iDisplayLength"))));
        int iDisplayStart = Integer.parseInt((String) conditions.get("iDisplayStart"));
        bizData4Page.setPage(iDisplayStart/bizData4Page.getPagesize()+1);

        Map<String, Object> userdata = null;
        try {
            userdata = JSON.parseObject((String) conditions.get("sSearch"), HashMap.class);
        }catch (Exception e){
            userdata = new HashMap<>();
        }
        if (userdata.get("startDate") != null && !userdata.get("startDate").equals("")) {
            userdata.put("startDate", new java.sql.Date(new SimpleDateFormat("yyyy-MM-dd").parse((String) userdata.get("startDate")).getTime()));
        }
        if (userdata.get("endDate") != null && !userdata.get("endDate").equals("")) {
            userdata.put("endDate", new java.sql.Date(new SimpleDateFormat("yyyy-MM-dd").parse((String) userdata.get("endDate")).getTime()));
        }
        bizData4Page.setConditions(userdata);
        String mDataProp = "mDataProp_"+conditions.get("iSortCol_0");
        mDataProp = conditions.get(mDataProp).toString().replace("Str","");
        if(conditions.get("sSortDir_0").equals("asc")){
            systemLoginLogService.queryPageByDataPerm(bizData4Page, mDataProp, SqlOrderEnum.ASC);
        }else {
            systemLoginLogService.queryPageByDataPerm(bizData4Page, mDataProp, SqlOrderEnum.DESC);
        }
        userdata.put("sEcho", conditions.get("sEcho"));
        bizData4Page.setUserdata(userdata);
        return bizData4Page;
    }

    /**
     * 根据实体ID查询
     * @param id
     * @return SystemLoginLogEntity
     */
    @ResponseBody
    @RequestMapping(value="/FindById/{id}")
    public SystemLoginLogEntity findById(@PathVariable String id){
        SystemLoginLogEntity entity = (SystemLoginLogEntity) systemLoginLogService.findOne("id", id);
        logger.debug("查询结果=====>"+entity);
        if (entity!=null){
            return entity;
        }else {
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(), BizExceptionEnum.NOTEXISTS.getDesc());
        }
    }

    /**
     * 查询所有
     * @return List<SystemLoginLogEntity>
     */
    @ResponseBody
    @RequestMapping(value="/FindAll")
    public List<SystemLoginLogEntity> findAll(){
        List<SystemLoginLogEntity> entityList = systemLoginLogService.findAll();
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
            systemLoginLogService.deleteById(id);
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
            return systemLoginLogService.deleteByIds(list);
        }catch (Exception e){
            //e.printStackTrace();
            throw new BizException(BizExceptionEnum.DELERROR.getCode(),BizExceptionEnum.DELERROR.getDesc());
        }
    }

    /**
     * 添加文档
     * @param entity
     * @return SystemLoginLogEntity
     */
    @ResponseBody
    @RequestMapping(value="/Add")
    public SystemLoginLogEntity add(SystemLoginLogEntity entity){
        logger.debug("传入参数=====>"+entity);
        java.sql.Date time=new java.sql.Date(System.currentTimeMillis());
        entity.setTime(time);
        try {
            systemLoginLogService.insert(entity);
            return entity;
        }catch (Exception e){
            //e.printStackTrace();
            throw new BizException(BizExceptionEnum.ADDERROR.getCode(),BizExceptionEnum.ADDERROR.getDesc());
        }
    }

    /**
     * 添加或者修改文档
     * @param entity
     * @return SystemLoginLogEntity
     */
    @ResponseBody
    @RequestMapping(value="/SaveOrUpdate")
    public SystemLoginLogEntity saveOrUpdate(SystemLoginLogEntity entity){
        logger.debug("传入参数=====>"+entity);
        try {
            systemLoginLogService.updateOrSave(entity, entity.getId());
            return entity;
        }catch (Exception e){
            //e.printStackTrace();
            throw new BizException(BizExceptionEnum.UPDATEERROR.getCode(),BizExceptionEnum.UPDATEERROR.getDesc());
        }
    }

}
