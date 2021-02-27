-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2021 at 07:16 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `telegramapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id_chat` int(11) NOT NULL,
  `key_room` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `id_sender` int(11) NOT NULL,
  `id_reciver` int(11) NOT NULL,
  `create_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id_chat`, `key_room`, `message`, `id_sender`, `id_reciver`, `create_at`) VALUES
(173, 3463, 'Hello, how are you ?', 31, 32, '2021-02-26 11:56:13'),
(174, 3463, 'Good, how about you ?', 32, 31, '2021-02-26 11:57:06'),
(176, 3463, 'I am fine, too', 31, 32, '2021-02-26 11:58:01'),
(177, 3463, 'Do you have free time? I want to ask for help', 32, 31, '2021-02-26 11:59:04'),
(178, 3463, 'now i\'m free, need help about what bro ?', 31, 32, '2021-02-26 12:00:18');

-- --------------------------------------------------------

--
-- Table structure for table `friend_list`
--

CREATE TABLE `friend_list` (
  `id_list` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `friend_status` int(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friend_list`
--

INSERT INTO `friend_list` (`id_list`, `id_user1`, `id_user2`, `friend_status`, `created_at`, `updated_at`, `status`) VALUES
(56, 32, 31, 1, '2021-02-25 12:26:10', '0000-00-00 00:00:00', ''),
(57, 31, 32, 1, '2021-02-25 12:26:10', '0000-00-00 00:00:00', 'req'),
(58, 33, 31, 1, '2021-02-26 08:48:07', '0000-00-00 00:00:00', ''),
(59, 31, 33, 1, '2021-02-26 08:48:07', '0000-00-00 00:00:00', 'req');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profile_id` int(11) NOT NULL,
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
  `lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `user_status`, `user_name`, `user_fullname`, `user_phone`, `user_bio`, `user_photo`, `created_at`, `updated_at`, `lat`, `lng`) VALUES
(14, 31, 'online', 'firman_azhar.r', 'Firman Azhar R', '083122494951', 'Enjoy your last meal', '2021-02-26T12-02-17.981Zmail.png', '2021-02-25 19:22:42', '2021-02-27 18:14:15', -7.150975, 110.14025939999999),
(15, 32, 'online', 'si_upin', 'Upin', 'Upin', 'My name is upin', '2021-02-25T12-25-58.097Zupin.jpg', '2021-02-25 19:23:27', '2021-02-27 18:14:26', -7.150975, 110.14025939999999),
(16, 33, 'online', 'si_ipin', 'Si Ipin', '08978665413', 'My name is ipin', '', '2021-02-26 15:47:37', '2021-02-26 08:49:04', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `room_chat`
--

CREATE TABLE `room_chat` (
  `id_room` int(11) NOT NULL,
  `key_room` int(11) NOT NULL,
  `user1` int(11) NOT NULL,
  `user2` int(11) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_chat`
--

INSERT INTO `room_chat` (`id_room`, `key_room`, `user1`, `user2`, `create_at`, `update_at`) VALUES
(70, 3463, 31, 32, '2021-02-25 12:26:34', '0000-00-00 00:00:00'),
(71, 3463, 32, 31, '2021-02-25 12:26:34', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_displayname` varchar(100) DEFAULT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_created_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  `key_reset` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_displayname`, `user_email`, `user_password`, `user_created_at`, `update_at`, `key_reset`) VALUES
(31, 'Firman Azhar R', 'firmanazhar14@gmail.com', '$2b$10$aaX3465sPyXdYGK9DxY8Aeb5D8W/PLN7W9xmwW0BS8khidVDEA/8e', '2021-02-25 12:22:42', '2021-02-26 09:17:37', 'bdf3d1bd4b46a2560923b27a6638c4'),
(32, 'Upin', 'upin@gmail.com', '$2b$10$o6GKWzxIlQGlqleBWPK3nuylWT.rNit2VMSSfPHqIE8mTmfLTQ/1e', '2021-02-25 12:23:27', '0000-00-00 00:00:00', ''),
(33, 'Si Ipin', 'ipin@gmail.com', '$2b$10$2sXJ6olOSsTbJSqV.MoFcOOZc5wsfTftLea3ADANHjW0AGVqXUbKy', '2021-02-26 08:47:37', '0000-00-00 00:00:00', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`);

--
-- Indexes for table `friend_list`
--
ALTER TABLE `friend_list`
  ADD PRIMARY KEY (`id_list`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD KEY `profile_id` (`profile_id`);

--
-- Indexes for table `room_chat`
--
ALTER TABLE `room_chat`
  ADD PRIMARY KEY (`id_room`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT for table `friend_list`
--
ALTER TABLE `friend_list`
  MODIFY `id_list` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `room_chat`
--
ALTER TABLE `room_chat`
  MODIFY `id_room` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
