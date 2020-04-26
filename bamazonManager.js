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
            choices: ["All Products", "Low Inventory", "Add Product", "Add New Product"]
        })
        .then(function (answer) {
            if (answer.menu === "All Products") {
                allProducts();
            }
            else if (answer.menu === "Low Inventory") {
                lowInventory();
            }
            else if (answer.menu === "Add Product") {
                addProduct();
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
    var allProducts = "SELECT * FROM products WHERE ?";
    connection.query(allProducts, function (err, res) {
        if (err) throw err;
        console.log("Product ID: " + res[i].id + " | " + "Name: " + res[i].product_name + " | " + "Price: $" + res[i].price + " | " + "IN STOCK: " + res[i].stock_quantity);
    })
};

function lowInventory() {
    var lowInventory = "SELECT * FROM products where stock_quantity < 5";
    connection.query(lowInventory, function (err, res) {
        if (err) throw err;
        console.log(res)
    })
};


function addProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        function display() {
            for (var i = 0; i < res.length; i++) {
                console.log("Product ID: " + res[i].id + " | " + "Name: " + res[i].product_name + " | " + "Price: $" + res[i].price + " | " + "IN STOCK: " + res[i].stock_quantity);
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
                console.log(answer);
                var chosenItem = "SELECT stock_quantity FROM products WHERE id = ?;";
                connection.query(chosenItem, [answer.stock_quantity], function (err, res) {
                    if (err) throw error;

                    console.log(answer.stock_quantity);

                    if (answer.quantity <= answer.stock_quantity) {
                        var updateInventory = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?";
                        connection.query(updateInventory, [chosenItem.stock_quantity], function (err, res) {
                            if (err) throw error;
                            console.log("Your order for " + chosenItem.product_name + " has been placed!");
                        })

                    } else {
                        console.log("You've increased inventory for " + chosenItem.product_name + ".");
                    }
                    menu();
                })
            })

    })

};


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
                type: "input",
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
            // var addProduct = "INSERT INTO products SET?", {
            //     product_name: answer.product,
            //     department_name: answer.department,
            //     price: answer.price, 
            //     quantity: answer.stock_quantity
            // }
            // connection.query(addProduct, function(err) {
            //     if (err) throw err;
            //     console.log("You added additional product successfully!");
            //     menu();
            //   }
            // );

            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("You added additional product successfully!");
                    menu();
                }
            )
        });
}

