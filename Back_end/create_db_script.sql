-- CREATE DATABASE IF NOT EXISTS stocks;

-- USE stocks;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE watchlist (  
  id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  symbol VARCHAR(10) NOT NULL,
  company VARCHAR(64) NOT NULL,
  added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);
