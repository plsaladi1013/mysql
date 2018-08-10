DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL auto_increment,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity int NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name,department_name,price,stock_quantity) values ('Echo Show Black', 'Electronics',229.99, 5)
INSERT INTO products (product_name,department_name,price,stock_quantity) values ('Tricky Chickens Lay Eggs Keychain', 'Accesories',10, 15)
INSERT INTO products (product_name,department_name,price,stock_quantity) values ('Amazon Basics CL3 Rated HDMI Cable – 6 Feet', 'Cable',7.99, 25)
INSERT INTO products (product_name,department_name,price,stock_quantity) values ('rose fairy light', 'Decoration',4, 35)
INSERT INTO products (product_name,department_name,price,stock_quantity) values ('Book Themed Infinity Scarf', 'Clothing',43.20, 10)
INSERT INTO products (product_name,department_name,price,stock_quantity) values ('Anti-Droop Earring Lifts - Stainless Steel (Set of 4 Pairs)', 'Jewelery',24.95, 11)
INSERT INTO products (product_name,department_name,price,stock_quantity) values ('Hand-Embroidered Nightgown', 'Clothing',59, 3)
INSERT INTO products (product_name,department_name,price,stock_quantity) values ('Messy Nest Necklace By The Vintage Pearl', 'Jewerly',42, 7)
INSERT INTO products (product_name,department_name,price,stock_quantity) values ('Angel Wing Locket By Yourself Expression', 'Jewerly',9, 8)
INSERT INTO products (product_name,department_name,price,stock_quantity) values ('Kozikicks Women Slippers By FitKicks', 'Shoes',29.99, 8)




