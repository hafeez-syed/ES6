'use strict';
var cursorPosition = null,
    typingInterval = 500,
    found = false,
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

    //console.log("START = "+start)
    //console.log("END = "+end)
    //console.log("LENGTH = "+val.length);
    //console.log("\n\n");
    var test  = regExp.test(this.value);
    if(test) {
        if(end < val.length) {
            console.log(false);
            console.log(cursorPosition);
            found = true;
            //cursorPosition = end;
            //end = cursorPosition;
        }
    }
    this.value = this.value.replace(regExp, '');
    this.setSelectionRange(start, end);

    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, typingInterval);

    //if(val.length > limit) {
        //val = val.substr(0, limit);
    //}
    //return $(this).val(val);
}

function doneTyping() {
    if(found) {
        $(".additional-notes").setSelectionRange(cursorPosition, cursorPosition);
        found = false;
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


