package com.kemile.domain.system;

import com.kemile.common.domain.BaseDomain;

/**
 * 类名称：${objectName}Entity
 * 创建人：假面
 * 创建时间：${nowDate?string("yyyy年MM月dd日")}
 * 版本号：1.0v
 */
public class ${objectName}Entity extends BaseDomain<String> {

<#list entityList as entity>
    <#if entity.keyType?ends_with("List")>
    private ${entity.keyType}<${entity.keyName?cap_first}> ${entity.keyName};//${entity.keyNote}
    <#elseif entity.keyType?ends_with("Select")>
    private String ${entity.keyName};//${entity.keyNote}
    <#elseif entity.keyType?ends_with("Simditor")>
    private String ${entity.keyName};//${entity.keyNote}
    <#elseif entity.keyType?ends_with("textarea")>
    private String ${entity.keyName};//${entity.keyNote}
    <#elseif entity.keyType?ends_with("java.io.File")>
    private String ${entity.keyName};//${entity.keyNote}
    <#else>
    private ${entity.keyType} ${entity.keyName};//${entity.keyNote}
    </#if>

</#list>

<#list entityList as entity>
    <#if entity.keyType?ends_with("List")>
    public ${entity.keyType}<${entity.keyName?cap_first}> get${entity.keyName?cap_first}() {
        return ${entity.keyName};
    }

    public void set${entity.keyName?cap_first}(${entity.keyType}<${entity.keyName?cap_first}> ${entity.keyName}) {
        this.${entity.keyName} = ${entity.keyName};
    }

    <#elseif entity.keyType?ends_with("Select")>
    public String get${entity.keyName?cap_first}() {
        return ${entity.keyName};
    }

    public void set${entity.keyName?cap_first}(String ${entity.keyName}) {
        this.${entity.keyName} = ${entity.keyName};
    }

    <#elseif entity.keyType?ends_with("Simditor")>
    public String get${entity.keyName?cap_first}() {
        return ${entity.keyName};
    }

    public void set${entity.keyName?cap_first}(String ${entity.keyName}) {
        this.${entity.keyName} = ${entity.keyName};
    }

    <#elseif entity.keyType?ends_with("textarea")>
    public String get${entity.keyName?cap_first}() {
        return ${entity.keyName};
    }

    public void set${entity.keyName?cap_first}(String ${entity.keyName}) {
        this.${entity.keyName} = ${entity.keyName};
    }

    <#elseif entity.keyType?ends_with("java.io.File")>
    public String get${entity.keyName?cap_first}() {
        return ${entity.keyName};
    }

    public void set${entity.keyName?cap_first}(String ${entity.keyName}) {
        this.${entity.keyName} = ${entity.keyName};
    }

    <#else>
    public ${entity.keyType} get${entity.keyName?cap_first}() {
        return ${entity.keyName};
    }

    public void set${entity.keyName?cap_first}(${entity.keyType} ${entity.keyName}) {
        this.${entity.keyName} = ${entity.keyName};
    }

    </#if>
</#list>

<#list entityList as e>
    <#if e.keyType?ends_with("List")>
        public static class ${e.keyName?cap_first} {

        <#list entityMap[e.keyName] as entity>
            <#if entity.keyType?ends_with("List")>
            private ${entity.keyType}<${entity.keyName?cap_first}> ${entity.keyName};//${entity.keyNote}
            <#elseif entity.keyType?ends_with("Select")>
            private String ${entity.keyName};//${entity.keyNote}
            <#elseif entity.keyType?ends_with("Simditor")>
            private String ${entity.keyName};//${entity.keyNote}
            <#elseif entity.keyType?ends_with("textarea")>
            private String ${entity.keyName};//${entity.keyNote}
            <#elseif entity.keyType?ends_with("java.io.File")>
            private String ${entity.keyName};//${entity.keyNote}
            <#else>
            private ${entity.keyType} ${entity.keyName};//${entity.keyNote}
            </#if>

        </#list>

        <#list entityMap[e.keyName] as entity>
            <#if entity.keyType?ends_with("List")>
            public ${entity.keyType}<${entity.keyName?cap_first}> get${entity.keyName?cap_first}() {
                return ${entity.keyName};
            }

            public void set${entity.keyName?cap_first}(${entity.keyType}<${entity.keyName?cap_first}> ${entity.keyName}) {
                this.${entity.keyName} = ${entity.keyName};
            }

            <#elseif entity.keyType?ends_with("Select")>
            public String get${entity.keyName?cap_first}() {
                return ${entity.keyName};
            }

            public void set${entity.keyName?cap_first}(String ${entity.keyName}) {
                this.${entity.keyName} = ${entity.keyName};
            }

            <#elseif entity.keyType?ends_with("Simditor")>
            public String get${entity.keyName?cap_first}() {
                return ${entity.keyName};
            }

            public void set${entity.keyName?cap_first}(String ${entity.keyName}) {
                this.${entity.keyName} = ${entity.keyName};
            }

            <#elseif entity.keyType?ends_with("textarea")>
            public String get${entity.keyName?cap_first}() {
                return ${entity.keyName};
            }

            public void set${entity.keyName?cap_first}(String ${entity.keyName}) {
                this.${entity.keyName} = ${entity.keyName};
            }

            <#elseif entity.keyType?ends_with("java.io.File")>
            public String get${entity.keyName?cap_first}() {
                return ${entity.keyName};
            }

            public void set${entity.keyName?cap_first}(String ${entity.keyName}) {
                this.${entity.keyName} = ${entity.keyName};
            }

            <#else>
            public ${entity.keyType} get${entity.keyName?cap_first}() {
                return ${entity.keyName};
            }

            public void set${entity.keyName?cap_first}(${entity.keyType} ${entity.keyName}) {
                this.${entity.keyName} = ${entity.keyName};
            }

            </#if>
        </#list>
        }
    </#if>
</#list>
}