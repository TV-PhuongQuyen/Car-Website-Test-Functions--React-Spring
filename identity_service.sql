-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2025 at 08:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `identity_service`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_message`
--

CREATE TABLE `chat_message` (
  `id` bigint(20) NOT NULL,
  `conversation_id` varchar(255) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `message` text NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_message`
--

INSERT INTO `chat_message` (`id`, `conversation_id`, `sender_id`, `message`, `created_date`) VALUES
(26, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'vao ddi', '2025-08-30 09:00:57'),
(27, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'đợi xiu pro', '2025-08-30 09:03:34'),
(28, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'nhanh', '2025-08-30 09:05:23'),
(29, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 's', '2025-08-30 09:08:01'),
(30, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'đợi', '2025-08-30 09:35:11'),
(31, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'e', '2025-08-30 09:40:32'),
(32, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'nhanh', '2025-08-30 09:43:11'),
(33, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'đợi', '2025-08-30 09:44:25'),
(34, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'sds', '2025-08-30 09:53:11'),
(35, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 's', '2025-08-30 09:59:27'),
(36, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'sdas', '2025-08-30 09:59:40'),
(37, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 's', '2025-08-30 11:31:03'),
(38, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'ss', '2025-08-30 12:14:54'),
(39, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'sao đất', '2025-08-30 12:14:59'),
(40, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'Hôm này chời đẹp thế không ra ngoài chơi à', '2025-08-30 12:17:46'),
(41, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'dsa', '2025-08-30 12:20:49'),
(42, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'dsa', '2025-08-30 12:20:50'),
(43, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'Hôm nay chời đẹp thật ', '2025-08-30 12:23:59'),
(44, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'Hôm nay chời đẹp thật ', '2025-08-30 12:27:12'),
(45, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'Hôm nay chời đẹp thật ', '2025-08-30 12:28:30'),
(46, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'đâu đấy', '2025-08-30 12:33:37'),
(47, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'đâu đấy', '2025-08-30 12:33:37'),
(48, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'ơi', '2025-08-30 12:33:59'),
(49, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'ơi', '2025-08-30 12:33:59'),
(50, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'Chơi đê', '2025-08-30 12:34:47'),
(51, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'Đơi', '2025-08-30 12:37:03'),
(52, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'gì', '2025-08-30 12:37:09'),
(53, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 's', '2025-08-30 12:58:20'),
(54, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'ơi', '2025-08-30 12:58:24'),
(55, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 's', '2025-08-30 13:03:59'),
(56, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'Đi đầu đấy', '2025-08-30 13:05:11'),
(57, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'chịu thôi', '2025-08-30 13:05:44'),
(58, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'lo', '2025-08-30 13:29:32'),
(59, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 's', '2025-08-30 13:35:48'),
(60, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'chụ chet roi', '2025-08-30 13:35:55'),
(61, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'e', '2025-08-30 14:12:54'),
(62, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 's', '2025-08-30 14:12:59'),
(63, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'sda', '2025-08-30 14:13:03'),
(64, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'e', '2025-08-30 14:14:05'),
(65, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'sd', '2025-08-30 14:16:30'),
(66, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'dsa', '2025-08-30 14:16:45'),
(67, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 's', '2025-08-30 14:23:11'),
(68, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'ơi', '2025-08-30 14:23:25'),
(69, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'bạn ơi', '2025-08-30 14:24:21'),
(70, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'ơi', '2025-08-30 14:25:20'),
(71, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'e', '2025-08-30 14:27:18'),
(72, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'gì đấy', '2025-08-30 14:27:38');

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE `conversation` (
  `id` varchar(36) NOT NULL,
  `type` varchar(20) NOT NULL,
  `participants_hash` varchar(255) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `modified_date` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`id`, `type`, `participants_hash`, `created_date`, `modified_date`) VALUES
('53bdb93a-f353-48e6-929a-1e28a1dffe58', 'DIRECT', '56_58', '2025-08-28 06:11:55.000000', '2025-08-28 06:11:55.000000'),
('95468964-51e6-4752-8bc8-9f6650888f33', 'DIRECT', '49_58', '2025-08-28 06:11:55.000000', '2025-08-28 06:11:55.000000'),
('f6a57871-a2bf-4256-a584-d4896ec7ab61', 'DIRECT', '49_56', '2025-08-29 06:05:04.000000', '2025-08-29 06:05:04.000000');

-- --------------------------------------------------------

