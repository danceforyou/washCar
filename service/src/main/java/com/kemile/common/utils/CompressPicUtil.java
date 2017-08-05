package com.kemile.common.utils;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

/**
 * 图片裁剪工具类
 * @author yongrong
 *
 */
public class CompressPicUtil {

	/**
	 * 压缩单个图片
	 * @param oldPic 图片路径
	 * @param width 要压缩的宽度
	 * @param height 要压缩的高度
	 * @return
	 */
	public static String compressPic(String oldPic, int width, int height){
		return compressFactory(oldPic, "Thumbnail_", width, height);
	}
	
	/**
	 * 压缩单个图片并指定图片类型
	 * @param oldPic 图片路径
	 * @param prefix 指定图片前缀
	 * @param width 要压缩的宽度
	 * @param height 要压缩的高度
	 * @return
	 */
	public static String compressPic(String oldPic, String prefix, int width, int height){
		return compressFactory(oldPic, prefix, width, height);
	}
	
	/**
	 * 图片批量压缩
	 * @param oldPic
	 * @param prefix 指定图片前缀
	 * @param list 存储要压缩的宽高 如：<code>[{width=128,height=490},{width=24,height=80},...]</code>
	 * @return
	 */
	public static String[] compressPic(String oldPic, String prefix, List<Map<String, Integer>> list){
		String[] newFileName = new String[list.size()];
		for (int i = 0; i < list.size(); i++) {
			Map<String, Integer> map = list.get(i);
			newFileName[i] = compressFactory(oldPic, prefix, map.get("width"), map.get("height"));
		}
		return newFileName;
	}
	/**
	 * 
	 * @param oldPic
	 * @param list 存储要压缩的宽高 如：<code>[{width=128,height=490},{width=24,height=80},...]</code>
	 * @return
	 */
	public static String[] compressPic(String oldPic, List<Map<String, Integer>> list){
		return compressPic(oldPic, "Thumbnail_", list);
	}
	
	/**
	 * 
	 * @param oldPic
	 * @param prefix Thumbnail_
	 * @param width
	 * @param height
	 * @return
	 */
	private static String compressFactory(String oldPic, String prefix, int width, int height){
		
		try {
			File file = new File(oldPic);
			if (!file.exists()) {
				return "图片获取失败";
			}
			Image img = ImageIO.read(file);
			if (img.getWidth(null) == -1) {
				return "创建图片失败";
			}
			BufferedImage tagm = new BufferedImage(width, height, 3);
			tagm.getGraphics().drawImage(img.getScaledInstance(width, height, 4),0 ,0, null);
			String newFileName = prefix+file.getName();
			FileOutputStream out = new FileOutputStream(file.getParent() +"/"+ newFileName);
			//String suffix = file.getName().substring(file.getName().lastIndexOf(".")+1, file.getName().length());
			ImageIO.write(tagm, "png", out);
			out.close();
			return newFileName;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
}
