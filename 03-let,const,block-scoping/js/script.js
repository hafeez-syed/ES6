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



