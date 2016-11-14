'use strict';
var divId = 'block1';
var showCategories = function(productId, ...categories) {
    consoleAndDisplayResults(categories instanceof Array, divId);
};

showCategories(123, 'search', 'advertising');
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

