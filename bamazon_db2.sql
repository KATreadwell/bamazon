DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INTEGER,
    stock_quantity INTEGER,
    PRIMARY KEY (id) 
)

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('diamond', 'jewelry', 1000, 10)
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('gold chain', 'jewelry', 150.49, 25)
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('tie', 'menswear', 100, 100)
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('cufflinks', 'menswear', 49.99, 50)
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('teddy bear', 'kids', 20, 1000)
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('doll', 'kids', 75.95, 4)
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('chewie toy', 'pets', 9.99, 20)
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('cat litter', 'pets', 23.99, 574)
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('knife set', 'housewares', 2000, 5)
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('dishes', 'housewares', 725.53, 212)

SELECT * FROM products;