package com.kemile.SystemOrder.controller;

import com.alibaba.fastjson.JSON;
import com.kemile.SystemOrder.domain.SystemOrderEntity;
import com.kemile.SystemOrder.service.ISystemOrderService;
import com.kemile.common.domain.view.BizData4Page;
import com.kemile.common.restful.exception.BizException;
import com.kemile.common.restful.exception.BizExceptionEnum;
import com.kemile.common.utils.Global;
import com.kemile.common.utils.Logger;
import com.kemile.common.utils.SqlOrderEnum;
import com.kemile.management.domain.Manages;
import org.apache.poi.hssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 类名称：SystemOrderController
 * 创建人：假面
 * 创建时间：2016年09月06日
 * 版本号：1.0v
 */
@Controller
@RequestMapping(value="/SystemOrder")
public class SystemOrderController {

    Logger logger = Logger.getLogger(SystemOrderController.class);

    @Autowired
    private ISystemOrderService systemOrderService;

    /**
    * 分页查询
    * @param conditions
    * @return BizData4Page
    */
    @ResponseBody
    @RequestMapping(value="/QueryPage")
    public BizData4Page queryPage(@RequestParam Map<String, Object> conditions) throws ParseException {
        logger.debug("查询条件=====>"+conditions);
        BizData4Page<SystemOrderEntity> bizData4Page = new BizData4Page<SystemOrderEntity>();
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
            systemOrderService.queryPageByDataPerm(bizData4Page, mDataProp, SqlOrderEnum.ASC);
        }else {
            systemOrderService.queryPageByDataPerm(bizData4Page, mDataProp, SqlOrderEnum.DESC);
        }

