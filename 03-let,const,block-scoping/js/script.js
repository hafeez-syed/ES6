'use strict';
var cursorPosition = null,
    typingInterval = 500,
    InvalidCharFoundBetweenAWord = false,
    typingTimer;
$(".additional-notes").keyup(validateComments);
$(".additional-notes").keydown(function(e) {
    cursorPosition = this.selectionEnd;
});
function validateComments(e) {
    var regExp = /[^A-Z0-9\.\s\r\n\'\"\@\$\!\(\)\-\,]+/igm,
        val = $(this).val(),
        limit = 500,
        start = this.selectionStart,
        end = this.selectionEnd;

    var test  = regExp.test(this.value);
    if(test) {
        if(end < val.length) {
            InvalidCharFoundBetweenAWord = true;
        }
    }
    this.value = this.value.replace(regExp, '');
    this.setSelectionRange(start, end);

    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping.call(this), typingInterval);
}

function doneTyping() {
    if(InvalidCharFoundBetweenAWord) {
        this.setSelectionRange(cursorPosition, cursorPosition);
        InvalidCharFoundBetweenAWord = false;
    }
}

console.log(productId, 'var');
var productId = 12;

//*************//

console.error(pId, 'let');
let pId = 12;

//*************//

let id = 12;
{
    let id = 24;
}
console.log(id);

//*************//


