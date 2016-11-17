'use strict';
var divId = 'block1';

let salary = [32000, 50000, 75000];
let [low, medium, high] = salary;

consoleAndDisplayResults(medium, divId);
consoleAndDisplayResults(high, divId);
consoleAndDisplayResults(low, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

salary = [32000, 50000];
[low, medium, high] = salary;

consoleAndDisplayResults(high, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

salary = [32000, 50000, 75000];
[low, , high] = salary;

consoleAndDisplayResults(high, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

salary = [32000, 50000, 75000];
let [lowerSalary1, ...remaining] = salary;

consoleAndDisplayResults(remaining, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


salary = [32000, 50000];
let [lowerSalary2, average, highSalary1 = 88000] = salary;

consoleAndDisplayResults(highSalary1, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

salary = [32000, 50000, [88000, 99000]];
let [lowerSalary3, averageSalary1, [actualLow, actualHigh]] = salary;

consoleAndDisplayResults(actualLow, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

salary = [32000, 50000];
let lowerSalary4, averageSalary2, highSalary2;
[lowerSalary4, averageSalary2, highSalary2 = 88000] = salary;

consoleAndDisplayResults(highSalary2, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

function reviewSalary([lowerSalary5, averageSalary3], highSalary3 = 88000) {
    consoleAndDisplayResults(averageSalary3, divId);
}

reviewSalary([32000, 50000]);

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

divId = 'block2';

let salaryObject = {
    lowSal: 32000,
    averageSal: 50000,
    highSal: 75000
};
let {lowSal, averageSal, highSal} = salaryObject;
consoleAndDisplayResults(highSal, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

let salaryObject1 = {
    lowSal1: 32000,
    averageSal1: 50000,
    highSal1: 75000
};
let {lowSal1: newSal1, averageSal1: newAverageSal1, highSal1: newHigh1} = salaryObject1;

consoleAndDisplayResults(newHigh1, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

let salaryObject2 = {
    lowSal2: 32000,
    averageSal2: 50000,
    highSal2: 75000
};
let newSal2, newAverageSal2, newHigh2;
//{lowSal2: newSal2, averageSal2: newAverageSal2, highSal2: newHigh2} = salaryObject2;

consoleAndDisplayResults("Syntax Error", divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

let salaryObject3 = {
    lowSal3: 32000,
    averageSal3: 50000,
    highSal3: 75000
};
let newSal3, newAverageSal3, newHigh3;
({lowSal3: newSal3, averageSal3: newAverageSal3, highSal3: newHigh3} = salaryObject3);

consoleAndDisplayResults(newHigh3, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

divId = 'block3';


let [maxCode, minCode] = 'AZ';
consoleAndDisplayResults(`min: ${minCode} max: ${maxCode}`, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);
