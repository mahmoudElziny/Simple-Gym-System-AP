-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2024 at 10:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gymsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `nationalID` varchar(14) NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  `membershipFrom` varchar(10) NOT NULL,
  `membershipTo` varchar(10) NOT NULL,
  `membershipCost` int(7) NOT NULL,
  `status` enum('active','freeze') NOT NULL,
  `trainerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `name`, `nationalID`, `phoneNumber`, `membershipFrom`, `membershipTo`, `membershipCost`, `status`, `trainerID`) VALUES
(1, 'mahmoud', '12345678910111', '01156864422', '1/1/2024', '1/5/2024', 800, 'active', 1),
(6, 'mai', '15151515151515', '01157774422', '5/1/2024', '5/2/2024', 400, 'active', 1),
(7, 'magdy', '14141414141414', '01157774133', '1/1/2024', '1/4/2024', 800, 'active', 2),
(8, 'huda', '13131313131313', '01156674123', '1/3/2024', '1/6/2024', 800, 'active', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nationalID` (`nationalID`),
  ADD KEY `FK_Members_Trainers` (`trainerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `FK_Members_Trainers` FOREIGN KEY (`trainerID`) REFERENCES `trainers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
