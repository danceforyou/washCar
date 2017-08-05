/*
SQLyog Ultimate v12.09 (32 bit)
MySQL - 5.5.47-0ubuntu0.14.04.1 : Database - qr_fxbc
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`qr_fxbc` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `qr_fxbc`;

/*Table structure for table `qr_additiveuser` */

DROP TABLE IF EXISTS `qr_additiveuser`;

CREATE TABLE `qr_additiveuser` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) NOT NULL COMMENT '用户id',
  `balance` decimal(10,2) NOT NULL COMMENT '金额',
  `bankcard` varchar(25) DEFAULT NULL COMMENT '银行卡',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `qr_additiveuser` */

insert  into `qr_additiveuser`(`id`,`uid`,`balance`,`bankcard`) values (2,4,'102.00','6212855336362259345'),(3,5,'500.00','6212855336362259345'),(5,10,'800.00','6212855336362259345'),(6,11,'1000.00','6212855336362259345'),(7,12,'0.00','6212844225656623658'),(8,13,'0.00',NULL),(9,14,'0.00',NULL),(10,15,'0.00',NULL),(11,16,'0.00','149484961198416'),(12,17,'0.00',NULL),(13,18,'0.00',NULL),(14,19,'0.00','6212855226968813729'),(15,20,'0.00',NULL),(16,21,'0.00','111111111111'),(17,22,'0.00',NULL),(18,23,'0.00','622022608000412312'),(19,24,'0.00',NULL),(20,25,'0.00','6216618104333941213'),(21,26,'0.00',NULL);

/*Table structure for table `qr_buttonpower` */

DROP TABLE IF EXISTS `qr_buttonpower`;

CREATE TABLE `qr_buttonpower` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '按钮权限ID',
  `name` varchar(50) NOT NULL COMMENT '权限名称',
  `ppid` int(11) NOT NULL COMMENT '页面权限ID（父权限节点）',
  `url` varchar(255) NOT NULL COMMENT '权限链接',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '权限状态，0:启用；1:停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `qr_buttonpower` */

insert  into `qr_buttonpower`(`id`,`name`,`ppid`,`url`,`status`) values (1,'删除',2,'',0),(2,'新增',3,'',0),(3,'添加角色',2,'admin-role-add.html',0),(4,'删除',3,'',0),(5,'新增',4,'',0),(6,'编辑',2,'admin-role-add.html',0),(7,'批量删除',2,'',0);

/*Table structure for table `qr_images` */

DROP TABLE IF EXISTS `qr_images`;

