-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: unidashdb
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `comment_dislikes`
--

DROP TABLE IF EXISTS `comment_dislikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_dislikes` (
  `uuser_id` int NOT NULL,
  `ccomment_id` int NOT NULL,
  PRIMARY KEY (`uuser_id`,`ccomment_id`),
  KEY `fk_comment_dislikes_user_idx` (`uuser_id`),
  KEY `fk_comment_dislikes_comment_idx` (`ccomment_id`),
  CONSTRAINT `fk_comment_dislikes_comment` FOREIGN KEY (`ccomment_id`) REFERENCES `comments` (`comment_id`),
  CONSTRAINT `fk_comment_dislikes_user` FOREIGN KEY (`uuser_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_dislikes`
--

LOCK TABLES `comment_dislikes` WRITE;
/*!40000 ALTER TABLE `comment_dislikes` DISABLE KEYS */;
INSERT INTO `comment_dislikes` VALUES (2001,6000),(2001,6003),(2002,6003),(2002,6019),(2002,6020),(2002,6022),(2004,6003),(2010,6015);
/*!40000 ALTER TABLE `comment_dislikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_likes` (
  `uuser_id` int NOT NULL,
  `ccomment_id` int NOT NULL,
  PRIMARY KEY (`uuser_id`,`ccomment_id`),
  KEY `fk_comment_likes_user_idx` (`uuser_id`),
  KEY `fk_comment_likes_comment_idx` (`ccomment_id`),
  CONSTRAINT `fk_comment_likes_comment` FOREIGN KEY (`ccomment_id`) REFERENCES `comments` (`comment_id`),
  CONSTRAINT `fk_comment_likes_user` FOREIGN KEY (`uuser_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
INSERT INTO `comment_likes` VALUES (2000,6001),(2000,6004),(2002,6004),(2002,6006),(2002,6017),(2002,6018),(2002,6021),(2002,6023),(2002,6024),(2004,6004),(2004,6016),(2004,6022),(2009,6003);
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL,
  `user_id` int NOT NULL,
  `review_id` int DEFAULT NULL,
  `comment_comment_id` int DEFAULT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`),
  KEY `fk_comment_user_idx` (`user_id`),
  KEY `fk_comment_review_idx` (`review_id`),
  KEY `fk_comment_comment_idx` (`comment_comment_id`),
  CONSTRAINT `fk_comment_comment` FOREIGN KEY (`comment_comment_id`) REFERENCES `comments` (`comment_id`),
  CONSTRAINT `fk_comment_review` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6025 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (6000,'Your review is not accurate',2000,4001,NULL,'2023-10-20 00:00:00'),(6001,'This is a good review',2001,4000,NULL,'2023-10-20 00:00:00'),(6002,'Not you are wrong',2000,NULL,6001,'2023-10-20 00:00:00'),(6003,'Nobody Cares',2000,4012,NULL,'2023-11-12 07:40:12'),(6004,'I care',2001,4012,NULL,'2023-11-12 07:40:40'),(6005,'No nobody cares ab her BF',2000,NULL,6004,'2023-11-12 07:41:40'),(6006,'test',2002,4012,NULL,'2023-11-13 09:49:48'),(6015,'I also like this restaurant! Especially right after class!',2009,4012,NULL,'2023-11-13 21:37:53'),(6016,'test',2004,4012,NULL,'2023-11-13 21:48:43'),(6017,'Test Comment',2002,4014,NULL,'2023-11-13 21:51:36'),(6018,'test',2002,4013,NULL,'2023-11-13 21:52:07'),(6019,'test2',2002,4013,NULL,'2023-11-13 21:52:10'),(6020,'test3',2002,4013,NULL,'2023-11-13 21:52:13'),(6021,'The comment section will become scrollable if you post too many comments!',2002,4013,NULL,'2023-11-13 21:52:18'),(6022,'just cuz you are the president does not mean you get special treatment.',2004,4015,NULL,'2023-11-26 19:41:32'),(6023,'Watch it before I kick you out of school, I deserve special treatment',2002,4015,NULL,'2023-11-16 19:47:26'),(6024,'Fake comment',2002,4016,NULL,'2023-11-17 20:12:22');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dining_halls`
--

DROP TABLE IF EXISTS `dining_halls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dining_halls` (
  `dining_hall_id` int NOT NULL AUTO_INCREMENT,
  `dining_hall_name` varchar(45) NOT NULL,
  `dining_hall_address` varchar(100) NOT NULL,
  `overall_rating` decimal(3,1) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`dining_hall_id`),
  UNIQUE KEY `dining_hall_name_UNIQUE` (`dining_hall_name`),
  UNIQUE KEY `dining_hall_id_UNIQUE` (`dining_hall_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dining_halls`
--

LOCK TABLES `dining_halls` WRITE;
/*!40000 ALTER TABLE `dining_halls` DISABLE KEYS */;
INSERT INTO `dining_halls` VALUES (1,'Turner','409 Old Turner St, Blacksburg, VA 24060',3.5,'Academic Dining Hall'),(2,'Owens','150 Kent St, Blacksburg, VA 24060',4.0,'Dining Hall near library'),(3,'West End','770 Washington St SW, Blacksburg, VA 24061',4.5,'Residential Dining Hall'),(23,'Squires','',NULL,'');
/*!40000 ALTER TABLE `dining_halls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `menu_item_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `calorie_count` varchar(45) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `restaurant_id` int NOT NULL,
  PRIMARY KEY (`menu_item_id`),
  UNIQUE KEY `menu_item_id_UNIQUE` (`menu_item_id`),
  KEY `restaurant_id_idx` (`restaurant_id`),
  CONSTRAINT `restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1080 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1000,'brisket','600',8.00,'juicy meat',101),(1001,'green beans with bacon','300',2.75,'amazing green beans ?!?',101),(1002,'fried catfish','650',7.50,'mid asf',101),(1003,'cheese pizza',NULL,5.00,NULL,104),(1004,'pepperoni pizza',NULL,6.00,NULL,104),(1005,'bbq chicken pizza',NULL,5.50,NULL,104),(1006,'General Tsos Chicken',NULL,9.00,NULL,107),(1007,'Firecracher Chicken',NULL,9.00,NULL,107),(1008,'Hunan Beef',NULL,10.95,NULL,107),(1009,'Chicken Bowl',NULL,9.00,NULL,108),(1010,'Beef Bowl',NULL,10.00,NULL,108),(1011,'Vegan Bowl',NULL,8.50,NULL,108),(1012,'Fantastic Frank',NULL,12.60,NULL,111),(1013,'Chicken Bacon Ranch',NULL,11.75,NULL,111),(1014,'Meatball Sub (Halal)',NULL,9.35,NULL,111),(1015,'Sport Burger',NULL,8.20,NULL,117),(1016,'Bacon Cheese Burger',NULL,10.45,NULL,117),(1017,'Hokie Tenders',NULL,10.95,NULL,117),(1018,'London Broil',NULL,12.00,NULL,118),(1019,'Grilled Chicken',NULL,8.50,NULL,118),(1020,'Asparagus',NULL,4.00,NULL,118),(1021,'Chicken','350',4.50,'Bad',101),(1033,'Beef','480',11.50,'medium rare',101),(1061,'Sandy','250',4.00,'bad',121),(1066,'Pot Roast','400',9.50,'Too little meat',101),(1067,'Shrimp and Grits','350',10.00,'coll',101),(1075,'Chicken','400',8.00,'yummy chicken',100),(1076,'Steak','450',9.50,'tender, juicy steak',100),(1077,'Pork','500',8.50,'mid',100),(1078,'Tofu','350',7.50,'No flavor',100),(1079,'Veggies','300',6.50,'Fajita Veggies',100);
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `restaurant_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `overall_rating` decimal(3,1) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `menu_name` varchar(45) DEFAULT NULL,
  `menu_description` varchar(200) DEFAULT NULL,
  `dining_hall_id` int NOT NULL,
  PRIMARY KEY (`restaurant_id`),
  UNIQUE KEY `restaurant_id_UNIQUE` (`restaurant_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `dining_hall_id_idx` (`dining_hall_id`),
  CONSTRAINT `dining_hall_id` FOREIGN KEY (`dining_hall_id`) REFERENCES `dining_halls` (`dining_hall_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (100,'Qdoba',4.0,NULL,'Qdoba menu','walmart chipotle',1),(101,'Southern Comfort',4.2,NULL,'Southern Comfort Menu',NULL,1),(102,'Jamba Juice',4.0,'smoothie place','jamba juice menu',NULL,1),(103,'Bruegger\'s Bagels',3.5,'bagel place','Bruegger\'s Bagels Menu',NULL,1),(104,'Atomic Pizzeria',3.0,'mid pizza','Atmoic pizzeria Menu',NULL,1),(105,'Origami Sushi',3.8,'sushi place','origami sushi menu',NULL,1),(106,'Soup Garden',3.4,'salads and soups','Soup Garden Menu',NULL,1),(107,'Wan',4.2,'chinese food','wan menu',NULL,2),(108,'Tazon',4.5,'better Qdoba','Tazon menu',NULL,2),(109,'Variabowl',4.2,'variety of cultural food','Variabowl Menu',NULL,2),(110,'Freshens',3.0,'bad smoothies','Freshens Menu',NULL,2),(111,'Franks',3.8,'decent sandwhiches','Frank\'s Menu',NULL,2),(112,'Dish',3.0,'downgraded southern comfort','Dish Menu',NULL,2),(113,'Blend',3.0,'very mid smoothies','Blend Menu',NULL,3),(114,'Rosso',4.0,'good pasta','Rosso Menu',NULL,3),(115,'Leaf & Ladle',4.0,'good salads','Leaf & Ladle Menu',NULL,3),(116,'Seven70 Deli',4.0,'good burritos and wraps','Seven70 Deli Menu',NULL,3),(117,'Fighting Golber',4.6,'amazing burgers, wings, and fries','Fighting Gobler Menu',NULL,3),(118,'JP\'s Chop House',4.6,'high quality american dining','JP\'s Menu',NULL,3),(119,'Sweets',3.0,'coffee place','Sweet\'s Menu',NULL,1),(121,'Grab N Go',NULL,'horrible sandwhiches',NULL,NULL,3),(125,'Chick-Fil-A',NULL,'MOOOO',NULL,NULL,2),(148,'ABP',NULL,'',NULL,NULL,23),(149,'Meat',NULL,'',NULL,NULL,23),(157,'dasfgad',NULL,'',NULL,NULL,2);
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_dislikes`
--

DROP TABLE IF EXISTS `review_dislikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_dislikes` (
  `uuser_id` int NOT NULL,
  `rreview_id` int NOT NULL,
  PRIMARY KEY (`uuser_id`,`rreview_id`),
  KEY `fk_review_dislikes_user_idx` (`uuser_id`),
  KEY `fk_review_dislikes_review_idx` (`rreview_id`),
  CONSTRAINT `fk_review_dislikes_review` FOREIGN KEY (`rreview_id`) REFERENCES `reviews` (`review_id`),
  CONSTRAINT `fk_review_dislikes_user` FOREIGN KEY (`uuser_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_dislikes`
--

LOCK TABLES `review_dislikes` WRITE;
/*!40000 ALTER TABLE `review_dislikes` DISABLE KEYS */;
INSERT INTO `review_dislikes` VALUES (2000,4001),(2002,4006),(2002,4009),(2002,4012),(2003,4011),(2004,4000),(2004,4002),(2004,4015),(2011,4013),(2011,4014),(2011,4015);
/*!40000 ALTER TABLE `review_dislikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_likes`
--

DROP TABLE IF EXISTS `review_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_likes` (
  `uuser_id` int NOT NULL,
  `rreview_id` int NOT NULL,
  PRIMARY KEY (`uuser_id`,`rreview_id`),
  KEY `fk_review_likes_user_idx` (`uuser_id`),
  KEY `fk_review_likes_review_idx` (`rreview_id`),
  CONSTRAINT `fk_review_likes_review` FOREIGN KEY (`rreview_id`) REFERENCES `reviews` (`review_id`),
  CONSTRAINT `fk_review_likes_user` FOREIGN KEY (`uuser_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_likes`
--

LOCK TABLES `review_likes` WRITE;
/*!40000 ALTER TABLE `review_likes` DISABLE KEYS */;
INSERT INTO `review_likes` VALUES (2000,4000),(2001,4000),(2002,4000),(2002,4001),(2002,4002),(2002,4010),(2002,4011),(2002,4015),(2002,4016),(2003,4002),(2003,4006),(2003,4010),(2003,4012),(2004,4009),(2004,4012),(2004,4013),(2010,4013),(2010,4014),(2011,4017);
/*!40000 ALTER TABLE `review_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `rating` decimal(3,1) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `restaurant_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `review_id_UNIQUE` (`review_id`),
  KEY `restaurant_id_idx` (`restaurant_id`),
  KEY `fk_review_user_idx` (`user_id`),
  CONSTRAINT `fk_review_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`),
  CONSTRAINT `fk_review_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4018 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (4000,'2023-10-20 00:00:00',4.5,'Amazing brisket, flavorful greenbeans, quality ingredients',101,2000),(4001,'2023-10-21 00:00:00',3.0,'Mid sandwhiches for same price as Jimmy Johns which is 2 min walk away',111,2001),(4002,'2023-11-09 00:00:00',4.0,'Good pot roast, but portion was too small',101,2001),(4006,'2023-11-10 00:10:35',4.5,'Good food that is quick for education side of campus. ',101,2002),(4009,'2023-11-10 00:16:29',4.5,'Its like any other chick fil a, I just wish they had all the menu items. ',125,2004),(4010,'2023-11-10 00:22:09',5.0,'Test',101,2002),(4011,'2023-11-10 00:22:17',5.0,'Test2',101,2002),(4012,'2023-11-10 20:59:25',5.0,'OMG by bf loves this restaurant so much !!! :D',101,2004),(4013,'2023-11-10 21:01:52',2.5,'The line is always so long and for some reason it tastes worse than the normal locations that are off campus. Just go to chipotle. ',100,2003),(4014,'2023-11-13 21:47:49',4.5,'Its worse than normal Qdoba, but it is still better than other on campus options.',100,2010),(4015,'2023-11-26 19:38:30',3.0,'Went there myself as president and they did not give extra chicken for free. Good otherwise. ',100,2002),(4016,'2023-11-17 20:10:01',4.0,'Solid Bagels',103,2002),(4017,'2023-11-17 20:22:55',4.5,'I love this food. ',100,2011);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `type` varchar(45) NOT NULL,
  `profile_description` varchar(400) DEFAULT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2012 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2000,'charlesb32','charlesb32@vt.edu','password','user',NULL,'Charles','Bruner'),(2001,'abiA','abi@gmail.com','abi','user',NULL,'Abishek','Satnur'),(2002,'timSandy','timSands@gmail.com','$2b$12$bPClalsEC/fDFmUKENk.rOovzmF5.EiYB7Yg84PyLwZD0c2D9Mq9q','university admin','My password is: VT','Tim','Sands'),(2003,'musky707','elonMusk@gmail.com','$2b$12$f6FtwkRSS4opsoiDFTX79..OebBgXP0AonvRnaveF/y37B9E..2jW','admin','My password is a','Elon','Musk'),(2004,'ntaylor','ntaylor@gmail.com','$2b$12$NdWLvMqkUt8n0IRAIy4iYOiLMJmO0749J6LLP//Lotprq54Xmu3ky','user','Hi my name is Nadinka, and I have severe Autism. ','Nadinka','Taylor'),(2005,'adamH','adamH@gmail.com','$2b$12$WEGrqIAWSke8psiC7Du.YeYS7IMSO1JVW2C7mezYXI98Vv91r1rd2','user','','Adam','Hane'),(2006,'TimSands02','TimSands@vt.edu','$2b$12$KnlwTZGUPow/Ixi1MYnCNO.di7QqQE7oHRKAazrtu8bIIrRwT3yjq','university admin','','Tim','Sands`'),(2007,'test','test@gmail.com','$2b$12$EUDwEgDdmTfQDMNGi/i/nuIHwMvItmYaiNCll0bIVG5d8TUfDInoG','user','','Test','test'),(2008,'cbruner32','itscharleyy@gmail.com','$2b$12$6MBg4WZQvOVPEh1A6Wd0EO1UylFLiMOBA/hs6MOL5IltI1TGT3ohe','user','Fix SignUp please','Charles','Bruner'),(2009,'badAtValorant','adamHane@gnail.com','$2b$12$23XsURnXQh1lIO2zYhZSNuygxZjpByvMaJEUNtAVmHRv29lQFUn7y','user','','Adam','Hande'),(2010,'hirer','recruiter@vt.edu','$2b$12$XW.mvRRrFTCvL1SYUwOi2OojfnExHu4rTrWftqShclAjJlgUjllm6','user','','recruiter','SWE'),(2011,'serby_wif_a_c','serby@gmail.com','$2b$12$DYx.FTStzpqxtqietaNAX.omCHUYZq2w760lY.AoTVLHOedDrK5uG','user','Account of Sean Viola. ','Sean ','Viola');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-29 12:42:29