--
-- Table structure for table `conversation_participant`
--

CREATE TABLE `conversation_participant` (
  `id` bigint(20) NOT NULL,
  `conversation_id` varchar(64) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'MEMBER',
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conversation_participant`
--

INSERT INTO `conversation_participant` (`id`, `conversation_id`, `user_id`, `role`, `joined_at`) VALUES
(33, '53bdb93a-f353-48e6-929a-1e28a1dffe58', 58, 'MEMBER', '2025-08-27 23:11:55'),
(34, '95468964-51e6-4752-8bc8-9f6650888f33', 58, 'MEMBER', '2025-08-27 23:11:55'),
(35, '53bdb93a-f353-48e6-929a-1e28a1dffe58', 56, 'MEMBER', '2025-08-27 23:11:55'),
(36, '95468964-51e6-4752-8bc8-9f6650888f33', 49, 'MEMBER', '2025-08-27 23:11:55'),
(37, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 49, 'MEMBER', '2025-08-28 23:05:04'),
(38, 'f6a57871-a2bf-4256-a584-d4896ec7ab61', 56, 'MEMBER', '2025-08-28 23:05:04');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` varchar(100) NOT NULL,
  `owner_id` bigint(100) NOT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `size` bigint(20) NOT NULL,
  `md5_checksum` varchar(64) DEFAULT NULL,
  `path` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `owner_id`, `content_type`, `size`, `md5_checksum`, `path`) VALUES
