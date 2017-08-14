package com.kemile.order.domain;

import com.kemile.common.domain.CreateBaseDomain;
import com.sun.star.util.DateTime;

/**
 * Created by Administrator on 2017/8/9 0009.
 */
public class Order extends CreateBaseDomain<Integer> {

    private static final long serialVersionUID = 1L;

    private String ware_name;   //商品名称
    private DateTime committime;  //下单时间
    private DateTime paymenttime;   //支付时间
    private String order_numb;  //订单编号
    private Integer order_status;   //订单状态 1已支付  2 未支付 3已失效
    private double totalmoney;  //总价
    private Integer user_id;    //用户id
    private Integer paymethod;  //1银联支付2微信3支付
    private String consignee;   //收货人姓名
    private String phone;   //收货人电话
    private String province;    //省
    private String city;        //市
    private String address;     //详细地址
    private String remark;      //备注
    private String backgroundremark;    //后台备注
    private Integer aduit_status;   //审核状态：1未审核2已审核
    private String check_man;       //审核人
    private DateTime check_time;    //审核时间
    private Integer service_status; //服务状态：0-还未服务；1-已服务
    private String service_manager;     //服务人


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getWare_name() {
        return ware_name;
    }

    public void setWare_name(String ware_name) {
        this.ware_name = ware_name;
    }

    public DateTime getCommittime() {
        return committime;
    }

    public void setCommittime(DateTime committime) {
        this.committime = committime;
    }

    public DateTime getPaymenttime() {
        return paymenttime;
    }

    public void setPaymenttime(DateTime paymenttime) {
        this.paymenttime = paymenttime;
    }

    public String getOrder_numb() {
        return order_numb;
    }

    public void setOrder_numb(String order_numb) {
        this.order_numb = order_numb;
    }

    public Integer getOrder_status() {
        return order_status;
    }

    public void setOrder_status(Integer order_status) {
        this.order_status = order_status;
    }

    public double getTotalmoney() {
        return totalmoney;
    }

    public void setTotalmoney(double totalmoney) {
        this.totalmoney = totalmoney;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getPaymethod() {
        return paymethod;
    }

    public void setPaymethod(Integer paymethod) {
        this.paymethod = paymethod;
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

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getBackgroundremark() {
        return backgroundremark;
    }

    public void setBackgroundremark(String backgroundremark) {
        this.backgroundremark = backgroundremark;
    }

    public Integer getAduit_status() {
        return aduit_status;
    }

    public void setAduit_status(Integer aduit_status) {
        this.aduit_status = aduit_status;
    }

    public String getCheck_man() {
        return check_man;
    }

    public void setCheck_man(String check_man) {
        this.check_man = check_man;
    }

    public DateTime getCheck_time() {
        return check_time;
    }

    public void setCheck_time(DateTime check_time) {
        this.check_time = check_time;
    }

    public Integer getService_status() {
        return service_status;
    }

    public void setService_status(Integer service_status) {
        this.service_status = service_status;
    }

    public String getService_manager() {
        return service_manager;
    }

    public void setService_manager(String service_manager) {
        this.service_manager = service_manager;
    }
}
