-- MariaDB dump 10.19  Distrib 10.5.21-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: xkovac66
-- ------------------------------------------------------
-- Server version	10.5.21-MariaDB-0+deb11u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `SUBJECT_CODE` varchar(64) NOT NULL,
  `ACTIVITY_ID` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('lecture','seminar','lab','exam') DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `room_id` varchar(64) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `frequency` smallint(6) DEFAULT 1,
  `end_date` date NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ACTIVITY_ID`),
  KEY `room_id` (`room_id`),
  KEY `ACTIVITY_ID` (`ACTIVITY_ID`),
  KEY `subject_fk` (`SUBJECT_CODE`),
  CONSTRAINT `subject_fk` FOREIGN KEY (`SUBJECT_CODE`) REFERENCES `subject` (`SUBJECT_CODE`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `takes_place_in_fk` FOREIGN KEY (`room_id`) REFERENCES `room` (`ROOM_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES ('IIS',51,'lecture',2,'D205','2023-11-27 10:00:00',1,'2024-05-27',167);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_request`
--

DROP TABLE IF EXISTS `activity_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity_request` (
  `activity_request_id` int(11) NOT NULL AUTO_INCREMENT,
  `SUBJECT_CODE` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `type` enum('lecture','seminar','lab','exam','other') NOT NULL,
  `duration` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `frequency` int(11) NOT NULL,
  `status` enum('submitted','approved','denied') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'submitted',
  `additional_comment` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`activity_request_id`),
  KEY `teacher_fk` (`teacher_id`),
  CONSTRAINT `teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_request`
--

LOCK TABLES `activity_request` WRITE;
/*!40000 ALTER TABLE `activity_request` DISABLE KEYS */;
INSERT INTO `activity_request` VALUES (17,'IIS','lecture',2,100,'2023-11-27','2024-05-27',1,'approved','Potvrdzujem ',167);
/*!40000 ALTER TABLE `activity_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `ID` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (126);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `completed`
--

DROP TABLE IF EXISTS `completed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `completed` (
  `STUDENT_ID` int(11) NOT NULL,
  `SUBJECT_CODE` varchar(64) NOT NULL,
  PRIMARY KEY (`SUBJECT_CODE`,`STUDENT_ID`),
  KEY `student_id_fk` (`STUDENT_ID`),
  CONSTRAINT `student_id_fk` FOREIGN KEY (`STUDENT_ID`) REFERENCES `user` (`ID`),
  CONSTRAINT `subject_code_fk` FOREIGN KEY (`SUBJECT_CODE`) REFERENCES `subject` (`SUBJECT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `completed`
--

