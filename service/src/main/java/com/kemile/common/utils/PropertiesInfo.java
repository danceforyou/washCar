package com.kemile.common.utils;

import com.sun.tools.hat.internal.parser.ReadBuffer;
import org.apache.commons.io.input.ReaderInputStream;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;



public class PropertiesInfo extends Properties {
    /**
     * 获得property的值
     */
    private static final long serialVersionUID = -1422404347417621309L;
    private static PropertiesInfo instance;

    public static PropertiesInfo getInstance () throws IOException {
        if(null != instance) {
            return instance;
        } else {
            makeInstance();
            return instance;
        }
    }

    private static synchronized void makeInstance() throws IOException {
        if(instance == null) {
            instance = new PropertiesInfo();
        }
    }

    private PropertiesInfo() throws IOException {
      /*  InputStream is = getClass().getResourceAsStream("/config.properties");
        load(is);*/
        InputStream is = getClass().getResourceAsStream("/config.properties");
        BufferedReader bf= new BufferedReader(new InputStreamReader(is));
        load(bf);

    }
    public static void main(String[] args) throws IOException {

        System.out.println(PropertiesInfo.getInstance().getProperty("sendMSM.username"));
    }

}