package com.kemile.common.utils.fastdfs;

/**
 * Created by yongrong on 16/3/23.
 */
public class FastDFSFile implements FileManagerConfig {

    private static final long serialVersionUID = -996760121932438618L;

    private String name;

    private byte[] content;

    private String ext;

    private Long   size;

    public FastDFSFile(String name, byte[] content, String ext, Long size) {
        super();
        this.name = name;
        this.content = content;
        this.ext = ext;
        this.size = size;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }
}
