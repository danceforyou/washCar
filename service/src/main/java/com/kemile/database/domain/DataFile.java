package com.kemile.database.domain;

import java.io.File;

import com.kemile.common.domain.BaseDomain;

/**
 * 匿名内部类 备份文件模型
 * 
 * @author 江某人
 * 
 */
public class DataFile extends BaseDomain<Integer>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String fileName; // 备份文件的名称
	private String fileDate; // 备份问价的日期
	private String filePath; // 备份文件的路径
	private String fileSize; // 备份文件的大小
	public static String barkpath = File.separator + "home" + File.separator + "database"
			+ File.separator;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileDate() {
		return fileDate;
	}

	public void setFileDate(String fileDate) {
		this.fileDate = fileDate;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}
}
