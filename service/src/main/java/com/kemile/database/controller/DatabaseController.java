package com.kemile.database.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kemile.database.domain.DataFile;
import com.kemile.database.service.impl.DatabaseService;

@Controller
@RequestMapping(value = "database")
public class DatabaseController {

	@Autowired
	private DatabaseService databaseService;

	/**
	 * 列举所有sql文件
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "list", method = RequestMethod.GET)
	public List<DataFile> list() {
		return databaseService.findList();
	}

	/**
	 * 删除备份文件
	 * 
	 * @param fileName
	 * @return
	 */
	@SuppressWarnings("serial")
	@ResponseBody
	@RequestMapping(value = "remove", method = RequestMethod.POST)
	public Map<String, Object> remove(

			@RequestParam(value = "fileName", required = true) final String fileName) {
		return new HashMap<String, Object>() {
			{
				put("status", databaseService.removeOne(fileName));
			}
		};
	}

	/**
	 * 备份
	 * 
	 * @param mode
	 *            1结构和数据，2备份表结构，3备份数据
	 * @return
	 */
	@SuppressWarnings("serial")
	@ResponseBody
	@RequestMapping(value = "bark", method = RequestMethod.GET)
	public Map<String, Object> bark(
			@RequestParam(value = "mode", required = true) final int mode) {
		return new HashMap<String, Object>() {
			{
				put("status", databaseService.dumpBark(mode));
			}
		};
	}

	/**
	 * 还原sql
	 * 
	 * @param fileName
	 * @return
	 */
	@SuppressWarnings("serial")
	@ResponseBody
	@RequestMapping(value = "restore", method = RequestMethod.GET)
	public Map<String, Object> restore(
			@RequestParam(value = "fileName", required = true) final String fileName) {
		return new HashMap<String, Object>() {
			{
				put("status", databaseService.dumpRestore(fileName));
			}
		};
	}

	/**
	 * 下载sql文件
	 * 
	 * @param fileName
	 * @return
	 */
	@RequestMapping(value = "download", method = RequestMethod.GET)
	public HttpServletResponse download(
			@RequestParam(value = "fileName", required = true) String fileName,
			HttpServletResponse response) {
		try {
			String path = DataFile.barkpath + fileName;
			File file = new File(path);
			String filename = file.getName();
			InputStream fis = new BufferedInputStream(new FileInputStream(path));
			byte[] buffer = new byte[fis.available()];
			fis.read(buffer);
			fis.close();
			response.reset();
			response.addHeader("Content-Disposition", "attachment;filename="
					+ new String(filename.getBytes()));
			response.addHeader("Content-Length", "" + file.length());
			response.setContentType("application/octet-stream");
			OutputStream toClient = new BufferedOutputStream(
					response.getOutputStream());
			toClient.write(buffer);
			toClient.flush();
			toClient.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return response;
	}
}
