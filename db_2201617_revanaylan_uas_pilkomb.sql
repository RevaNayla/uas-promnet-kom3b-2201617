-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2024 at 12:38 PM
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
-- Database: `db_2201617_revanaylan_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Table structure for table `peminjamanbuku_revanaylan`
--

CREATE TABLE `peminjamanbuku_revanaylan` (
  `id` int(11) NOT NULL,
  `judul` text NOT NULL,
  `jumlah` int(25) NOT NULL,
  `nama_peminjam` text NOT NULL,
  `alamat_peminjam` text NOT NULL,
  `no_hp_peminjam` text NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_kembali` date NOT NULL,
  `lama_peminjaman` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peminjamanbuku_revanaylan`
--

INSERT INTO `peminjamanbuku_revanaylan` (`id`, `judul`, `jumlah`, `nama_peminjam`, `alamat_peminjam`, `no_hp_peminjam`, `tanggal_pinjam`, `tanggal_kembali`, `lama_peminjaman`) VALUES
(1, 'cantik itu luka', 1, 'jiania', 'bandung', '0897656789988', '2024-01-04', '2024-01-07', '5 hari'),
(2, 'Seperti Hujan Yang Jatuh ke Bumi, bumi langit', 2, 'Ikbal', 'pamoyanan', '089976556787', '2024-01-02', '2024-01-07', '5 hari'),
(13, 'programming', 1, 'gian', 'sayati', '089765674324', '2024-01-06', '2024-01-12', '6 hari'),
(15, 'ini aku, laut bercerita', 1, 'kyle', 'surapati', '082345789756', '2024-01-12', '2024-01-17', '5 hari'),
(21, 'dago love story, bumi langit', 2, 'dian', 'geger kalong', '089764567837', '2024-01-07', '2024-01-15', '8 hari'),
(22, 'harry potter, bumi manusia', 2, 'jia', 'surapati', '082345789756', '2024-01-02', '2024-01-07', '5 hari'),
(27, 'Harry Potter', 1, 'reva', 'kopo', '0876456734367', '2024-01-07', '2024-01-14', '7 hari');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `peminjamanbuku_revanaylan`
--
ALTER TABLE `peminjamanbuku_revanaylan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `peminjamanbuku_revanaylan`
--
ALTER TABLE `peminjamanbuku_revanaylan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
