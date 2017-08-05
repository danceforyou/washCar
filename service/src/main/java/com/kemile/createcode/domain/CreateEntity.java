package com.kemile.createcode.domain;

import java.util.List;
import java.util.Map;

/**
 * Created by yongrong on 16/6/7.
 */
public class CreateEntity {

    private String objectName;//类名
    private String tableName;//表名
    private List<Entity> entity;
    private Map<String, List<Entity>> p_entity;

    public static class Entity {
        private String keyName;//键名称
        private String keyNote;//备注
        private String keyType;//键类型
        private String isIndexed;//是否加索引
        private String isShow;//是否在查询列表中显示
        private String readonly;//是否只读
        private String defaultVal;//默认值
        private String undefined;//垃圾


        public String getKeyName() {
            return keyName;
        }

        public void setKeyName(String keyName) {
            this.keyName = keyName;
        }

        public String getKeyType() {
            return keyType;
        }

        public void setKeyType(String keyType) {
            this.keyType = keyType;
        }

        public String getIsIndexed() {
            return isIndexed;
        }

        public void setIsIndexed(String isIndexed) {
            this.isIndexed = isIndexed;
        }

        public String getIsShow() {
            return isShow;
        }

        public void setIsShow(String isShow) {
            this.isShow = isShow;
        }

        public String getReadonly() {
            return readonly;
        }

        public void setReadonly(String readonly) {
            this.readonly = readonly;
        }

        public String getDefaultVal() {
            return defaultVal;
        }

        public void setDefaultVal(String defaultVal) {
            this.defaultVal = defaultVal;
        }

        public String getKeyNote() {
            return keyNote;
        }

        public void setKeyNote(String keyNote) {
            this.keyNote = keyNote;
        }

        public String getUndefined() {
            return undefined;
        }

        public void setUndefined(String undefined) {
            this.undefined = undefined;
        }
    }

    public String getObjectName() {
        return objectName;
    }

    public void setObjectName(String objectName) {
        this.objectName = objectName;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public List<Entity> getEntity() {
        return entity;
    }

    public void setEntity(List<Entity> entity) {
        this.entity = entity;
    }

    public Map<String, List<Entity>> getP_entity() {
        return p_entity;
    }

    public void setP_entity(Map<String, List<Entity>> p_entity) {
        this.p_entity = p_entity;
    }
}
