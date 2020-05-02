DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INTEGER,
    stock_quantity INTEGER,
    product_sales INTEGER,
    PRIMARY KEY (id) 
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('diamond', 'jewelry', 100000, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('gold chain', 'jewelry', 15049, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('tie', 'menswear', 10000, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('cufflinks', 'menswear', 4999, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('teddy bear', 'kids', 2000, 1000);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('doll', 'kids', 7595, 4);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('chewie toy', 'pets', 999, 20);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('cat litter', 'pets', 2399, 574);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('knife set', 'housewares', 200000, 5);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('dishes', 'housewares', 72553, 212);

SELECT * FROM products;

-- CREATE TABLE departments(
--     department_id INTEGER AUTO_INCREMENT NOT NULL,
--     department_name VARCHAR(30),
--     oh_cost INTEGER,
--     PRIMARY KEY (department_id) 
-- );

-- INSERT INTO departments(department_name, oh_cost) VALUES ('jewelry', 10000)