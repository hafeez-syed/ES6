function consoleAndDisplayResults(val, div) {
    try {
        console.log(val);
        $('#' + div).append('<p>' + val + '</p>');
    } catch (e) {
        console.log(e.message);
        $('#' + div).append('<p>' + e.message + '</p>');
    }
}