CREATE TABLE `qr_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图片ID',
  `imageUrl` varchar(255) NOT NULL COMMENT '图片虚拟地址',
  `imagePath` varchar(255) NOT NULL COMMENT '图片实际路径',
  `width` int(11) DEFAULT NULL COMMENT '图片宽度',
  `height` int(11) DEFAULT NULL COMMENT '图片高度',
  `type` varchar(20) NOT NULL COMMENT '图片所属表名',
  `typeid` int(11) DEFAULT NULL COMMENT '图片所属表ID',
  `status` int(11) DEFAULT '0' COMMENT '状态：0:正常；1:已删除',
  `md5` varchar(255) DEFAULT NULL COMMENT '图片md5码',
  `creatorDate` date NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=442 DEFAULT CHARSET=utf8;

/*Data for the table `qr_images` */

insert  into `qr_images`(`id`,`imageUrl`,`imagePath`,`width`,`height`,`type`,`typeid`,`status`,`md5`,`creatorDate`) values (250,'http://192.168.1.174:8080/fxbc/uploadfile/73d4281e46a68222934403627e5b4e19.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/73d4281e46a68222934403627e5b4e19.jpg',1024,768,'qr_community',23,0,'73d4281e46a68222934403627e5b4e19','2016-01-19'),(256,'http://192.168.1.174:8080/fxbc/uploadfile/73d4281e46a68222934403627e5b4e19.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/73d4281e46a68222934403627e5b4e19.jpg',1024,768,'qr_park',13,0,'73d4281e46a68222934403627e5b4e19','2016-01-19'),(257,'http://192.168.1.174:8080/fxbc/uploadfile/c482484248b9393bdcc9c6eabc8c888a.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/c482484248b9393bdcc9c6eabc8c888a.jpg',1920,416,'qr_park',14,0,'c482484248b9393bdcc9c6eabc8c888a','2016-01-19'),(258,'http://192.168.1.174:8080/fxbc/uploadfile/0062521011789cb65fd1e33ddf7a82dd.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/0062521011789cb65fd1e33ddf7a82dd.jpg',750,562,'qr_park',15,0,'0062521011789cb65fd1e33ddf7a82dd','2016-01-19'),(259,'http://192.168.1.174:8080/fxbc/uploadfile/d05f027e716e5d13b51c57d36ae94132.png','D:apache-tomcat-7.0.52webappsfxbcuploadfile/d05f027e716e5d13b51c57d36ae94132.png',1920,1080,'qr_region',NULL,0,'d05f027e716e5d13b51c57d36ae94132','2016-01-19'),(260,'http://192.168.1.174:8080/fxbc/uploadfile/d70e00e409e22d1cb8f807f3a7a4a788.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/d70e00e409e22d1cb8f807f3a7a4a788.jpg',1920,1080,'qr_region',12,0,'d70e00e409e22d1cb8f807f3a7a4a788','2016-01-19'),(261,'http://192.168.1.174:8080/fxbc/uploadfile/ef5b02866a4112ca70c4a2b7cbea7612.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/ef5b02866a4112ca70c4a2b7cbea7612.jpg',1920,600,'qr_region',13,0,'ef5b02866a4112ca70c4a2b7cbea7612','2016-01-19'),(265,'http://192.168.1.174:8080/fxbc/uploadfile/72ef60cb00e34e46b2da7c1e58019a4c.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/72ef60cb00e34e46b2da7c1e58019a4c.jpg',3120,4208,'qr_cat',NULL,0,'72ef60cb00e34e46b2da7c1e58019a4c','2016-01-19'),(266,'http://192.168.1.174:8080/fxbc/uploadfile/008f73990f100c729d13b561db08ef04.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/008f73990f100c729d13b561db08ef04.jpg',1080,1457,'qr_cat',NULL,0,'008f73990f100c729d13b561db08ef04','2016-01-19'),(267,'http://192.168.1.174:8080/fxbc/uploadfile/876c3f1531b95c3041c9610804aa76c7.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/876c3f1531b95c3041c9610804aa76c7.jpg',440,304,'qr_cat',NULL,0,'876c3f1531b95c3041c9610804aa76c7','2016-01-19'),(268,'http://192.168.1.174:8080/fxbc/uploadfile/dc8015d22c55f0544ba95fdb5aec88c1.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/dc8015d22c55f0544ba95fdb5aec88c1.jpg',500,332,'qr_cat',NULL,0,'dc8015d22c55f0544ba95fdb5aec88c1','2016-01-19'),(270,'http://192.168.1.174:8080/fxbc/uploadfile/1b766cc6d69166f7f7978bf2c4a29184.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/1b766cc6d69166f7f7978bf2c4a29184.jpg',600,443,'qr_cat',NULL,0,'1b766cc6d69166f7f7978bf2c4a29184','2016-01-19'),(273,'http://192.168.1.99:8080/fxbc/uploadfile/ba1eb6b976a5daa2c38f0394d2e4ea92.jpg','D:apache-tomcat-7.0.59webappsfxbcuploadfile/ba1eb6b976a5daa2c38f0394d2e4ea92.jpg',500,340,'qr_certification',NULL,0,'ba1eb6b976a5daa2c38f0394d2e4ea92','2016-01-19'),(274,'http://192.168.1.174:8080/fxbc/uploadfile/876c3f1531b95c3041c9610804aa76c7.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/876c3f1531b95c3041c9610804aa76c7.jpg',440,304,'qr_certification',NULL,0,'876c3f1531b95c3041c9610804aa76c7','2016-01-19'),(275,'http://192.168.1.99:8080/fxbc/uploadfile/c9e9b183a5e4c35132fc34786ded51d3.jpg','D:apache-tomcat-7.0.59webappsfxbcuploadfile/c9e9b183a5e4c35132fc34786ded51d3.jpg',3104,4192,'qr_cat',NULL,0,'c9e9b183a5e4c35132fc34786ded51d3','2016-01-19'),(276,'http://192.168.1.174:8080/fxbc/uploadfile/e00689f42143507d6fa720420b383985.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/e00689f42143507d6fa720420b383985.jpg',2448,3264,'qr_cat',NULL,0,'e00689f42143507d6fa720420b383985','2016-01-19'),(277,'http://192.168.1.174:8080/fxbc/uploadfile/261978db80be299064baa42337524930.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/261978db80be299064baa42337524930.jpg',2448,3264,'qr_cat',NULL,0,'261978db80be299064baa42337524930','2016-01-19'),(278,'http://192.168.1.174:8080/fxbc/uploadfile/70934f8d3a7af114245d06b7808cab78.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/70934f8d3a7af114245d06b7808cab78.jpg',3104,4192,'qr_cat',NULL,0,'70934f8d3a7af114245d06b7808cab78','2016-01-19'),(279,'http://192.168.1.174:8080/fxbc/uploadfile/5dfd1486c2bd9f8f72cc8a4132e45018.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/5dfd1486c2bd9f8f72cc8a4132e45018.jpg',2448,3264,'qr_certification',NULL,0,'5dfd1486c2bd9f8f72cc8a4132e45018','2016-01-19'),(280,'http://192.168.1.174:8080/fxbc/uploadfile/d828a1260411bd8d281d69752affb62c.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/d828a1260411bd8d281d69752affb62c.jpg',2448,3264,'qr_certification',NULL,0,'d828a1260411bd8d281d69752affb62c','2016-01-19'),(282,'http://192.168.1.174:8080/fxbc/uploadfile/70934f8d3a7af114245d06b7808cab78.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/70934f8d3a7af114245d06b7808cab78.jpg',3104,4192,'qr_cat',NULL,0,'70934f8d3a7af114245d06b7808cab78','2016-01-19'),(343,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(344,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(345,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(346,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(347,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(348,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(349,'http://a627596279.oicp.net:80/fxbc/uploadfile/46c3627ddc729954c981072032eb95ed.jpg','E:JavaWebProjectfxbcuploadfile/46c3627ddc729954c981072032eb95ed.jpg',3104,4192,'qr_cat',NULL,0,'46c3627ddc729954c981072032eb95ed','2016-01-20'),(350,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(351,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(352,'http://a627596279.oicp.net:80/fxbc/uploadfile/46c3627ddc729954c981072032eb95ed.jpg','E:JavaWebProjectfxbcuploadfile/46c3627ddc729954c981072032eb95ed.jpg',3104,4192,'qr_cat',NULL,0,'46c3627ddc729954c981072032eb95ed','2016-01-20'),(353,'http://a627596279.oicp.net:80/fxbc/uploadfile/4a5dd664302730653b9ce87d4d9d8bff.jpg','E:JavaWebProjectfxbcuploadfile/4a5dd664302730653b9ce87d4d9d8bff.jpg',3104,4192,'qr_cat',NULL,0,'4a5dd664302730653b9ce87d4d9d8bff','2016-01-20'),(354,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(355,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(356,'http://a627596279.oicp.net:80/fxbc/uploadfile/66d7b29ffdbf50028c4a8ec03523f7a1.jpg','D:apache-tomcat-7.0.52webappsfxbcuploadfile/66d7b29ffdbf50028c4a8ec03523f7a1.jpg',1002,762,'qr_cat',NULL,0,'66d7b29ffdbf50028c4a8ec03523f7a1','2016-01-20'),(357,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-20'),(358,'http://a627596279.oicp.net:80/fxbc/uploadfile/0a80053d462f84bd6bddb492f330329f.png','E:JavaWebProjectfxbcuploadfile/0a80053d462f84bd6bddb492f330329f.png',100,100,'qr_cat',NULL,0,'0a80053d462f84bd6bddb492f330329f','2016-01-20'),(359,'http://a627596279.oicp.net:80/fxbc/uploadfile/46c3627ddc729954c981072032eb95ed.jpg','E:JavaWebProjectfxbcuploadfile/46c3627ddc729954c981072032eb95ed.jpg',3104,4192,'qr_cat',NULL,0,'46c3627ddc729954c981072032eb95ed','2016-01-20'),(360,'http://a627596279.oicp.net:80/fxbc/uploadfile/46c3627ddc729954c981072032eb95ed.jpg','E:JavaWebProjectfxbcuploadfile/46c3627ddc729954c981072032eb95ed.jpg',3104,4192,'qr_cat',NULL,0,'46c3627ddc729954c981072032eb95ed','2016-01-20'),(361,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-21'),(362,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-21'),(363,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-21'),(364,'http://a627596279.oicp.net:80/fxbc/uploadfile/91db689ffd521d9bf17e200a3f8f6a1b.jpg','E:JavaWebProjectfxbcuploadfile/91db689ffd521d9bf17e200a3f8f6a1b.jpg',2448,3264,'qr_cat',NULL,0,'91db689ffd521d9bf17e200a3f8f6a1b','2016-01-21'),(365,'http://a627596279.oicp.net:80/fxbc/uploadfile/746b6424c19770bedf692b6b642d73ca.jpg','E:JavaWebProjectfxbcuploadfile/746b6424c19770bedf692b6b642d73ca.jpg',2448,3264,'qr_cat',NULL,0,'746b6424c19770bedf692b6b642d73ca','2016-01-21'),(366,'http://a627596279.oicp.net:80/fxbc/uploadfile/3d060d6df491edec94ae2f54c2228eee.png','E:JavaWebProjectfxbcuploadfile/3d060d6df491edec94ae2f54c2228eee.png',100,100,'qr_cat',NULL,0,'3d060d6df491edec94ae2f54c2228eee','2016-01-21'),(367,'http://a627596279.oicp.net:80/fxbc/uploadfile/3d060d6df491edec94ae2f54c2228eee.png','E:JavaWebProjectfxbcuploadfile/3d060d6df491edec94ae2f54c2228eee.png',100,100,'qr_cat',NULL,0,'3d060d6df491edec94ae2f54c2228eee','2016-01-21'),(368,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-21'),(369,'http://a627596279.oicp.net:80/fxbc/uploadfile/3d060d6df491edec94ae2f54c2228eee.png','E:JavaWebProjectfxbcuploadfile/3d060d6df491edec94ae2f54c2228eee.png',100,100,'qr_cat',NULL,0,'3d060d6df491edec94ae2f54c2228eee','2016-01-21'),(370,'http://a627596279.oicp.net:80/fxbc/uploadfile/91db689ffd521d9bf17e200a3f8f6a1b.jpg','E:JavaWebProjectfxbcuploadfile/91db689ffd521d9bf17e200a3f8f6a1b.jpg',2448,3264,'qr_cat',NULL,0,'91db689ffd521d9bf17e200a3f8f6a1b','2016-01-21'),(371,'http://a627596279.oicp.net:80/fxbc/uploadfile/91db689ffd521d9bf17e200a3f8f6a1b.jpg','E:JavaWebProjectfxbcuploadfile/91db689ffd521d9bf17e200a3f8f6a1b.jpg',2448,3264,'qr_cat',NULL,0,'91db689ffd521d9bf17e200a3f8f6a1b','2016-01-21'),(372,'http://a627596279.oicp.net:80/fxbc/uploadfile/746b6424c19770bedf692b6b642d73ca.jpg','E:JavaWebProjectfxbcuploadfile/746b6424c19770bedf692b6b642d73ca.jpg',2448,3264,'qr_cat',NULL,0,'746b6424c19770bedf692b6b642d73ca','2016-01-21'),(373,'http://a627596279.oicp.net:80/fxbc/uploadfile/b2e9770569336332690b941e45f86ec8.jpg','E:JavaWebProjectfxbcuploadfile/b2e9770569336332690b941e45f86ec8.jpg',1440,1280,'qr_certification',NULL,0,'b2e9770569336332690b941e45f86ec8','2016-01-21'),(374,'http://a627596279.oicp.net:80/fxbc/uploadfile/3972c6d5a0141c066de75fc39a4f84f9.png','E:JavaWebProjectfxbcuploadfile/3972c6d5a0141c066de75fc39a4f84f9.png',1080,1920,'qr_certification',NULL,0,'3972c6d5a0141c066de75fc39a4f84f9','2016-01-21'),(375,'http://a627596279.oicp.net:80/fxbc/uploadfile/a7f4265f81b864ff764c42b770efdbeb.jpg','E:JavaWebProjectfxbcuploadfile/a7f4265f81b864ff764c42b770efdbeb.jpg',480,858,'qr_certification',NULL,0,'a7f4265f81b864ff764c42b770efdbeb','2016-01-21'),(376,'http://a627596279.oicp.net:80/fxbc/uploadfile/9770be73a84bad635988ff8e0c4cd4e3.jpg','E:JavaWebProjectfxbcuploadfile/9770be73a84bad635988ff8e0c4cd4e3.jpg',480,858,'qr_certification',NULL,0,'9770be73a84bad635988ff8e0c4cd4e3','2016-01-21'),(377,'http://a627596279.oicp.net:80/fxbc/uploadfile/059d27e6320a83a7ecbdb38983a8ad06.PNG','E:JavaWebProjectfxbcuploadfile/059d27e6320a83a7ecbdb38983a8ad06.PNG',640,960,'qr_cat',NULL,0,'059d27e6320a83a7ecbdb38983a8ad06','2016-01-21'),(378,'http://a627596279.oicp.net:80/fxbc/uploadfile/f5bcc11c975720559d4a0498eeb185b5.png','E:JavaWebProjectfxbcuploadfile/f5bcc11c975720559d4a0498eeb185b5.png',1089,1920,'qr_cat',NULL,0,'f5bcc11c975720559d4a0498eeb185b5','2016-01-21'),(379,'http://a627596279.oicp.net:80/fxbc/uploadfile/505115900ec7f3c89cf298b162ea895b.jpg','E:JavaWebProjectfxbcuploadfile/505115900ec7f3c89cf298b162ea895b.jpg',2160,1920,'qr_cat',NULL,0,'505115900ec7f3c89cf298b162ea895b','2016-01-21'),(380,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-22'),(381,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-22'),(382,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_certification',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-22'),(383,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-22'),(384,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-22'),(385,'http://a627596279.oicp.net:80/fxbc/uploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg','E:JavaWebProjectfxbcuploadfile/b1a474fdccf4fdf8cfab0221581f1fd6.jpg',560,347,'qr_cat',NULL,0,'b1a474fdccf4fdf8cfab0221581f1fd6','2016-01-22'),(386,'http://a627596279.oicp.net:80/fxbc/uploadfile/46c3627ddc729954c981072032eb95ed.jpg','E:JavaWebProjectfxbcuploadfile/46c3627ddc729954c981072032eb95ed.jpg',3104,4192,'qr_cat',NULL,0,'46c3627ddc729954c981072032eb95ed','2016-01-22'),(387,'http://a627596279.oicp.net:80/fxbc/uploadfile/8f718f5a0e60429daaed32e59bb355f3.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/8f718f5a0e60429daaed32e59bb355f3.jpg',2448,3264,'qr_cat',NULL,0,'8f718f5a0e60429daaed32e59bb355f3','2016-01-22'),(388,'http://a627596279.oicp.net:80/fxbc/uploadfile/c3ea2c66d022be5c8545ed7be6b9f88a.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/c3ea2c66d022be5c8545ed7be6b9f88a.jpg',1080,1476,'qr_cat',NULL,0,'c3ea2c66d022be5c8545ed7be6b9f88a','2016-01-25'),(389,'http://a627596279.oicp.net:80/fxbc/uploadfile/d24f152bd197f106b2cde2b049553c3f.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/d24f152bd197f106b2cde2b049553c3f.jpg',2448,3264,'qr_cat',NULL,0,'d24f152bd197f106b2cde2b049553c3f','2016-01-25'),(390,'http://a627596279.oicp.net:80/fxbc/uploadfile/8f718f5a0e60429daaed32e59bb355f3.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/8f718f5a0e60429daaed32e59bb355f3.jpg',2448,3264,'qr_cat',NULL,0,'8f718f5a0e60429daaed32e59bb355f3','2016-01-25'),(391,'http://a627596279.oicp.net:80/fxbc/uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png','E:\\JavaWebProject\\fxbc\\uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png',108,108,'qr_park',16,0,'aceb3662fcb4bf2c476600a31fa0c36f','2016-01-25'),(392,'http://a627596279.oicp.net:80/fxbc/uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png','E:\\JavaWebProject\\fxbc\\uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png',108,108,'qr_park',17,0,'aceb3662fcb4bf2c476600a31fa0c36f','2016-01-25'),(393,'http://a627596279.oicp.net:80/fxbc/uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png','E:\\JavaWebProject\\fxbc\\uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png',108,108,'qr_park',18,0,'aceb3662fcb4bf2c476600a31fa0c36f','2016-01-25'),(394,'http://a627596279.oicp.net:80/fxbc/uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png','E:\\JavaWebProject\\fxbc\\uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png',108,108,'qr_region',14,0,'aceb3662fcb4bf2c476600a31fa0c36f','2016-01-25'),(395,'http://a627596279.oicp.net:80/fxbc/uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png','E:\\JavaWebProject\\fxbc\\uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png',108,108,'qr_region',15,0,'aceb3662fcb4bf2c476600a31fa0c36f','2016-01-25'),(396,'http://a627596279.oicp.net:80/fxbc/uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png','E:\\JavaWebProject\\fxbc\\uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png',108,108,'qr_region',16,0,'aceb3662fcb4bf2c476600a31fa0c36f','2016-01-25'),(397,'http://a627596279.oicp.net:80/fxbc/uploadfile/746b6424c19770bedf692b6b642d73ca.jpg','E:JavaWebProjectfxbcuploadfile/746b6424c19770bedf692b6b642d73ca.jpg',2448,3264,'qr_cat',NULL,0,'746b6424c19770bedf692b6b642d73ca','2016-01-25'),(398,'http://a627596279.oicp.net:80/fxbc/uploadfile/d24f152bd197f106b2cde2b049553c3f.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/d24f152bd197f106b2cde2b049553c3f.jpg',2448,3264,'qr_cat',NULL,0,'d24f152bd197f106b2cde2b049553c3f','2016-01-25'),(399,'http://a627596279.oicp.net:80/fxbc/uploadfile/37266b7ae82a4a519d38ef034fbccf7a.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/37266b7ae82a4a519d38ef034fbccf7a.jpg',2448,3264,'qr_cat',NULL,0,'37266b7ae82a4a519d38ef034fbccf7a','2016-01-28'),(400,'http://a627596279.oicp.net:80/fxbc/uploadfile/37266b7ae82a4a519d38ef034fbccf7a.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/37266b7ae82a4a519d38ef034fbccf7a.jpg',2448,3264,'qr_cat',NULL,0,'37266b7ae82a4a519d38ef034fbccf7a','2016-01-28'),(401,'http://a627596279.oicp.net:80/fxbc/uploadfile/5d5450e7143e4322e51ab4e2bfd97d6c.png','E:\\JavaWebProject\\fxbc\\uploadfile/5d5450e7143e4322e51ab4e2bfd97d6c.png',120,120,'qr_cat',NULL,0,'5d5450e7143e4322e51ab4e2bfd97d6c','2016-01-28'),(402,'http://a627596279.oicp.net:80/fxbc/uploadfile/5d5450e7143e4322e51ab4e2bfd97d6c.png','E:\\JavaWebProject\\fxbc\\uploadfile/5d5450e7143e4322e51ab4e2bfd97d6c.png',120,120,'qr_cat',NULL,0,'5d5450e7143e4322e51ab4e2bfd97d6c','2016-01-28'),(403,'http://a627596279.oicp.net:80/fxbc/uploadfile/049216b19f4ea8b7abe3ade3ae7283af.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/049216b19f4ea8b7abe3ade3ae7283af.jpg',2448,3264,'qr_cat',NULL,0,'049216b19f4ea8b7abe3ade3ae7283af','2016-01-28'),(404,'http://a627596279.oicp.net:80/fxbc/uploadfile/5d5450e7143e4322e51ab4e2bfd97d6c.png','E:\\JavaWebProject\\fxbc\\uploadfile/5d5450e7143e4322e51ab4e2bfd97d6c.png',120,120,'qr_cat',NULL,0,'5d5450e7143e4322e51ab4e2bfd97d6c','2016-01-28'),(405,'http://a627596279.oicp.net:80/fxbc/uploadfile/5d5450e7143e4322e51ab4e2bfd97d6c.png','E:\\JavaWebProject\\fxbc\\uploadfile/5d5450e7143e4322e51ab4e2bfd97d6c.png',120,120,'qr_cat',NULL,0,'5d5450e7143e4322e51ab4e2bfd97d6c','2016-01-28'),(406,'http://192.168.1.174:8080/fxbc/uploadfile/1269584696476925f630c87ea0ef4c6c.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/1269584696476925f630c87ea0ef4c6c.jpg',4192,3104,'qr_cat',NULL,0,'1269584696476925f630c87ea0ef4c6c','2016-01-28'),(407,'http://a627596279.oicp.net:80/fxbc/uploadfile/37266b7ae82a4a519d38ef034fbccf7a.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/37266b7ae82a4a519d38ef034fbccf7a.jpg',2448,3264,'qr_certification',NULL,0,'37266b7ae82a4a519d38ef034fbccf7a','2016-01-28'),(408,'http://a627596279.oicp.net:80/fxbc/uploadfile/5d5450e7143e4322e51ab4e2bfd97d6c.png','E:\\JavaWebProject\\fxbc\\uploadfile/5d5450e7143e4322e51ab4e2bfd97d6c.png',120,120,'qr_certification',NULL,0,'5d5450e7143e4322e51ab4e2bfd97d6c','2016-01-28'),(409,'http://a627596279.oicp.net:80/fxbc/uploadfile/6caac62c0879cbfa4719de90c83eb206.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/6caac62c0879cbfa4719de90c83eb206.jpg',2448,3264,'qr_certification',NULL,0,'6caac62c0879cbfa4719de90c83eb206','2016-01-28'),(410,'http://a627596279.oicp.net:80/fxbc/uploadfile/6caac62c0879cbfa4719de90c83eb206.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/6caac62c0879cbfa4719de90c83eb206.jpg',2448,3264,'qr_cat',NULL,0,'6caac62c0879cbfa4719de90c83eb206','2016-01-28'),(411,'http://a627596279.oicp.net:80/fxbc/uploadfile/9e97ef6c807e09825bfd35153f80e297.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/9e97ef6c807e09825bfd35153f80e297.jpg',2448,3264,'qr_cat',NULL,0,'9e97ef6c807e09825bfd35153f80e297','2016-01-28'),(412,'http://a627596279.oicp.net:80/fxbc/uploadfile/d7a3133841f39e4e80d8498cc4813fc4.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/d7a3133841f39e4e80d8498cc4813fc4.jpg',2448,3264,'qr_cat',NULL,0,'d7a3133841f39e4e80d8498cc4813fc4','2016-01-28'),(413,'http://a627596279.oicp.net:80/fxbc/uploadfile/37266b7ae82a4a519d38ef034fbccf7a.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/37266b7ae82a4a519d38ef034fbccf7a.jpg',2448,3264,'qr_cat',NULL,0,'37266b7ae82a4a519d38ef034fbccf7a','2016-01-28'),(414,'http://a627596279.oicp.net:80/fxbc/uploadfile/009d5f425b04b98eb01581bce21c6d5a.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/009d5f425b04b98eb01581bce21c6d5a.jpg',360,360,'qr_cat',NULL,0,'009d5f425b04b98eb01581bce21c6d5a','2016-01-28'),(415,'http://a627596279.oicp.net:80/fxbc/uploadfile/3d060d6df491edec94ae2f54c2228eee.png','E:JavaWebProjectfxbcuploadfile/3d060d6df491edec94ae2f54c2228eee.png',100,100,'qr_cat',NULL,0,'3d060d6df491edec94ae2f54c2228eee','2016-01-28'),(416,'http://a627596279.oicp.net:80/fxbc/uploadfile/6caac62c0879cbfa4719de90c83eb206.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/6caac62c0879cbfa4719de90c83eb206.jpg',2448,3264,'qr_cat',NULL,0,'6caac62c0879cbfa4719de90c83eb206','2016-01-28'),(417,'http://a627596279.oicp.net:80/fxbc/uploadfile/96bd7703c03a8fad03cd36dd35a93058.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/96bd7703c03a8fad03cd36dd35a93058.jpg',2448,3264,'qr_cat',NULL,0,'96bd7703c03a8fad03cd36dd35a93058','2016-01-28'),(418,'http://a627596279.oicp.net:80/fxbc/uploadfile/9cfdc472934b07702a2a5ba3cca0ada9.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/9cfdc472934b07702a2a5ba3cca0ada9.jpg',2448,3264,'qr_cat',NULL,0,'9cfdc472934b07702a2a5ba3cca0ada9','2016-01-28'),(419,'http://a627596279.oicp.net:80/fxbc/uploadfile/973486e9dde83c39a546dfba95dbfcaf.jpg','E:\\JavaWebProject\\fxbc\\uploadfile/973486e9dde83c39a546dfba95dbfcaf.jpg',5312,2988,'qr_cat',NULL,0,'973486e9dde83c39a546dfba95dbfcaf','2016-01-28'),(420,'http://192.168.1.174:8080/fxbc/uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg',338,600,'qr_cat',NULL,0,'bd5804d03d2159e7f1e042fc81c6a657','2016-01-29'),(421,'http://192.168.1.174:8080/fxbc/uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg',485,600,'qr_certification',NULL,0,'d6516a13fcb0c0cbad3b311ea202ccf8','2016-01-29'),(422,'http://192.168.1.174:8080/fxbc/uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg',338,600,'qr_certification',NULL,0,'bd5804d03d2159e7f1e042fc81c6a657','2016-01-29'),(423,'http://192.168.1.174:8080/fxbc/uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg',485,600,'qr_certification',NULL,0,'d6516a13fcb0c0cbad3b311ea202ccf8','2016-01-29'),(424,'http://192.168.1.174:8080/fxbc/uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg',485,600,'qr_certification',NULL,0,'d6516a13fcb0c0cbad3b311ea202ccf8','2016-01-29'),(425,'http://192.168.1.174:8080/fxbc/uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg',338,600,'qr_certification',NULL,0,'bd5804d03d2159e7f1e042fc81c6a657','2016-01-29'),(426,'http://192.168.1.174:8080/fxbc/uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg',485,600,'qr_certification',NULL,0,'d6516a13fcb0c0cbad3b311ea202ccf8','2016-01-29'),(427,'http://192.168.1.174:8080/fxbc/uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg',485,600,'qr_certification',NULL,0,'d6516a13fcb0c0cbad3b311ea202ccf8','2016-01-29'),(428,'http://192.168.1.174:8080/fxbc/uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg',338,600,'qr_certification',NULL,0,'bd5804d03d2159e7f1e042fc81c6a657','2016-01-29'),(429,'http://192.168.1.174:8080/fxbc/uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg',485,600,'qr_certification',NULL,0,'d6516a13fcb0c0cbad3b311ea202ccf8','2016-01-29'),(430,'http://192.168.1.174:8080/fxbc/uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg',485,600,'qr_certification',NULL,0,'d6516a13fcb0c0cbad3b311ea202ccf8','2016-01-29'),(431,'http://192.168.1.174:8080/fxbc/uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg',485,600,'qr_certification',NULL,0,'d6516a13fcb0c0cbad3b311ea202ccf8','2016-01-29'),(432,'http://192.168.1.174:8080/fxbc/uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg',338,600,'qr_certification',NULL,0,'bd5804d03d2159e7f1e042fc81c6a657','2016-01-29'),(433,'http://192.168.1.174:8080/fxbc/uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg',485,600,'qr_certification',NULL,0,'d6516a13fcb0c0cbad3b311ea202ccf8','2016-01-29'),(434,'http://192.168.1.174:8080/fxbc/uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/d6516a13fcb0c0cbad3b311ea202ccf8.jpg',485,600,'qr_cat',NULL,0,'d6516a13fcb0c0cbad3b311ea202ccf8','2016-01-29'),(435,'http://192.168.1.174:8080/fxbc/uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg','D:\\apache-tomcat-7.0.52\\webapps\\fxbc\\uploadfile/bd5804d03d2159e7f1e042fc81c6a657.jpg',338,600,'qr_cat',NULL,0,'bd5804d03d2159e7f1e042fc81c6a657','2016-01-29'),(436,'http://114.215.168.112:8080/fxbc/uploadfile/44730e6f15d820be8695670854f375a3.jpg','/home/JavaWebProject/fxbc/uploadfile/44730e6f15d820be8695670854f375a3.jpg',2448,3264,'qr_cat',NULL,0,'44730e6f15d820be8695670854f375a3','2016-01-30'),(437,'http://114.215.168.112:8080/fxbc/uploadfile/fd7cea639d2d833fdf294c497efbba97.png','/home/JavaWebProject/fxbc/uploadfile/fd7cea639d2d833fdf294c497efbba97.png',259,203,'qr_cat',NULL,0,'fd7cea639d2d833fdf294c497efbba97','2016-01-30'),(438,'http://a627596279.oicp.net:80/fxbc/uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png','E:\\JavaWebProject\\fxbc\\uploadfile/aceb3662fcb4bf2c476600a31fa0c36f.png',108,108,'qr_region',NULL,0,'aceb3662fcb4bf2c476600a31fa0c36f','2016-01-30'),(439,'http://114.215.168.112:8080/fxbc/uploadfile/6fb1c07b6bbd128a6e6b956536dc5dc3.png','/home/JavaWebProject/fxbc/uploadfile/6fb1c07b6bbd128a6e6b956536dc5dc3.png',270,262,'qr_region',NULL,0,'6fb1c07b6bbd128a6e6b956536dc5dc3','2016-01-30'),(440,'http://114.215.168.112:8080/fxbc/uploadfile/6fb1c07b6bbd128a6e6b956536dc5dc3.png','/home/JavaWebProject/fxbc/uploadfile/6fb1c07b6bbd128a6e6b956536dc5dc3.png',270,262,'qr_community',NULL,0,'6fb1c07b6bbd128a6e6b956536dc5dc3','2016-01-30'),(441,'http://114.215.168.112:8080/fxbc/uploadfile/6fb1c07b6bbd128a6e6b956536dc5dc3.png','/home/JavaWebProject/fxbc/uploadfile/6fb1c07b6bbd128a6e6b956536dc5dc3.png',270,262,'qr_park',NULL,0,'6fb1c07b6bbd128a6e6b956536dc5dc3','2016-01-30');

/*Table structure for table `qr_log` */

DROP TABLE IF EXISTS `qr_log`;

CREATE TABLE `qr_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) DEFAULT NULL COMMENT '类型',
  `time` datetime DEFAULT NULL COMMENT '时间',
  `data` varchar(200) DEFAULT NULL COMMENT '内容',
  `ip` varchar(200) DEFAULT NULL COMMENT 'ip',
  `name` varchar(200) DEFAULT NULL COMMENT '用户名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `qr_log` */

