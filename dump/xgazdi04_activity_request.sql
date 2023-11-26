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
-- Table structure for table `activity_request`
--

DROP TABLE IF EXISTS `activity_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_request` (
  `activity_request_id` int NOT NULL AUTO_INCREMENT,
  `SUBJECT_CODE` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `type` enum('lecture','seminar','lab','exam','other') NOT NULL,
  `duration` int NOT NULL,
  `capacity` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `frequency` int NOT NULL,
  `status` enum('submitted','approved','denied') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'submitted',
  `additional_comment` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`activity_request_id`),
  KEY `teacher_fk` (`teacher_id`),
  CONSTRAINT `teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_request`
--

LOCK TABLES `activity_request` WRITE;
/*!40000 ALTER TABLE `activity_request` DISABLE KEYS */;
INSERT INTO `activity_request` VALUES (1,'IMA','lecture',1,2,'2023-11-02','2023-12-01',1,'submitted',NULL,NULL),(2,'IMA','lecture',1,2,'2023-11-09','2023-12-02',0,'submitted',NULL,NULL),(3,'IMA','seminar',1,2,'2023-11-01','2023-12-03',0,'submitted',NULL,NULL),(4,'IMA','lab',1,2,'2023-11-11','2023-12-09',0,'approved','',NULL),(5,'IMA','lab',3,10,'2023-11-10','2023-12-07',2,'approved','',NULL),(6,'IMA','seminar',1,3,'2023-11-11','2023-11-30',0,'denied','',153),(7,'IMA','lecture',123,123,'2023-11-03','2023-12-08',3,'approved','approved 17::000 utorok',153);
/*!40000 ALTER TABLE `activity_request` ENABLE KEYS */;
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
