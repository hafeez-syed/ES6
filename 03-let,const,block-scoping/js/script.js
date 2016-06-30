'use strict';

consoleAndDisplayResults(productId, 'var');
var productId = 12;
var divId = 'var';

//*************//

//consoleAndDisplayResults(pId, divId);
let pId = 12;
divId = 'let';
consoleAndDisplayResults('=> Uncaught ReferenceError: pId is not defined (uncomment the code to see the error in console.)', divId);
//*************//

divId = 'block1';
let id = 12;
{
    let id = 2000;
}
consoleAndDisplayResults(id, divId);

//*************//

function updateProductId() {
    memberId = 15;
}

divId = 'block2';
let memberId = null;
updateProductId();
consoleAndDisplayResults(memberId, divId);

//*************//

divId = 'block3';
let userId = 42;
for (let userId = 0; userId < 10; userId++) {
}
consoleAndDisplayResults(userId, divId);

//*************//

var updateVarFunctions = [];
divId = 'block4';
for (var i=0; i < 2; i++) {
    updateVarFunctions.push(function(){ return i;});
}

consoleAndDisplayResults(updateVarFunctions[0](), divId);

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

let updateLetFunctions = [];
for (let i=0; i < 2; i++) {
    updateLetFunctions.push(function(){ return i;});
}

consoleAndDisplayResults(updateLetFunctions[0](), divId);

divId = 'block5'
const MARKUP_PCT = 100;
consoleAndDisplayResults(MARKUP_PCT, divId);

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

//const TOTAL_PRODUCTS;
//consoleAndDisplayResults(TOTAL_PRODUCTS, 'block5');

consoleAndDisplayResults("=> Uncaught SyntaxError: Missing initializer in const declaration. (uncomment the code to see the error in console.)", divId);

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

//MARKUP_PCT = 10;
//consoleAndDisplayResults(MARKUP_PCT, 'block5');
consoleAndDisplayResults("=> Uncaught TypeError: Assignment to constant variable. (uncomment the code to see the error in console.)", divId);

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

const CHILD_AGE = 5;
if(CHILD_AGE > 0) {
    const CHILD_AGE = 7;
}
consoleAndDisplayResults(CHILD_AGE, divId);


//*************//
var getPrice = () => 5.99;
divId = 'block6';

consoleAndDisplayResults(typeof getPrice, 'block6');
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

divId = 'block7'
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

//*************//
document.addEventListener('click', function() {
    consoleAndDisplayResults('ES5 way will give you >#document', 'block7');
});
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

document.addEventListener('click', () => consoleAndDisplayResults('ES6 way will give you '+ this, 'block7'));


//*************//
divId = 'block8';
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

//*************//
divId = 'block9';
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


//*************//
divId = 'block10';
var invoice = {
    number: 123,
    process: function() {
        return () => consoleAndDisplayResults(this.number, divId);
    }
};
var newInvoice = {
    number: 456
}
invoice.process().bind(newInvoice)();
