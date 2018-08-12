var Prompt = require('prompt-checkbox');
var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon',
});
var prompt = new Prompt({
    name: 'inventory',
    message: 'What do you want to do?',
    choices: [
        'View Products for Sale',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product'
    ]
});
// promises
prompt.run()
    .then(function (answers) {
        if (answers == 'View Products for Sale') {
            viewInventory();
        }

        if (answers == 'View Low Inventory') {
            viewLowInventory();
        }

        if (answers == 'Add to Inventory') {
            console.log("In add Inventory");
             addInventory();
        }

        if (answers == 'Add New Product') {
            addProduct();
        }
    }).catch(function (err) {
        console.log(err)
    });

function viewInventory() {
    //
    console.log("view Inventory");
    connection.query('SELECT * from products', function (error, results) {
        if (error) throw error;
        console.log("==============================================================================");
        console.log("||ID||    Product Name     ||   Department   || Price || Stock Quantity");
        console.log("==============================================================================");
        for (var i = 0; i < results.length; i++) {
            console.log("||" + results[i].item_id + "||" + results[i].product_name + "||" + results[i].department_name + "||" + results[i].price + "||" + results[i].stock_quantity);
            console.log("------------------------------------------------------------------------------");
        }
    });
    connection.end();
}
function viewLowInventory() {
    connection.query('SELECT * FROM `products` WHERE `stock_quantity` < "5"', function (error, results) {
        if (error) throw error;
        console.log("==============================================================================");
        console.log("||ID||    Product Name     ||   Department   || Price || Stock Quantity");
        console.log("==============================================================================");
        for (var i = 0; i < results.length; i++) {
            console.log("||" + results[i].item_id + "||" + results[i].product_name + "||" + results[i].department_name + "||" + results[i].price + "||" + results[i].stock_quantity);
            console.log("------------------------------------------------------------------------------");
        }
    });
}
function addInventory() {
    console.log("Add inventory");
    var products = [];
    connection.query('SELECT * from products', function (error, results) {
        if (error) throw error;
        //console.log(results.length);
        for (var i = 0; i < results.length; i++) {
            products.push(results[i].product_name.toString());
        }
        //console.log(products);
        promptInventory(products);
    });
}

function promptInventory(products) {
    inquirer.prompt([
        {
            type: "list",
            name: "productName",
            message: "What is the name of the product?",
            choices: products
        }
    ]).then(function (answers) {
        console.log("hello");
        var chosenProducts = answers.productName;
        console.log(chosenProducts);
        connection.query('SELECT * FROM `products` WHERE  ?',[{product_name: chosenProducts }], function (error, results) {
            if (error) throw error;
            console.log(results[0]);
            var product_quatity = results[0].stock_quantity;
            console.log(product_quatity);
        
        inquirer.prompt([
            {
                type: "input",
                name: "quantity",
                message: "Enter the quantity?"
            }
        ]).then(function(answers){
            var quantity = parseInt(answers.quantity)+ parseInt(product_quatity);
            //UPDATE your_table SET displayorder = displayorder + 1 WHERE displayorder > 2;
                connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: quantity},{product_name: chosenProducts}],function(error) {
                    if (error) throw err;
                    console.log("Updated the Inventory");
              });     
    });
});
});
}

function addProduct() {
    console.log("add products");
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the product you would like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "What is the name of the department?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of the product?"
            },
            {
                name: "stock",
                type: "input",
                message: "What is the quantity of the stock?"
            }
        ]).then(function (answer) {
            console.log(answer);        
            connection.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
                var sql = "INSERT INTO products (product_name, department_name,price,stock_quantity) VALUES ('Company Inc', 'Highway 37',5,6)";
                connection.query(sql, function (err, result) {
                  if (err) throw err;
                  console.log("1 record inserted");
                });
              });
        })
}
