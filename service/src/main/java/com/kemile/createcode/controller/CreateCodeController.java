package com.kemile.createcode.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.kemile.common.utils.DelAllFile;
import com.kemile.common.utils.Freemarker;
import com.kemile.common.utils.Logger;
import com.kemile.common.utils.PathUtil;
import com.kemile.createcode.domain.CreateEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 类名称：CreateCodeController
 * 创建人：假面
 * 创建时间：2015年1月12日
 * 版本号：1.0v
 */
@Controller
@RequestMapping(value="/CreateCode")
public class CreateCodeController {

	Logger logger = Logger.getLogger(CreateCodeController.class);

	/**
	 * 生成代码
	 */
	@ResponseBody
	@RequestMapping(value="/proCode")
	public boolean proCode(String jsonStr) throws Exception{

		CreateEntity createEntity = JSON.parseObject(jsonStr, CreateEntity.class);

		/* ============================================================================================= */
		String objectName = createEntity.getObjectName();		//类名

		Map<String,Object> root = new HashMap<String,Object>();		//创建数据模型
		root.put("tableName",createEntity.getTableName());
		root.put("objectName", objectName);							//类名
		root.put("nowDate", new Date());							//当前日期
		root.put("entityList",createEntity.getEntity());
		root.put("entityMap",createEntity.getP_entity());

		logger.info(root);
		
		DelAllFile.delFolder(PathUtil.getClasspath()+"admin/ftl"); //生成代码前,先清空之前生成的代码
		/* ============================================================================================= */
		
		String filePath = "ftl/"+objectName+"/";//存放路径
		String ftlPath = "";//ftl路径
		
		/*生成controller*/
		Freemarker.printFile("ControllerTemplate.ftl", root, "controller/"+objectName+"Controller.java", filePath, ftlPath);
		
		/*生成service接口类*/
		Freemarker.printFile("IServiceTemplate.ftl", root, "service/I"+objectName+"Service.java", filePath, ftlPath);

		/*生成service实现类*/
		Freemarker.printFile("ServiceImplTemplate.ftl", root, "service/impl/"+objectName+"Service.java", filePath, ftlPath);

		/*生成dao实现类*/
		Freemarker.printFile("DaoTemplate.ftl", root, "dao/"+objectName+"DAO.java", filePath, ftlPath);

		/*生成domain实现类*/
		Freemarker.printFile("EntityTemplate.ftl", root, "domain/"+objectName+"Entity.java", filePath, ftlPath);

		/*生成MySqlXMl文件*/
		Freemarker.printFile("MybatisXMLTemplate.ftl", root, "mybatis/"+objectName+"/"+objectName+"DAO.xml", filePath, ftlPath);

		/*生成html静态列表页*/
		Freemarker.printFile("ListHtmlTemplate.ftl", root, "html/"+objectName+"-list.html", filePath, ftlPath);

		/*生成html静态添加修改页*/
		Freemarker.printFile("AddHtmlTemplate.ftl", root, "html/"+objectName+"-add.html", filePath, ftlPath);
		
		/*生成的全部代码压缩成zip文件*/
		//FileZip.zip(PathUtil.getClasspath()+"ftl/"+objectName, PathUtil.getClasspath()+"ftl/"+objectName+".zip");
		
		/*下载代码*/
		//FileDownload.fileDownload(response, PathUtil.getClasspath()+"ftl/"+objectName+".zip", objectName+".zip");
		return true;
	}

	private static String firstToLowerCase(String str){
		char[] chars=new char[1];
		chars[0]=str.charAt(0);
		String temp=new String(chars);
		if(chars[0]>='A'  &&  chars[0]<='Z'){
			return str.replaceFirst(temp,temp.toLowerCase());
		}else {
			return str;
		}
	}
	
}
