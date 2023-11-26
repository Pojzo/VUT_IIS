-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 26, 2023 at 06:30 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

use xkovac66;

CREATE TABLE IF NOT EXISTS `activity` (
  `SUBJECT_CODE` varchar(64) NOT NULL,
  `ACTIVITY_ID` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('lecture','seminar','lab','exam') DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `room_id` varchar(64) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `frequency` smallint(6) DEFAULT '1',
  `end_date` date NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ACTIVITY_ID`),
  KEY `room_id` (`room_id`),
  KEY `ACTIVITY_ID` (`ACTIVITY_ID`),
  KEY `subject_fk` (`SUBJECT_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `activity_request`
--

CREATE TABLE IF NOT EXISTS `activity_request` (
  `activity_request_id` int(11) NOT NULL AUTO_INCREMENT,
  `SUBJECT_CODE` varchar(64) CHARACTER SET latin1 NOT NULL,
  `type` enum('lecture','seminar','lab','exam','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `frequency` int(11) NOT NULL,
  `status` enum('submitted','approved','denied') CHARACTER SET latin1 NOT NULL DEFAULT 'submitted',
  `additional_comment` varchar(64) CHARACTER SET latin1 DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`activity_request_id`),
  KEY `teacher_fk` (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

/*
INSERT INTO `admin` (`ID`) VALUES
(126);
*/

-- --------------------------------------------------------

--
-- Table structure for table `completed`
--

CREATE TABLE IF NOT EXISTS `completed` (
  `STUDENT_ID` int(11) NOT NULL,
  `SUBJECT_CODE` varchar(64) NOT NULL,
  PRIMARY KEY (`SUBJECT_CODE`,`STUDENT_ID`),
  KEY `student_id_fk` (`STUDENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `enlists`
--

CREATE TABLE IF NOT EXISTS `enlists` (
  `STUDENT_ID` int(11) NOT NULL,
  `SUBJECT_CODE` varchar(64) NOT NULL,
  PRIMARY KEY (`SUBJECT_CODE`,`STUDENT_ID`),
  KEY `student_id_fk` (`STUDENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE IF NOT EXISTS `guest` (
  `GUEST_ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`GUEST_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `participates_in`
--

CREATE TABLE IF NOT EXISTS `participates_in` (
  `STUDENT_ID` int(11) NOT NULL,
  `ACTIVITY_ID` int(11) NOT NULL,
  PRIMARY KEY (`ACTIVITY_ID`,`STUDENT_ID`),
  KEY `student_id_fk` (`STUDENT_ID`),
  KEY `ACTIVITY_ID` (`ACTIVITY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE IF NOT EXISTS `room` (
  `ROOM_ID` varchar(64) NOT NULL,
  `capacity` int(11) DEFAULT NULL,
  PRIMARY KEY (`ROOM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `scheduler`
--

CREATE TABLE IF NOT EXISTS `scheduler` (
  `ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_table`
--

CREATE TABLE IF NOT EXISTS `session_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(64) CHARACTER SET latin1 DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `ID` int(11) NOT NULL,
  `study_code` varchar(64) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE IF NOT EXISTS `subject` (
  `SUBJECT_CODE` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `credits` int(11) DEFAULT NULL,
  `Guarantee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SUBJECT_CODE`),
  KEY `guarantee_fk` (`Guarantee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE IF NOT EXISTS `teacher` (
  `ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teaches`
--

CREATE TABLE IF NOT EXISTS `teaches` (
  `TEACHER_ID` int(11) NOT NULL,
  `SUBJECT_CODE` varchar(64) NOT NULL,
  PRIMARY KEY (`TEACHER_ID`,`SUBJECT_CODE`),
  KEY `guarantees_subject_fk` (`SUBJECT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `gender` varchar(64) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `login` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

/*
INSERT INTO `user` (`ID`, `name`, `gender`, `birth_date`, `email`, `address`, `login`, `password`) VALUES
(126, 'admin', 'on', NULL, 'admin@admin.sk', 'adminova_ulica', 'admin', '$2b$10$phwmmBlDm55MD40PVEfyNODNtv9fPRJXPckJCqrD83K5WG3vBUz4i');

*/
-- --------------------------------------------------------

--
-- Table structure for table `week_requirements`
--

CREATE TABLE IF NOT EXISTS `week_requirements` (
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
  `comment` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`activity_request_id`)
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
  ADD CONSTRAINT `student_fk` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `guarantee_fk` FOREIGN KEY (`Guarantee_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

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