LOCK TABLES `completed` WRITE;
/*!40000 ALTER TABLE `completed` DISABLE KEYS */;
/*!40000 ALTER TABLE `completed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enlists`
--

DROP TABLE IF EXISTS `enlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enlists` (
  `STUDENT_ID` int(11) NOT NULL,
  `SUBJECT_CODE` varchar(64) NOT NULL,
  PRIMARY KEY (`SUBJECT_CODE`,`STUDENT_ID`),
  KEY `student_id_fk` (`STUDENT_ID`),
  CONSTRAINT `student_enlists_id_fk` FOREIGN KEY (`STUDENT_ID`) REFERENCES `user` (`ID`),
  CONSTRAINT `subject_endlists_code_fk` FOREIGN KEY (`SUBJECT_CODE`) REFERENCES `subject` (`SUBJECT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enlists`
--

LOCK TABLES `enlists` WRITE;
/*!40000 ALTER TABLE `enlists` DISABLE KEYS */;
INSERT INTO `enlists` VALUES (158,'IDS'),(169,'IIS'),(158,'IMA'),(169,'IMA'),(158,'IPK');
/*!40000 ALTER TABLE `enlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guest` (
  `GUEST_ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`GUEST_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participates_in`
--

DROP TABLE IF EXISTS `participates_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participates_in` (
  `STUDENT_ID` int(11) NOT NULL,
  `ACTIVITY_ID` int(11) NOT NULL,
  PRIMARY KEY (`ACTIVITY_ID`,`STUDENT_ID`),
  KEY `student_id_fk` (`STUDENT_ID`),
  KEY `ACTIVITY_ID` (`ACTIVITY_ID`),
  CONSTRAINT `activity_id_participates_fk` FOREIGN KEY (`ACTIVITY_ID`) REFERENCES `activity` (`ACTIVITY_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_id_participates_fk` FOREIGN KEY (`STUDENT_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participates_in`
--

LOCK TABLES `participates_in` WRITE;
/*!40000 ALTER TABLE `participates_in` DISABLE KEYS */;
/*!40000 ALTER TABLE `participates_in` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `ROOM_ID` varchar(64) NOT NULL,
  `capacity` int(11) DEFAULT NULL,
  PRIMARY KEY (`ROOM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('D105',50),('D205',100),('D206',100);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduler`
--

DROP TABLE IF EXISTS `scheduler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduler` (
  `ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `scheduler_fk` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduler`
--

LOCK TABLES `scheduler` WRITE;
/*!40000 ALTER TABLE `scheduler` DISABLE KEYS */;
INSERT INTO `scheduler` VALUES (161),(171);
/*!40000 ALTER TABLE `scheduler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_table`
--

DROP TABLE IF EXISTS `session_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) NOT NULL,
  `login` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_table`
--

LOCK TABLES `session_table` WRITE;
/*!40000 ALTER TABLE `session_table` DISABLE KEYS */;
INSERT INTO `session_table` VALUES (123,'bKNk+lns0Fn9ZSqpvCvswQ==','admin','2023-11-27 15:28:01'),(124,'fMsIzF2m5yh5fCVqSUz63Q==','admin','2023-11-27 18:59:32'),(144,'K15P7yk1tl7tftodaix8Gw==','scheduler','2023-11-27 20:27:52'),(154,'KRlu9wWoesNUJYIt9eAFVw==','admin','2023-11-27 20:50:08'),(155,'B060YCmx2HKMMokqBPfd/A==','admin','2023-11-27 21:12:46'),(156,'xnDeJAk7+w6Xk5yea+EkXg==','admin','2023-11-27 21:13:15'),(157,'g2UWgce3fMvr9JOFmwWq7g==','admin','2023-11-27 21:16:20'),(158,'aBcNlzaYWqDK+Ts0a9nG7g==','admin','2023-11-27 21:16:51'),(159,'dNySqQ4uNWiWE77N34b9rA==','admin','2023-11-27 21:18:12'),(160,'wHydd8hrO9GA3Rux1PfZKg==','admin','2023-11-27 20:23:10');
/*!40000 ALTER TABLE `session_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `ID` int(11) NOT NULL,
  `study_code` varchar(64) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `student_fk` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (158,NULL,NULL),(169,NULL,NULL),(170,NULL,NULL);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject` (
  `SUBJECT_CODE` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `credits` int(11) DEFAULT NULL,
  `Guarantee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SUBJECT_CODE`),
  KEY `guarantee_fk` (`Guarantee_id`),
  CONSTRAINT `guarantee_fk` FOREIGN KEY (`Guarantee_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES ('IDS','Databazove systemy',6,167),('IIS','Informacne systemy',5,174),('IMA','Matematicka analyza',4,167),('IPK','Pocitacove siete',5,168),('IZP','Zaklady programovanie',4,168);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (167),(173),(174);
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teaches`
--

DROP TABLE IF EXISTS `teaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teaches` (
  `TEACHER_ID` int(11) NOT NULL,
  `SUBJECT_CODE` varchar(64) NOT NULL,
  PRIMARY KEY (`TEACHER_ID`,`SUBJECT_CODE`),
  KEY `guarantees_subject_fk` (`SUBJECT_CODE`),
  CONSTRAINT `guarantees_subject_fk` FOREIGN KEY (`SUBJECT_CODE`) REFERENCES `subject` (`SUBJECT_CODE`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teaches_subject_fk` FOREIGN KEY (`TEACHER_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teaches`
--

LOCK TABLES `teaches` WRITE;
/*!40000 ALTER TABLE `teaches` DISABLE KEYS */;
INSERT INTO `teaches` VALUES (167,'IIS');
/*!40000 ALTER TABLE `teaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `gender` varchar(64) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `login` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (126,'admin','male',NULL,'admin@admin.sk','adminova_ulica','admin','$2b$10$phwmmBlDm55MD40PVEfyNODNtv9fPRJXPckJCqrD83K5WG3vBUz4i'),(167,'Teacher1','female','1971-05-27','teacher1@gmail.com','Bozetechova 5','teacher1','$2b$10$y9SOaEc5K2XTmv2GJE7rhuzAqxdS9/ZGZM1I8YBOhapoZvPAinUI.'),(169,'Student1','male','2003-06-27','student1@gmail.com','Stefanikova 12','student1','$2b$10$jzP3.rn2TyWGHfnM30aIA.UsrXcGf8rdIwVLYvbN/jwosNbTt9K.m'),(170,'Student2','female','2003-08-01','student2@gmail.com','Novomeskeho 12','student2','$2b$10$SROrpLoW4TFUmL8H1TPn2OfjkrN0gqpdaW/ZpEucOYd72pV7hN5t6'),(171,'Scheduler','male','1968-06-19','scheduler@gmail.com','Hurbanova 37','scheduler','$2b$10$QBs3sHVfLyRT4MZjhzs4kuEePs2sqf5kx2b/VnX10v/f9EHrDQuhK'),(174,'Teacher','male','2023-09-06','teacher2@gmail.com','Škultétyho, 5','teacher2','$2b$10$BZg5lF.gMl7ApitzfmvcLuBGeU7sBvzScQ0xP12dbbSH8I.e22xjG');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `week_requirements`
--

DROP TABLE IF EXISTS `week_requirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `comment` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`activity_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `week_requirements`
--

LOCK TABLES `week_requirements` WRITE;
/*!40000 ALTER TABLE `week_requirements` DISABLE KEYS */;
INSERT INTO `week_requirements` VALUES (4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,11,17,9,15,10,NULL,11,16,10,17,'123'),(6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,NULL,NULL,NULL,NULL,NULL,NULL,10,12,NULL,NULL,'ljkhsdakljfhgasdkjlhfalsjkdfhlasjkdf'),(8,10,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'123'),(9,9,11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,8,14,9,16,NULL,NULL,10,18,11,14,'V stredu nemoze ziadny ucitel ucit'),(13,9,14,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,'komentar'),(14,9,15,8,14,NULL,NULL,NULL,NULL,NULL,NULL,'V stredu nemoze ucit ziadny ucitel'),(15,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,8,16,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,'V stredu nemoze robit nikto');
/*!40000 ALTER TABLE `week_requirements` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-27 20:55:18
