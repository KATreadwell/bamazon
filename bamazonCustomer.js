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
    start();
});


function menu() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            choices: ["All Products", "Buy More Products"]
        })
        .then(function (answer) {
            if (answer.menu === "Buy More Products") {
                start();
            }
            else {
                connection.end();
            }
        });
}

function start() {
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
                    type: "number",
                    name: "productChoice",
                    message: "Type ID of product you wish to buy."
                },
                {
                    name: "quantity",
                    type: "number",
                    message: "What quantity would you like to purchase?"
                }
            ])
            .then(function (answer) {
                var chosenItem = "SELECT stock_quantity, product_name, price FROM products WHERE id = ?;";
                connection.query(chosenItem, [answer.productChoice], function (err, products) {
                    if (err) throw err;
                    if (answer.quantity <= products[0].stock_quantity) {
                        var updatedQty = products[0].stock_quantity - answer.quantity;
                        var updateInventory = "UPDATE products SET stock_quantity = ? WHERE id = ?";
                        connection.query(updateInventory, [updatedQty, answer.productChoice], function (err, res) {
                            if (err) throw err;
                            console.log("Your order for " + answer.quantity + " " + products[0].product_name + " has been placed!");
                            menu();
                        })

                    } else {
                        console.log("Insufficient quantity!");
                        menu();
                    }

                })
            })

    })
}



