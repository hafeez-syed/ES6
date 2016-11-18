'use strict';
var divId = 'block1';

let [high, low] = [,];

consoleAndDisplayResults(`high: ${high} low: ${low}`, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

//[high, low] = undefined;

//consoleAndDisplayResults(`high: ${high} low: ${low}`, divId);
consoleAndDisplayResults('Runtime Error: Cannot read property `Symbol.iterator` of undefined', divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

//[high, low] = null;

//consoleAndDisplayResults(`high: ${high} low: ${low}`, divId);
consoleAndDisplayResults('Runtime Error: Cannot read property `Symbol.iterator` of undefined', divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

try {
    [high, low] = undefined;
}
catch(e) {
    consoleAndDisplayResults(e.name, divId);
}
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

[high, low, ] = [500, 200];

consoleAndDisplayResults(`high: ${high} low: ${low}`, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

for(let [a, b] of [[5, 10]]) {
    consoleAndDisplayResults(`${a} ${b}`, divId);
}

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

let count = 0;
for(let [a, b] of [[5, 10]]) {
    consoleAndDisplayResults(`${a} ${b}`, divId);
    count++;
}
consoleAndDisplayResults(count, divId);

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);
