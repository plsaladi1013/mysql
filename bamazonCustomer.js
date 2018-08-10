var mysql  = require('mysql');
var Prompt = require('prompt-checkbox');
var inquirer = require("inquirer");
var productId =[];
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'bamazon',
});
displayProducts();
  function updateStock(orderQuantity,id,price){
    connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: orderQuantity},{item_id: id}],function(error) {
        if (error) throw err;
        console.log("Order placed successfully!");
        console.log("Total cost of the product is "+price+"$");
      }
  )};
  function displayProducts(){
  connection.connect();
  connection.query('SELECT * from products', function (error, results) { 
    if (error) throw error;
    console.log("==============================================================================");
    console.log("||ID||    Product Name     ||   Department   || Price || Stock Quantity");
    console.log("==============================================================================");
    for(var i=0; i<results.length; i++)
    {
    console.log("||"+results[i].item_id+ "||"+results[i].product_name+"||"+results[i].department_name +"||"+results[i].price +"||"+results[i].stock_quantity);
    console.log("------------------------------------------------------------------------------");
    }  
    orderDetails();   
  });
  }
  function orderDetails(){
    inquirer
    .prompt([
      {
        name: "productid",
        type: "input",
        message: "What is the ID of the product you would like to buy?"
      },
      {
        name: "units",
        type: "input",
        message: "how many units of the product would you like to buy?"
      }
    ]).then(function(answer) {
            getPurchaseDetails(answer);
      })
  }
  function getPurchaseDetails(answer){
    var query = 'SELECT * FROM products WHERE item_id =' +answer.productid; 
    connection.query(query, function(err, res) {
    var stock = parseInt(res[0].stock_quantity);
    var orderQuantity = parseInt(answer.units);
      if(orderQuantity > stock)
      {
        console.log("Order is Out of stock");
      }else{
        console.log("Order is in stock");
        var price = parseFloat(orderQuantity * res[0].price);
        orderQuantity = stock - orderQuantity;
        var id = answer.productid;
        updateStock(orderQuantity,id, price);
      }
    });       
  }
        
   
  
  