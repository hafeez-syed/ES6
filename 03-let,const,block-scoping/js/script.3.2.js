'use strict';

consoleAndDisplayResults(productId, 'var');
var productId = 12;
var divId = 'var';

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//

//consoleAndDisplayResults(pId, divId);
let pId = 12;
divId = 'let';
consoleAndDisplayResults('=> Uncaught ReferenceError: pId is not defined (uncomment the code to see the error in console.)', divId);

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//


divId = 'block1';
let id = 12;
{
    let id = 2000;
}
consoleAndDisplayResults(id, divId);

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//

function updateProductId() {
    memberId = 15;
}

divId = 'block2';
let memberId = null;
updateProductId();
consoleAndDisplayResults(memberId, divId);

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//

divId = 'block3';
let userId = 42;
for (let userId = 0; userId < 10; userId++) {
}
consoleAndDisplayResults(userId, divId);

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//

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

//********************************************************************//
//********************************************************************//
//********************************************************************//
//********************************************************************//

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