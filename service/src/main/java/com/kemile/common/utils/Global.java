package com.kemile.common.utils;

/**
 * Created by yongrong on 16/3/16.
 */
public class Global {

    /**
     * 保存网盘信息的session键
     */
//    public static final String D_DISKINFO = "D_DISKINFO";

    /**
     * 保存管理员的session键
     */
    public static final String QR_MANAGER = "QR_MANAGER";

    /**
     * FastDFS文件组名
     */
    public static final String FASTDFS_GROUP = "group1";

    public static boolean isNotEmpty(String str) {
        if(str!=null && !"".equals(str.trim())){
            return true;
        }else{
            return false;
        }
    }
}
