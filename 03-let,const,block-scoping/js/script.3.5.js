'use strict';
var divId = 'block1';
var getProduct = function(productId = 1000) {
    consoleAndDisplayResults(productId, divId);
};

getProduct();
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

getProduct = function(productId = 1000, type = 'software') {
    consoleAndDisplayResults(productId + ', ' + type, divId);
};
getProduct(undefined, 'hardware');
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

var baseTax = 0.07;
var getTotal = function(price, tax = price * baseTax) {
    consoleAndDisplayResults(price + tax, divId);
};
getTotal(5.00);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


var generateBaseTax = () => 0.07;

getTotal = function(price, incomeTax = price * generateBaseTax()) {
    consoleAndDisplayResults(price + incomeTax, divId);
};
getTotal(5.00);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


//var getAdjustment = function(val = adjustment, adjustment = 1.00) {
    //consoleAndDisplayResults(val + adjustment, divId);
    consoleAndDisplayResults('Uncaught ReferenceError: adjustment is not defined', divId);
//};
//getAdjustment();
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

var getAdjustment2 = function(val = adjustment, adjustment = 1.00) {
    consoleAndDisplayResults(val + adjustment, divId);
};
getAdjustment2(5.00);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


 var getFunction = new Function("price = 20.00", "return price;");
consoleAndDisplayResults(getFunction(), divId);

