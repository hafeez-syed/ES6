'use strict';

consoleAndDisplayResults(productId, 'var');
var productId = 12;

//*************//

//consoleAndDisplayResults(pId, 'let');
let pId = 12;

//*************//


let id = 12;
{
    let id = 2000;
}
consoleAndDisplayResults(id, 'block1');

//*************//

function updateProductId() {
    memberId = 15;
}

let memberId = null;
updateProductId();
consoleAndDisplayResults(memberId, 'block2');

//*************//

let userId = 42;
for (let userId = 0; userId < 10; userId++) {
}
consoleAndDisplayResults(userId, 'block3');

//*************//

var updateVarFunctions = [];
for (var i=0; i < 2; i++) {
    updateVarFunctions.push(function(){ return i;});
}

consoleAndDisplayResults(updateVarFunctions[0](), 'block4');

consoleAndDisplayResults('\n_________________________________________________________\n\n', 'block4');

let updateLetFunctions = [];
for (let i=0; i < 2; i++) {
    updateLetFunctions.push(function(){ return i;});
}

consoleAndDisplayResults(updateLetFunctions[0](), 'block4');

const MARKUP_PCT = 100;
consoleAndDisplayResults(MARKUP_PCT, 'block5');

consoleAndDisplayResults('\n_________________________________________________________\n\n', 'block5');

//const TOTAL_PRODUCTS;
//consoleAndDisplayResults(TOTAL_PRODUCTS, 'block5');

consoleAndDisplayResults("=> Uncaught SyntaxError: Missing initializer in const declaration. (uncomment the code to see the error in console.)", 'block5');

consoleAndDisplayResults('\n_________________________________________________________\n\n', 'block5');

//MARKUP_PCT = 10;
//consoleAndDisplayResults(MARKUP_PCT, 'block5');
consoleAndDisplayResults("=> Uncaught TypeError: Assignment to constant variable. (uncomment the code to see the error in console.)", 'block5');

consoleAndDisplayResults('\n_________________________________________________________\n\n', 'block5');

const CHILD_AGE = 5;
if(CHILD_AGE > 0) {
    const CHILD_AGE = 7;
}
consoleAndDisplayResults(CHILD_AGE, 'block5');

