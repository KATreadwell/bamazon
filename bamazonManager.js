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
                add();
            }
            else if (answer.menu === "Add New Product") {
                addNew();
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

function lowInventory(){
    var lowInventory = "SELECT * FROM products where stock_quantity < 5";
    connection.query(lowInventory, function (err, res){
        if (err) throw err;
        console.log(res)
    })
};
