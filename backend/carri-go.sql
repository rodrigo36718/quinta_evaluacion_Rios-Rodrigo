-- phpMyAdmin SQL Dump
-- Base de datos: Carri-GO

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Tabla: usuarios
-- --------------------------------------------------------

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `rol` varchar(20) DEFAULT 'cliente',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Usuario admin (rodrigo / 2345)
INSERT INTO `usuarios` (`nombre`, `apellido`, `email`, `password`, `rol`) VALUES
('Rodrigo', 'Admin', 'rodrigo', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin');

-- --------------------------------------------------------
-- Tabla: platos
-- --------------------------------------------------------

CREATE TABLE `platos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Tabla: repartidores
-- --------------------------------------------------------

CREATE TABLE `repartidores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `zona` varchar(150) DEFAULT NULL,
  `vehiculo` varchar(50) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT 1,
  `rating` decimal(2,1) DEFAULT 5.0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;