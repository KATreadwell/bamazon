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
            choices: ["Product Sales by Department", "Add New Department"]
        })
        .then(function (answer) {
            if (answer.menu === "by Department") {
                salesByDept();
            }
            else if (answer.menu === "Add New") {
                addNewDept();
            }
            else {
                connection.end();
            }
        });
}



function salesByDept() {
    var allProducts = "SELECT * FROM products";
    connection.query(allProducts, function (err, res) {
        if (err) throw err;

        function display() {
            for (var i = 0; i < res.length; i++) {
                console.log("Dept Name: " + res[i].department_name + " | " + "Product: " + res[i].product_name + "Sales: " + res[i].product_sales);
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


function addNewDept() {
    inquirer
        .prompt([
            {
                name: "dept_name",
                type: "input",
                message: "What is the name of the department you would like to add?"
            },
            {
                name: "oh_cost",
                type: "input",
                message: "What is this department's overhead cost?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // var addDept = "INSERT INTO departments SET?", {
            //     department_name: answer.dept_name,
            //     oh_cost: answer.oh_cost,
            // }
            // connection.query(addProduct, function(err) {
            //     if (err) throw err;
            //     console.log("You added a new department successfully!");
            //     menu();
            // }
            // );

            connection.query(
                "INSERT INTO departments SET ?",
                {
                    department_name: answer.dept_name,
                    oh_cost: answer.oh_cost,
                },
                function (err) {
                    if (err) throw err;
                    console.log("You added a new department successfully!");
                    menu();
                }
            )
        });
}

