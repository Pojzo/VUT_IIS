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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `gender` varchar(64) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `address` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `login` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (126,'admin','on',NULL,'admin@admin.sk','adminova_ulica','admin','$2b$10$phwmmBlDm55MD40PVEfyNODNtv9fPRJXPckJCqrD83K5WG3vBUz4i'),(150,'Peter Kovac','hjkb',NULL,'pojzinko8@gmail.com','Škultétyho, 5','xkovac66','$2b$10$KhPo8CAotZbKuYRF9g0ICuMgpII0Iw5Nbd3uzd4GI66wWcZv0Ydvq'),(153,'123',NULL,'2023-11-03','123@123.com','123','123123','$2b$10$kUSxEfnpznwAvTN.LrB0y.maRiLZqF2MSW9s9IrPWFn.ucSYNhlnu'),(154,'Marek Buch','ona',NULL,'marek.buch@gmail.com','Škultétyho, 5','xbuchm04','$2b$10$hehjDl.ed9HjQuzBju305OwYrg2CxeVyIdk/4bsawls2Ebb8qq0ZK'),(155,'oliver krupa',NULL,'2015-02-25','pojzinko8@gmail.com','Škultétyho, 5','oliver','$2b$10$BWLQ7pnvZa4pXdnMamaD7uK0F9lu0IWO.Y5/SpQNVGYdNehZB/2yG'),(156,'scheduler',NULL,'2023-11-14','scheduler@vutbr.cz','Škultétyho, 5','Scheduler','$2b$10$pBAGhTlyjtOZA6v.2ccrjOQmKo33hYBQJwO6h9gUW/HgBgGw.iLFi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-26 17:36:31
