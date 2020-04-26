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

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "productList",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            console.log("Product ID: " + res[i].id + " | " + "Name: " + res[i].product_name + " | " + "Price: $" + res[i].price + " | " + "IN STOCK: " + res[i].stock_quantity);
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    },
                },
                {
                    type: "input",
                    name: "productChoice",
                    message: "Select product you wish to buy."
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "What quantity would you like to purchase?"
                }
            ])
            .then(function (answer) {
                console.log(answer);
                var chosenItem = "SELECT stock_quantity, price FROM products WHERE id = ?;";
                connection.query(chosenItem, [answer.product_name, answer.stock_quantity], function (err, res) {
                    if (err) throw error;

                    console.log(res[0].stock_quantity, answer.quantity);

                    if (answer.quantity <= answer.stock_quantity) {
                        var updateInventory = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?";
                        connection.query(updateInventory, [chosenItem.quantity], function (err, res) {
                                if (err) throw error;
                                console.log("Your order for " + chosenItem.product_name + " has been placed!");
                            })
                            
                    } else {
                        console.log("Out of stock!");
                    }
                    start();
                })
            })

    })
}



