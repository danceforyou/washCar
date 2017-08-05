#dropbox
域名:http://www.degengedu.com/

客户服务器为centos_linux系统
IP地址:123.57.31.180
用户名:root
密码:DeGeng02

前端静态页面部署路径: /home/www
服务端java代码部署路径:/home/apache-tomcat-8.0.33/webapps/DropBox-service


Table:
    User
        姓名\手机号\密码\省份\市\幼儿园ID\头像\状态\
    Orders
        商品名称\订单号\下单时间\支付时间\订单状态\承运公司\快递单号\商品信息\总价\用户ID\支付方式\收货地址\
    Address
        姓名\手机号\省份\城市\详细地址\用户ID\
    Shop
        商品名称\商品种类\商品价格\排序\

AgencyTable:
    at_agency
        姓名\手机号\密码\类型\抽成比例(7%)\
    d_school
        姓名\电话\密码\地址\名称\logo\类型\自销数目\示范幼儿园ID\代理商ID\自销抽成比例(20%)\于代理商抽成比例(3%)\
    jc_order
        商品名称\订单号\下单时间\支付时间\订单状态\总价\用户ID\支付方式\收货地址\幼儿园ID\发货总数\
    jc_orderDetals
        商品名称(第几期)\订单号\订单状态(已发货&未发货)\发货时间\承运公司编号\快递单号\备注\
    at_income_statistics
        订单号\自销抽成比例\代理商抽成比例\幼儿园ID\普通收入\代理收入\示范收入\订单价格\创建时间\
    at_log

    at_kucun
        班级\月份\数量\

官方后台:
    添加代理商\幼儿园;查询列表;修改信息;删除信息
    ()