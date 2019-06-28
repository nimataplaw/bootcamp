var faker = require("faker");


function pricer(){
    console.log("=====================");
    console.log("WELCOME TO MY SHOP");
    console.log("=====================");
    
    for(var i = 0; i < 10; i++){
    var product = faker.commerce.productName();
    var price = faker.commerce.price();
    console.log(product +" - $" + price);
    }
}

pricer();
