'use strict';
var divId = 'block1';
var price = 5.99, quantity = 30;
var productView = {
    price,
    quantity
};

consoleAndDisplayResults(JSON.stringify(productView), divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

price = 5.99; quantity = 10;
productView = {
    price,
    quantity,
    calculateValue() {
        return this.price * this.quantity;
    }
};

consoleAndDisplayResults(productView.calculateValue(), divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

price = 5.99; quantity = 10;
productView = {
    price: 7.99,
    quantity: 1,
    calculateValue() {
        return this.price * this.quantity;
    }
};

consoleAndDisplayResults(productView.calculateValue(), divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

price = 5.99; quantity = 10;
productView = {
    price,
    quantity,
    "calculate value"() {
        return this.price * this.quantity;
    }
};

consoleAndDisplayResults(productView["calculate value"](), divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

price = 5.99;
var field = 'dynamicField';
productView = {
    [field]: price,
};

consoleAndDisplayResults(JSON.stringify(productView), divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

price = 5.99;
field = 'dynamicField';
productView = {
    [field + '-001']: price,
};

consoleAndDisplayResults(JSON.stringify(productView), divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

var ident = 'productId';
var id = 10;
productView = {
    get [ident]() {
        return id;
    },
    set [ident](value) {
        id = value;
    }
};

consoleAndDisplayResults('//CALLLING GETTER METHOD: ' + productView.productId, divId);
productView.productId = 20;
consoleAndDisplayResults('//AFTER SETTING THE VALUE: ' + productView.productId, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

var method = 'doIt';
productView = {
    [method + '-001']() {
        consoleAndDisplayResults('inside a method', divId);
    },
};

productView['doIt-001']();


