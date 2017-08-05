<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.kemile.${objectName}.dao.${objectName}DAO">

    <cache type="org.mybatis.caches.ehcache.LoggingEhcache" />

    <sql id="Base_Column_List">
        id
    <#list entityList as entity>
        <#if entity.keyType?ends_with("List")>
        <#else>
        ,${entity.keyName}
        </#if>
    </#list>
    </sql>

    <select id="findOne" resultType="com.kemile.${objectName}.domain.${objectName}Entity">
        SELECT <include refid="Base_Column_List"/> FROM ${tableName} WHERE ${r"${property}"} = ${r"#{value}"}
    </select>

    <select id="findList" resultType="com.kemile.${objectName}.domain.${objectName}Entity">
        SELECT <include refid="Base_Column_List"/>
        FROM ${tableName}
        WHERE ${r"${property}"} = ${r"#{value}"}
        <if test="orderBy!=null">
            ORDER BY ${r"${orderBy}"} ${r"${sortBy}"}
        </if>
    </select>

    <select id="findAll" resultType="com.kemile.${objectName}.domain.${objectName}Entity">
        SELECT <include refid="Base_Column_List"/>
        FROM ${tableName}
        <if test="orderBy!=null">
            ORDER BY ${r"${orderBy}"} ${r"${sortBy}"}
        </if>
    </select>

    <select id="queryPage" resultType="java.util.Map">
        SELECT * FROM ${tableName}
        <trim prefix="WHERE" prefixOverrides="AND">
        <#list entityList as entity>
            <#if entity.keyType?ends_with("List")>
            <#else>
            <if test="condition!=null and condition.${entity.keyName}!=null">AND ${entity.keyName}=${r"#{condition."}${entity.keyName}${r"}"}</if>
            </#if>
        </#list>
        </trim>
        <if test="orderBy!=null">
            ORDER BY ${r"${orderBy}"} ${r"${sortBy}"}
        </if>
        LIMIT ${r"${offset}"}, ${r"${rows}"}
    </select>

    <select id="count" resultType="java.lang.Integer">
        SELECT COUNT(*) FROM ${tableName}
        <trim prefix="WHERE" prefixOverrides="AND">
        <#list entityList as entity>
            <#if entity.keyType?ends_with("List")>
            <#else>
            <if test="condition!=null and condition.${entity.keyName}!=null">AND ${entity.keyName}=${r"#{condition."}${entity.keyName}${r"}"}</if>
            </#if>
        </#list>
        </trim>
    </select>

    <update id="update">
        UPDATE ${tableName}
        <trim prefix="SET" suffixOverrides=",">
        <#list entityList as entity>
            <#if entity.keyType?ends_with("List")>
            <#else>
            <if test="${entity.keyName}!=null">${entity.keyName}=${r"#{"}${entity.keyName}${r"}"},</if>
            </#if>
        </#list>
        </trim>
        WHERE id = ${r"#{id}"}
    </update>

    <insert id="insert">
        INSERT INTO ${tableName} (
    <#list entityList as entity>
        <#if entity.keyType?ends_with("List")>
        <#else>
        <if test="${entity.keyName}!=null">${entity.keyName},</if>
        </#if>
    </#list>
        )VALUES(
    <#list entityList as entity>
        <#if entity.keyType?ends_with("List")>
        <#else>
        <if test="${entity.keyName}!=null">${r"#{"}${entity.keyName}${r"}"},</if>
        </#if>
    </#list>
        )
        <selectKey resultType="java.lang.Integer" order="AFTER" keyProperty="id">
            SELECT LAST_INSERT_ID() AS ID
        </selectKey>
    </insert>

    <delete id="deleteByProperty">
        DELETE FROM ${tableName} WHERE WHERE ${r"${property}"} = ${r"#{value}"}
    </delete>

    <delete id="deleteById">
        DELETE FROM ${tableName} WHERE id = ${r"#{id}"}
    </delete>

    <!-- 批量删除 -->
    <delete id="deleteByIds">
        DELETE FROM ${tableName}
        <where>
            id IN
            <foreach item="id" index="index" collection="collection" open="(" separator="," close=")">
            ${r"#{id}"}
            </foreach>
        </where>
    </delete>

</mapper>