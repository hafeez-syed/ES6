var divId = 'block1';

import { Task } from 'js/script.4.4.class.js';
consoleAndDisplayResults(Task, divId);
consoleAndDisplayResults(typeof Task, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

let task = new Task();
consoleAndDisplayResults(typeof task, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

consoleAndDisplayResults(task instanceof Task, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

task.showId(divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

consoleAndDisplayResults(task.showId === Task.prototype.showId, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

consoleAndDisplayResults('Error: Unexpected token', divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

consoleAndDisplayResults('Error: Type error', divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

let newClass = class NewTask {
    constructor (divId) {
        consoleAndDisplayResults('Hi from NewTask constructor', divId);
    }
};

new newClass();
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


let NTask = function () {
    consoleAndDisplayResults('constructing NTask', divId);
};

let nTask = {};
NTask.call(nTask);

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


class AnotherTask {
    constructor () {
        //consoleAndDisplayResults('constructing AnotherTask', divId);
    }
};

let anotherTask = {};
AnotherTask.call(anotherTask);
consoleAndDisplayResults('Error: Class constructor cannot be called', divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);


function Project() {};

consoleAndDisplayResults(window.Project === Project);