insert  into `qr_log`(`id`,`type`,`time`,`data`,`ip`,`name`) values (4,'登录','2016-01-22 16:41:49','登录成功','127.0.0.1','admin'),(5,'登录','2016-01-31 17:06:29','登录成功','127.0.0.1','admin'),(6,'登录','2016-01-30 17:15:30','登录成功','127.0.0.1','admin'),(7,'登录','2016-01-30 17:42:30','登录成功','120.192.230.202','admin'),(8,'登录','2016-02-01 10:23:29','登录成功','120.192.230.194','admin'),(9,'登录','2016-02-01 10:54:31','登录成功','120.192.230.194','admin'),(10,'登录','2016-02-01 13:07:02','验证码错误','120.192.230.194','admin'),(11,'登录','2016-02-01 13:07:08','登录成功','120.192.230.194','admin'),(12,'登录','2016-02-01 15:25:02','登录成功','120.192.230.194','admin');

/*Table structure for table `qr_manager` */

DROP TABLE IF EXISTS `qr_manager`;

CREATE TABLE `qr_manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `rid` int(11) NOT NULL COMMENT '角色ID',
  `account` varchar(20) NOT NULL COMMENT '管理员账号',
  `password` varchar(60) NOT NULL COMMENT '账号密码',
  `name` varchar(20) NOT NULL COMMENT '管理员姓名',
  `alias` varchar(20) DEFAULT NULL,
  `creator` varchar(20) NOT NULL,
  `creatorDate` date DEFAULT NULL,
  `lastModfier` varchar(20) DEFAULT NULL COMMENT '最后修改者',
  `lastModDate` date DEFAULT NULL,
  `status` int(1) DEFAULT '0' COMMENT '0:启用；1:停用',
  `lastloginDate` datetime DEFAULT NULL,
  `lastloginIP` varchar(50) DEFAULT NULL,
  `loginNumber` int(11) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `qr_manager` */

insert  into `qr_manager`(`id`,`rid`,`account`,`password`,`name`,`alias`,`creator`,`creatorDate`,`lastModfier`,`lastModDate`,`status`,`lastloginDate`,`lastloginIP`,`loginNumber`,`email`) values (1,1,'admin','21232f297a57a5a743894a0e4a801fc3','雍容','超级管理员','系统内置','2016-02-01','雍容','2016-02-01',0,'2016-02-01 15:25:02','120.192.230.194',175,'yongrong@163.com'),(2,3,'zhangsan','e10adc3949ba59abbe56e057f20f883e','张三','超级管理员','系统内置','2016-01-20','雍容','2016-01-20',0,'2016-01-10 00:00:00','',0,'zhangsan@163.com'),(3,2,'lisi','21232f297a57a5a743894a0e4a801fc3','李四','超级管理员','系统内置','2016-01-20','雍容','2016-01-20',0,'2016-01-10 00:00:00','',0,'lisi@163.com'),(4,1,'qr1453274363476','84360a977c722d6ac7b3c8be5e07219c','liyang',NULL,'雍容','2016-01-20','雍容','2016-01-20',0,'2016-01-20 00:00:00',NULL,0,'liyang@163.com'),(5,1,'qr1453275038351','e10adc3949ba59abbe56e057f20f883e','zzg',NULL,'雍容','2016-01-20','雍容','2016-01-20',0,'2016-01-20 00:00:00',NULL,0,'zhaozhigao@9sheji.cn');

/*Table structure for table `qr_message` */

DROP TABLE IF EXISTS `qr_message`;

CREATE TABLE `qr_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` varchar(255) DEFAULT NULL COMMENT '意见内容',
  `uid` int(11) DEFAULT NULL COMMENT '用户id',
  `mname` varchar(11) DEFAULT NULL COMMENT '管理员名字',
  `status` int(11) DEFAULT NULL COMMENT '0未读 1已读',
  `subdate` datetime DEFAULT NULL COMMENT '提交时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `qr_message` */

insert  into `qr_message`(`id`,`data`,`uid`,`mname`,`status`,`subdate`) values (1,'反正是很拉级 韩国人都是怪物吗  大量时间哦就是卡咖啡豆撒娇垃圾打开；阿郎倒垃圾奥丝蓝黛加拉斯大件垃圾dad卡卡大口大口判断',4,'雍容',1,'2016-01-21 18:32:43'),(2,'sadsaddddddddddd大三大四打杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀',4,'雍容',1,'2016-01-22 09:55:39'),(3,'打杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀大撒旦阿达as大苏打阿达',4,'雍容',1,'2016-01-23 09:55:55'),(4,'你好',4,'雍容',1,'2016-01-29 15:29:54'),(5,'蔡豪',4,'雍容',1,'2016-01-29 15:30:21'),(6,'呵呵',25,'雍容',1,'2016-02-01 10:25:29');

/*Table structure for table `qr_pagepower` */

DROP TABLE IF EXISTS `qr_pagepower`;

CREATE TABLE `qr_pagepower` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '页面权限ID',
  `pid` int(11) DEFAULT NULL COMMENT '页面权限父ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限名称',
  `url` varchar(255) DEFAULT NULL COMMENT '权限链接',
  `iconfont` varchar(50) NOT NULL COMMENT '字体图片',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '权限状态，0:启用；1：停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

/*Data for the table `qr_pagepower` */

insert  into `qr_pagepower`(`id`,`pid`,`name`,`url`,`iconfont`,`status`) values (1,NULL,'管理员管理','menu-admin','&#xe62d;',0),(2,1,'角色管理','admin-role.html','',0),(3,1,'权限管理','admin-permission.html','',0),(4,1,'管理员列表','admin-list.html','',0),(5,NULL,'车位管理',NULL,'&#xe616;',0),(6,5,'小区列表','community-list.html','',0),(7,NULL,'图片管理',NULL,'&#xe613;',0),(8,7,'图片管理','picture-list.html','',0),(9,NULL,'认证管理',NULL,'&#xe620;',0),(10,9,'车辆认证','owner-car-list.html','',0),(11,9,'车位认证','owner-ye-list.html','',0),(12,9,'审核通过','owner-pass-list.html','',0),(13,NULL,'订单管理',NULL,'&#xe622;',0),(14,13,'预约车位订单','order-book.html','',0),(15,13,'分享车位订单','order-share.html','',0),(16,NULL,'会员管理','menu-member','&#xe60d;',0),(17,16,'会员列表','member-list.html','',0),(18,16,'短信发送记录','sns-list.html','',0),(24,NULL,'财务管理','menu-order','&#xe63a;',0),(25,24,'订单列表','order-list.html','',1),(27,24,'发票管理','invoice-list.html','',1),(39,NULL,'系统管理','menu-system','&#xe62e;',0),(40,39,'系统设置','system-base.html','',0),(44,39,'系统日志','system-log.html','',0),(46,9,'审核不通过','owner-nopass-list.html','',0),(47,5,'停车场列表','parkingspace-list.html','',0),(48,5,'区域列表','region-list.html','',0),(49,5,'车位列表','carport-list.html','',0),(51,9,'用户资质认证','owner-usercz-list.html','',0),(52,39,'数据库备份恢复','database-index.html','',0),(53,24,'提现记录','withdraw-list.html','',0);

/*Table structure for table `qr_powergroup` */

DROP TABLE IF EXISTS `qr_powergroup`;

CREATE TABLE `qr_powergroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '按钮权限组ID',
  `name` varchar(50) NOT NULL COMMENT '栏目名称',
  `ppid` int(11) DEFAULT NULL COMMENT '页面权限ID',
  `bpid` varchar(100) DEFAULT NULL COMMENT '按钮权限ID，以逗号分割',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态，0:启用；1:停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

