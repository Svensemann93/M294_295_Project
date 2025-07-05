DROP DATABASE IF EXISTS m294_295_project;
CREATE DATABASE m294_295_project;

USE m294_295_project;

-- wichtig ist es die Tabellen in der richtigen Reihenfolge zu droppen wegen den Abhängigkeiten zu einander.
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    -- die Klasse muss vorhanden und einmalig sein
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    CHECK (price >=0.00 AND MOD(price *100, 5) =0), -- price *100 wandelt 0.05 in 5 Rappen um und MOD stellt sicher, dass es nur in 5 Rappen Schritten nach oben geht.
    rating DECIMAL(2,1),
    CHECK (rating >= 0.0 AND rating <= 5.0),
    category_id INT NOT NULL,
    CONSTRAINT fk_products_category
      FOREIGN KEY (category_id)
      REFERENCES categories(id)
      -- Kategorie ist nicht löschbar solange Produkte diese Kategorie haben
      ON DELETE RESTRICT
      -- wenn die ID von einer Kategorie geändert wird, wird diese auch für die anderen Produkte geändert
      ON UPDATE CASCADE
);

INSERT INTO categories (name) VALUES
  ('Boxhandschuhe'),
  ('Shorts'),
  ('Rushguards'),
  ('Zubehör');
 
INSERT INTO products (name, description, price, rating, category_id)
VALUES (
  'Leone Defender',
  '16 OZ Boxhandschuhe mit Klettverschluss',
  160.90,
  4.3,
  1 -- verweist auf die ID 1 also in dem Fall die Boxhandschuhe
);

INSERT INTO products (name, description, price, rating, category_id)
VALUES (
  'Venum Gladiator',
  'Shorts kurz in S, M und L',
  199.95,
  4.8,
  2 -- verweist auf die ID 1 also in dem Fall die Boxhandschuhe
);

INSERT INTO products (name, description, price, rating, category_id)
VALUES (
  'Fightindustry BJJ Rushguard',
  'in Grössen M, L und XL',
  95.55,
  4.7,
  3 -- verweist auf die ID 1 also in dem Fall die Boxhandschuhe
);

INSERT INTO products (name, description, price, rating, category_id)
VALUES (
  'Gurt weiss',
  'Baumwolle, 1.50 m',
  25.50,
  3.6,
  4 -- verweist auf die ID 1 also in dem Fall die Boxhandschuhe
);