('042a592a-2fe5-4a1f-9684-48ebc99caf57.png', 49, 'image/png', 8640, 'ec3a60c8c6539a07eb70b52f6737ea6e', 'D:\\Spring boot\\OtoProject\\uploads\\042a592a-2fe5-4a1f-9684-48ebc99caf57.png'),
('07cff769-706b-4986-8f15-1af2b0acee9a.png', 58, 'image/png', 412022, '23dbb82f0cf555d955b4299920fbd1e5', 'D:\\Spring boot\\OtoProject\\uploads\\07cff769-706b-4986-8f15-1af2b0acee9a.png'),
('08dc5c77-80fc-4fbf-9b27-e98d38f707fb.jpg', 58, 'image/jpeg', 19655, '3c2d20c1fb8718836c7512e6e89de7ff', 'D:\\Spring boot\\OtoProject\\uploads\\08dc5c77-80fc-4fbf-9b27-e98d38f707fb.jpg'),
('0fd01a02-2671-45b7-a5e2-80c39e4238db.jpg', 49, 'image/jpeg', 1395730, 'cb7d7fa0b6b53df4b0319c29e8df4fcb', 'D:\\Spring boot\\OtoProject\\uploads\\0fd01a02-2671-45b7-a5e2-80c39e4238db.jpg'),
('234286ee-5ca5-46aa-93f6-36c64c51097c.png', 49, 'image/png', 56998, '51951426996e6b80cd50eeda91096c74', 'D:\\Spring boot\\OtoProject\\uploads\\234286ee-5ca5-46aa-93f6-36c64c51097c.png'),
('28219abf-4c86-44be-9442-f20c96100acf.jpg', 58, 'image/jpeg', 19655, '3c2d20c1fb8718836c7512e6e89de7ff', 'D:\\Spring boot\\OtoProject\\uploads\\28219abf-4c86-44be-9442-f20c96100acf.jpg'),
('3669d67e-e811-4072-bb7f-1fd50b06a860.png', 58, 'image/png', 334510, '2443998a17f4d53a17ea2b2a5d4fb244', 'D:\\Spring boot\\OtoProject\\uploads\\3669d67e-e811-4072-bb7f-1fd50b06a860.png'),
('40792063-aa5e-4810-8d30-eba6fc4014fa.jpg', 49, 'image/jpeg', 1395730, 'cb7d7fa0b6b53df4b0319c29e8df4fcb', 'D:\\Spring boot\\OtoProject\\uploads\\40792063-aa5e-4810-8d30-eba6fc4014fa.jpg'),
('45dea234-9b35-4d3d-900c-a3fee68b81db.jpg', 49, 'image/jpeg', 30406, '04718b78b08c1deff7e454e87d189ba6', 'D:\\Spring boot\\OtoProject\\uploads\\45dea234-9b35-4d3d-900c-a3fee68b81db.jpg'),
('46a3bf67-d462-4294-a113-2b565245ac12.png', 58, 'image/png', 626899, 'a541415ed8f11ce128c660d76470a228', 'D:\\Spring boot\\OtoProject\\uploads\\46a3bf67-d462-4294-a113-2b565245ac12.png'),
('4c57adab-6cc9-451b-b171-4ca0ade66af7.jpg', 58, 'image/jpeg', 1395730, 'cb7d7fa0b6b53df4b0319c29e8df4fcb', 'D:\\Spring boot\\OtoProject\\uploads\\4c57adab-6cc9-451b-b171-4ca0ade66af7.jpg'),
('4cbed6f3-6091-40bc-a5d3-f741b95fb199.jpg', 49, 'image/jpeg', 19655, '3c2d20c1fb8718836c7512e6e89de7ff', 'D:\\Spring boot\\OtoProject\\uploads\\4cbed6f3-6091-40bc-a5d3-f741b95fb199.jpg'),
('4e9ff31d-234d-44bb-8f9f-eca8a0fe3ddf.png', 49, 'image/png', 8640, 'ec3a60c8c6539a07eb70b52f6737ea6e', 'D:\\Spring boot\\OtoProject\\uploads\\4e9ff31d-234d-44bb-8f9f-eca8a0fe3ddf.png'),
('5ae437ce-f0b8-4fbf-b6b7-643df7ed20a9.png', 49, 'image/png', 56998, '51951426996e6b80cd50eeda91096c74', 'D:\\Spring boot\\OtoProject\\uploads\\5ae437ce-f0b8-4fbf-b6b7-643df7ed20a9.png'),
('63d33841-a9da-40c1-bcae-d04654d71bfb.png', 56, 'image/png', 56998, '51951426996e6b80cd50eeda91096c74', 'D:\\Spring boot\\OtoProject\\uploads\\63d33841-a9da-40c1-bcae-d04654d71bfb.png'),
('6a0415f6-19e4-47ee-9c9c-ce7993fe1ae9.png', 58, 'image/png', 56998, '51951426996e6b80cd50eeda91096c74', 'D:\\Spring boot\\OtoProject\\uploads\\6a0415f6-19e4-47ee-9c9c-ce7993fe1ae9.png'),
('73db30aa-281f-4649-b7b6-bb857d5c11c2.jpg', 49, 'image/jpeg', 1395730, 'cb7d7fa0b6b53df4b0319c29e8df4fcb', 'D:\\Spring boot\\OtoProject\\uploads\\73db30aa-281f-4649-b7b6-bb857d5c11c2.jpg'),
('78d351fa-7b74-45b6-9c27-dd2378c518fb.jpg', 58, 'image/jpeg', 69951, '7bed2c3c7c0b2dd29ca5ab7dc84ffb8e', 'D:\\Spring boot\\OtoProject\\uploads\\78d351fa-7b74-45b6-9c27-dd2378c518fb.jpg'),
('800602ee-cd89-4920-88cd-ec33ff530314', 49, NULL, 0, 'd41d8cd98f00b204e9800998ecf8427e', 'D:\\Spring boot\\OtoProject\\uploads\\800602ee-cd89-4920-88cd-ec33ff530314'),
('83bde9c5-579b-4f70-80c2-6b934e57d4fe.png', 49, 'image/png', 56998, '51951426996e6b80cd50eeda91096c74', 'D:\\Spring boot\\OtoProject\\uploads\\83bde9c5-579b-4f70-80c2-6b934e57d4fe.png'),
('8aae83db-d811-4257-a722-cb2cce36aa25.png', 58, 'image/png', 8640, 'ec3a60c8c6539a07eb70b52f6737ea6e', 'D:\\Spring boot\\OtoProject\\uploads\\8aae83db-d811-4257-a722-cb2cce36aa25.png'),
('8cca294d-5947-4567-b2ad-403ea307a7c7.png', 49, 'image/png', 334510, '2443998a17f4d53a17ea2b2a5d4fb244', 'D:\\Spring boot\\OtoProject\\uploads\\8cca294d-5947-4567-b2ad-403ea307a7c7.png'),
('8e35d457-340d-4978-b715-a42959490792.png', 49, 'image/png', 56998, '51951426996e6b80cd50eeda91096c74', 'D:\\Spring boot\\OtoProject\\uploads\\8e35d457-340d-4978-b715-a42959490792.png'),
('9b205cf5-398f-4f56-9cb1-449fbb52030c.jpg', 49, 'image/jpeg', 69951, '7bed2c3c7c0b2dd29ca5ab7dc84ffb8e', 'D:\\Spring boot\\OtoProject\\uploads\\9b205cf5-398f-4f56-9cb1-449fbb52030c.jpg'),
('9c1af209-1156-417a-8d82-da6806af4911.png', 49, 'image/png', 334510, '2443998a17f4d53a17ea2b2a5d4fb244', 'D:\\Spring boot\\OtoProject\\uploads\\9c1af209-1156-417a-8d82-da6806af4911.png'),
('a898386b-25e7-47c1-b4a4-f4e2c8275e0f.png', 56, 'image/png', 56998, '51951426996e6b80cd50eeda91096c74', 'D:\\Spring boot\\OtoProject\\uploads\\a898386b-25e7-47c1-b4a4-f4e2c8275e0f.png'),
('abec48f9-9e84-4b46-b1b1-7120b0c5cff0.jpg', 49, 'image/jpeg', 19655, '3c2d20c1fb8718836c7512e6e89de7ff', 'D:\\Spring boot\\OtoProject\\uploads\\abec48f9-9e84-4b46-b1b1-7120b0c5cff0.jpg'),
('af4a723a-d962-4b67-adc5-b3603865353a.jpg', 49, 'image/jpeg', 30406, '04718b78b08c1deff7e454e87d189ba6', 'D:\\Spring boot\\OtoProject\\uploads\\af4a723a-d962-4b67-adc5-b3603865353a.jpg'),
('b04ed6b2-5a8a-46af-be2e-ac890cdaa5c0.jpg', 49, 'image/jpeg', 1395730, 'cb7d7fa0b6b53df4b0319c29e8df4fcb', 'D:\\Spring boot\\OtoProject\\uploads\\b04ed6b2-5a8a-46af-be2e-ac890cdaa5c0.jpg'),
('c7856c41-44d4-42ec-92c8-43a501a80f4e.png', 58, 'image/png', 56998, '51951426996e6b80cd50eeda91096c74', 'D:\\Spring boot\\OtoProject\\uploads\\c7856c41-44d4-42ec-92c8-43a501a80f4e.png'),
('de3123c8-804e-4ff4-96f6-198cddc401c4.png', 1, 'image/png', 56998, '51951426996e6b80cd50eeda91096c74', 'D:\\Spring boot\\OtoProject\\uploads\\de3123c8-804e-4ff4-96f6-198cddc401c4.png'),
('dfec72a2-0fb3-413f-81ad-b9e235b37d99.png', 49, 'image/png', 8640, 'ec3a60c8c6539a07eb70b52f6737ea6e', 'D:\\Spring boot\\OtoProject\\uploads\\dfec72a2-0fb3-413f-81ad-b9e235b37d99.png'),
('e895b810-e839-4876-817b-7c9f133f93bd.jpg', 49, 'image/jpeg', 1395730, 'cb7d7fa0b6b53df4b0319c29e8df4fcb', 'D:\\Spring boot\\OtoProject\\uploads\\e895b810-e839-4876-817b-7c9f133f93bd.jpg'),
('ea5eb13e-4932-4f62-b2fc-28d4c1602342.jpg', 49, 'image/jpeg', 30406, '04718b78b08c1deff7e454e87d189ba6', 'D:\\Spring boot\\OtoProject\\uploads\\ea5eb13e-4932-4f62-b2fc-28d4c1602342.jpg'),
('ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 55, 'image/jpeg', 30406, '04718b78b08c1deff7e454e87d189ba6', 'D:\\Spring boot\\OtoProject\\uploads\\ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg'),
('ee7e149f-a6fa-4d7f-9cb8-11d50661c1c9.png', 49, 'image/png', 334510, '2443998a17f4d53a17ea2b2a5d4fb244', 'D:\\Spring boot\\OtoProject\\uploads\\ee7e149f-a6fa-4d7f-9cb8-11d50661c1c9.png'),
('ee9f5fd8-0ce2-4e6b-8d8e-aafd329ddf6a.jpg', 49, 'image/jpeg', 1395730, 'cb7d7fa0b6b53df4b0319c29e8df4fcb', 'D:\\Spring boot\\OtoProject\\uploads\\ee9f5fd8-0ce2-4e6b-8d8e-aafd329ddf6a.jpg'),
('f1078c1f-5d32-4334-b93b-186c074416ae.png', 49, 'image/png', 56998, '51951426996e6b80cd50eeda91096c74', 'D:\\Spring boot\\OtoProject\\uploads\\f1078c1f-5d32-4334-b93b-186c074416ae.png');

-- --------------------------------------------------------

--
-- Table structure for table `invalidated_token`
--

CREATE TABLE `invalidated_token` (
  `id` varchar(225) NOT NULL,
  `expirytime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invalidated_token`
--

INSERT INTO `invalidated_token` (`id`, `expirytime`) VALUES
('330d5522-7f08-4558-90c7-43a17681060c', '2025-08-08 16:21:13'),
('5e714d79-abd9-4032-9eeb-0f6f4a21cb18', '2025-08-08 18:02:20'),
('5f648eb6-bf76-4f17-8c93-1e256ede4dca', '2025-08-08 19:15:48'),
('6bd8432a-566f-4922-8dea-ee44bbc19a8c', '2025-08-08 18:42:57'),
('6ea85c10-cbe6-414d-8305-5ded99a3369f', '2025-08-08 17:51:44'),
('82b390e5-569c-4f63-8b9a-19f1699402d0', '2025-08-13 18:22:21'),
('90e797ca-cf21-458c-9fb3-cadab474b16e', '2025-08-08 16:51:46'),
('e52fb4a2-a7a3-444c-9085-34e96089057e', '2025-08-09 07:49:20');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `description`) VALUES
(2, 'APPROVE_POST', 'Approve a post'),
(3, 'UPDATE_DATA', 'Update data permission'),
(4, 'CREATE_DATA', 'Create data permission'),
(7, 'VIEW_PROFILE', 'Xem thông tin cá nhân');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` varchar(255) NOT NULL,
  `users_id` bigint(20) NOT NULL,
  `context` text DEFAULT NULL,
  `media_url` varchar(255) DEFAULT NULL,
  `privacy` enum('PUBLIC','FRIENDS','PRIVATE') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `users_id`, `context`, `media_url`, `privacy`, `created_at`, `modified_date`) VALUES
('1', 49, 'Bài viết số 1', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PUBLIC', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('10', 55, 'Bài viết số 10', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'FRIENDS', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('11', 56, 'Bài viết số 11', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PUBLIC', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('12', 58, 'Bài viết số 12', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PRIVATE', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('13', 49, 'Bài viết số 13', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'FRIENDS', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('14', 55, 'Bài viết số 14', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PUBLIC', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('15', 56, 'Bài viết số 15', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PUBLIC', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('16', 58, 'Bài viết số 16', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PRIVATE', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('17', 49, 'Bài viết số 17', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'FRIENDS', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('18', 55, 'Bài viết số 18', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PUBLIC', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('19', 56, 'Bài viết số 19', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PRIVATE', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('2', 55, 'Bài viết số 2', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'FRIENDS', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('20', 58, 'Bài viết số 20', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'FRIENDS', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('3', 56, 'Bài viết số 3', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PRIVATE', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('3b276e8e-a2be-4827-aee7-51487aead6d5', 49, '\"Hôm nay trời đẹp quá\"', 'http://localhost:8888/api/v1/file/media/download/042a592a-2fe5-4a1f-9684-48ebc99caf57.png', 'PUBLIC', '2025-08-25 01:49:49', '2025-08-25 01:49:49'),
('4', 58, 'Bài viết số 4', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PUBLIC', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('5', 49, 'Bài viết số 5', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PUBLIC', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('6', 55, 'Bài viết số 6', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'FRIENDS', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('7', 56, 'Bài viết số 7', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PUBLIC', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('8', 58, 'Bài viết số 8', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PRIVATE', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('9', 49, 'Bài viết số 9', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PUBLIC', '2025-08-25 14:49:28', '2025-08-25 14:49:28'),
('sdssssssssssssss', 49, 'ssssssssssss', 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg', 'PUBLIC', '2025-08-25 02:45:12', '2025-08-25 07:58:16');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ADMIN'),
(2, 'USER'),
(3, 'NhanVien');

-- --------------------------------------------------------

--
-- Table structure for table `roles_permissions`
--

CREATE TABLE `roles_permissions` (
  `role_id` bigint(20) NOT NULL,
  `permissions_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles_permissions`
--

INSERT INTO `roles_permissions` (`role_id`, `permissions_id`) VALUES
(1, 7),
(2, 7),
(3, 2),
(3, 3),
(3, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `google_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `google_id`) VALUES
(1, 'admin', '$2a$10$R9U4vGSHd0/1ktCFx/EaAeR7Dldq0oqCnPmBdBi5mOWmbW4kwuRaC', NULL, NULL),
(12, 'PhuongQuyen', '$2a$10$z2992Xob/3gr/1zqOvALVund9NNSTZ0z5azw6ZGs3ssxd6D1sBUMe', NULL, NULL),
(49, 'khanhcb', '$2a$10$IpqKlkpLxBVMHjxYSVKhpur3Twv6qYpm2I6ilcYfkZQJYRNIBLxEm', NULL, NULL),
(55, 'khanh6', '$2a$10$UBqYW9Zqd0ZRy4p4GCdS2..hiUJiyeLRCcP2YO7HxJ1IosTMyHBk6', NULL, NULL),
(56, 'khanh7', '$2a$10$BBrud4kNpiTA.xP6NGYgD.5h9vPQL1XFB8XrqmrnaEG1i.w7Pyxji', NULL, NULL),
(58, 'Mineondorp SKT', NULL, 'comoquyen@gmail.com', '115653780931668500491');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`id`, `firstname`, `lastname`, `dob`, `city`, `user_id`, `avatar`) VALUES
('00aa44fd-57b8-4939-bd31-942781cfdc83', 'puonhqw', 'Doe', '1995-08-13', 'Hanoi', 56, 'http://localhost:8888/api/v1/file/media/download/a898386b-25e7-47c1-b4a4-f4e2c8275e0f.png'),
('1b53053b-22e5-47a3-9895-e6bbc2615c43', 'John', 'Doe', '1995-08-13', 'Hanoi', 55, 'http://localhost:8888/api/v1/file/media/download/ee6b6306-58c3-470f-8b4b-33c7ea554cc3.jpg'),
('a7d93fc9-67c0-4c58-9def-92319d45fb84', 'Phương ', 'Quyền', '1995-08-29', 'okok', 49, 'http://localhost:8888/api/v1/file/media/download/0fd01a02-2671-45b7-a5e2-80c39e4238db.jpg'),
('cce2ee43-238f-41cd-a61f-a31720683fe4', 'PhuongQuyen', 'Khánh', '2025-08-06', 'Hưng Yên', 58, 'http://localhost:8888/api/v1/file/media/download/78d351fa-7b74-45b6-9c27-dd2378c518fb.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(12, 2),
(12, 3),
(49, 2),
(55, 2),
(56, 2),
(58, 2);

-- --------------------------------------------------------

--
-- Table structure for table `web_socket_session`
--

CREATE TABLE `web_socket_session` (
  `id` varchar(36) NOT NULL,
  `socket_session_id` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_socket_session`
--

INSERT INTO `web_socket_session` (`id`, `socket_session_id`, `user_id`, `created_at`) VALUES
('1eaa4711-3f4c-4306-89c9-d6e97a542bc7', '5b9be102-398d-4432-b59a-407586a61358', 49, '2025-08-30 19:57:55.000000'),
('217b4724-4128-4c3f-8a74-0cd15b9b7c1c', 'a70e50de-d6ba-40b5-924e-d09d2b13dd6a', 49, '2025-08-30 19:57:55.000000'),
('f2aa7ba8-bd86-4000-a632-b6473302e319', '30cf8895-51a5-4f7d-9588-6e5059f63afd', 49, '2025-08-30 15:17:28.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_message`
--
ALTER TABLE `chat_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_conversation` (`conversation_id`),
  ADD KEY `idx_sender` (`sender_id`),
  ADD KEY `idx_createdDate` (`created_date`);

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_participants_hash` (`participants_hash`);

--
-- Indexes for table `conversation_participant`
--
ALTER TABLE `conversation_participant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_conversation` (`conversation_id`),
  ADD KEY `idx_user` (`user_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `invalidated_token`
--
ALTER TABLE `invalidated_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD PRIMARY KEY (`role_id`,`permissions_id`),
  ADD KEY `permissions_id` (`permissions_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `google_id` (`google_id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `web_socket_session`
--
ALTER TABLE `web_socket_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_socket_session_id` (`socket_session_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_message`
--
ALTER TABLE `chat_message`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `conversation_participant`
--
ALTER TABLE `conversation_participant`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD CONSTRAINT `roles_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `roles_permissions_ibfk_2` FOREIGN KEY (`permissions_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `web_socket_session`
--
ALTER TABLE `web_socket_session`
  ADD CONSTRAINT `web_socket_session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
