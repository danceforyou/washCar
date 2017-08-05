package com.kemile.SystemOrder.domain;

import com.kemile.common.domain.BaseDomain;
import java.util.Date;


/**
 * 类名称：SystemOrderEntity
 * 创建人：假面
 * 创建时间：2016年09月06日
 * 版本号：1.0v
 */
public class SystemOrderEntity extends BaseDomain<String> {

    private String committime;//下单时间

    private String username;//会员名称

    private String consignee;//收件人

    private String phone;//电话

    private String address;//地址

    private String orderContext;//订单内容

    private Integer order_status;//订单状态

    private String sendStatus;//发货状态

    private Integer send_num;//发货数目
    private String check_man;//审核人
    private String send_man;//发货人
    private Date check_time;//审核时间
    public String getCheck_man() {
        return check_man;
    }

    public void setCheck_man(String check_man) {
        this.check_man = check_man;
    }

    public String getSend_man() {
        return send_man;
    }

    public void setSend_man(String send_man) {
        this.send_man = send_man;
    }

    public Date getCheck_time() {
        return check_time;
    }

    public void setCheck_time(Date check_time) {
        this.check_time = check_time;
    }


    public Integer getSend_num() {
        return send_num;
    }

    public void setSend_num(Integer send_num) {
        this.send_num = send_num;
    }

    public String getCommittime() {
        return committime;
    }

    public void setCommittime(String committime) {
        this.committime = committime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOrderContext() {
        return orderContext;
    }

    public void setOrderContext(String orderContext) {
        this.orderContext = orderContext;
    }

    public Integer getOrder_status() {
        return order_status;
    }

    public void setOrder_status(Integer order_status) {
        this.order_status = order_status;
    }

    public String getSendStatus() {
        return sendStatus;
    }

    public void setSendStatus(String sendStatus) {
        this.sendStatus = sendStatus;
    }


}