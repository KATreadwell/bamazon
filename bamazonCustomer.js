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
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "productList",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            //how to display price? am i supposed to use id number and do input?
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Select product you wish to buy."
                },
                {
                    name: "qty",
                    type: "input",
                    message: "What quantity would you like to purchase?"
                }
            ])
            .then(function (answer) {
                console.log(answer);
                var chosenItem = "SELECT stock_quantity, price FROM products WHERE id = ?;";
                connection.query(chosenItem, [answer.product_name, answer.stock_quantity], function (err, res) {
                    if (err) throw error;

                    if (parseInt(chosenItem.quantity) <= parseInt(chosenItem.stock_quantity)) {
                        var updateInventory = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?";
                        connection.query(updateInventory, [parseInt(chosenItem.quantity), chosenItem.productList], function (err, res) {
                                if (err) throw error;
                                console.log("Your order for " + res[i].product_name + " has been placed!")
                            })
                    } else {
                        console.log("Out of stock!");
                    }
                    start();
                })
            })

    })
}



