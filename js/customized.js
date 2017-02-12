function consoleAndDisplayResults(val, div) {
    try {
        console.log(val);
        $('#' + div).append('<code class="language-html"><p>' + val + '</code></p>');
    } catch (e) {
        console.log(e.message);
        $('#' + div).append('<code class="language-html"><p>' + e.message + '</code></p>');
    }
}

function addLinks(OPTIONS) {
    var prevSection = OPTIONS.prevSection,
        prevTitle = OPTIONS.prevTitle,
        nextSection = OPTIONS.nextSection,
        nextTitle = OPTIONS.nextTitle,
        prevString = '',
        nextString = '',
        directory = '',
        prevDirectory = '',
        nextDirectory = '',
        header = $('.page-link-header'),
        footer = $('.page-link-footer'),
        chapter = parseInt(header.parent().attr('data-chapter'), 10);
    
    switch(chapter) {
        case 3:
            directory = '03-let,const,block-scoping';
            break;
        case 4:
            directory = '04-es6-modules-and-classes';
            break;
        case 5:
            directory = '05-new-types-and-objects-extensions';
            break;
        case 6:
            directory = '06-iterators-generators-and-promises';
            break;
        case 7:
            directory = '07-arrays-and-collections';
            break;
        case 8:
            directory = '08-the-reflect-api';
            break;
        case 9:
            directory = '09-the-proxy-api';
            break;
    }

    // for remote hosts
    if(window.location.hostname !== 'localhost' || window.location.hostname !== '127.0.0.1') {
        directory = 'ES6-Learning/' + directory;
    }

    if(!prevSection) {
        prevDirectory = '../';
        prevTitle = '<<< Goto main';
    } else {
        prevDirectory = '/' + directory + '/' + prevSection + '.html';
        prevTitle = '<<< 0' + prevSection + '. ' + prevTitle;
    }
    
    prevString += '<a class="left-align" href="' + prevDirectory + '">';
    prevString += prevTitle;
    prevString += '</a>';
    
    header.append(prevString);
    footer.append(prevString);
    
    if(!nextSection) {
        nextDirectory = '../';
        nextTitle = 'Goto main >>>';
    } else {
        nextDirectory = '/' + directory + '/' + nextSection + '.html';
        nextTitle = '0' + nextSection + '. ' + nextTitle + ' >>>';
    }
    
    nextString += '<a class="right-align" href="' + nextDirectory + '">';
    nextString += nextTitle;
    nextString += '</a>';

    header.append(nextString);
    footer.append(nextString);
    
    var clearString = '<div class="clear"></div>';
    
    header.append(clearString);
    footer.append(clearString);
}

function headerScript() {
    var scriptString = '<link rel="stylesheet" href="../js/vendors/bootstrap/dist/css/bootstrap.min.css">';
    scriptString += '<link rel="stylesheet" href="../js/vendors/bootstrap/dist/css/bootstrap-theme.min.css">';
    scriptString += '<link rel="stylesheet" href="../css/prism.css">';
    scriptString += '<link rel="stylesheet" href="../css/customized.css">';
    document.write(scriptString);
}

function footerScript() {
    var scriptString = '<script src="../js/vendors/jquery/dist/jquery.min.js"></script>';
    scriptString += '<script src="../js/vendors/bootstrap/dist/js/bootstrap.min.js"></script>';
    scriptString += '<script src="../js/vendors/traceur/bin/traceur.js"></script>';
    scriptString += '<script src="../js/vendors/traceur/bin/BrowserSystem.js"></script>';
    scriptString += '<script src="../js/vendors/traceur/src/bootstrap.js"></script>';
    scriptString += '<script src="../js/vendors/es6-module-loader/es6-module-loader-dev.js"></script>';
    scriptString += '<script src="../js/prism.js"></script>';
    document.write(scriptString);
}