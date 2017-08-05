package com.kemile.database.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.DriverManager;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;


import org.apache.ibatis.io.Resources;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kemile.common.service.impl.AbstractBaseService;
import com.kemile.database.dao.IDatabaseDAO;
import com.kemile.database.domain.DataFile;
import com.kemile.database.service.IDatabaseService;
import com.mysql.jdbc.Connection;

@SuppressWarnings("rawtypes")
@Service("DatabaseService")
public class DatabaseService extends AbstractBaseService implements
		IDatabaseService {

	@Autowired
	private IDatabaseDAO databaseDao;

	public IDatabaseDAO getDao() {
		return databaseDao;
	}

	/**
	 * 删除
	 * 
	 * @param fileName
	 * @return
	 */
	public boolean removeOne(String fileName) {
		File file = new File(DataFile.barkpath + fileName);
		if (!file.exists()) {
			return false;
		}
		file.delete();
		return true;
	}

	/**
	 * 列举目录所有备份文件
	 * 
	 * @return
	 */
	@SuppressWarnings("serial")
	public List<DataFile> findList() {
		File file = new File(DataFile.barkpath);
		if (!file.exists()) {
			return null;
		}
		List<DataFile> list = new ArrayList<DataFile>();
		File[] files = file.listFiles();
		for (final File item : files) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date dt = new Date(item.lastModified());
			final String sDateTime = sdf.format(dt);
			list.add(new DataFile() {
				{
					setFileName(item.getName());
					setFileDate(sDateTime);
					setFileSize(String.format("%.2f", item.length() / 1024000f));
				}
			});
		}
		return list;
	}

	/**
	 * 备份
	 * 
	 * @param mode
	 *            1结构和数据，2备份表结构，3备份数据
	 * @return
	 */
	public boolean bark(int mode) {
		List<String> tables = tableAll();
		StringBuffer sb = new StringBuffer();
		switch (mode) {
		case 1:
			for (String tableStr : tables) {
				sb.append(barkConstruct(tableStr));
				sb.append("\r\n");
				sb.append(barkData(tableStr));
			}
			break;
		case 2:
			for (String tableStr : tables) {
				sb.append(barkConstruct(tableStr));
			}
			break;
		default:
			for (String tableStr : tables) {
				sb.append(barkData(tableStr));
			}
			break;
		}
		BufferedWriter bufWriter;
		try {
			bufWriter = new BufferedWriter(new FileWriter(buildBarkName()));
			bufWriter.write(sb.toString());
			bufWriter.flush();
			bufWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		System.out.println(sb.toString());
		return true;
	}

	/**
	 * 还原
	 * 
	 * @return
	 */
	public boolean restore(String fileName) {
		try {
			FileInputStream inputStream = new FileInputStream(DataFile.barkpath
					+ fileName);
			Connection conn = getConnection();
			ScriptRunner runner = new ScriptRunner(conn);
			runner.runScript(new InputStreamReader(inputStream));
			inputStream.close();
			runner.closeConnection();
			conn.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * mysqldump备份
	 * 
	 * @param mode
	 *            1结构和数据，2备份表结构，3备份数据
	 * @return
	 */
	public boolean dumpBark(int mode) {
		Runtime runtime = Runtime.getRuntime();
		String str = "";
		switch(mode){
			case 1:
				str = "";
				break;
			case 2:
				str = " --opt -d ";
				break;
			case 3:
				str = " -t ";
				break;
		}
		try {
			Map<String, String> map = getDatabaseMapConfig();
			String mysql = " mysqldump -h" +map.get("hostname")+ " -u" + map.get("username") + " -p" + map.get("password") + " "+str+" " + map.get("dbname") + " > " + buildBarkName();
			Process p = null;
			if(isWin()){
				p = runtime.exec("cmd /c"+mysql);
			}else{
				p = runtime.exec(new String[]{"/bin/sh","-c",mysql});
			}
			int n = p.waitFor();
			if(n > 0){
				p.destroy();
				p=null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * mysqldump还原
	 * 
	 * @param mode
	 * @return
	 */
	public boolean dumpRestore(String filename) {
		Runtime runtime = Runtime.getRuntime();
		try {
			Map<String, String> map = getDatabaseMapConfig();
			String mysql = " mysql -h" + map.get("hostname") + " -u" + map.get("username") + " -p"
					+ map.get("password") + " " + map.get("dbname") + " < " + DataFile.barkpath+filename;
			System.out.println(mysql);
			if(isWin()){
				runtime.exec("cmd /c" + mysql);
			}else{
				runtime.exec(new String[]{"/bin/sh","-c",mysql});
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * 生成备份文件名称
	 * 
	 * @return 绝对路径
	 */
	public String buildBarkName() {
		long num = (long) (9999999999999.00 - (new Date().getTime()));
		return DataFile.barkpath + num + ".sql";
	}

	/**
	 * 获取数据库配置参数
	 * 
	 * @return Map
	 */
	public Map<String, String> getDatabaseMapConfig() {
		Properties props = getDataBaseConfig();
		String url = props.getProperty("url").toString();
		String[] arr = url.split("[?]");
		String[] arr1 = arr[0].split("://");
		String[] arr2 = arr1[1].split("/");
		String[] arr3 = arr2[0].split(":");
		Map<String,String> map = new HashMap<String,String>();
		map.put("dbname", arr2[1]);
		map.put("hostname", arr3[0]);
		map.put("username", props.getProperty("username"));
		map.put("password", props.getProperty("password"));
		return map;
	}

	/**
	 * 获取数据库配置参数
	 * 
	 * @return
	 */
	public Properties getDataBaseConfig() {
		try {
			return Resources.getResourceAsProperties("db.properties");
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 获取数据库链接
	 * 
	 * @return
	 */
	public Connection getConnection() {
		try {
			Properties props = getDataBaseConfig();
			Class.forName(props.getProperty("driverClassName")).newInstance();
			return (Connection) DriverManager.getConnection(
					props.getProperty("url"), props.getProperty("username"),
					props.getProperty("password"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 查询所有表
	 * 
	 * @return
	 */
	public List<String> tableAll() {
		List<String> list = new ArrayList<String>();
		for (Map<String, Object> map : databaseDao.selectAsList("SHOW TABLES;")) {
			list.add(map.get("Tables_in_qr_fxbc").toString());
		}
		return list;
	}

	/**
	 * 备份结构
	 */
	private String barkConstruct(String table) {
		StringBuffer sb = new StringBuffer();
		try {
			sb.append("DROP TABLE IF EXISTS " + table + ";\n");
			Map<String, Object> map = databaseDao.select("show create table "
					+ table);
			sb.append(map.get("Create Table").toString());
			return sb.toString() + ";\n\n";
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

	/**
	 * 备份数据
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private String barkData(String table) {
		StringBuffer sb = new StringBuffer();
		Map<String, Object> column = showColumns(table);
		List<Map<String, Object>> list = databaseDao
				.selectAsList("select * from " + table);
		if (list == null || list.size() == 0) {
			return "";
		}
		sb.append("insert into " + table + "(" + column.get("string")
				+ ") values ");
		for (Map<String, Object> map : list) {
			sb.append("(");
			String a = "";
			for (Map<String, Object> m : (List<Map<String, Object>>) column
					.get("list")) {
				Object object = map.get(m.get("Field"));
				if (object != null) {
					a += "'" + htmlEntity(object.toString(), 1) + "',";
				} else {
					a += "null,";
				}
			}
			sb.append(a.substring(0, a.length() - 1));
			sb.append("),");
		}
		return sb.toString().substring(0, sb.toString().length() - 1) + ";\n\n";
	}

	/**
	 * 字符转义
	 * 
	 * @param html
	 *            转义字符串
	 * @param mode
	 *            1.转义。反转义
	 * @return
	 */
	private String htmlEntity(String html, int mode) {
		if (mode == 1) {// 转义
			html = html.replace("\r\n", "\\r\\n");// 转义
			html = html.replace("'", "\\'");// 转义
		} else {// 反转义
			html = html.replace("\\r\\n", "\r\n");
			html = html.replace("\\'", "'");
		}
		return html;
	}

	/**
	 * 查询表字段
	 * 
	 * @param table
	 * @return
	 */
	@SuppressWarnings("serial")
	private Map<String, Object> showColumns(String table) {
		final StringBuffer sb = new StringBuffer();
		final List<Map<String, Object>> list = databaseDao
				.selectAsList("show columns from " + table);
		for (Map<String, Object> map : list) {
			sb.append("`" + map.get("Field").toString() + "`,");
		}
		return new HashMap<String, Object>() {
			{
				put("string",
						sb.toString().substring(0, sb.toString().length() - 1));
				put("list", list);
			}
		};
	}
	
	/**
	 * 判断是否是windows操作系统
	 * @return
	 */
	private boolean isWin(){
		Properties prop = System.getProperties();
		String os = prop.getProperty("os.name");
		return os.startsWith("win") || os.startsWith("Win") ? true : false;
	}

}
