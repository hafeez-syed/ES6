'use strict';
var divId = 'block1';
var showCategories = function(productId, ...categories) {
    consoleAndDisplayResults(categories instanceof Array, divId);
};

showCategories(123, 'search', 'advertising');
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


showCategories = function(productId, ...categories) {
    consoleAndDisplayResults('[' + categories + ']', divId);
};

showCategories(123, 'search', 'advertising');
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

showCategories = function(productId, ...categories) {
    consoleAndDisplayResults(categories + '[]', divId);
};

showCategories(123);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


showCategories = function(productId, ...categories) {
};

consoleAndDisplayResults(showCategories.length, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


var showCategories = function(productId, ...categories) {
    consoleAndDisplayResults(arguments.length, divId);
};

showCategories(123, 'search', 'advertising');
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


var showCategories = new Function('...categories', 'return categories');

consoleAndDisplayResults('[' + showCategories('search', 'advertising') + ']', divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

var divId = 'block2';

var prices = [12, 20, 18];
var maxPrices = Math.max(...prices);

consoleAndDisplayResults(maxPrices, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


prices = [12, 20, 18];
var newPriceArray = [...prices];

consoleAndDisplayResults(newPriceArray, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


newPriceArray = Array(...[,,]);

consoleAndDisplayResults('[undefined' + newPriceArray + 'undefined]', divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


var maxCode = Math.max(...'43210');

consoleAndDisplayResults(maxCode, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


var codeArray = ['A', ...'BCD', 'E'];

consoleAndDisplayResults(codeArray, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

