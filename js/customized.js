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
            directory = '04-new-types-and-object-extensions';
            break;
        case 5:
            directory = '05-iterators-generators-and-promises';
            break;
        case 6:
            directory = '06-arrays-and-collections';
            break;
        case 7:
            directory = '07-the-reflect-api';
            break;
        case 8:
            directory = '08-the-proxy-api';
            break;
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