/*Data for the table `qr_powergroup` */

insert  into `qr_powergroup`(`id`,`name`,`ppid`,`bpid`,`status`) values (2,'',2,'1,3',0),(3,'',3,'2,4',0),(4,'',4,'',0),(5,'',6,'',0),(6,'',8,'',0),(19,'',4,'5',0),(20,'',3,'4,2',0),(21,'',2,'6,7,1,3',0),(22,'',47,'',0),(23,'',48,'',0),(24,'',49,'',0),(25,'',11,'',0),(26,'',10,'',0),(27,'',51,'',0),(28,'',46,'',0),(29,'',12,'',0),(30,'',40,'',0),(31,'',44,'',0),(32,'',25,'',0),(33,'',26,'',0),(34,'',27,'',0),(35,'',17,'',0),(36,'',18,'',0),(37,'',14,'',0),(38,'',15,'',0),(39,'',2,'7,6,3,1',0),(40,'',52,'',0),(41,'',53,'',0);

/*Table structure for table `qr_role` */

DROP TABLE IF EXISTS `qr_role`;

CREATE TABLE `qr_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '权限组ID',
  `name` varchar(20) NOT NULL COMMENT '权限组名称',
  `pgid` varchar(100) DEFAULT NULL COMMENT '功能权限，以逗号分割',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '权限组状态；0:启用，1:停用',
  `sorting` int(3) NOT NULL COMMENT '排序序号',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `qr_role` */

insert  into `qr_role`(`id`,`name`,`pgid`,`status`,`sorting`,`desc`) values (1,'超级管理员','25,26,27,28,29,6,22,5,24,23,19,20,21,40,30,31,32,33,41,35,36,37,38',0,1,'拥有至高无上的权利'),(2,'管理员2','19,20,21',0,2,'具有添加、审核、发布、删除内容的权限'),(3,'车位管理员2','22,5,24,23',0,0,'编辑工作者');

/*Table structure for table `qr_sns` */

DROP TABLE IF EXISTS `qr_sns`;

CREATE TABLE `qr_sns` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `destphone` varchar(15) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `time` bigint(13) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;

/*Data for the table `qr_sns` */

insert  into `qr_sns`(`id`,`destphone`,`description`,`time`,`ip`) values (77,'18992859527','欢迎注册，验证码：356622',1453465869526,'192.168.1.198'),(78,'18629095657','欢迎注册，验证码：173543',1453700531697,'192.168.1.198'),(79,'17098826292','欢迎注册，验证码：788615',1453709550473,'192.168.1.198'),(80,'18706744762','欢迎注册，验证码：295666',1453891113973,'192.168.1.198'),(81,'15332336463','欢迎注册，验证码：018075',1453965622065,'192.168.1.198'),(82,'13038581088','找回密码，验证码：043078',1454132563878,'120.192.230.202');

/*Table structure for table `qr_sysconfig` */

DROP TABLE IF EXISTS `qr_sysconfig`;

CREATE TABLE `qr_sysconfig` (
  `id` int(11) NOT NULL COMMENT 'ID',
  `objectname` varchar(50) DEFAULT NULL COMMENT '项目名称',
  `copyright` varchar(50) DEFAULT NULL COMMENT '底部版本信息',
  `icp` varchar(50) DEFAULT NULL COMMENT '备案号',
  `statisticalcode` text COMMENT '统计代码',
  `ipwhitelist` varchar(255) DEFAULT NULL COMMENT 'IP白名单',
  `maxloginnumber` int(2) DEFAULT NULL COMMENT '最大登录次数',
  `uploadpath` varchar(100) DEFAULT NULL COMMENT '上传目录',
  `snskey` varchar(100) DEFAULT NULL COMMENT '网建用户key',
  `snsuid` varchar(100) DEFAULT NULL COMMENT '网建用户id',
  `minwithdraw` double(10,2) DEFAULT NULL COMMENT '最低提现金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qr_sysconfig` */

