DROP DATABASE IF EXISTS m294_295_project;
CREATE DATABASE m294_295_project;

USE m294_295_project;

DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    rating DECIMAL(2,1),
    CHECK (rating >= 0.0 AND rating <= 5.0)
);

INSERT INTO products (name, description, price, rating)
VALUES (
  'Boxhandschuhe Leone',
  '16 OZ Boxhandschuhe mit Klettverschluss',
  160.90,
  '4.3'
);