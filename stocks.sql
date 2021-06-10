CREATE DATABASE  IF NOT EXISTS `stocks` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `stocks`;
-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: stocks
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'defytheflow@gmail.com','$2b$10$9J31RykU4Lvri/KDHBiP1eCcgaomsth/krd25DiWOpmW9Zv3WomPq'),(2,'thebunnnny@gmail.com','$2b$10$XpFmK/a2gOxxTgqMIq3qA.fwv1hBvWd0kSzquyDMzpXIfsaCGeLW6'),(3,'thebunnnnyy@gmail.com','$2b$10$cKzNGv887IOEigl.XKOfLu1KDwad0fj0t5lLv8THsmyVrcW9BXl5y'),(4,'thebunnnnyyy@gmail.com','$2b$10$KNBDhrzE0/1mWWnkQjpCkudlRaufK9gPh96o2Geryytbb7k6epF92'),(6,'thebunnnny1@gmil.com','$2b$10$QEDKv6KXsaucpof7S66J..UFkqXe02aBvo3upxjRqzMiM4kEqi4D.'),(7,'test@test.com','$2b$10$DvvDH17Dhik3B4USwqoSo.9LUpiU9uX5m0JXmIK8EzXQftpujwfNW'),(9,'testa@test.com','$2b$10$BZCor0SCjZsHzd1THop.VuWf0ztm2NEWavv7Y2qPX5wHdsVXrMoJ2'),(10,'2','$2b$10$aaHRgRgZWTtxcMhyZ1JpHOIfityq.AHCpN6nCJ0QwiNOlpXJ/mDmq'),(11,'55','$2b$10$sQgCwDh6IH4l2AfhQT5lCuWb6.0Si1/NwB0iZAusHWSudIR7f1ErG'),(12,'test2','$2b$10$e5t3pgZ7dtp55ih.o8Ed6u4cpWosZcdCx0.Vy9iP1zvulVUUckQde'),(13,'themail@mail.com','$2b$10$SLl11X44W9Z7I8UyA4K4GOHripMZFL9w0s9/.MA6HHScSkSWGXG4O'),(14,'email@email.com','$2b$10$2Fe5ufkJiJegzEN6ROPKEOxaNaoo51twd1njQO0ugPdNP.K5fGEzS'),(15,'1@mail.com','$2b$10$oxv4VmUVshAF41FgMcANDu9rosSajJbEE5ZZ2VuxgsKrGlSUVA1C2'),(16,'mike@gmail.com','$2b$10$5FL2WGopUvpOS/03S60ysevVWJSwI6CVbDzZw69hV0eGFz45l4gEC'),(18,'22@gmail','$2b$10$8AE.8Eu4mP5RgKXAp.432OjCTawhpdwDnB4BsZKd1suCgd6hnR2rO'),(19,'thebunnnn@gmail.com','$2b$10$S5Ry8b6Z2SCUQi0NJ7vwz.GK87qxKLPTk5u9kbNZEUnHXX/rQMUZS'),(20,'aminamuse1992@hotmail.com','$2b$10$A7ZQKqdqambmw8EPlIARfeTFHz8HpUvrwXGYTGMUK61Vbr3MMVr8O'),(21,'john@gmail.com','$2b$10$eiKfcfAXtUCVWBsVEV8ifuHmI.GAjt88pF4DKhn00cAiyqzyZarQG'),(22,'david@gmail.com','$2b$10$HmvhH2OYoj5EwFKhOLURmeuVUDmDsVJlNL/YEodZRFZDbVGrFkhhy'),(33,'chalie@gmail.com','$2b$10$Jlob1UHrdLq4CcBMq.DfUOf8p9RlpUHZacMIT/Fbvc25lxN7IAjeW');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `company` varchar(128) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
INSERT INTO `watchlist` VALUES (1,14,'AACQ','Artius Acquisition Inc. Class A Common Stock','2021-06-02 21:18:01'),(7,14,'AACQU','Artius Acquisition Inc. Unit','2021-06-04 00:14:02'),(8,14,'AAL','American Airlines Group Inc. Common Stock','2021-06-04 00:24:45'),(9,14,'AAME','Atlantic American Corporation Common Stock','2021-06-04 00:25:01'),(10,14,'ABCB','Ameris Bancorp Common Stock','2021-06-04 00:25:13'),(11,14,'ABGI','ABG Acquisition Corp. I Class A Ordinary Shares','2021-06-04 00:28:26'),(12,14,'ABST','Absolute Software Corporation Common Stock','2021-06-04 00:28:43'),(13,14,'ABIO','ARCA biopharma Inc. Common Stock','2021-06-04 00:29:23'),(15,14,'ABEO','Abeona Therapeutics Inc. Common Stock','2021-06-04 00:32:20'),(21,15,'DD','DowDuPont Inc','2021-06-06 20:32:17'),(24,16,'NFC.FRK','Netflix','2021-06-07 11:51:02'),(25,16,'DSBIX','DOMINI IMPACT BOND FUND INSTITUTIONAL SHARES','2021-06-07 11:51:19'),(29,10,'NFLX34.SAO','Netflix','2021-06-07 20:37:41'),(30,19,'N.TRV','Namaste Technologies Inc','2021-06-07 21:30:21'),(31,20,'NFLX','NetFlix Inc','2021-06-07 22:03:12'),(33,22,'RFDA','RiverFront Dynamic US Dividend Advantage ETF','2021-06-09 02:34:02'),(34,22,'F','Ford Motor Company','2021-06-09 15:54:27'),(35,22,'MA','Mastercard Incorporated - Class A','2021-06-09 17:26:41'),(39,33,'TESC.FRK','TESC','2021-06-09 19:31:16'),(40,33,'TESD.FRK','TESD','2021-06-09 19:37:44');
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-09 19:55:47