insert  into `qr_sysconfig`(`id`,`objectname`,`copyright`,`icp`,`statisticalcode`,`ipwhitelist`,`maxloginnumber`,`uploadpath`,`snskey`,`snsuid`,`minwithdraw`) values (1,'分享泊车管理平台','? 2014 All Rights Reserved. Designed by Chameleon','京ICP备00000000号','<script type=\"text/javascript\">\r\nvar _hmt = _hmt || [];\r\n(function() {\r\n  var hm = document.createElement(\"script\");\r\n  hm.src = \"//hm.baidu.com/hm.js?080836300300be57b7f34f4b3e97d911\";\r\n  var s = document.getElementsByTagName(\"script\")[0]; \r\n  s.parentNode.insertBefore(hm, s)})();\r\nvar _bdhmProtocol = ((\"https:\" == document.location.protocol) ? \" https://\" : \" http://\");\r\ndocument.write(unescape(\"%3Cscript src=\'\" + _bdhmProtocol + \"hm.baidu.com/h.js%3F080836300300be57b7f34f4b3e97d911\' type=\'text/javascript\'%3E%3C/script%3E\"));\r\n</script>','*',5,'uploadfile','e1cfa776d06b72a2bb45345345','qinren',0.01);

/*Table structure for table `qr_user` */

