'use strict';
var divId = 'block1';
var categories = ['hardware', 'software', 'vaporware'];

for(var item of categories) {
    consoleAndDisplayResults(item, divId);
}

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

categories = [,,];

for(var item of categories) {
    consoleAndDisplayResults(item, divId);
}

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

var codes = 'ABCDE';
var count = 0;

for(var code of codes) {
    count++;
}

consoleAndDisplayResults(count, divId);
