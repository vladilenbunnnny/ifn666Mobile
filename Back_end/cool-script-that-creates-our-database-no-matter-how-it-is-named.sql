CREATE DATABASE IF NOT EXISTS stocks;

USE stocks;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  PRIMARY KEY (id)
);
