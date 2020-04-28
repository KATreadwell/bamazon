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

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('diamond', 'jewelry', 100000, 10, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('gold chain', 'jewelry', 15049, 25, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('tie', 'menswear', 10000, 100, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('cufflinks', 'menswear', 4999, 50, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('teddy bear', 'kids', 2000, 1000, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('doll', 'kids', 7595, 4, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('chewie toy', 'pets', 999, 20, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('cat litter', 'pets', 2399, 574, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('knife set', 'housewares', 200000, 5, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('dishes', 'housewares', 72553, 212, 0);

CREATE TABLE departments(
    department_id INTEGER AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
    oh_cost INTEGER,
    PRIMARY KEY (department_id) 
);

INSERT INTO departments(department_name, oh_cost) VALUES ('jewelry', 10000)

SELECT * FROM products;
SELECT * FROM departments;