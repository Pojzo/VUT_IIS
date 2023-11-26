-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 26, 2023 at 06:09 PM
-- Server version: 5.7.42
-- PHP Version: 8.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xkovac66`
--
CREATE DATABASE IF NOT EXISTS `xkovac66` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `xkovac66`;

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `SUBJECT_CODE` varchar(64) NOT NULL,
  `ACTIVITY_ID` int(11) NOT NULL,
  `type` enum('lecture','seminar','lab','exam') DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `room_id` varchar(64) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `frequency` smallint(6) DEFAULT '1',
  `end_date` date NOT NULL,
  `teacher_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`SUBJECT_CODE`, `ACTIVITY_ID`, `type`, `duration`, `room_id`, `start_date`, `frequency`, `end_date`, `teacher_id`) VALUES
('IMA', 24, 'lecture', 1, 'D206', '2023-11-20 08:00:00', 1, '2024-03-09', NULL),
('IMA', 26, 'seminar', 4, 'D206', '2023-11-21 12:00:00', 1, '2024-03-29', NULL),
('IMA', 28, 'seminar', 4, 'D206', '2023-11-21 16:00:00', 1, '2024-03-29', NULL),
('IMA', 30, 'seminar', 1, 'D206', '2023-11-21 11:00:00', 1, '2024-03-29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activity_request`
--

CREATE TABLE `activity_request` (
  `activity_request_id` int(11) NOT NULL,
  `SUBJECT_CODE` varchar(64) CHARACTER SET latin1 NOT NULL,
  `type` enum('lecture','seminar','lab','exam','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `frequency` int(11) NOT NULL,
  `status` enum('submitted','approved','denied') CHARACTER SET latin1 NOT NULL DEFAULT 'submitted',
  `additional_comment` varchar(64) CHARACTER SET latin1 DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activity_request`
--

INSERT INTO `activity_request` (`activity_request_id`, `SUBJECT_CODE`, `type`, `duration`, `capacity`, `start_date`, `end_date`, `frequency`, `status`, `additional_comment`, `teacher_id`) VALUES
(1, 'IMA', 'lecture', 1, 2, '2023-11-02', '2023-12-01', 1, 'submitted', NULL, NULL),
(2, 'IMA', 'lecture', 1, 2, '2023-11-09', '2023-12-02', 0, 'submitted', NULL, NULL),
(3, 'IMA', 'seminar', 1, 2, '2023-11-01', '2023-12-03', 0, 'submitted', NULL, NULL),
(4, 'IMA', 'lab', 1, 2, '2023-11-11', '2023-12-09', 0, 'approved', '', NULL),
(5, 'IMA', 'lab', 3, 10, '2023-11-10', '2023-12-07', 2, 'approved', '', NULL),
(6, 'IMA', 'seminar', 1, 3, '2023-11-11', '2023-11-30', 0, 'denied', '', 153),
(7, 'IMA', 'lecture', 123, 123, '2023-11-03', '2023-12-08', 3, 'approved', 'approved 17::000 utorok', 153);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`) VALUES
(126);

-- --------------------------------------------------------

--
-- Table structure for table `completed`
--

CREATE TABLE `completed` (
  `STUDENT_ID` int(11) NOT NULL,
  `SUBJECT_CODE` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `enlists`
--

CREATE TABLE `enlists` (
  `STUDENT_ID` int(11) NOT NULL,
  `SUBJECT_CODE` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `enlists`
--

INSERT INTO `enlists` (`STUDENT_ID`, `SUBJECT_CODE`) VALUES
(126, 'IMA'),
(126, 'kokot'),
(150, 'IMA'),
(150, 'IMA2'),
(154, 'IMA'),
(155, 'IMA');

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE `guest` (
  `GUEST_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `participates_in`
--

CREATE TABLE `participates_in` (
  `STUDENT_ID` int(11) NOT NULL,
  `ACTIVITY_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `ROOM_ID` varchar(64) NOT NULL,
  `capacity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`ROOM_ID`, `capacity`) VALUES
('25', 7777),
('B212', 90),
('D105', 100),
('D206', 500),
('fdfdf', 17);

-- --------------------------------------------------------

--
-- Table structure for table `scheduler`
--

CREATE TABLE `scheduler` (
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scheduler`
--

INSERT INTO `scheduler` (`ID`) VALUES
(156);

-- --------------------------------------------------------

--
-- Table structure for table `session_table`
--

CREATE TABLE `session_table` (
  `id` int(11) NOT NULL,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(64) CHARACTER SET latin1 DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `session_table`
--

INSERT INTO `session_table` (`id`, `session_id`, `login`, `created_at`) VALUES
(10, 'mhKEWCxMufFW1OXVoI30Qg==', 'admin3', '2023-11-16 21:23:41'),
(11, 'B3DFGsWwel72PhNVj+M4OQ==', 'admin3', '2023-11-16 21:23:53'),
(12, 'qOJ+fdLEj2JyB96IIafEcA==', 'admin3', '2023-11-16 21:24:11'),
(13, 'sRoLDqSa9ofct0io8K1c5Q==', 'admin3', '2023-11-16 21:24:36'),
(14, '/wQtVEBSAH7aU9Ttr/vVxQ==', 'admin3', '2023-11-16 21:24:52'),
(18, 'szB30Y/Z0PnKlo4GCxIcxQ==', 'admin3', '2023-11-16 21:33:47'),
(19, 'ELxdrLtbWaxqux672kAazQ==', 'admin3', '2023-11-16 21:39:01'),
(20, 'a6s3porh9aR7kL3Zl7mlMA==', 'admin3', '2023-11-20 17:52:37'),
(21, 'UB2hfGog2pq74SUiWLTSlA==', 'admin3', '2023-11-21 15:20:39'),
(22, 'uPx4gm4t3CATP5Srhs558w==', 'admin3', '2023-11-21 15:20:56'),
(25, '4qV4ny5Eoh9Go6h7wesOMQ==', 'admin', '2023-11-21 15:42:57'),
(27, 'ySx7qYW0bNeIHAfWKH1csA==', 'admin', '2023-11-21 17:40:06'),
(28, 'CU4s1aCJEs/0/erfoWJhdg==', 'admin', '2023-11-21 18:28:46'),
(29, 'J2MEufA7ya8qHgTwxBcKAQ==', 'xkovac66', '2023-11-22 16:15:15'),
(42, 'BJK4vQtKzsp6bdMceiT1NA==', 'xkovac66', '2023-11-22 19:32:45'),
(52, '55o9v+SKeC2ZntyXRAFPEA==', 'xkovac66', '2023-11-23 19:16:05'),
(53, 'I8xzgmBj8EAq7K9cl3ux0Q==', 'xkovac66', '2023-11-23 19:18:12'),
(54, 'A+5dRTjp0HNlCnsCl5UKsA==', 'xkovac66', '2023-11-23 19:18:56'),
(55, 'yhZY2dl/jIoRF/XvILmBnA==', 'Teacher', '2023-11-23 19:19:11'),
(57, 'JwYaGinfUxJJym3dRdaQmg==', 'admin', '2023-11-23 19:45:31'),
(64, 'SQAXqsuB1DcAPMTMiUEAwg==', '123123', '2023-11-23 21:37:47'),
(65, 'uLuEA7ikMINNCrHxsjt+1A==', '123123', '2023-11-23 21:45:03'),
(70, '3rY8Ja6yWr4tO7Ou/fblQw==', '123123', '2023-11-24 18:33:44'),
(71, 'FinXXnQa9FJnV1KY8QQ39w==', '123123', '2023-11-24 18:59:06'),
(72, 'rUx0z0P2GThxhmo9qn/O0g==', 'xkovac66', '2023-11-25 14:57:01'),
(75, 'Mi70G/ShQrn3lr5x27AaDQ==', '123123', '2023-11-25 17:14:00'),
(81, 'CgrCSyvncthPJytRYZEUmg==', 'oliver', '2023-11-25 20:21:05');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `ID` int(11) NOT NULL,
  `study_code` varchar(64) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`ID`, `study_code`, `active`) VALUES
(150, NULL, NULL),
(154, NULL, NULL),
(155, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `SUBJECT_CODE` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `credits` int(11) DEFAULT NULL,
  `Guarantee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`SUBJECT_CODE`, `name`, `credits`, `Guarantee_id`) VALUES
('IMA', 'Matematicka analyz', 5, 153),
('IMA2', 'fdsf', 5, 126),
('koko', 'siete', 5, 126),
('kokot', 'kokot', 1, 126);

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`ID`) VALUES
(118),
(151),
(153);

-- --------------------------------------------------------

--
-- Table structure for table `teaches`
--

CREATE TABLE `teaches` (
  `TEACHER_ID` int(11) NOT NULL,
  `SUBJECT_CODE` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teaches`
--

INSERT INTO `teaches` (`TEACHER_ID`, `SUBJECT_CODE`) VALUES
(153, 'IMA'),
(151, 'koko'),
(153, 'koko');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `gender` varchar(64) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `login` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `name`, `gender`, `birth_date`, `email`, `address`, `login`, `password`) VALUES
(126, 'admin', 'on', NULL, 'admin@admin.sk', 'adminova_ulica', 'admin', '$2b$10$phwmmBlDm55MD40PVEfyNODNtv9fPRJXPckJCqrD83K5WG3vBUz4i'),
(150, 'Peter Kovac', 'hjkb', NULL, 'pojzinko8@gmail.com', 'Škultétyho, 5', 'xkovac66', '$2b$10$KhPo8CAotZbKuYRF9g0ICuMgpII0Iw5Nbd3uzd4GI66wWcZv0Ydvq'),
(153, '123', NULL, '2023-11-03', '123@123.com', '123', '123123', '$2b$10$kUSxEfnpznwAvTN.LrB0y.maRiLZqF2MSW9s9IrPWFn.ucSYNhlnu'),
(154, 'Marek Buch', 'ona', NULL, 'marek.buch@gmail.com', 'Škultétyho, 5', 'xbuchm04', '$2b$10$hehjDl.ed9HjQuzBju305OwYrg2CxeVyIdk/4bsawls2Ebb8qq0ZK'),
(155, 'oliver krupa', NULL, '2015-02-25', 'pojzinko8@gmail.com', 'Škultétyho, 5', 'oliver', '$2b$10$BWLQ7pnvZa4pXdnMamaD7uK0F9lu0IWO.Y5/SpQNVGYdNehZB/2yG'),
(156, 'scheduler', NULL, '2023-11-14', 'scheduler@vutbr.cz', 'Škultétyho, 5', 'Scheduler', '$2b$10$pBAGhTlyjtOZA6v.2ccrjOQmKo33hYBQJwO6h9gUW/HgBgGw.iLFi');

-- --------------------------------------------------------

--
-- Table structure for table `week_requirements`
--

CREATE TABLE `week_requirements` (
  `activity_request_id` int(11) NOT NULL,
  `monday_start` int(11) DEFAULT NULL,
  `monday_end` int(11) DEFAULT NULL,
  `tuesday_start` int(11) DEFAULT NULL,
  `tuesday_end` int(11) DEFAULT NULL,
  `wednesday_start` int(11) DEFAULT NULL,
  `wednesday_end` int(11) DEFAULT NULL,
  `thursday_start` int(11) DEFAULT NULL,
  `thursday_end` int(11) DEFAULT NULL,
  `friday_start` int(11) DEFAULT NULL,
  `friday_end` int(11) DEFAULT NULL,
  `comment` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `week_requirements`
--

INSERT INTO `week_requirements` (`activity_request_id`, `monday_start`, `monday_end`, `tuesday_start`, `tuesday_end`, `wednesday_start`, `wednesday_end`, `thursday_start`, `thursday_end`, `friday_start`, `friday_end`, `comment`) VALUES
(4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 11, 17, 9, 15, 10, NULL, 11, 16, 10, 17, '123'),
(6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, NULL, NULL, NULL, NULL, NULL, NULL, 10, 12, NULL, NULL, 'ljkhsdakljfhgasdkjlhfalsjkdfhlasjkdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`ACTIVITY_ID`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `ACTIVITY_ID` (`ACTIVITY_ID`),
  ADD KEY `subject_fk` (`SUBJECT_CODE`);

--
-- Indexes for table `activity_request`
--
ALTER TABLE `activity_request`
  ADD PRIMARY KEY (`activity_request_id`),
  ADD KEY `teacher_fk` (`teacher_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `completed`
--
ALTER TABLE `completed`
  ADD PRIMARY KEY (`SUBJECT_CODE`,`STUDENT_ID`),
  ADD KEY `student_id_fk` (`STUDENT_ID`);

--
-- Indexes for table `enlists`
--
ALTER TABLE `enlists`
  ADD PRIMARY KEY (`SUBJECT_CODE`,`STUDENT_ID`),
  ADD KEY `student_id_fk` (`STUDENT_ID`);

--
-- Indexes for table `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`GUEST_ID`);

--
-- Indexes for table `participates_in`
--
ALTER TABLE `participates_in`
  ADD PRIMARY KEY (`ACTIVITY_ID`,`STUDENT_ID`),
  ADD KEY `student_id_fk` (`STUDENT_ID`),
  ADD KEY `ACTIVITY_ID` (`ACTIVITY_ID`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`ROOM_ID`);

--
-- Indexes for table `scheduler`
--
ALTER TABLE `scheduler`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `session_table`
--
ALTER TABLE `session_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`SUBJECT_CODE`),
  ADD KEY `guarantee_fk` (`Guarantee_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `teaches`
--
ALTER TABLE `teaches`
  ADD PRIMARY KEY (`TEACHER_ID`,`SUBJECT_CODE`),
  ADD KEY `guarantees_subject_fk` (`SUBJECT_CODE`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `week_requirements`
--
ALTER TABLE `week_requirements`
  ADD PRIMARY KEY (`activity_request_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `ACTIVITY_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `activity_request`
--
ALTER TABLE `activity_request`
  MODIFY `activity_request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `guest`
--
ALTER TABLE `guest`
  MODIFY `GUEST_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session_table`
--
ALTER TABLE `session_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `subject_fk` FOREIGN KEY (`SUBJECT_CODE`) REFERENCES `subject` (`SUBJECT_CODE`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `takes_place_in_fk` FOREIGN KEY (`room_id`) REFERENCES `room` (`ROOM_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `activity_request`
--
ALTER TABLE `activity_request`
  ADD CONSTRAINT `teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `ID` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `completed`
--
ALTER TABLE `completed`
  ADD CONSTRAINT `student_id_fk` FOREIGN KEY (`STUDENT_ID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `subject_code_fk` FOREIGN KEY (`SUBJECT_CODE`) REFERENCES `subject` (`SUBJECT_CODE`);

--
-- Constraints for table `enlists`
--
ALTER TABLE `enlists`
  ADD CONSTRAINT `student_enlists_id_fk` FOREIGN KEY (`STUDENT_ID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `subject_endlists_code_fk` FOREIGN KEY (`SUBJECT_CODE`) REFERENCES `subject` (`SUBJECT_CODE`);

--
-- Constraints for table `participates_in`
--
ALTER TABLE `participates_in`
  ADD CONSTRAINT `activity_id_participates_fk` FOREIGN KEY (`ACTIVITY_ID`) REFERENCES `activity` (`ACTIVITY_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_id_participates_fk` FOREIGN KEY (`STUDENT_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `scheduler`
--
ALTER TABLE `scheduler`
  ADD CONSTRAINT `scheduler_fk` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_fk` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `guarantee_fk` FOREIGN KEY (`Guarantee_id`) REFERENCES `user` (`ID`);

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_id_fk` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `teaches`
--
ALTER TABLE `teaches`
  ADD CONSTRAINT `guarantees_subject_fk` FOREIGN KEY (`SUBJECT_CODE`) REFERENCES `subject` (`SUBJECT_CODE`),
  ADD CONSTRAINT `guarantees_user_fk` FOREIGN KEY (`TEACHER_ID`) REFERENCES `user` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
