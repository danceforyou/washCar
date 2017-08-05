package com.kemile.common.utils.officeutils;

import java.io.IOException;
import java.util.Properties;
import java.util.regex.Pattern;

public class SiteUrl {
	private static Properties properties = new Properties();
	static{
		try {
			properties.load(SiteUrl.class.getClassLoader().getResourceAsStream("officeToSwf.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String readUrl(String key){
		String osName = System.getProperty("os.name");
		if (Pattern.matches("Linux.*", osName)) {

			return (String)properties.get("Linux_"+key);

		} else if (Pattern.matches("Windows.*", osName)) {


			return (String)properties.get("Windows_"+key);
		} else if (Pattern.matches("Mac.*", osName)) {

			return (String)properties.get("Mac_"+key);

		} else {
			return "";
		}
	}
}
