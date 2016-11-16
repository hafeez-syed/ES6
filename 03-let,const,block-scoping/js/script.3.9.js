'use strict';
var divId = 'block1';
let invoiceNum = '1350';

consoleAndDisplayResults(`Invoice Number: ${invoiceNum}`, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

invoiceNum = '1350';

consoleAndDisplayResults(`Invoice Number: \${invoiceNum}`, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

let message = `A
B
C`;

consoleAndDisplayResults(message, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

invoiceNum = `1350`;

consoleAndDisplayResults(`Invoice Number: ${"INV-" + invoiceNum}`, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

function showMessage(message) {
    let invoiceNum = '1350';
    consoleAndDisplayResults(message, divId);
}

invoiceNum = `1350`;

showMessage(`Invoice Number: ${invoiceNum}`);

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

function processInvoice(segments) {
    consoleAndDisplayResults(segments + "// Array", divId);
}

processInvoice `template`;

consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

function processInvoices(segments, ...values) {
    consoleAndDisplayResults(segments + "// Array", divId);
    consoleAndDisplayResults(values + "// Array", divId);
}

invoiceNum = '1350';
let amount = '2000';

processInvoices `Invoice: ${invoiceNum} for ${amount}`;
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);
