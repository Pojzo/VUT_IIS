-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: xgazdi04
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `SUBJECT_CODE` varchar(64) NOT NULL,
  `ACTIVITY_ID` int NOT NULL AUTO_INCREMENT,
  `type` enum('lecture','seminar','lab','exam') CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `room_id` varchar(64) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `frequency` smallint DEFAULT '1',
  `end_date` date NOT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`ACTIVITY_ID`),
  KEY `room_id` (`room_id`),
  KEY `ACTIVITY_ID` (`ACTIVITY_ID`),
  KEY `subject_fk` (`SUBJECT_CODE`),
  CONSTRAINT `subject_fk` FOREIGN KEY (`SUBJECT_CODE`) REFERENCES `subject` (`SUBJECT_CODE`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `takes_place_in_fk` FOREIGN KEY (`room_id`) REFERENCES `room` (`ROOM_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES ('IMA',24,'lecture',1,'D206','2023-11-20 08:00:00',1,'2024-03-09',NULL),('IMA',26,'seminar',4,'D206','2023-11-21 12:00:00',1,'2024-03-29',NULL),('IMA',28,'seminar',4,'D206','2023-11-21 16:00:00',1,'2024-03-29',NULL),('IMA',30,'seminar',1,'D206','2023-11-21 11:00:00',1,'2024-03-29',NULL);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-26 16:53:16
