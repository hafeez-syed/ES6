//let myTask = new Task(); //-> error

export class Task {
    //let taskId = 9000; // -> error
    constructor (divId) {
        consoleAndDisplayResults('Hi from Task constructor', divId);
    }
    showId (divId) {
        consoleAndDisplayResults(99, divId);
    }
}