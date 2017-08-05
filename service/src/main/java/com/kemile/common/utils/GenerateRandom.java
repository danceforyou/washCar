package com.kemile.common.utils;

import java.util.Random;

public class GenerateRandom {

	/**
	 * 生成随机字符串
	 * @param length 长度
	 * @param mode 生成方式
	 * @return
	 */
	public static String generateRandom(int length, int mode) {
		String base = "";
		switch (mode) {
		case 1:
			base = "0123456789";
			break;
		case 2:
			base = "abcdefghijklmnopqrstuvwxyz";
			break;
		case 3:
			base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			break;
		default:
			base = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			break;
		}
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < length; i++) {
			int number = random.nextInt(base.length());
			sb.append(base.charAt(number));
		}
		return sb.toString();
	}

}