DROP TABLE IF EXISTS `qr_user`;

CREATE TABLE `qr_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `phone` varchar(15) NOT NULL COMMENT '手机号码',
  `email` varchar(30) DEFAULT NULL COMMENT 'email',
  `account` varchar(30) DEFAULT NULL COMMENT '账号',
  `name` varchar(20) DEFAULT NULL COMMENT '姓名',
  `nickname` varchar(20) DEFAULT NULL COMMENT '昵称',
  `sex` int(1) DEFAULT NULL COMMENT '性别 1男2女',
  `birth` bigint(13) DEFAULT NULL COMMENT '生日',
  `password` varchar(64) DEFAULT NULL COMMENT '密码',
  `headpic` int(11) DEFAULT NULL COMMENT '头像外键',
  `status` int(1) DEFAULT NULL COMMENT '状态：0正常 1停用',
  `regtime` bigint(13) DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `qr_user` */

insert  into `qr_user`(`id`,`phone`,`email`,`account`,`name`,`nickname`,`sex`,`birth`,`password`,`headpic`,`status`,`regtime`) values (4,'15691931537',NULL,NULL,'江慧',NULL,0,0,'de88e3e4ab202d87754078cbb2df6063',1,0,1451895087513),(5,'15771712467',NULL,NULL,'某',NULL,0,0,'25f9e794323b453885f5181f1b624d0b',1,0,1451895087513),(6,'15691964865',NULL,NULL,'张某',NULL,0,0,'25d55ad283aa400af464c76d713c07ad',1,0,1451895087513),(7,'15691956836',NULL,NULL,'李某',NULL,0,0,'8a6f2805b4515ac12058e79e66539be9',1,0,1451895087513),(8,'15771746852',NULL,NULL,'关将军',NULL,0,0,'8a6f2805b4515ac12058e79e66539be9',1,0,1451895087513),(9,'15692956862',NULL,NULL,'张飞',NULL,1,NULL,'8a6f2805b4515ac12058e79e66539be9',1,0,1451895087513),(10,'15691931538',NULL,NULL,NULL,NULL,NULL,NULL,'25d55ad283aa400af464c76d713c07ad',1,0,1452749458964),(11,'15691931539',NULL,NULL,NULL,NULL,NULL,NULL,'25d55ad283aa400af464c76d713c07ad',1,0,1452750077553),(12,'13022882927',NULL,NULL,'老王他家',NULL,0,0,'de88e3e4ab202d87754078cbb2df6063',1,0,1452934373219),(16,'13571497032',NULL,NULL,'蔡浩',NULL,NULL,NULL,'de88e3e4ab202d87754078cbb2df6063',1,0,1452935824746),(17,'15691931530',NULL,NULL,NULL,NULL,NULL,NULL,'de88e3e4ab202d87754078cbb2df6063',1,0,1453169674719),(18,'13038581088',NULL,NULL,'李莎哈哈哈',NULL,0,0,'75a593a34aa5ba8e5e5788b7c899802e',1,0,1453180477703),(19,'18706744761',NULL,NULL,'某一',NULL,0,0,'1a1b7b565d5d511495c66893d6494101',1,0,1453182649350),(20,'15339230158',NULL,NULL,'刘琳',NULL,0,0,'25d55ad283aa400af464c76d713c07ad',1,0,1453275487835),(21,'15619921120',NULL,NULL,'某二',NULL,0,0,'ce7659d287203d561668b398284164da',1,0,1453344803476),(22,'18992859527',NULL,NULL,NULL,NULL,NULL,NULL,'574306114ec9ac9fad21573e656cd265',1,0,1453465934120),(23,'18629095657',NULL,NULL,'程锋',NULL,0,0,'3b6f837f799ebca8926e33c49000aaec',1,0,1453700559572),(24,'17098826292',NULL,NULL,NULL,NULL,NULL,NULL,'ce7659d287203d561668b398284164da',1,0,1453709629395),(25,'18706744762',NULL,NULL,'某三',NULL,0,0,'5690dddfa28ae085d23518a035707282',1,0,1453891139989),(26,'15332336463',NULL,NULL,'阿帕奇',NULL,0,0,'c4af508c6ef1619e755d14fc6d29e1d4',1,0,1453965663424);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
