package com.kemile.common.utils.fastdfs;

import java.io.Serializable;

/**
 * Created by yongrong on 16/3/23.
 */
public interface FileManagerConfig extends Serializable {

    public static final String PROTOCOL = "http://";
    public static final String SEPARATOR = "/";

    public static final String TRACKER_NGNIX_PORT 	= "80";

    public static final String CLIENT_CONFIG_FILE   = "fdfs_client.conf";
}