        userdata.put("sEcho", conditions.get("sEcho"));
        bizData4Page.setUserdata(userdata);
        return bizData4Page;
    }

    /**
     * 根据实体ID查询
     * @param id
     * @return SystemOrderEntity
     */
    @ResponseBody
    @RequestMapping(value="/FindById/{id}")
    public SystemOrderEntity findById(@PathVariable String id){
        SystemOrderEntity entity = (SystemOrderEntity) systemOrderService.findOne("id", id);
        logger.debug("查询结果=====>"+entity);
        if (entity!=null){
            return entity;
        }else {
            throw new BizException(BizExceptionEnum.NOTEXISTS.getCode(), BizExceptionEnum.NOTEXISTS.getDesc());
        }
    }

    /**
     * 查询所有
     * @return List<SystemOrderEntity>
     */
    @ResponseBody
    @RequestMapping(value="/FindAll")
    public List<SystemOrderEntity> findAll(){
        List<SystemOrderEntity> entityList = systemOrderService.findAll();
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
            systemOrderService.deleteById(id);
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
            return systemOrderService.deleteByIds(list);
        }catch (Exception e){
            //e.printStackTrace();
            throw new BizException(BizExceptionEnum.DELERROR.getCode(),BizExceptionEnum.DELERROR.getDesc());
        }
    }
    /**
     * 批量审核订单
     * @param ids
     * @return true,false
     */
    @ResponseBody
    @RequestMapping(value="/Check")
    public int check(String ids, HttpServletRequest request){
        logger.debug("传入参数=====>ids="+ids);
        Manages mangee = (Manages) request.getSession().getAttribute(Global.QR_MANAGER);
        String mangeeName=mangee.getName();
        logger.debug("传入参数=====>ids="+mangee.getName());
        Map<String,Object> map=new HashMap<String,Object>();
        try {
            List<String> list = Arrays.asList(ids.split(","));
            map.put("list",list);
            map.put("check_man",mangeeName);
            return systemOrderService.updateByIds(map);
        }catch (Exception e){
            e.printStackTrace();
            throw new BizException(BizExceptionEnum.UPDATEERROR.getCode(),BizExceptionEnum.UPDATEERROR.getDesc());
        }
    }

    /**
     * 添加文档
     * @param entity
     * @return SystemOrderEntity
     */
    @ResponseBody
    @RequestMapping(value="/Add")
    public SystemOrderEntity add(SystemOrderEntity entity){
        logger.debug("传入参数=====>"+entity);
        try {
            systemOrderService.insert(entity);
            return entity;
        }catch (Exception e){
            //e.printStackTrace();
            throw new BizException(BizExceptionEnum.ADDERROR.getCode(),BizExceptionEnum.ADDERROR.getDesc());
        }
    }

    /**
     * 添加或者修改文档
     * @param entity
     * @return SystemOrderEntity
     */
    @ResponseBody
    @RequestMapping(value="/SaveOrUpdate")
    public SystemOrderEntity saveOrUpdate(SystemOrderEntity entity){
        logger.debug("传入参数=====>"+entity);
        try {
            systemOrderService.updateOrSave(entity, entity.getId());
            return entity;
        }catch (Exception e){
            //e.printStackTrace();
            throw new BizException(BizExceptionEnum.UPDATEERROR.getCode(),BizExceptionEnum.UPDATEERROR.getDesc());
        }
    }

    //查询订单详情
    @ResponseBody
    @RequestMapping(value = "/queryDetails")
    public Map<String,Object> queryDetails(@RequestParam String orderid){
        Map<String,Object> map = new HashMap<String,Object>();
        List<Map<String,Object>> list = systemOrderService.queryDetails(orderid);
        map.put("orderdetails",list);
        return map;
    }
    //添加后台备注
    @ResponseBody
    @RequestMapping(value = "/editRemark")
    public int editRemark(@RequestParam String id,String remark){
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("backgroundremark",remark);
        map.put("id",id);
        try{
            return systemOrderService.updateRemark(map);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    //更新物流信息
    @ResponseBody
    @RequestMapping(value = "/editPost")
    public int editPost(@RequestParam String postid,@RequestParam String orderid,String post,String post_num,HttpServletRequest request){
        if(findOrderDetailsById(postid)){
            //如果该id物流号不存在，则新增发货数目+1
            SystemOrderEntity entity=(SystemOrderEntity)systemOrderService.findOne("id", orderid);
            int send_num = entity.getSend_num();
            send_num +=1;
            entity.setSend_num(send_num);
            systemOrderService.update(entity);
        }
            //插入物流信息
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("post",post);
            map.put("post_num",post_num);
            map.put("id",postid);
            Manages mangee = (Manages) request.getSession().getAttribute(Global.QR_MANAGER);
            String mangeeName=mangee.getName();
            map.put("post_man",mangeeName);
            try{
                return systemOrderService.updatePost(map);//成功会返回1
            }catch(Exception e){
                e.printStackTrace();
                return 0;//异常返回0
            }
    }

    // 根据id查询订单详情(用于物流信息插入时做判断)
    public boolean findOrderDetailsById(@RequestParam String postid){
        Map<String,Object> map = new HashMap<String,Object>();
        map= systemOrderService.findOrderDetailsById(postid);
        String post_num = (String) map.get("post_num");
        if(post_num == null|| post_num.equals("")){
            return true;
        }else {
            return false;
        }
    }

    //后台导出excel接口
    @ResponseBody
    @RequestMapping(value = "/makeExcel")
    public int makeExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String ids = request.getParameter("ids");
logger.debug("**************=========="+ids);
        List<String> idArray = Arrays.asList(ids.split(","));
        Map<String,Object> map = new HashMap<String,Object>();
        for (int i = 0; i < idArray.size(); i++) {
            List<Map<String,Object>> list = systemOrderService.queryDetails(idArray.get(i));
            map.put(""+i,list);
        }
        HSSFWorkbook wb =CreateSimpleExcelToDisk(map);
        response.setContentType("application/vnd.ms-excel");
        long filename=System.currentTimeMillis();
        response.setHeader("Content-disposition", "attachment;filename="+filename+".xls");
        OutputStream ouputStream = response.getOutputStream();
        wb.write(ouputStream);
        ouputStream.flush();
        ouputStream.close();
        return 0;
    }


    //生成Excel表格的方法名
    public HSSFWorkbook CreateSimpleExcelToDisk(Map<String,Object> map){
        // 第一步，创建一个webbook，对应一个Excel文件
        HSSFWorkbook wb = new HSSFWorkbook();
        // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet("发货信息表");
        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
        HSSFRow row = sheet.createRow((int) 0);
        // 第四步，创建单元格，并设置值表头 设置表头居中
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("订单编号");
        cell.setCellStyle(style);
        cell = row.createCell((short) 1);
        cell.setCellValue("收件人");
        cell.setCellStyle(style);
        cell = row.createCell((short) 2);
        cell.setCellValue("固话");
        cell.setCellStyle(style);
        cell = row.createCell((short) 3);
        cell.setCellValue("手机");
        cell.setCellStyle(style);
        cell = row.createCell((short) 4);
        cell.setCellValue("地址");
        cell.setCellStyle(style);
        cell = row.createCell((short) 5);
        cell.setCellValue("发货信息");
        cell.setCellStyle(style);
        cell = row.createCell((short) 6);
        cell.setCellValue("备注");
        cell.setCellStyle(style);
        cell = row.createCell((short) 7);
        cell.setCellValue("代收金额");
        cell.setCellStyle(style);
        cell = row.createCell((short) 8);
        cell.setCellValue("保价金额");
        cell.setCellStyle(style);
        cell = row.createCell((short) 9);
        cell.setCellValue("业务类型");
        cell.setCellStyle(style);

        for (int i = 0; i <map.size() ; i++) {
            List<Map<String,Object>> list= (List<Map<String, Object>>) map.get(""+i);

                logger.debug("======================="+(String) list.toString());
                row = sheet.createRow((int) i + 1);
                // 第四步，创建单元格，并设置值
                logger.debug("======================="+(String) list.get(0).toString());
                row.createCell((short) 0).setCellValue((String) list.get(0).get("order_numb"));
                row.createCell((short) 1).setCellValue((String) list.get(0).get("consignee"));
                row.createCell((short) 2).setCellValue("");
                row.createCell((short) 3).setCellValue((String) list.get(0).get("phone"));
                row.createCell((short) 4).setCellValue((String) list.get(0).get("province")+(String) list.get(i).get("city")+(String) list.get(i).get("address"));
                row.createCell((short) 5).setCellValue("");
                row.createCell((short) 6).setCellValue((String) list.get(0).get("remark"));
                row.createCell((short) 7).setCellValue("");
                row.createCell((short) 8).setCellValue("");
                row.createCell((short) 9).setCellValue("");


        }
        return wb;

    }
}
