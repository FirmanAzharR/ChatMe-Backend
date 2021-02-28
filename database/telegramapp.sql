/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 10.4.14-MariaDB : Database - telegramapp
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`telegramapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `telegramapp`;

/*Table structure for table `chat` */

DROP TABLE IF EXISTS `chat`;

CREATE TABLE `chat` (
  `id_chat` int(11) NOT NULL AUTO_INCREMENT,
  `key_room` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `id_sender` int(11) NOT NULL,
  `id_reciver` int(11) NOT NULL,
  `create_at` datetime NOT NULL,
  PRIMARY KEY (`id_chat`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4;

/*Data for the table `chat` */

insert  into `chat`(`id_chat`,`key_room`,`message`,`id_sender`,`id_reciver`,`create_at`) values 
(173,3463,'Hello, how are you ?',31,32,'2021-02-26 11:56:13'),
(174,3463,'Good, how about you ?',32,31,'2021-02-26 11:57:06'),
(176,3463,'I am fine, too',31,32,'2021-02-26 11:58:01'),
(177,3463,'Do you have free time? I want to ask for help',32,31,'2021-02-26 11:59:04'),
(178,3463,'now i\'m free, need help about what bro ?',31,32,'2021-02-26 12:00:18');

/*Table structure for table `friend_list` */

DROP TABLE IF EXISTS `friend_list`;

CREATE TABLE `friend_list` (
  `id_list` int(11) NOT NULL AUTO_INCREMENT,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `friend_status` int(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id_list`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4;

/*Data for the table `friend_list` */

insert  into `friend_list`(`id_list`,`id_user1`,`id_user2`,`friend_status`,`created_at`,`updated_at`,`status`) values 
(56,32,31,1,'2021-02-25 12:26:10','0000-00-00 00:00:00',''),
(57,31,32,1,'2021-02-25 12:26:10','0000-00-00 00:00:00','req'),
(58,33,31,1,'2021-02-26 08:48:07','0000-00-00 00:00:00',''),
(59,31,33,1,'2021-02-26 08:48:07','0000-00-00 00:00:00','req');

/*Table structure for table `profile` */

DROP TABLE IF EXISTS `profile`;

CREATE TABLE `profile` (
  `profile_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `user_status` varchar(10) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_fullname` varchar(100) DEFAULT NULL,
  `user_phone` varchar(15) DEFAULT NULL,
  `user_bio` varchar(255) DEFAULT NULL,
  `user_photo` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  KEY `profile_id` (`profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

/*Data for the table `profile` */

insert  into `profile`(`profile_id`,`user_id`,`user_status`,`user_name`,`user_fullname`,`user_phone`,`user_bio`,`user_photo`,`created_at`,`updated_at`,`lat`,`lng`) values 
(14,31,'online','firman_azhar.r','Firman Azhar R','083122494951','Enjoy your last meal','2021-02-26T12-02-17.981Zmail.png','2021-02-25 19:22:42','2021-02-27 18:14:15',-7.150975,110.14025939999999),
(15,32,'online','si_upin','Upin','Upin','My name is upin','2021-02-25T12-25-58.097Zupin.jpg','2021-02-25 19:23:27','2021-02-27 18:14:26',-7.150975,110.14025939999999),
(16,33,'online','si_ipin','Si Ipin','08978665413','My name is ipin','','2021-02-26 15:47:37','2021-02-26 08:49:04',0,0);

/*Table structure for table `room_chat` */

DROP TABLE IF EXISTS `room_chat`;

CREATE TABLE `room_chat` (
  `id_room` int(11) NOT NULL AUTO_INCREMENT,
  `key_room` int(11) NOT NULL,
  `user1` int(11) NOT NULL,
  `user2` int(11) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id_room`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4;

/*Data for the table `room_chat` */

insert  into `room_chat`(`id_room`,`key_room`,`user1`,`user2`,`create_at`,`update_at`) values 
(70,3463,31,32,'2021-02-25 12:26:34','0000-00-00 00:00:00'),
(71,3463,32,31,'2021-02-25 12:26:34','0000-00-00 00:00:00');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_displayname` varchar(100) DEFAULT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_created_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  `key_reset` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`user_id`,`user_displayname`,`user_email`,`user_password`,`user_created_at`,`update_at`,`key_reset`) values 
(31,'Firman Azhar R','firmanazhar14@gmail.com','$2b$10$aaX3465sPyXdYGK9DxY8Aeb5D8W/PLN7W9xmwW0BS8khidVDEA/8e','2021-02-25 12:22:42','2021-02-26 09:17:37','bdf3d1bd4b46a2560923b27a6638c4'),
(32,'Upin','upin@gmail.com','$2b$10$o6GKWzxIlQGlqleBWPK3nuylWT.rNit2VMSSfPHqIE8mTmfLTQ/1e','2021-02-25 12:23:27','0000-00-00 00:00:00',''),
(33,'Si Ipin','ipin@gmail.com','$2b$10$2sXJ6olOSsTbJSqV.MoFcOOZc5wsfTftLea3ADANHjW0AGVqXUbKy','2021-02-26 08:47:37','0000-00-00 00:00:00','');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
