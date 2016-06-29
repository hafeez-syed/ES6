function consoleAndDisplayResults(val, div) {
    try {
        console.log(val);
        $('#' + div).append('<code class="language-html"><p>' + val + '</code></p>');
    } catch (e) {
        console.log(e.message);
        $('#' + div).append('<code class="language-html"><p>' + e.message + '</code></p>');
    }
}
