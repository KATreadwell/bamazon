var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Trailhead1",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    menu();
});


function menu() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            choices: ["All Products", "Low Inventory", "Add More Product", "Add New Product"]
        })
        .then(function (answer) {
            if (answer.menu === "All Products") {
                allProducts();
            }
            else if (answer.menu === "Low Inventory") {
                lowInventory();
            }
            else if (answer.menu === "Add More Product") {
                addMoreProduct();
            }
            else if (answer.menu === "Add New Product") {
                addNewProduct();
            }
            else {
                connection.end();
            }
        });
}



function allProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        function display() {
            for (var i = 0;
                i < res.length; i++) {
                var formattedPrice = res[i].price.toString();
                formattedPrice = formattedPrice.slice(0, formattedPrice.length - 2) + "." + formattedPrice.slice(formattedPrice.length - 2);
                console.log("Product ID: " + res[i].id + " | " + "Name: " + res[i].product_name + " | " + "Price: $" + formattedPrice + " | " + "IN STOCK: " + res[i].stock_quantity);
            }
        }

        display();

        inquirer
            .prompt({
                type: "list",
                name: "menuReturn",
                message: "[Return] to main menu?",
                choices: ["Return", "Quit"]
            })
            .then(function (answer) {
                if (answer.menuReturn === "Return") {
                    menu();
                } else {
                    connection.end();
                }
            })
    })
};

function lowInventory() {
    connection.query("SELECT * FROM products where stock_quantity < 5", function (err, res) {
        if (err) throw err;

        function display() {
            for (var i = 0; i < res.length; i++) {
                console.log("Product ID: " + res[i].id + " | " + "Name: " + res[i].product_name + " | " + "Price: $" + res[i].price + " | " + "IN STOCK: " + res[i].stock_quantity)
            }
        }
        display();


        inquirer
            .prompt({
                type: "list",
                name: "menuReturn",
                message: "[Return] to main menu?",
                choices: ["Return", "Quit"]
            })
            .then(function (answer) {
                if (answer.menuReturn === "Return") {
                    menu();
                } else {
                    connection.end();
                }
            })
    });
}


function addMoreProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        function display() {
            for (var i = 0;
                i < res.length; i++) {
                var formattedPrice = res[i].price.toString();
                formattedPrice = formattedPrice.slice(0, formattedPrice.length - 2) + "." + formattedPrice.slice(formattedPrice.length - 2);
                console.log("Product ID: " + res[i].id + " | " + "Name: " + res[i].product_name + " | " + "Price: $" + formattedPrice + " | " + "IN STOCK: " + res[i].stock_quantity);
            }
        }

        display();

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "productChoice",
                    message: "Type ID of product you wish to increase the quantity."
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many items will you add?"
                }
            ])
            .then(function (answer) {
                connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?", [answer.quantity, answer.productChoice], function (err, res) {
                    if (err) throw err;

                    console.log("-----------------------------------------");
                    console.log("You've increased inventory for " + "Product ID: " + answer.productChoice + ".");
                    console.log("-----------------------------------------");

                    menu();
                })
            })

    })
}


function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What is the name of the product you would like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "Which department would you like to add your product to?"
            },
            {
                name: "price",
                type: "number",
                message: "What is the price of the product?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "What quantity of product would you like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price * 100,
                    stock_quantity: answer.quantity
                },
                function (err) {
                    if (err) throw err;

                }
            )
            console.log("-----------------------------------------");
            console.log("You added " + answer.product + " successfully!");
            console.log("-----------------------------------------");
            menu();
        });

}

