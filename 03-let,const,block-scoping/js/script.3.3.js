'use strict';
var getPrice = () => 5.99;
var divId = 'block1';

consoleAndDisplayResults(typeof getPrice, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);
consoleAndDisplayResults(getPrice(), divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);
getPrice = count => count * 4;
consoleAndDisplayResults(getPrice(4), divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);
getPrice = (count, tax) => count * 4 * (1 + tax);
consoleAndDisplayResults(getPrice(2, 0.07), divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);
getPrice = (count, tax) => {
    var price = count * 4.00;
    price *= ( 1 + tax);
    return price;
}
consoleAndDisplayResults(getPrice(2, 0.07), divId);

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//

divId = 'block2'
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

document.addEventListener('click', function() {
    consoleAndDisplayResults('ES5 way will give you #document', 'block2');
});
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

document.addEventListener('click', () => consoleAndDisplayResults('ES6 way will give you Window {...}', 'block2'));

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//

divId = 'block3';
var invoice = {
    number: 123,
    process: function () {
        consoleAndDisplayResults(JSON.stringify(this), divId);
    }
};
invoice.process();
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

invoice = {
    number: 123,
    process: () => consoleAndDisplayResults(this, divId)
};
invoice.process();

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//

divId = 'block4';
var invoice = {
    number: 123,
    process: function () {
        return function() {
            //consoleAndDisplayResults(this.number, divId);
            consoleAndDisplayResults("=> Uncaught TypeError: Cannot read property 'number' of undefined", divId);
        }
    }
};
invoice.process()();
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

invoice = {
    number: 123,
    process: function() {
        return () => consoleAndDisplayResults(this.number, divId);
    }
};
invoice.process()();

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//

divId = 'block5';

var invoice = {
    number: 123,
    process: function() {
        consoleAndDisplayResults(this.number, divId)
    }
};

var newInvoice = {
    number: 456
}

invoice.process.bind(newInvoice)();
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

invoice = {
    number: 123,
    process: function() {
        return () => consoleAndDisplayResults(this.number, divId)
    }
};
newInvoice = {
    number: 456
}
invoice.process().bind(newInvoice)();
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

invoice.process().call(newInvoice);

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//

divId = 'block6';

/*
getPrice = ()
    => 5.99;
*/
consoleAndDisplayResults("Uncaught SyntaxError: Unexpected token =>", divId);

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

getPrice = () => 5.99;
consoleAndDisplayResults(getPrice.hasOwnProperty("prototype"), divId);