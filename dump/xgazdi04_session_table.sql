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
-- Table structure for table `session_table`
--

DROP TABLE IF EXISTS `session_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) NOT NULL,
  `login` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_table`
--

LOCK TABLES `session_table` WRITE;
/*!40000 ALTER TABLE `session_table` DISABLE KEYS */;
INSERT INTO `session_table` VALUES (10,'mhKEWCxMufFW1OXVoI30Qg==','admin3','2023-11-16 21:23:41'),(11,'B3DFGsWwel72PhNVj+M4OQ==','admin3','2023-11-16 21:23:53'),(12,'qOJ+fdLEj2JyB96IIafEcA==','admin3','2023-11-16 21:24:11'),(13,'sRoLDqSa9ofct0io8K1c5Q==','admin3','2023-11-16 21:24:36'),(14,'/wQtVEBSAH7aU9Ttr/vVxQ==','admin3','2023-11-16 21:24:52'),(18,'szB30Y/Z0PnKlo4GCxIcxQ==','admin3','2023-11-16 21:33:47'),(19,'ELxdrLtbWaxqux672kAazQ==','admin3','2023-11-16 21:39:01'),(20,'a6s3porh9aR7kL3Zl7mlMA==','admin3','2023-11-20 17:52:37'),(21,'UB2hfGog2pq74SUiWLTSlA==','admin3','2023-11-21 15:20:39'),(22,'uPx4gm4t3CATP5Srhs558w==','admin3','2023-11-21 15:20:56'),(25,'4qV4ny5Eoh9Go6h7wesOMQ==','admin','2023-11-21 15:42:57'),(27,'ySx7qYW0bNeIHAfWKH1csA==','admin','2023-11-21 17:40:06'),(28,'CU4s1aCJEs/0/erfoWJhdg==','admin','2023-11-21 18:28:46'),(29,'J2MEufA7ya8qHgTwxBcKAQ==','xkovac66','2023-11-22 16:15:15'),(42,'BJK4vQtKzsp6bdMceiT1NA==','xkovac66','2023-11-22 19:32:45'),(52,'55o9v+SKeC2ZntyXRAFPEA==','xkovac66','2023-11-23 19:16:05'),(53,'I8xzgmBj8EAq7K9cl3ux0Q==','xkovac66','2023-11-23 19:18:12'),(54,'A+5dRTjp0HNlCnsCl5UKsA==','xkovac66','2023-11-23 19:18:56'),(55,'yhZY2dl/jIoRF/XvILmBnA==','Teacher','2023-11-23 19:19:11'),(57,'JwYaGinfUxJJym3dRdaQmg==','admin','2023-11-23 19:45:31'),(64,'SQAXqsuB1DcAPMTMiUEAwg==','123123','2023-11-23 21:37:47'),(65,'uLuEA7ikMINNCrHxsjt+1A==','123123','2023-11-23 21:45:03'),(70,'3rY8Ja6yWr4tO7Ou/fblQw==','123123','2023-11-24 18:33:44'),(71,'FinXXnQa9FJnV1KY8QQ39w==','123123','2023-11-24 18:59:06'),(72,'rUx0z0P2GThxhmo9qn/O0g==','xkovac66','2023-11-25 14:57:01'),(75,'Mi70G/ShQrn3lr5x27AaDQ==','123123','2023-11-25 17:14:00'),(81,'CgrCSyvncthPJytRYZEUmg==','oliver','2023-11-25 20:21:05');
/*!40000 ALTER TABLE `session_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-26 16:53:15
